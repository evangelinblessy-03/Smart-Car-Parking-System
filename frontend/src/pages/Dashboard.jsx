import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Ban,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ParkingGrid from '../components/ParkingGrid';
import { useParking } from '../context/ParkingContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    totalSlots,
    availableSlots,
    occupiedSlots,
    reservedSlots,
  } = useParking();

  return (
    <div className="page-container animate-fade-in">
      {/* Simulation Banner Notice */}
      <div className="research-notice">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="research-notice-badge">Simulated Data</span>
          <span style={{ fontSize: '0.85rem' }}>
            All statistics and slot maps below reflect baseline demonstration parameters. This dashboard dynamically updates when slots are modified or booked.
          </span>
        </div>
        <button
          onClick={() => navigate('/booking')}
          className="btn btn-sm btn-outline"
          style={{ backgroundColor: '#ffffff', fontSize: '0.75rem', fontWeight: 600 }}
        >
          Reserve a Slot &rarr;
        </button>
      </div>

      {/* Summary Stat Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <StatCard
          title="Total Parking Slots"
          value={totalSlots}
          subtext="Distributed over 4 Zones (A-D)"
          icon={Layers}
          variant="blue"
          onClick={() => navigate('/slots')}
        />
        <StatCard
          title="Available Slots"
          value={availableSlots}
          subtext={`${totalSlots > 0 ? Math.round((availableSlots / totalSlots) * 100) : 0}% of capacity free`}
          icon={CheckCircle2}
          variant="green"
          onClick={() => navigate('/slots')}
        />
        <StatCard
          title="Occupied Slots"
          value={occupiedSlots}
          subtext="Currently parked vehicles"
          icon={Ban}
          variant="red"
          onClick={() => navigate('/slots')}
        />
        <StatCard
          title="Reserved Slots"
          value={reservedSlots}
          subtext="Pre-booked allocations"
          icon={Clock}
          variant="orange"
          onClick={() => navigate('/my-bookings')}
        />
      </div>

      {/* Visual Parking Slot Overview */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
              Visual Parking Bay Overview
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              Interactive slot map (Click any slot to inspect or change demo state)
            </p>
          </div>
          <button
            onClick={() => navigate('/slots')}
            className="btn btn-sm btn-outline"
            style={{ fontSize: '0.75rem', gap: '0.25rem' }}
          >
            <span>Full View</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Color Legend */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: '6px',
          fontSize: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>Available ({availableSlots})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <span>Occupied ({occupiedSlots})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <span>Reserved ({reservedSlots})</span>
          </div>
        </div>

        {/* Compact Mini-Grid */}
        <div style={{ flex: 1, minHeight: '340px' }}>
          <ParkingGrid isCompact={true} />
        </div>
      </div>
    </div>
  );
}
