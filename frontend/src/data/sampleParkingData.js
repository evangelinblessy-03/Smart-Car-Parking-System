/**
 * Sample Parking & GWO Simulation Data
 * 
 * NOTE ON RESEARCH ACCURACY:
 * All dataset elements below represent demonstration / sample baseline data designed
 * to validate the frontend UI and user interaction flows.
 * Real simulation output generated from the Java/iFogSim research simulation can be
 * imported directly using the format described at the bottom of this file.
 */

export const INITIAL_PARKING_SLOTS = [
  // Zone A - Near Entrance & EV Charging (Ground Floor)
  { id: 'A1', section: 'A', floor: 'Ground Floor', type: 'EV Charging', status: 'available', distanceMeters: 12, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹250', vehicle: null, lastUpdated: 'Just now' },
  { id: 'A2', section: 'A', floor: 'Ground Floor', type: 'EV Charging', status: 'occupied', distanceMeters: 15, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹250', vehicle: { regNumber: 'KA-01-EV-2024', model: 'Tesla Model 3', entryTime: '09:30 AM', expectedDuration: '3 hrs', driver: 'Rahul S.' }, lastUpdated: '15 mins ago' },
  { id: 'A3', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 18, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', vehicle: null, lastUpdated: 'Just now' },
  { id: 'A4', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'reserved', distanceMeters: 22, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', vehicle: { regNumber: 'MH-12-AB-9921', model: 'Honda City', entryTime: '11:00 AM (Reserved)', expectedDuration: '2 hrs', driver: 'Ananya P.' }, lastUpdated: '5 mins ago' },
  { id: 'A5', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 25, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', vehicle: { regNumber: 'DL-04-CK-4040', model: 'Hyundai Creta', entryTime: '10:05 AM', expectedDuration: '4 hrs', driver: 'Vikram M.' }, lastUpdated: '25 mins ago' },
  { id: 'A6', section: 'A', floor: 'Ground Floor', type: 'Accessible / VIP', status: 'available', distanceMeters: 14, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹200', vehicle: null, lastUpdated: 'Just now' },
  { id: 'A7', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 28, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', vehicle: null, lastUpdated: 'Just now' },
  { id: 'A8', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 32, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', vehicle: { regNumber: 'KA-05-NB-7812', model: 'Kia Seltos', entryTime: '08:45 AM', expectedDuration: '5 hrs', driver: 'Pooja K.' }, lastUpdated: '40 mins ago' },

  // Zone B - Ground Floor Central
  { id: 'B1', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 36, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: null, lastUpdated: 'Just now' },
  { id: 'B2', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 40, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: { regNumber: 'TN-09-XY-3120', model: 'Volkswagen Virtus', entryTime: '10:20 AM', expectedDuration: '2 hrs', driver: 'Karthik N.' }, lastUpdated: '10 mins ago' },
  { id: 'B3', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 44, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: null, lastUpdated: 'Just now' },
  { id: 'B4', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'reserved', distanceMeters: 48, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: { regNumber: 'KA-03-MR-1104', model: 'Tata Nexon EV', entryTime: '11:30 AM (Reserved)', expectedDuration: '1.5 hrs', driver: 'Sneha R.' }, lastUpdated: '12 mins ago' },
  { id: 'B5', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 52, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: { regNumber: 'HR-26-DQ-5501', model: 'Maruti Suzuki Swift', entryTime: '09:10 AM', expectedDuration: '3 hrs', driver: 'Arjun V.' }, lastUpdated: '50 mins ago' },
  { id: 'B6', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 55, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: null, lastUpdated: 'Just now' },
  { id: 'B7', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 58, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', vehicle: { regNumber: 'KA-51-MM-8832', model: 'BMW 3 Series', entryTime: '10:45 AM', expectedDuration: '2 hrs', driver: 'Devraj B.' }, lastUpdated: '2 mins ago' },
  { id: 'B8', section: 'B', floor: 'Ground Floor', type: 'Accessible / VIP', status: 'available', distanceMeters: 38, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹200', vehicle: null, lastUpdated: 'Just now' },

  // Zone C - Level 1 North Wing
  { id: 'C1', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 62, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'C2', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 66, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'C3', section: 'C', floor: 'Level 1', type: 'Standard', status: 'occupied', distanceMeters: 70, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: { regNumber: 'AP-16-TZ-9011', model: 'Toyota Innova', entryTime: '08:30 AM', expectedDuration: '6 hrs', driver: 'Manish T.' }, lastUpdated: '1 hr ago' },
  { id: 'C4', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 74, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'C5', section: 'C', floor: 'Level 1', type: 'Standard', status: 'reserved', distanceMeters: 78, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: { regNumber: 'KA-04-JG-6677', model: 'Skoda Slavia', entryTime: '12:00 PM (Reserved)', expectedDuration: '3 hrs', driver: 'Deepak G.' }, lastUpdated: '18 mins ago' },
  { id: 'C6', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 82, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'C7', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 85, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'C8', section: 'C', floor: 'Level 1', type: 'EV Charging', status: 'occupied', distanceMeters: 65, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹220', vehicle: { regNumber: 'KA-02-EE-1994', model: 'MG ZS EV', entryTime: '09:55 AM', expectedDuration: '2.5 hrs', driver: 'Tanvi M.' }, lastUpdated: '35 mins ago' },

  // Zone D - Level 1 South Wing & Reserved Executive
  { id: 'D1', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 88, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'D2', section: 'D', floor: 'Level 1', type: 'Standard', status: 'occupied', distanceMeters: 92, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: { regNumber: 'MH-02-FE-4211', model: 'Mahindra XUV700', entryTime: '10:12 AM', expectedDuration: '4 hrs', driver: 'Gaurav S.' }, lastUpdated: '22 mins ago' },
  { id: 'D3', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 95, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'D4', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 98, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'D5', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 102, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
  { id: 'D6', section: 'D', floor: 'Level 1', type: 'Standard', status: 'occupied', distanceMeters: 106, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: { regNumber: 'KA-01-MJ-4021', model: 'Audi A4', entryTime: '07:50 AM', expectedDuration: '8 hrs', driver: 'Aditya C.' }, lastUpdated: '1.5 hrs ago' },
  { id: 'D7', section: 'D', floor: 'Level 1', type: 'Accessible / VIP', status: 'reserved', distanceMeters: 89, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹200', vehicle: { regNumber: 'KA-05-EX-0001', model: 'Mercedes C-Class', entryTime: '01:00 PM (Reserved)', expectedDuration: '3 hrs', driver: 'Dr. Ramesh N.' }, lastUpdated: '30 mins ago' },
  { id: 'D8', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 110, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', vehicle: null, lastUpdated: 'Just now' },
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BKG-8021',
    vehicleReg: 'KA-01-EV-2024',
    driverName: 'Rahul Sharma',
    slotId: 'A2',
    zone: 'Zone A (Ground Floor)',
    slotType: 'EV Charging',
    arrivalTime: '09:30 AM',
    departureTime: '12:30 PM',
    durationHours: 3,
    totalCost: '₹750',
    status: 'Active',
    fogNodeAssigned: 'Fog-Node-Alpha (Entrance Gate)',
    createdAt: '2026-10-23 09:25 AM',
  },
  {
    id: 'BKG-8022',
    vehicleReg: 'MH-12-AB-9921',
    driverName: 'Ananya Patel',
    slotId: 'A4',
    zone: 'Zone A (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '11:00 AM',
    departureTime: '01:00 PM',
    durationHours: 2,
    totalCost: '₹300',
    status: 'Upcoming',
    fogNodeAssigned: 'Fog-Node-Alpha (Entrance Gate)',
    createdAt: '2026-10-23 10:15 AM',
  },
  {
    id: 'BKG-8023',
    vehicleReg: 'KA-03-MR-1104',
    driverName: 'Sneha Rao',
    slotId: 'B4',
    zone: 'Zone B (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '11:30 AM',
    departureTime: '01:00 PM',
    durationHours: 1.5,
    totalCost: '₹150',
    status: 'Upcoming',
    fogNodeAssigned: 'Fog-Node-Beta (Zone B Hub)',
    createdAt: '2026-10-23 10:30 AM',
  },
  {
    id: 'BKG-8019',
    vehicleReg: 'KA-05-NB-7812',
    driverName: 'Pooja Kulkarni',
    slotId: 'A8',
    zone: 'Zone A (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '08:45 AM',
    departureTime: '01:45 PM',
    durationHours: 5,
    totalCost: '₹750',
    status: 'Active',
    fogNodeAssigned: 'Fog-Node-Alpha (Entrance Gate)',
    createdAt: '2026-10-23 08:35 AM',
  },
  {
    id: 'BKG-7998',
    vehicleReg: 'DL-01-AA-1234',
    driverName: 'Karan Mehra',
    slotId: 'B1',
    zone: 'Zone B (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '07:00 AM',
    departureTime: '09:00 AM',
    durationHours: 2,
    totalCost: '₹200',
    status: 'Completed',
    fogNodeAssigned: 'Fog-Node-Beta (Zone B Hub)',
    createdAt: '2026-10-23 06:50 AM',
  }
];

export const RECENT_ACTIVITIES = [
  { id: 1, type: 'booking', title: 'Automated Slot Allocation', desc: 'Vehicle KA-01-EV-2024 allocated to slot A2', time: '12 mins ago', icon: 'Cpu' },
  { id: 2, type: 'booking', title: 'New Demo Reservation', desc: 'Slot B4 reserved for 11:30 AM (Tata Nexon EV)', time: '18 mins ago', icon: 'Calendar' },
  { id: 3, type: 'release', title: 'Slot Released', desc: 'Slot B1 freed by DL-01-AA-1234, status set to Available', time: '35 mins ago', icon: 'CheckCircle' },
  { id: 4, type: 'fog', title: 'Fog Node Tuple Executed', desc: 'Fog-Node-Beta synchronized 8 slot states with Cloud Broker', time: '42 mins ago', icon: 'Server' },
  { id: 5, type: 'booking', title: 'Batch Allocation Complete', desc: '16 incoming request tuples scheduled across Zones A, B, and C', time: '1 hr ago', icon: 'Activity' },
];

export const HOURLY_OCCUPANCY_DATA = [
  { time: '06:00', occupied: 4, available: 28, reserved: 0 },
  { time: '07:00', occupied: 7, available: 24, reserved: 1 },
  { time: '08:00', occupied: 12, available: 18, reserved: 2 },
  { time: '09:00', occupied: 19, available: 10, reserved: 3 },
  { time: '10:00', occupied: 23, available: 5, reserved: 4 },
  { time: '11:00', occupied: 20, available: 8, reserved: 4 },
  { time: '12:00', occupied: 17, available: 11, reserved: 4 },
  { time: '13:00', occupied: 15, available: 13, reserved: 4 },
  { time: '14:00', occupied: 18, available: 10, reserved: 4 },
  { time: '15:00', occupied: 21, available: 7, reserved: 4 },
  { time: '16:00', occupied: 24, available: 4, reserved: 4 },
  { time: '17:00', occupied: 22, available: 6, reserved: 4 },
];

/**
 * Baseline convergence data for demonstration.
 * Generation function creates authentic-looking convergence curves based on user input iterations.
 */
export const generateDemoConvergenceData = (iterations = 40, initialFitness = 142.5) => {
  const data = [];
  let currentFitness = initialFitness;
  const targetFitness = 32.8;

  for (let i = 1; i <= iterations; i++) {
    // Exponential decay curve characteristic of meta-heuristic swarm convergence
    const progress = i / iterations;
    const decay = Math.exp(-3.5 * progress);
    const noise = (Math.random() - 0.45) * 1.8 * (1 - progress);
    currentFitness = targetFitness + (initialFitness - targetFitness) * decay + noise;
    
    // Ensure monotonically non-increasing best fitness tracking
    if (i > 1 && currentFitness > data[i - 2].gwoFitness) {
      currentFitness = data[i - 2].gwoFitness - (Math.random() * 0.15);
    }
    
    // Baseline algorithm comparison (e.g. standard Particle Swarm Optimization / Genetic Algorithm)
    const baselineDecay = Math.exp(-2.2 * progress);
    const baselineFitness = 52.4 + (initialFitness - 52.4) * baselineDecay;

    data.push({
      iteration: i,
      gwoFitness: parseFloat(Math.max(targetFitness, currentFitness).toFixed(2)),
      baselineFitness: parseFloat(baselineFitness.toFixed(2)),
    });
  }
  return data;
};

/**
 * Comparative benchmark data across algorithms in Fog Computing environment
 */
export const ALGORITHM_COMPARISONS = [
  { metric: 'Allocation Latency (ms)', GWO: 14.8, PSO: 22.4, GA: 38.6, FCFS: 54.2, unit: 'ms', lowerIsBetter: true },
  { metric: 'Avg Walking Distance (m)', GWO: 26.4, PSO: 39.8, GA: 44.1, FCFS: 67.5, unit: 'm', lowerIsBetter: true },
  { metric: 'Fog Energy Consumption (J)', GWO: 8.4, PSO: 12.1, GA: 19.3, FCFS: 24.8, unit: 'J', lowerIsBetter: true },
  { metric: 'Convergence Speed (Iter)', GWO: 28, PSO: 46, GA: 62, FCFS: 85, unit: 'iter', lowerIsBetter: true },
  { metric: 'Resource Utilization (%)', GWO: 91.5, PSO: 82.0, GA: 76.4, FCFS: 61.2, unit: '%', lowerIsBetter: false },
];

/**
 * Sample simulated vehicle allocations from GWO optimizer
 */
export const DEMO_VEHICLE_ALLOCATIONS = [
  { vehicleId: 'VEH-01 (Tesla Model 3)', assignedSlot: 'A1', wolfRole: 'Alpha (Best Fit)', distanceM: 12, fitnessScore: 0.94, latencyMs: 11.2, status: 'Allocated' },
  { vehicleId: 'VEH-02 (Hyundai Ioniq 5)', assignedSlot: 'A3', wolfRole: 'Alpha (Best Fit)', distanceM: 18, fitnessScore: 0.91, latencyMs: 12.0, status: 'Allocated' },
  { vehicleId: 'VEH-03 (Honda City)', assignedSlot: 'B1', wolfRole: 'Beta (2nd Leader)', distanceM: 36, fitnessScore: 0.86, latencyMs: 14.5, status: 'Allocated' },
  { vehicleId: 'VEH-04 (Kia Seltos)', assignedSlot: 'B3', wolfRole: 'Beta (2nd Leader)', distanceM: 44, fitnessScore: 0.83, latencyMs: 15.1, status: 'Allocated' },
  { vehicleId: 'VEH-05 (Toyota Corolla)', assignedSlot: 'B6', wolfRole: 'Delta (3rd Leader)', distanceM: 55, fitnessScore: 0.79, latencyMs: 16.8, status: 'Allocated' },
  { vehicleId: 'VEH-06 (Skoda Slavia)', assignedSlot: 'C1', wolfRole: 'Delta (3rd Leader)', distanceM: 62, fitnessScore: 0.75, latencyMs: 17.4, status: 'Allocated' },
  { vehicleId: 'VEH-07 (Tata Harrier)', assignedSlot: 'C2', wolfRole: 'Omega (Exploration)', distanceM: 66, fitnessScore: 0.72, latencyMs: 18.2, status: 'Allocated' },
  { vehicleId: 'VEH-08 (BMW 2 Series)', assignedSlot: 'A6', wolfRole: 'Alpha (Best Fit)', distanceM: 14, fitnessScore: 0.93, latencyMs: 11.8, status: 'Allocated' },
];

/**
 * GWO Grey Wolf Hierarchy descriptions
 */
export const WOLF_HIERARCHY_INFO = [
  {
    role: 'Alpha (α) Wolves',
    badge: 'Primary Leaders',
    color: '#3b82f6',
    description: 'The dominant wolves in the pack. Responsible for making critical parking allocation decisions such as prioritizing emergency, EV, or closest slots. In the optimization space, Alpha represents the current best solution (fittest candidate).',
    attributes: ['Best fitness value', 'Dictates prey encirclement', 'Dominant exploration guide']
  },
  {
    role: 'Beta (β) Wolves',
    badge: 'Second-in-Command',
    color: '#8b5cf6',
    description: 'Subordinate to Alpha, assisting in decision making and reinforcing pack discipline. If Alpha retires or is invalidated, Beta becomes the next leader. In GWO, Beta represents the second-best candidate solution.',
    attributes: ['Second-best fitness score', 'Provides feedback to Alpha', 'Guides candidate updates']
  },
  {
    role: 'Delta (δ) Wolves',
    badge: 'Third-Tier Scouts',
    color: '#06b6d4',
    description: 'Subordinate to Alpha and Beta. Deltas function as scouts, sentinels, and elders in the hierarchy. In the parking system, Delta solutions monitor border slots, level-1 transitions, and latency bounds.',
    attributes: ['Third-best candidate', 'Maintains system balance', 'Prevents local stagnation']
  },
  {
    role: 'Omega (ω) Wolves',
    badge: 'Follower Population',
    color: '#64748b',
    description: 'The remaining wolves of the pack. They submit to all other dominant wolves and explore alternative search spaces to maintain population diversity, ensuring the algorithm does not get trapped in local optima.',
    attributes: ['Explores search space', 'Updates positions relative to α, β, δ', 'Ensures global coverage']
  }
];
