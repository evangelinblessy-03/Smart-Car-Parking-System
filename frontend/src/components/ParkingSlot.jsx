import React from 'react';
import { Car, Zap, Accessibility, Clock, CheckCircle2, Ban } from 'lucide-react';

export default function ParkingSlot({ slot, onSelect, isCompact = false }) {
  const { id, status, type, distanceMeters, vehicle, section, ratePerHour } = slot;

  // Status-dependent styling
  const getStatusStyles = () => {
    switch (status) {
      case 'available':
        return {
          bg: '#ecfdf5',
          border: '#10b981',
          text: '#065f46',
          badgeBg: '#10b981',
          badgeText: '#ffffff',
          label: 'Available',
          icon: CheckCircle2,
        };
      case 'occupied':
        return {
          bg: '#fef2f2',
          border: '#ef4444',
          text: '#991b1b',
          badgeBg: '#ef4444',
          badgeText: '#ffffff',
          label: 'Occupied',
          icon: Ban,
        };
      case 'reserved':
        return {
          bg: '#fffbeb',
          border: '#f59e0b',
          text: '#92400e',
          badgeBg: '#f59e0b',
          badgeText: '#ffffff',
          label: 'Reserved',
          icon: Clock,
        };
      default:
        return {
          bg: '#f8fafc',
          border: '#cbd5e1',
          text: '#334155',
          badgeBg: '#64748b',
          badgeText: '#ffffff',
          label: 'Unknown',
          icon: Car,
        };
    }
  };

  const currentStyle = getStatusStyles();
  const StatusIcon = currentStyle.icon;

  if (isCompact) {
    // Compact tile for Dashboard visual map
    return (
      <div
        onClick={() => onSelect && onSelect(slot)}
        style={{
          backgroundColor: currentStyle.bg,
          border: `2px solid ${currentStyle.border}`,
          borderRadius: '8px',
          padding: '0.65rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.15s ease',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
        }}
        title={`Slot ${id} • ${currentStyle.label} • ${type} (${distanceMeters}m)`}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: currentStyle.text, marginBottom: '0.2rem' }}>
          {id}
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: currentStyle.badgeBg,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {type === 'EV Charging' ? <Zap size={13} /> : <Car size={13} />}
        </div>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: currentStyle.text, marginTop: '0.2rem' }}>
          {currentStyle.label}
        </span>
      </div>
    );
  }

  // Standard full card for Parking Slot Management Grid
  return (
    <div
      onClick={() => onSelect && onSelect(slot)}
      style={{
        backgroundColor: currentStyle.bg,
        border: `2px solid ${currentStyle.border}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.1rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 20px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            fontFamily: 'var(--font-heading)'
          }}>
            {id}
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-light)'
          }}>
            Zone {section}
          </span>
        </div>

        <span style={{
          backgroundColor: currentStyle.badgeBg,
          color: currentStyle.badgeText,
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          textTransform: 'uppercase',
          letterSpacing: '0.03em'
        }}>
          <StatusIcon size={11} strokeWidth={2.5} />
          {currentStyle.label}
        </span>
      </div>

      {/* Middle Attributes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: currentStyle.text, fontWeight: 600 }}>
          {type === 'EV Charging' && <><Zap size={14} color="#0891b2" /> <span>EV Fast Charger</span></>}
          {type === 'Accessible / VIP' && <><Accessibility size={14} color="#7c3aed" /> <span>Accessible / VIP</span></>}
          {type === 'Standard' && <><Car size={14} color="#64748b" /> <span>Standard Vehicle</span></>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Gate Distance:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{distanceMeters} meters</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Parking Rate:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{ratePerHour}/hr</span>
        </div>

        {vehicle ? (
          <div style={{
            marginTop: '0.4rem',
            padding: '0.4rem 0.6rem',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            border: '1px solid var(--border-light)',
            fontSize: '0.72rem'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{vehicle.regNumber}</div>
            <div style={{ color: 'var(--text-muted)' }}>{vehicle.model} • {vehicle.entryTime}</div>
          </div>
        ) : (
          <div style={{
            marginTop: '0.4rem',
            padding: '0.4rem 0.6rem',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontStyle: 'italic',
            color: '#059669'
          }}>
            Ready for Allocation
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div style={{
        borderTop: '1px solid rgba(0,0,0,0.06)',
        paddingTop: '0.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>{slot.floor}</span>
        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Click for Details &rarr;</span>
      </div>
    </div>
  );
}
