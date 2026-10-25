import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Grid3X3,
  CalendarCheck2,
  LogIn,
  LogOut,
  ShieldCheck,
  X,
  Car
} from 'lucide-react';
import { useParking } from '../context/ParkingContext';

export default function Sidebar({ isOpen, onClose }) {
  const { currentUser, logoutUser, occupancyRate, availableSlots } = useParking();

  const navItems = [
    { to: '/profile', label: 'Home', icon: Home },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/slots', label: 'Parking Slots', icon: Grid3X3 },
    { to: '/booking', label: 'Book a Slot', icon: CalendarCheck2 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            zIndex: 40,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Sidebar container */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-sidebar)',
          color: 'var(--text-on-dark)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'transform var(--transition-normal)',
          borderRight: '1px solid #1e293b',
          flexShrink: 0,
        }}
        className={`sidebar-nav ${isOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div style={{
          padding: '1.5rem 1.25rem 1.25rem 1.25rem',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
            }}>
              <Car size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                SmartPark <span style={{ color: '#38bdf8', fontWeight: 600 }}>System</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                Smart Parking Management
              </div>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'none',
                padding: '4px'
              }}
              className="mobile-close-btn"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Live Simulation Status Banner */}
        <div style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(30, 41, 59, 0.6)',
          borderBottom: '1px solid #1e293b',
          fontSize: '0.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#94a3b8' }}>
            <span>Live Availability</span>
            <span style={{ color: '#10b981', fontWeight: 700 }}>{availableSlots} Free</span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${occupancyRate}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 60%, #ef4444 100%)',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem', fontSize: '0.68rem', color: '#64748b' }}>
            <span>Occupancy</span>
            <span>{occupancyRate}%</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em', padding: '0 0.5rem 0.5rem 0.5rem' }}>
            Navigation
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => onClose && onClose()}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : '#94a3b8',
                      backgroundColor: isActive ? 'var(--bg-sidebar-active)' : 'transparent',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                    })}
                    className="nav-link-item"
                  >
                    <Icon size={18} strokeWidth={1.9} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        backgroundColor: 'rgba(99, 102, 241, 0.25)',
                        color: '#a5b4fc',
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(99, 102, 241, 0.4)'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em', padding: '1.25rem 0.5rem 0.5rem 0.5rem' }}>
            Authentication
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {currentUser ? (
              <li>
                <button
                  onClick={() => logoutUser()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#f87171',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="nav-link-item"
                >
                  <LogOut size={18} />
                  <span>Logout (Demo)</span>
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => onClose && onClose()}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#ffffff' : '#94a3b8',
                    backgroundColor: isActive ? 'var(--bg-sidebar-active)' : 'transparent',
                  })}
                  className="nav-link-item"
                >
                  <LogIn size={18} />
                  <span>Login / Register</span>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* User / Research Profile Bottom Card */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #1e293b',
          backgroundColor: '#0b1120'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1e3a8a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#93c5fd',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              {currentUser ? currentUser.name.charAt(0) : 'G'}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser ? currentUser.name : 'Guest Visitor'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={12} color="#38bdf8" />
                <span>{currentUser ? currentUser.role : 'Simulated Session'}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
