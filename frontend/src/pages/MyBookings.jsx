import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookmarkCheck,
  CalendarCheck2,
  Clock,
  Car,
  MapPin,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Eye,
  Trash2,
  AlertCircle,
  User,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard,
  QrCode,
  Edit3,
  Save,
  X,
  Sparkles,
  Download
} from 'lucide-react';
import Modal from '../components/Modal';
import { useParking } from '../context/ParkingContext';

export default function MyBookings() {
  const navigate = useNavigate();
  const { bookings, cancelBooking, currentUser } = useParking();

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [qrPassBooking, setQrPassBooking] = useState(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    return {
      name: currentUser?.name || 'Operations Manager',
      email: currentUser?.email || 'admin@smartparking.in',
      phone: '+91 98450 12345',
      vehicleReg: currentUser?.vehicleReg || 'KA-01-MJ-4021',
      vehicleModel: 'Audi A4 (Sedan)',
      memberSince: 'March 2024',
      membershipTier: 'Gold Priority'
    };
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    localStorage.setItem('smart_parking_user_profile', JSON.stringify(profileData));
  };

  const displayName = currentUser?.name || profileData.name;
  const displayEmail = currentUser?.email || profileData.email;
  const displayVehicle = currentUser?.vehicleReg || profileData.vehicleReg;

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleCancel = (bookingId) => {
    if (window.confirm(`Are you sure you want to cancel booking ${bookingId}? The parking bay will immediately be freed back to Available.`)) {
      cancelBooking(bookingId);
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking(prev => ({ ...prev, status: 'Cancelled' }));
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-available"><CheckCircle2 size={12} /> Active</span>;
      case 'Upcoming':
        return <span className="badge badge-reserved"><Clock size={12} /> Upcoming</span>;
      case 'Completed':
        return <span className="badge badge-demo">Completed</span>;
      case 'Cancelled':
        return <span className="badge badge-occupied"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  // Compute profile summary statistics
  const totalBookingsCount = bookings.length;
  const activeBookingsCount = bookings.filter(b => b.status === 'Active').length;
  const upcomingBookingsCount = bookings.filter(b => b.status === 'Upcoming').length;
  const totalSpentINR = bookings.reduce((sum, b) => {
    const cost = parseFloat(b.totalCost?.replace(/[^0-9.]/g, '') || 0);
    return sum + (isNaN(cost) ? 0 : cost);
  }, 0);

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* =========================================================================
          1. USER PROFILE SECTION
          ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
      }}>
        {/* Profile Header Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #f1f5f9'
        }}>
          {/* Avatar and Primary Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
            }}>
              {(displayName || 'U').charAt(0)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  {displayName}
                </h2>
                <span style={{
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  border: '1px solid #a7f3d0'
                }}>
                  <ShieldCheck size={13} />
                  <span>Verified Member</span>
                </span>
                <span style={{
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  border: '1px solid #fde68a'
                }}>
                  <Sparkles size={13} />
                  <span>{profileData.membershipTier}</span>
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                Member ID: <strong style={{ color: '#0f172a' }}>SP-2026-8841</strong> • Registered: {profileData.memberSince}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
            >
              {isEditingProfile ? <X size={14} /> : <Edit3 size={14} />}
              <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <PlusCircle size={15} />
              <span>Book a Slot</span>
            </button>
          </div>
        </div>

        {/* Inline Profile Edit Form (shown when isEditingProfile is true) */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
              Update Profile Information
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(p => ({ ...p, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(p => ({ ...p, email: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(p => ({ ...p, phone: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>
                  Primary Vehicle Plate
                </label>
                <input
                  type="text"
                  value={profileData.vehicleReg}
                  onChange={(e) => setProfileData(p => ({ ...p, vehicleReg: e.target.value.toUpperCase() }))}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* Profile Contact & Vehicle Meta Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.25rem 0',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={17} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Email</span>
              <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{displayEmail}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={17} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Phone</span>
              <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{profileData.phone}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={17} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Primary Vehicle</span>
              <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{displayVehicle}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={17} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Default Payment</span>
              <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Pay at Exit / QR (₹ INR)</strong>
            </div>
          </div>
        </div>

        {/* 4 Profile Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          paddingTop: '1.25rem'
        }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Bookings</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
              {totalBookingsCount}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 600 }}>Lifetime reservations</span>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Sessions</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>
              {activeBookingsCount}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>Currently parked</span>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Upcoming Slots</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>
              {upcomingBookingsCount}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 600 }}>Scheduled arrivals</span>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Spent (INR)</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
              ₹{totalSpentINR}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Estimated fees in Rupees</span>
          </div>
        </div>
      </div>


      {/* =========================================================================
          2. MY BOOKING DETAILS SECTION
          ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        padding: '1.75rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Header & Filter Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              My Parking Reservation Details
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Track active sessions, digital access passes, and parking bay assignments
            </p>
          </div>

          {/* Filter Status Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['all', 'Active', 'Upcoming', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className="btn btn-sm"
                style={{
                  backgroundColor: statusFilter === status ? '#2563eb' : '#f8fafc',
                  color: statusFilter === status ? '#ffffff' : '#475569',
                  border: statusFilter === status ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  fontWeight: statusFilter === status ? 700 : 500,
                  fontSize: '0.78rem',
                  padding: '0.35rem 0.8rem',
                  cursor: 'pointer'
                }}
              >
                {status === 'all' ? `All (${bookings.length})` : `${status} (${bookings.filter(b => b.status === status).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table or Empty State */}
        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 2rem', color: 'var(--text-muted)' }}>
            <BookmarkCheck size={44} style={{ margin: '0 auto 0.75rem auto', color: '#94a3b8' }} />
            <h4 style={{ color: '#0f172a', marginBottom: '0.35rem' }}>No Reservations Found</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem', color: '#64748b' }}>
              There are no {statusFilter !== 'all' ? statusFilter.toLowerCase() : ''} bookings under your profile.
            </p>
            <button
              onClick={() => navigate('/booking')}
              className="btn btn-primary btn-sm"
            >
              Book a Parking Spot &rarr;
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: '#334155' }}>Booking ID</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#334155' }}>Vehicle Plate</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#334155' }}>Assigned Bay</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#334155' }}>Time & Duration</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#334155' }}>Fee in Rupees</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#334155' }}>Status</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, textAlign: 'right', color: '#334155' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#0f172a' }}>
                      {b.id}
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{b.vehicleReg}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{b.driverName}</div>
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        fontWeight: 800,
                        border: '1px solid #bfdbfe'
                      }}>
                        Slot {b.slotId}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>{b.zone}</div>
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.arrivalTime} &rarr; {b.departureTime}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>({b.durationHours} hrs)</div>
                    </td>
                    <td style={{ padding: '1rem 1rem', fontWeight: 800, color: '#059669', fontSize: '0.95rem' }}>
                      {b.totalCost}
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      {getStatusBadge(b.status)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        {/* Digital QR Pass Button */}
                        <button
                          onClick={() => setQrPassBooking(b)}
                          className="btn btn-sm"
                          style={{
                            padding: '0.35rem 0.65rem',
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            border: '1px solid #bfdbfe',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                          title="View Digital Pass & QR Code"
                        >
                          <QrCode size={13} />
                          <span>QR Pass</span>
                        </button>

                        {/* View Details Modal Button */}
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.6rem' }}
                          title="View Full Booking Details"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Cancel Button */}
                        {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                          <button
                            onClick={() => handleCancel(b.id)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '0.35rem 0.6rem' }}
                            title="Cancel Reservation"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================================================================
          3. DIGITAL QR GATE PASS MODAL
          ========================================================================= */}
      {qrPassBooking && (
        <Modal
          isOpen={!!qrPassBooking}
          onClose={() => setQrPassBooking(null)}
          title="Digital Parking Access Pass"
          subtitle={`Pass #${qrPassBooking.id} • Vehicle ${qrPassBooking.vehicleReg}`}
        >
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            {/* Visual Pass Card */}
            <div style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '1.75rem',
              maxWidth: '360px',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  SmartPark Barrier Entry Pass
                </span>
                <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: '#10b981', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800 }}>
                  VALID
                </span>
              </div>

              {/* QR Code Container */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '1.25rem',
                borderRadius: '12px',
                display: 'inline-block',
                margin: '0 auto 1.25rem auto'
              }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=SMARTPARK:${qrPassBooking.id}:${qrPassBooking.vehicleReg}:${qrPassBooking.slotId}`}
                  alt="Parking Entry QR Pass"
                  style={{ width: '160px', height: '160px', display: 'block' }}
                  onError={(e) => {
                    // Fallback visual QR graphic
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div style="width:160px;height:160px;background:#0f172a;color:#ffffff;display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:12px;font-weight:700;">QR PASS: ' + qrPassBooking.id + '</div>';
                  }}
                />
              </div>

              <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em', color: '#38bdf8', marginBottom: '0.25rem' }}>
                {qrPassBooking.vehicleReg}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Assigned: <strong style={{ color: '#ffffff' }}>Slot {qrPassBooking.slotId}</strong> ({qrPassBooking.zone})
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem', borderTop: '1px dashed #334155', paddingTop: '0.5rem' }}>
                Scheduled: {qrPassBooking.arrivalTime} &rarr; {qrPassBooking.departureTime}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 800, marginTop: '0.35rem' }}>
                Fee: {qrPassBooking.totalCost}
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '380px', margin: '0 auto 1.25rem auto', lineHeight: 1.5 }}>
              Scan this QR code at the automated entrance barrier scanner or show it to on-site parking personnel for instant boom gate opening.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Download size={14} />
                <span>Print / Save Pass</span>
              </button>
              <button
                type="button"
                onClick={() => setQrPassBooking(null)}
                className="btn btn-primary btn-sm"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =========================================================================
          4. DETAILED BOOKING METRICS MODAL
          ========================================================================= */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking Details: ${selectedBooking.id}`}
          subtitle={`Vehicle ${selectedBooking.vehicleReg} • Slot ${selectedBooking.slotId}`}
        >
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: '8px',
              marginBottom: '1.25rem'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reservation Status:</span>
                <div style={{ marginTop: '0.2rem' }}>{getStatusBadge(selectedBooking.status)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Created:</span>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{selectedBooking.createdAt}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Vehicle Plate:</span>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{selectedBooking.vehicleReg}</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Driver / User:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedBooking.driverName}</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Allocated Slot:</span>
                <div style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Slot {selectedBooking.slotId} ({selectedBooking.zone})</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Scheduled Duration:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedBooking.arrivalTime} &rarr; {selectedBooking.departureTime}</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Managing Node:</span>
                <div style={{ fontWeight: 600, color: 'var(--accent-violet)', fontSize: '0.78rem' }}>{selectedBooking.fogNodeAssigned}</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Total Fee (Rupees):</span>
                <div style={{ fontWeight: 700, color: '#059669', fontSize: '1.05rem' }}>{selectedBooking.totalCost}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => {
                  const b = selectedBooking;
                  setSelectedBooking(null);
                  setQrPassBooking(b);
                }}
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <QrCode size={14} />
                <span>View QR Pass</span>
              </button>
              {selectedBooking.status !== 'Cancelled' && selectedBooking.status !== 'Completed' && (
                <button
                  type="button"
                  onClick={() => handleCancel(selectedBooking.id)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={14} /> Cancel Booking
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="btn btn-outline btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
