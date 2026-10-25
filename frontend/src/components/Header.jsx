import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  RotateCcw,
  PlusCircle,
  Radio,
  Server,
  User,
  CheckCircle2,
  Clock,
  Ban
} from 'lucide-react';
import { useParking } from '../context/ParkingContext';

export default function Header({ onToggleMobileMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { availableSlots, occupiedSlots, reservedSlots, totalSlots, resetAllData, currentUser, isBackendConnected } = useParking();

  // Page title mapping
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/': return 'Smart Parking Overview';
      case '/dashboard': return 'Smart Parking Dashboard';
      case '/slots': return 'Parking Slot Management';
      case '/booking': return 'Smart Parking Slot Reservation';
      case '/my-bookings': return 'Active & Historic Bookings';
      case '/profile': return 'My Profile & Booking Details';
      case '/login': return 'Account Authentication';
      case '/register': return 'User Registration';
      default: return 'Smart Parking System';
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo parking slots, bookings, and simulation data to defaults?')) {
      resetAllData();
    }
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-light)',
      padding: '0.85rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
    }}>
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleMobileMenu}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '6px',
            display: 'none', // Controlled via CSS media query
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Open mobile menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, lineHeight: 1.2 }}>
            {getPageTitle(location.pathname)}
          </h1>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>Smart Car Parking System</span>
            <span>•</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isBackendConnected ? '#059669' : '#d97706',
              fontWeight: 600,
              padding: '0.1rem 0.55rem',
              borderRadius: '9999px',
              backgroundColor: isBackendConnected ? '#ecfdf5' : '#fef3c7',
              border: `1px solid ${isBackendConnected ? '#a7f3d0' : '#fde68a'}`,
              fontSize: '0.7rem'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isBackendConnected ? '#10b981' : '#f59e0b',
                display: 'inline-block'
              }} />
              {isBackendConnected ? 'Backend Connected (Port 5000)' : 'Backend Reconnecting...'}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-primary)', fontWeight: 500 }}>
              <Server size={12} /> 3 Fog Nodes Online
            </span>
          </div>
        </div>
      </div>

      {/* Right: Quick Stats & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Dynamic Status Counter Pills */}
        <div className="header-status-pills" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-available" title="Available Slots for Parking">
            <CheckCircle2 size={12} /> {availableSlots} Free
          </span>
          <span className="badge badge-occupied" title="Currently Occupied Slots">
            <Ban size={12} /> {occupiedSlots} Occupied
          </span>
          <span className="badge badge-reserved" title="Reserved Parking Slots">
            <Clock size={12} /> {reservedSlots} Reserved
          </span>
        </div>

        {/* Reset State Helper Button */}
        <button
          onClick={handleReset}
          className="btn btn-outline btn-sm"
          title="Reset simulated parking status and bookings to default sample data"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}
        >
          <RotateCcw size={14} />
          <span className="header-reset-label">Reset Demo</span>
        </button>

        {/* Book Slot CTA */}
        {location.pathname !== '/booking' && (
          <button
            onClick={() => navigate('/booking')}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <PlusCircle size={15} />
            <span>Book Slot</span>
          </button>
        )}

        {/* User Avatar / Profile */}
        <Link
          to={currentUser ? "/profile" : "/login"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            padding: '0.35rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
          }}
          title={currentUser ? `Logged in as ${currentUser.name}` : "Click to Login"}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            {currentUser ? currentUser.name.charAt(0) : <User size={14} />}
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }} className="header-user-name">
            {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
          </span>
        </Link>
      </div>
    </header>
  );
}
