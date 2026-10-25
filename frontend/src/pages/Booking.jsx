import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck2,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ShieldAlert,
  ArrowRight,
  Zap,
  Server,
  Layers
} from 'lucide-react';
import { useParking } from '../context/ParkingContext';

export default function Booking() {
  const navigate = useNavigate();
  const { slots, createBooking, currentUser } = useParking();

  // Filter available slots
  const availableSlotsList = slots.filter(s => s.status === 'available');

  // Form states
  const [vehicleReg, setVehicleReg] = useState(currentUser ? currentUser.vehicleReg || '' : '');
  const [driverName, setDriverName] = useState(currentUser ? currentUser.name : '');
  const [vehicleModel, setVehicleModel] = useState('Standard Sedan');
  const [arrivalTime, setArrivalTime] = useState('11:00');
  const [departureTime, setDepartureTime] = useState('13:00');
  const [selectedSlotId, setSelectedSlotId] = useState(availableSlotsList.length > 0 ? availableSlotsList[0].id : '');
  
  // Feedback states
  const [errors, setErrors] = useState({});
  const [successBooking, setSuccessBooking] = useState(null);

  // Selected slot object
  const selectedSlot = slots.find(s => s.id === selectedSlotId);

  // Calculate estimated cost
  const calculateDuration = () => {
    try {
      const [arrH, arrM] = arrivalTime.split(':').map(Number);
      const [depH, depM] = departureTime.split(':').map(Number);
      const diffMinutes = (depH * 60 + depM) - (arrH * 60 + arrM);
      const hours = Math.max(0.5, Math.round((diffMinutes / 60) * 10) / 10);
      return hours > 0 ? hours : 2;
    } catch {
      return 2;
    }
  };

  const durationHours = calculateDuration();
  const rateNum = selectedSlot ? parseFloat(selectedSlot.ratePerHour.replace(/[^0-9.]/g, '')) || 100 : 100;
  const estimatedCost = Math.round(durationHours * rateNum);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!vehicleReg.trim()) {
      newErrors.vehicleReg = 'Vehicle registration number is required (e.g. KA-01-AB-1234)';
    }
    if (!driverName.trim()) {
      newErrors.driverName = 'Driver or researcher name is required';
    }
    if (!selectedSlotId) {
      newErrors.selectedSlotId = 'Please select an available parking bay';
    }
    if (arrivalTime >= departureTime) {
      newErrors.departureTime = 'Departure time must be after arrival time';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const booking = await createBooking({
      vehicleReg,
      driverName,
      vehicleModel,
      arrivalTime,
      departureTime,
      slotId: selectedSlotId,
      durationHours,
      totalCost: `₹${estimatedCost}`,
    });

    setSuccessBooking(booking);
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Simulation Notice Banner */}
      <div className="research-notice">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="research-notice-badge">Live API Connected</span>
          <span style={{ fontSize: '0.85rem' }}>
            Connected to Backend REST API (Port 5000). Your reservation is instantly persisted to the backend database, updates the live slot grid, and assigns a Fog broker node.
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
            Smart Parking Slot Reservation
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
            Select an optimal parking bay with real-time vacancy and proximity metrics
          </p>
        </div>

        {/* Success Modal / Banner */}
        {successBooking && (
          <div
            className="animate-fade-in"
            style={{
              backgroundColor: '#ecfdf5',
              border: '2px solid #10b981',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <CheckCircle2 size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46', margin: 0 }}>
                  Demo Reservation Confirmed! ({successBooking.id})
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#047857', margin: '0.35rem 0 1rem 0' }}>
                  Slot <strong>{successBooking.slotId}</strong> has been allocated to vehicle <strong>{successBooking.vehicleReg}</strong>. The slot status is now synchronized across the dashboard as Reserved.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #a7f3d0',
                  marginBottom: '1.25rem',
                  fontSize: '0.82rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Assigned Slot:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{successBooking.slotId} ({successBooking.zone})</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Reserved Schedule:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{successBooking.arrivalTime} &rarr; {successBooking.departureTime}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span>
                    <div style={{ fontWeight: 700, color: '#059669' }}>{successBooking.totalCost} (Demo)</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Managing Fog Node:</span>
                    <div style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.78rem' }}>{successBooking.fogNodeAssigned}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/my-bookings')}
                    className="btn btn-primary btn-sm"
                  >
                    <span>View in My Bookings</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setSuccessBooking(null);
                      setVehicleReg('');
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form & Live Summary Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start'
        }}>
          {/* Reservation Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Vehicle & Schedule Details
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Vehicle Registration */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                  Vehicle Registration Plate <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. KA-01-MJ-4021"
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${errors.vehicleReg ? '#ef4444' : 'var(--border-light)'}`,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}
                />
                {errors.vehicleReg && (
                  <span style={{ fontSize: '0.72rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <AlertCircle size={12} /> {errors.vehicleReg}
                  </span>
                )}
              </div>

              {/* Driver Name */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                  Driver / Researcher Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${errors.driverName ? '#ef4444' : 'var(--border-light)'}`,
                    fontSize: '0.875rem',
                  }}
                />
                {errors.driverName && (
                  <span style={{ fontSize: '0.72rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <AlertCircle size={12} /> {errors.driverName}
                  </span>
                )}
              </div>

              {/* Vehicle Model & Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                    Vehicle Category:
                  </label>
                  <select
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="Standard Sedan">Standard Sedan</option>
                    <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                    <option value="SUV / Crossover">SUV / Crossover</option>
                    <option value="Accessible / Senior">Accessible / Priority</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                    Select Available Bay <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${errors.selectedSlotId ? '#ef4444' : 'var(--border-light)'}`,
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff',
                      fontWeight: 600
                    }}
                  >
                    {availableSlotsList.length === 0 ? (
                      <option value="">No Slots Available</option>
                    ) : (
                      availableSlotsList.map(slot => (
                        <option key={slot.id} value={slot.id}>
                          Slot {slot.id} (Zone {slot.section} • {slot.distanceMeters}m)
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* Arrival & Departure Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                    Arrival Time:
                  </label>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                    Departure Time:
                  </label>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${errors.departureTime ? '#ef4444' : 'var(--border-light)'}`,
                      fontSize: '0.875rem',
                    }}
                  />
                </div>
              </div>
              {errors.departureTime && (
                <span style={{ fontSize: '0.72rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertCircle size={12} /> {errors.departureTime}
                </span>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={availableSlotsList.length === 0}
                className="btn btn-primary"
                style={{
                  padding: '0.8rem',
                  fontSize: '0.92rem',
                  marginTop: '0.5rem',
                  width: '100%'
                }}
              >
                <CalendarCheck2 size={18} />
                <span>Confirm Demo Reservation</span>
              </button>
            </form>
          </div>

          {/* Live Booking Summary Card */}
          <div className="card" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              Reservation Summary
            </h3>

            {selectedSlot ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Assigned Parking Bay:</span>
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid #bfdbfe'
                  }}>
                    Slot {selectedSlot.id}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Zone & Level:</span>
                  <span style={{ fontWeight: 600 }}>Zone {selectedSlot.section} • {selectedSlot.floor}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Slot Feature:</span>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {selectedSlot.type === 'EV Charging' ? <Zap size={14} color="#0891b2" /> : <Car size={14} color="#64748b" />}
                    {selectedSlot.type}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Gate Proximity (Walking):</span>
                  <span style={{ fontWeight: 600 }}>{selectedSlot.distanceMeters} meters</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Fog Edge Broker:</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-primary)', fontSize: '0.78rem' }}>
                    {selectedSlot.fogNodeId}
                  </span>
                </div>

                <div style={{
                  borderTop: '1px dashed var(--border-light)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Demo Fee:</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({durationHours} hrs @ {selectedSlot.ratePerHour}/hr)</span>
                  </div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                    ₹{estimatedCost}
                  </span>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <ShieldAlert size={14} color="var(--accent-primary)" />
                  <span>Demonstration mock: No card or real payment is processed.</span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                All slots in this test environment are currently occupied or reserved.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
