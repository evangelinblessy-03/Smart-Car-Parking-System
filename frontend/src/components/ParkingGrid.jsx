import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Ban, Clock, Car, Zap, Accessibility, ShieldAlert, Sparkles } from 'lucide-react';
import ParkingSlot from './ParkingSlot';
import Modal from './Modal';
import { useParking } from '../context/ParkingContext';

export default function ParkingGrid({ customSlots, isCompact = false }) {
  const { slots: contextSlots, updateSlotStatus } = useParking();
  const slots = customSlots || contextSlots;

  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected slot for modal
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [demoRegNumber, setDemoRegNumber] = useState('');
  const [demoModel, setDemoModel] = useState('');
  const [demoDuration, setDemoDuration] = useState('2 hrs');

  // Filter slots
  const filteredSlots = slots.filter((slot) => {
    // Status filter
    if (statusFilter !== 'all' && slot.status !== statusFilter) return false;
    // Zone filter
    if (zoneFilter !== 'all' && slot.section !== zoneFilter) return false;
    // Type filter
    if (typeFilter !== 'all' && slot.type !== typeFilter) return false;
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesId = slot.id.toLowerCase().includes(q);
      const matchesVehicle = slot.vehicle && (
        slot.vehicle.regNumber.toLowerCase().includes(q) ||
        slot.vehicle.model.toLowerCase().includes(q)
      );
      if (!matchesId && !matchesVehicle) return false;
    }
    return true;
  });

  const handleOpenSlotModal = (slot) => {
    setSelectedSlot(slot);
    setDemoRegNumber(slot.vehicle ? slot.vehicle.regNumber : 'KA-05-AB-7788');
    setDemoModel(slot.vehicle ? slot.vehicle.model : 'Standard Sedan');
  };

  const handleApplyStatusChange = (newStatus) => {
    if (!selectedSlot) return;

    let vehicleData = null;
    if (newStatus !== 'available') {
      vehicleData = {
        regNumber: demoRegNumber.toUpperCase() || 'DEMO-REG-99',
        model: demoModel || 'Demonstration Car',
        entryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expectedDuration: demoDuration,
        driver: 'Demo Driver'
      };
    }

    updateSlotStatus(selectedSlot.id, newStatus, vehicleData);
    // Refresh modal state
    setSelectedSlot(prev => ({
      ...prev,
      status: newStatus,
      vehicle: vehicleData,
      lastUpdated: 'Just now'
    }));
  };

  return (
    <div>
      {/* Controls Bar */}
      {!isCompact && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Top Row: Search and Zone Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search slot (e.g. A2, B4) or vehicle plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--bg-card-subtle)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Zone Selector Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.25rem' }}>Zone:</span>
              {['all', 'A', 'B', 'C', 'D'].map(zone => (
                <button
                  key={zone}
                  onClick={() => setZoneFilter(zone)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: zoneFilter === zone ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                    color: zoneFilter === zone ? '#ffffff' : 'var(--text-main)',
                    borderRadius: '6px',
                    fontWeight: zoneFilter === zone ? 700 : 500,
                  }}
                >
                  {zone === 'all' ? 'All Zones' : `Zone ${zone}`}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Status Filter and Type Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
            {/* Status Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
              <button
                onClick={() => setStatusFilter('all')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === 'all' ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
                  backgroundColor: statusFilter === 'all' ? 'var(--accent-primary-light)' : '#ffffff',
                  color: statusFilter === 'all' ? 'var(--accent-primary)' : 'var(--text-muted)',
                }}
              >
                All ({slots.length})
              </button>
              <button
                onClick={() => setStatusFilter('available')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === 'available' ? '1px solid #10b981' : '1px solid var(--border-light)',
                  backgroundColor: statusFilter === 'available' ? '#ecfdf5' : '#ffffff',
                  color: statusFilter === 'available' ? '#059669' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <CheckCircle2 size={13} /> Available ({slots.filter(s => s.status === 'available').length})
              </button>
              <button
                onClick={() => setStatusFilter('occupied')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === 'occupied' ? '1px solid #ef4444' : '1px solid var(--border-light)',
                  backgroundColor: statusFilter === 'occupied' ? '#fef2f2' : '#ffffff',
                  color: statusFilter === 'occupied' ? '#dc2626' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Ban size={13} /> Occupied ({slots.filter(s => s.status === 'occupied').length})
              </button>
              <button
                onClick={() => setStatusFilter('reserved')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === 'reserved' ? '1px solid #f59e0b' : '1px solid var(--border-light)',
                  backgroundColor: statusFilter === 'reserved' ? '#fffbeb' : '#ffffff',
                  color: statusFilter === 'reserved' ? '#d97706' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Clock size={13} /> Reserved ({slots.filter(s => s.status === 'reserved').length})
              </button>
            </div>

            {/* Type Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                  backgroundColor: 'var(--bg-card-subtle)',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                }}
              >
                <option value="all">All Slot Types</option>
                <option value="Standard">Standard</option>
                <option value="EV Charging">EV Charging</option>
                <option value="Accessible / VIP">Accessible / VIP</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Slots Grid */}
      {filteredSlots.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-light)',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <Car size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}>No Parking Slots Match Filter</h4>
          <p style={{ fontSize: '0.85rem' }}>Try clearing the active search or switching the zone/status filters above.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isCompact
            ? 'repeat(auto-fill, minmax(80px, 1fr))'
            : 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: isCompact ? '0.6rem' : '1.1rem',
        }}>
          {filteredSlots.map(slot => (
            <ParkingSlot
              key={slot.id}
              slot={slot}
              isCompact={isCompact}
              onSelect={handleOpenSlotModal}
            />
          ))}
        </div>
      )}

      {/* Slot Details & Demo Status Control Modal */}
      {selectedSlot && (
        <Modal
          isOpen={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          title={`Parking Slot ${selectedSlot.id} Details`}
          subtitle={`Section ${selectedSlot.section} • ${selectedSlot.floor} • Fog Gateway Assigned`}
        >
          <div>
            {/* Slot Current Status Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              backgroundColor: selectedSlot.status === 'available' ? '#ecfdf5' : selectedSlot.status === 'occupied' ? '#fef2f2' : '#fffbeb',
              border: `1px solid ${selectedSlot.status === 'available' ? '#a7f3d0' : selectedSlot.status === 'occupied' ? '#fecaca' : '#fde68a'}`,
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {selectedSlot.status === 'available' && <CheckCircle2 size={20} color="#10b981" />}
                {selectedSlot.status === 'occupied' && <Ban size={20} color="#ef4444" />}
                {selectedSlot.status === 'reserved' && <Clock size={20} color="#f59e0b" />}
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: selectedSlot.status === 'available' ? '#065f46' : selectedSlot.status === 'occupied' ? '#991b1b' : '#92400e' }}>
                    Current Status: {selectedSlot.status}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Last status change: {selectedSlot.lastUpdated || 'Recently'}
                  </div>
                </div>
              </div>
              <span className="badge badge-demo">Simulated Data</span>
            </div>

            {/* Slot Specification Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Slot Category:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>{selectedSlot.type}</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Distance from Gate:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>{selectedSlot.distanceMeters} meters</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Parking Fee Rate:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>{selectedSlot.ratePerHour} / hour</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Assigned Fog Node:</span>
                <div style={{ fontWeight: 600, color: 'var(--accent-primary)', marginTop: '0.1rem', fontSize: '0.78rem' }}>
                  {selectedSlot.fogNodeId}
                </div>
              </div>
            </div>

            {/* Vehicle Information if Occupied or Reserved */}
            {selectedSlot.vehicle && (
              <div style={{
                padding: '0.85rem 1rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                marginBottom: '1.25rem',
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Parked Vehicle Details
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registration:</span>
                  <span style={{ fontWeight: 700 }}>{selectedSlot.vehicle.regNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Model / Type:</span>
                  <span>{selectedSlot.vehicle.model}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Entry / Booking Time:</span>
                  <span>{selectedSlot.vehicle.entryTime}</span>
                </div>
                {selectedSlot.vehicle.expectedDuration && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
                    <span>{selectedSlot.vehicle.expectedDuration}</span>
                  </div>
                )}
              </div>
            )}

            {/* Demonstration Interactive Control Panel */}
            <div style={{
              borderTop: '1px solid var(--border-light)',
              paddingTop: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <Sparkles size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Interactive Demo: Update Slot Status
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Select a state below to update this slot in React state. The dashboard statistics, occupancy rates, and visual maps will update in real time without a backend.
              </p>

              {/* Vehicle input fields for occupied/reserved simulation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Demo Reg Plate:
                  </label>
                  <input
                    type="text"
                    value={demoRegNumber}
                    onChange={(e) => setDemoRegNumber(e.target.value)}
                    placeholder="KA-01-AB-1234"
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.8rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Demo Model:
                  </label>
                  <input
                    type="text"
                    value={demoModel}
                    onChange={(e) => setDemoModel(e.target.value)}
                    placeholder="Tesla Model 3"
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.8rem',
                    }}
                  />
                </div>
              </div>

              {/* Status Change Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleApplyStatusChange('available')}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                    flex: 1,
                  }}
                >
                  <CheckCircle2 size={14} /> Set Available
                </button>
                <button
                  onClick={() => handleApplyStatusChange('occupied')}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                    flex: 1,
                  }}
                >
                  <Ban size={14} /> Set Occupied
                </button>
                <button
                  onClick={() => handleApplyStatusChange('reserved')}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#fffbeb',
                    color: '#92400e',
                    border: '1px solid #fde68a',
                    flex: 1,
                  }}
                >
                  <Clock size={14} /> Set Reserved
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
