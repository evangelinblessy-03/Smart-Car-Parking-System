import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_PARKING_SLOTS,
  INITIAL_BOOKINGS,
  RECENT_ACTIVITIES,
  generateDemoConvergenceData,
  DEMO_VEHICLE_ALLOCATIONS,
} from '../data/sampleParkingData';
import apiService from '../services/api';

const ParkingContext = createContext(null);

export const ParkingProvider = ({ children }) => {
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);

  const [slots, setSlots] = useState(() => {
    const saved = localStorage.getItem('smart_parking_slots');
    if (!saved || saved.includes('$')) {
      return INITIAL_PARKING_SLOTS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_PARKING_SLOTS;
    }
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('smart_parking_bookings');
    if (!saved || saved.includes('$')) {
      return INITIAL_BOOKINGS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('smart_parking_activities');
    return saved ? JSON.parse(saved) : RECENT_ACTIVITIES;
  });

  // Simulated authenticated user state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smart_parking_user');
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed) {
      return parsed;
    }
    return {
      name: 'SCHOLAR',
      email: 'scholar@fogresearch.ac.in',
      vehicleReg: 'KA-01-MJ-4021',
      role: 'SmartPark Member',
      isAuthenticated: true
    };
  });

  // GWO Simulation state
  const [gwoSim, setGwoSim] = useState({
    numSlots: 32,
    numVehicles: 8,
    iterations: 40,
    fitnessValue: 32.84,
    executionTimeMs: 14.8,
    allocatedCount: 8,
    alphaWolfFitness: 0.94,
    betaWolfFitness: 0.86,
    deltaWolfFitness: 0.79,
    isSimulating: false,
    lastRunTimestamp: new Date().toLocaleTimeString(),
    convergenceData: generateDemoConvergenceData(40),
    allocations: DEMO_VEHICLE_ALLOCATIONS,
    isImportedFromJava: false,
    javaSimulationResults: null,
  });

  // -------------------------------------------------------------------------
  // INITIALIZE & SYNC WITH BACKEND API (PORT 5000)
  // -------------------------------------------------------------------------
  const syncWithBackend = useCallback(async () => {
    try {
      const health = await apiService.checkHealth();
      setBackendHealth(health);
      setIsBackendConnected(true);

      // Fetch live slots from backend
      const remoteSlots = await apiService.getSlots();
      if (Array.isArray(remoteSlots) && remoteSlots.length > 0) {
        setSlots(remoteSlots);
        localStorage.setItem('smart_parking_slots', JSON.stringify(remoteSlots));
      }

      // Fetch live bookings from backend
      const remoteBookings = await apiService.getBookings();
      if (Array.isArray(remoteBookings) && remoteBookings.length > 0) {
        setBookings(remoteBookings);
        localStorage.setItem('smart_parking_bookings', JSON.stringify(remoteBookings));
      }

      // Fetch activities
      const remoteActivities = await apiService.getActivities();
      if (Array.isArray(remoteActivities) && remoteActivities.length > 0) {
        setActivities(remoteActivities);
      }
    } catch {
      console.info('[ParkingContext] Running in local fallback mode (Backend server reconnecting...)');
      setIsBackendConnected(false);
    }
  }, []);

  useEffect(() => {
    syncWithBackend();

    // Periodic heartbeat check every 15 seconds
    const interval = setInterval(() => {
      apiService.checkHealth()
        .then(h => {
          setBackendHealth(h);
          setIsBackendConnected(true);
        })
        .catch(() => setIsBackendConnected(false));
    }, 15000);

    return () => clearInterval(interval);
  }, [syncWithBackend]);

  // Persist to local storage as fallback
  useEffect(() => {
    localStorage.setItem('smart_parking_slots', JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem('smart_parking_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('smart_parking_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smart_parking_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('smart_parking_user');
    }
  }, [currentUser]);

  // Derived counts
  const totalSlots = slots.length;
  const availableSlots = slots.filter(s => s.status === 'available').length;
  const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
  const reservedSlots = slots.filter(s => s.status === 'reserved').length;
  const occupancyRate = totalSlots > 0 ? Math.round(((occupiedSlots + reservedSlots) / totalSlots) * 100) : 0;

  // -------------------------------------------------------------------------
  // UPDATE A SINGLE SLOT'S STATUS (Available / Occupied / Reserved)
  // -------------------------------------------------------------------------
  const updateSlotStatus = async (slotId, newStatus, vehicleDetails = null) => {
    // 1. Optimistic UI update
    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id.toUpperCase() === slotId.toUpperCase()) {
          return {
            ...slot,
            status: newStatus,
            vehicle: newStatus === 'available' ? null : (vehicleDetails || slot.vehicle),
            lastUpdated: 'Just now'
          };
        }
        return slot;
      })
    );

    const newActivity = {
      id: Date.now(),
      type: newStatus === 'available' ? 'release' : 'booking',
      title: `Slot ${slotId.toUpperCase()} Status Changed`,
      desc: `Status updated to "${newStatus.toUpperCase()}"`,
      time: 'Just now',
      icon: newStatus === 'available' ? 'CheckCircle' : 'Activity'
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 14)]);

    // 2. Always transmit to Backend API
    try {
      const res = await apiService.updateSlot(slotId, newStatus, vehicleDetails);
      if (res && res.slot) {
        setIsBackendConnected(true);
        setSlots(prev => prev.map(s => s.id.toUpperCase() === slotId.toUpperCase() ? res.slot : s));
      }
    } catch (err) {
      console.warn('Backend slot update failed, kept in local state:', err.message);
    }
  };

  // -------------------------------------------------------------------------
  // CREATE A NEW PARKING BOOKING
  // -------------------------------------------------------------------------
  const createBooking = async (bookingData) => {
    const slot = slots.find(s => s.id.toUpperCase() === bookingData.slotId.toUpperCase());
    const cost = bookingData.totalCost || (slot ? `₹${slot.rateINR * (bookingData.durationHours || 2)}` : '₹300');

    const payload = {
      slotId: bookingData.slotId.toUpperCase(),
      vehicleReg: bookingData.vehicleReg.toUpperCase(),
      vehicleModel: bookingData.vehicleModel || 'Registered Vehicle',
      driverName: bookingData.driverName || (currentUser ? currentUser.name : 'Guest Driver'),
      driverEmail: currentUser?.email || '',
      arrivalTime: bookingData.arrivalTime,
      departureTime: bookingData.departureTime,
      durationHours: bookingData.durationHours || 2,
      totalCost: cost
    };

    // 1. Always attempt backend API creation first
    try {
      const response = await apiService.createBooking(payload);
      if (response && response.success && response.booking) {
        const newBooking = response.booking;
        setIsBackendConnected(true);
        setBookings(prev => [newBooking, ...prev.filter(b => b.id !== newBooking.id)]);

        // Sync slot state
        setSlots(prev => prev.map(s => {
          if (s.id.toUpperCase() === newBooking.slotId.toUpperCase()) {
            return {
              ...s,
              status: 'reserved',
              vehicle: {
                regNumber: newBooking.vehicleReg,
                model: newBooking.vehicleModel,
                entryTime: newBooking.arrivalTime,
                expectedDuration: `${newBooking.durationHours} hrs`,
                driver: newBooking.driverName
              },
              lastUpdated: 'Just now'
            };
          }
          return s;
        }));

        const activity = {
          id: Date.now(),
          type: 'booking',
          title: `New Reservation (${newBooking.id})`,
          desc: `Vehicle ${newBooking.vehicleReg} confirmed on Slot ${newBooking.slotId} via REST API`,
          time: 'Just now',
          icon: 'Calendar'
        };
        setActivities(prev => [activity, ...prev.slice(0, 14)]);

        return newBooking;
      }
    } catch (err) {
      console.warn('Backend booking error, using local fallback:', err.message);
    }

    // Local fallback creation
    const newId = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;
    const localBooking = {
      id: newId,
      vehicleReg: bookingData.vehicleReg.toUpperCase(),
      driverName: bookingData.driverName || (currentUser ? currentUser.name : 'Guest Driver'),
      driverEmail: currentUser?.email || '',
      slotId: bookingData.slotId.toUpperCase(),
      zone: `Zone ${slot ? slot.section : 'A'} (${slot ? slot.floor : 'Ground'})`,
      slotType: slot ? slot.type : 'Standard',
      arrivalTime: bookingData.arrivalTime,
      departureTime: bookingData.departureTime,
      durationHours: bookingData.durationHours || 2,
      totalCost: cost,
      status: 'Active',
      fogNodeAssigned: slot ? slot.fogNodeId : 'Fog-Node-Alpha (Entrance Gate)',
      createdAt: new Date().toLocaleString(),
    };

    setBookings(prev => [localBooking, ...prev]);
    updateSlotStatus(bookingData.slotId, 'reserved', {
      regNumber: bookingData.vehicleReg.toUpperCase(),
      model: bookingData.vehicleModel || 'Registered Vehicle',
      entryTime: bookingData.arrivalTime,
      expectedDuration: `${bookingData.durationHours || 2} hrs`,
      driver: bookingData.driverName || 'Guest'
    });

    return localBooking;
  };

  // -------------------------------------------------------------------------
  // CANCEL A BOOKING
  // -------------------------------------------------------------------------
  const cancelBooking = async (bookingId) => {
    const booking = bookings.find(b => b.id.toUpperCase() === bookingId.toUpperCase());
    if (!booking) return;

    // Optimistic local update
    setBookings(prev =>
      prev.map(b => (b.id.toUpperCase() === bookingId.toUpperCase() ? { ...b, status: 'Cancelled' } : b))
    );

    if (booking.slotId) {
      updateSlotStatus(booking.slotId, 'available', null);
    }

    const cancelActivity = {
      id: Date.now(),
      type: 'release',
      title: `Booking Cancelled (${bookingId})`,
      desc: `Slot ${booking.slotId} released back to Available pool`,
      time: 'Just now',
      icon: 'CheckCircle'
    };
    setActivities(prev => [cancelActivity, ...prev.slice(0, 14)]);

    // Transmit to backend
    // Transmit to backend
    try {
      await apiService.cancelBooking(bookingId);
      setIsBackendConnected(true);
    } catch (err) {
      console.warn('Backend cancel failed, kept in local state:', err.message);
    }
  };

  // -------------------------------------------------------------------------
  // RUN GWO SIMULATION (Calculated on Backend or in Client)
  // -------------------------------------------------------------------------
  const runGwoSimulation = async (config = {}) => {
    setGwoSim(prev => ({ ...prev, isSimulating: true }));

    try {
      const result = await apiService.runGwoSimulation({
        numVehicles: config.numVehicles || gwoSim.numVehicles,
        iterations: config.iterations || gwoSim.iterations
      });

      if (result && result.success) {
        setIsBackendConnected(true);
        setGwoSim(prev => ({
          ...prev,
          ...result,
          isSimulating: false,
          isImportedFromJava: false
        }));

        const gwoActivity = {
          id: Date.now(),
          type: 'gwo',
          title: 'GWO Simulation (Backend)',
          desc: `Optimized ${result.allocatedCount} vehicles over ${result.iterations} iterations (${result.executionTimeMs}ms latency)`,
          time: 'Just now',
          icon: 'Cpu'
        };
        setActivities(prev => [gwoActivity, ...prev.slice(0, 14)]);
        return;
      }
    } catch (err) {
      console.warn('Backend GWO simulation failed, using local engine:', err.message);
    }

    // Local simulation fallback
    setTimeout(() => {
      const numIterations = config.iterations || gwoSim.iterations;
      const numVehicles = config.numVehicles || gwoSim.numVehicles;
      const convergence = generateDemoConvergenceData(numIterations, 140 + Math.random() * 20);
      const bestFitness = convergence[convergence.length - 1].gwoFitness;
      const executionTime = parseFloat((12.5 + (numIterations * 0.08) + Math.random() * 2).toFixed(1));

      const freeSlots = slots.filter(s => s.status === 'available');
      const dynamicAllocations = [];
      const roles = ['Alpha (Best Fit)', 'Alpha (Best Fit)', 'Beta (2nd Leader)', 'Beta (2nd Leader)', 'Delta (3rd Leader)', 'Delta (3rd Leader)', 'Omega (Exploration)', 'Omega (Exploration)'];

      for (let i = 0; i < Math.min(numVehicles, freeSlots.length); i++) {
        const slot = freeSlots[i];
        dynamicAllocations.push({
          vehicleId: `VEH-0${i + 1}`,
          assignedSlot: slot.id,
          wolfRole: roles[i % roles.length],
          distanceM: slot.distanceMeters,
          fitnessScore: parseFloat((0.95 - (i * 0.03)).toFixed(2)),
          latencyMs: parseFloat((10.5 + (slot.distanceMeters * 0.08)).toFixed(1)),
          status: 'Allocated'
        });
      }

      setGwoSim({
        numSlots: totalSlots,
        numVehicles,
        iterations: numIterations,
        fitnessValue: bestFitness,
        executionTimeMs: executionTime,
        allocatedCount: dynamicAllocations.length,
        alphaWolfFitness: 0.95,
        betaWolfFitness: 0.88,
        deltaWolfFitness: 0.81,
        isSimulating: false,
        lastRunTimestamp: new Date().toLocaleTimeString(),
        convergenceData: convergence,
        allocations: dynamicAllocations.length > 0 ? dynamicAllocations : DEMO_VEHICLE_ALLOCATIONS,
        isImportedFromJava: false,
      });
    }, 800);
  };

  // -------------------------------------------------------------------------
  // RUN GENUINE iFogSim JAVA SIMULATION (VIA BACKEND)
  // -------------------------------------------------------------------------
  const runIfogsimSimulation = async () => {
    try {
      setGwoSim(prev => ({ ...prev, isSimulating: true }));
      const response = await apiService.runIfogsimSimulation();

      if (response && response.success) {
        setIsBackendConnected(true);
        setGwoSim(prev => ({
          ...prev,
          isSimulating: false,
          isImportedFromJava: true,
          executionTimeMs: response.metrics.executionTimeMs,
          javaSimulationResults: response,
          lastRunTimestamp: new Date().toLocaleTimeString()
        }));

        const javaActivity = {
          id: Date.now(),
          type: 'fog',
          title: 'Genuine iFogSim Simulation Completed',
          desc: `Processed ${response.metrics.datasetRows.toLocaleString()} rows in ${response.metrics.executionTimeMs}ms`,
          time: 'Just now',
          icon: 'Server'
        };
        setActivities(prev => [javaActivity, ...prev.slice(0, 14)]);

        return { success: true, results: response };
      }
      return { success: false, message: response?.errorOutput || 'Simulation exited with errors' };
    } catch (err) {
      setGwoSim(prev => ({ ...prev, isSimulating: false }));
      return { success: false, message: err.message };
    }
  };

  // -------------------------------------------------------------------------
  // USER AUTHENTICATION
  // -------------------------------------------------------------------------
  const loginUser = async (email, password) => {
    // Attempt backend login first
    try {
      const response = await apiService.login(email, password);
      if (response && response.success && response.user) {
        setIsBackendConnected(true);
        setCurrentUser(response.user);
        return true;
      }
    } catch (err) {
      console.warn('Backend login error, falling back to client session:', err.message);
    }

    // Local fallback
    const user = {
      name: email.split('@')[0].toUpperCase(),
      email,
      vehicleReg: 'KA-01-MJ-4021',
      role: 'SmartPark Member',
      isAuthenticated: true
    };
    setCurrentUser(user);
    return true;
  };

  const registerUser = async (userData) => {
    try {
      const response = await apiService.register(userData);
      if (response && response.success && response.user) {
        setIsBackendConnected(true);
        setCurrentUser(response.user);
        return true;
      }
    } catch (err) {
      console.warn('Backend register error, falling back to client session:', err.message);
    }

    const user = {
      name: (userData.fullName || 'User').toUpperCase(),
      email: userData.email,
      vehicleReg: userData.vehicleReg || 'KA-01-SP-2026',
      role: 'SmartPark Member',
      isAuthenticated: true
    };
    setCurrentUser(user);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const resetAllData = async () => {
    try {
      await apiService.resetData();
      setIsBackendConnected(true);
    } catch (err) {
      console.warn('Backend reset error:', err.message);
    }
    setSlots(INITIAL_PARKING_SLOTS);
    setBookings(INITIAL_BOOKINGS);
    setActivities(RECENT_ACTIVITIES);
    localStorage.removeItem('smart_parking_slots');
    localStorage.removeItem('smart_parking_bookings');
    localStorage.removeItem('smart_parking_activities');
  };

  return (
    <ParkingContext.Provider
      value={{
        slots,
        bookings,
        activities,
        currentUser,
        gwoSim,
        isBackendConnected,
        backendHealth,
        totalSlots,
        availableSlots,
        occupiedSlots,
        reservedSlots,
        occupancyRate,
        updateSlotStatus,
        createBooking,
        cancelBooking,
        runGwoSimulation,
        runIfogsimSimulation,
        loginUser,
        registerUser,
        logoutUser,
        resetAllData,
        syncWithBackend,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
};
export default ParkingContext;
