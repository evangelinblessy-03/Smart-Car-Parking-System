import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid3X3,
  CalendarCheck2,
  Info,
  Layers,
  Sparkles,
  CheckCircle2,
  Ban,
  Clock,
  Zap,
  Accessibility
} from 'lucide-react';
import ParkingGrid from '../components/ParkingGrid';
import { useParking } from '../context/ParkingContext';

export default function ParkingSlots() {
  const navigate = useNavigate();
  const { totalSlots, availableSlots, occupiedSlots, reservedSlots } = useParking();

  return (
    <div className="page-container animate-fade-in">
      {/* Research and Demonstration Notice */}
      <div className="research-notice">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="research-notice-badge">Live API Connected</span>
          <span style={{ fontSize: '0.85rem' }}>
            Connected to Live Backend REST API (Port 5000). Click on any parking bay below to view slot telemetry or update status in real-time.
          </span>
        </div>
        <button
          onClick={() => navigate('/booking')}
          className="btn btn-primary btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          Book Available Slot &rarr;
        </button>
      </div>

      {/* Page Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
            Parking Slot Management & Telemetry
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
            Multi-zone parking bay layout mapped to distributed Fog Computing broker nodes
          </p>
        </div>

        {/* Live Status Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{availableSlots}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Available</div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-light)' }} />
          <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>{occupiedSlots}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Occupied</div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-light)' }} />
          <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>{reservedSlots}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Reserved</div>
          </div>
        </div>
      </div>

      {/* Zone Overview Information Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{ padding: '0.85rem 1rem', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1d4ed8' }}>Zone A (Ground Floor)</div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem' }}>
            Near Entrance Gate • High Priority EV Chargers
          </div>
        </div>
        <div style={{ padding: '0.85rem 1rem', borderRadius: '8px', backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe' }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#6d28d9' }}>Zone B (Ground Floor)</div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem' }}>
            Central Courtyard • Standard Capacity
          </div>
        </div>
        <div style={{ padding: '0.85rem 1rem', borderRadius: '8px', backgroundColor: '#f0fdfa', border: '1px solid #99f6e4' }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f766e' }}>Zone C (Level 1 North)</div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem' }}>
            Ramp Access • EV & Standard Bays
          </div>
        </div>
        <div style={{ padding: '0.85rem 1rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#334155' }}>Zone D (Level 1 South)</div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem' }}>
            Long Stay & Executive Reserved
          </div>
        </div>
      </div>

      {/* Main Parking Grid with Filters, Search, and Status Modals */}
      <ParkingGrid />
    </div>
  );
}
