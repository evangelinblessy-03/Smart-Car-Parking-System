import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  MapPin,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Calendar,
  LogIn,
  UserPlus,
  ArrowRight,
  Star,
  QrCode,
  ChevronDown,
  Sparkles,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { useParking } from '../context/ParkingContext';

export default function Home({ onOpenLogin, onOpenRegister, onBookDemo }) {
  const { totalSlots, availableSlots, occupiedSlots, occupancyRate } = useParking();

  // Rate visibility state: tariffs are NOT shown directly, but revealed on user click
  const [revealedRates, setRevealedRates] = useState({});
  const toggleRate = (zoneKey) => {
    setRevealedRates(prev => ({
      ...prev,
      [zoneKey]: !prev[zoneKey]
    }));
  };
  const toggleAllRates = () => {
    const allRevealed = parkingZones.every(z => revealedRates[z.zone]);
    const nextState = {};
    parkingZones.forEach(z => {
      nextState[z.zone] = !allRevealed;
    });
    setRevealedRates(nextState);
  };

  // 3-step easy customer parking workflow
  const steps = [
    {
      step: '1',
      title: 'Find & Select Your Space',
      desc: 'Browse real-time open parking bays across multiple levels (Standard, Compact, EV Charging, or VIP).',
      icon: MapPin,
      color: '#2563eb'
    },
    {
      step: '2',
      title: 'Instant Online Reservation',
      desc: 'Lock in your parking spot in under 30 seconds with your vehicle number and arrival time.',
      icon: Calendar,
      color: '#7c3aed'
    },
    {
      step: '3',
      title: 'Drive In & Park Stress-Free',
      desc: 'Scan your digital QR pass at the boom barrier and follow easy indoor signs directly to your reserved bay.',
      icon: QrCode,
      color: '#10b981'
    }
  ];

  // Parking Zones & Pricing (in Rupees)
  const parkingZones = [
    {
      zone: 'Zone A',
      title: 'Standard Parking',
      floor: 'Ground Floor (Level 0)',
      rateINR: 150,
      features: ['Near main exit & elevators', 'Spacious standard bays', 'Automated barrier access'],
      color: '#2563eb',
      badge: 'Most Popular'
    },
    {
      zone: 'Zone B',
      title: 'Compact & Hatchback',
      floor: 'Level 1',
      rateINR: 100,
      features: ['Ideal for city cars & sedans', 'Fast entry & exit ramps', 'Budget-friendly hourly tariff'],
      color: '#0891b2',
      badge: 'Best Value'
    },
    {
      zone: 'Zone C',
      title: 'EV Fast Charging',
      floor: 'Level 1',
      rateINR: 250,
      features: ['50kW fast charging stations', 'Dedicated EV bays', 'Charge status monitoring'],
      color: '#10b981',
      badge: 'Electric Vehicles'
    },
    {
      zone: 'Zone D',
      title: 'Covered / VIP Spaces',
      floor: 'Level 2',
      rateINR: 200,
      features: ['Extra-wide parking bays', '24/7 CCTV surveillance', 'Weather-protected roofing'],
      color: '#f59e0b',
      badge: 'Premium & Accessible'
    }
  ];

  // Driver benefits
  const customerBenefits = [
    {
      icon: CheckCircle2,
      title: '100% Guaranteed Spot',
      desc: 'Never circle the block searching for a vacancy. Your spot is reserved and waiting exclusively for you.',
      color: '#2563eb'
    },
    {
      icon: QrCode,
      title: 'Contactless Digital Pass',
      desc: 'Automated barrier gate opens instantly using license plate recognition or a quick phone QR scan.',
      color: '#7c3aed'
    },
    {
      icon: Zap,
      title: 'EV Fast Charging Ready',
      desc: 'Plug your vehicle into dedicated charging bays while you work, shop, or dine.',
      color: '#10b981'
    },
    {
      icon: ShieldCheck,
      title: '24/7 Monitored & Secure',
      desc: 'Full HD security cameras, bright LED illumination, and on-site support personnel around the clock.',
      color: '#f59e0b'
    }
  ];

  // Customer Reviews
  const reviews = [
    {
      name: 'Michael Chang',
      role: 'Daily Downtown Commuter',
      rating: 5,
      comment: 'Booking my parking in advance saves me 15 minutes of frantic searching every single morning. The QR entry at the gate is instant!'
    },
    {
      name: 'Sarah Jenkins',
      role: 'EV Tesla Model 3 Owner',
      rating: 5,
      comment: 'Finding open EV chargers in commercial areas used to be a nightmare. With Smart Car Parking System, my charger is guaranteed before I even arrive.'
    },
    {
      name: 'David Sharma',
      role: 'Weekend Shopper',
      rating: 5,
      comment: 'Super simple booking process! Reserved a spot for 3 hours, drove right in, and the digital pass made checkout completely seamless.'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* =========================================================================
          1. TOP NAVIGATION BAR
          ========================================================================= */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 2.5rem',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}>
        {/* Brand Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
          }}>
            <Car size={22} strokeWidth={2.4} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.2 }}>
              Smart Car Parking System
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              Online Parking Area Booking & Reservation
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="desktop-landing-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <button 
            onClick={() => scrollToSection('availability')}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Parking Areas & Rates
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            How to Park
          </button>
          <button 
            onClick={() => scrollToSection('benefits')}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Why Choose Us
          </button>
          <button 
            onClick={() => scrollToSection('reviews')}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Driver Reviews
          </button>
        </nav>

        {/* Action Buttons: Book a Demo, Login, Register */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Book a Demo / Book a Spot */}
          <button
            onClick={onBookDemo}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
            }}
          >
            <Calendar size={15} />
            <span>Book a Demo</span>
          </button>

          {/* Login */}
          <button
            onClick={onOpenLogin}
            style={{
              padding: '0.55rem 1.05rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontWeight: 600,
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
            }}
          >
            <LogIn size={15} />
            <span>Log In</span>
          </button>

          {/* Register */}
          <button
            onClick={onOpenRegister}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
            }}
          >
            <UserPlus size={15} />
            <span>Register</span>
          </button>
        </div>
      </header>


      {/* =========================================================================
          2. HERO SECTION WITH BACKGROUND VIDEO
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden',
        padding: '6.5rem 1.5rem 2.5rem 1.5rem',
        boxSizing: 'border-box'
      }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            filter: 'brightness(0.62) contrast(1.12)'
          }}
        >
          <source src="./videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="https://samplelib.com/preview/mp4/sample-10s.mp4" type="video/mp4" />
        </video>

        {/* Dark Vignette Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.92) 80%), linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.97) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* Hero Content Above Video */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', width: '100%', marginTop: '1.25rem' }}>
          
          {/* Top Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(37, 99, 235, 0.35)',
            border: '1px solid rgba(59, 130, 246, 0.55)',
            color: '#bfdbfe',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
          }}>
            <Sparkles size={16} color="#60a5fa" />
            <span>Fast, Guaranteed & Contactless Parking Reservations</span>
          </div>

          {/* Website Name Displayed Prominently Above Video */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: '0 0 0.85rem 0',
            color: '#ffffff',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.7)'
          }}>
            Smart Car Parking System
          </h1>

          {/* Customer Subtitle */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: '#e2e8f0',
            lineHeight: 1.55,
            maxWidth: '720px',
            margin: '0 auto 1.6rem auto',
            fontWeight: 400,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}>
            Find and book guaranteed parking spaces in real-time. Check live availability, reserve your bay in advance, and drive straight in with instant digital QR passes.
          </p>

          {/* Action Buttons: Book a Demo, Register, Login, Browse Slots */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            marginBottom: '2rem'
          }}>
            {/* Book a Demo Button */}
            <button
              onClick={onBookDemo}
              style={{
                padding: '0.95rem 2rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                cursor: 'pointer',
                boxShadow: '0 10px 25px -3px rgba(245, 158, 11, 0.45)',
              }}
            >
              <Calendar size={18} />
              <span>Book a Demo</span>
            </button>

            {/* Direct Book a Spot Button */}
            <Link
              to="/booking"
              style={{
                padding: '0.95rem 1.85rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                textDecoration: 'none',
                boxShadow: '0 10px 25px -3px rgba(37, 99, 235, 0.45)',
              }}
            >
              <Car size={18} />
              <span>Book a Spot Now</span>
            </Link>

            {/* Register Button */}
            <button
              onClick={onOpenRegister}
              style={{
                padding: '0.95rem 1.65rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              <UserPlus size={18} />
              <span>Register</span>
            </button>

            {/* Login Button */}
            <button
              onClick={onOpenLogin}
              style={{
                padding: '0.95rem 1.65rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              <LogIn size={18} />
              <span>Log In</span>
            </button>
          </div>

          {/* 4 Customer Highlights */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            padding: '1.15rem',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#38bdf8' }}>100%</div>
              <div style={{ fontSize: '0.725rem', color: '#cbd5e1', fontWeight: 600 }}>Guaranteed Bay</div>
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#34d399' }}>{availableSlots} Free</div>
              <div style={{ fontSize: '0.725rem', color: '#cbd5e1', fontWeight: 600 }}>Available Right Now</div>
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fbbf24' }}>24/7</div>
              <div style={{ fontSize: '0.725rem', color: '#cbd5e1', fontWeight: 600 }}>CCTV & Gate Access</div>
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#c084fc' }}>4.9 ★</div>
              <div style={{ fontSize: '0.725rem', color: '#cbd5e1', fontWeight: 600 }}>Driver Rating</div>
            </div>
          </div>

          {/* Scroll Down */}
          <div 
            onClick={() => scrollToSection('availability')}
            style={{
              marginTop: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#94a3b8',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            <span>View Parking Rates & Areas Below</span>
            <ChevronDown size={16} />
          </div>

        </div>
      </section>


      {/* =========================================================================
          3. REAL-TIME PARKING AREAS & HOURLY RATES (#availability)
          ========================================================================= */}
      <section id="availability" style={{
        padding: '5rem 2rem',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.65rem'
            }}>
              Live Parking Facility
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Choose Your Parking Area & Reserve
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '620px', margin: '0 auto' }}>
              We offer multiple parking zones tailored to your vehicle type, accessibility needs, and charging preferences.
            </p>
          </div>

          {/* Live Capacity Bar */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '1.5rem 2rem',
            marginBottom: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Facility Availability</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                <span style={{ color: '#10b981' }}>{availableSlots} Slots Free</span> / {totalSlots} Total Managed Bays
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '220px', maxWidth: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span style={{ color: '#10b981' }}>{availableSlots} Vacant</span>
                <span style={{ color: '#ef4444' }}>{occupiedSlots} Occupied ({occupancyRate}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${occupancyRate}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 60%, #ef4444 100%)' }} />
              </div>
            </div>

            <Link
              to="/slots"
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none'
              }}
            >
              <span>View Interactive Bay Grid</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Rate Controller Notice (Rates hidden by default) */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            padding: '1rem 1.5rem',
            marginBottom: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Eye size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>
                  Zone Hourly Tariffs
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Hourly rates are kept private by default. Click "View Rate" on any zone card to inspect its tariff in Rupees (₹).
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleAllRates}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                color: '#334155',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              {parkingZones.every(z => revealedRates[z.zone]) ? (
                <>
                  <EyeOff size={15} />
                  <span>Hide All Rates</span>
                </>
              ) : (
                <>
                  <Eye size={15} />
                  <span>Reveal All Rates</span>
                </>
              )}
            </button>
          </div>

          {/* 4 Parking Zone Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {parkingZones.map((z) => (
              <div
                key={z.zone}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: z.color,
                      backgroundColor: `${z.color}15`,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px'
                    }}>
                      {z.badge}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                      {z.zone}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>
                    {z.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                    {z.floor}
                  </div>

                  {/* Interactive Rate Display (Hidden by default, shown on click) */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    {revealedRates[z.zone] ? (
                      <div style={{
                        padding: '0.75rem 0.95rem',
                        borderRadius: '12px',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                            <span style={{
                              fontSize: '1.85rem',
                              fontWeight: 900,
                              color: '#0f172a',
                              lineHeight: 1
                            }}>
                              ₹{z.rateINR}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                              / hour
                            </span>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, marginTop: '0.2rem' }}>
                            ✓ Standard tariff in Rupees (₹)
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleRate(z.zone)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            color: '#64748b',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                          title="Hide Rate"
                        >
                          <EyeOff size={13} />
                          <span>Hide</span>
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        padding: '0.75rem 0.95rem',
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        border: '1px dashed #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block' }}>
                            Hourly Tariff
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                            Hidden • Click to view in ₹
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleRate(z.zone)}
                          style={{
                            padding: '0.45rem 0.9rem',
                            borderRadius: '8px',
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            border: '1px solid #bfdbfe',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Eye size={14} />
                          <span>View Rate</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {z.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#475569' }}>
                        <Check size={14} color="#10b981" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book this Zone Button */}
                <Link
                  to="/booking"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    backgroundColor: z.color,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: `0 4px 12px ${z.color}35`
                  }}
                >
                  <span>Reserve in {z.zone}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. HOW IT WORKS: 3 EASY STEPS (#how-it-works)
          ========================================================================= */}
      <section id="how-it-works" style={{
        padding: '5rem 2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: '#f3e8ff',
              color: '#7c3aed',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.65rem'
            }}>
              Effortless Experience
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              How to Park in 3 Simple Steps
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '580px', margin: '0 auto' }}>
              Booking your space takes less than 30 seconds. No apps required.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '2rem 1.75rem',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  {/* Step Number Circle */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: `${st.color}15`,
                    color: st.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    boxShadow: `0 4px 12px ${st.color}25`
                  }}>
                    <Icon size={26} />
                  </div>

                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: st.color, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Step 0{st.step}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.6rem 0' }}>
                    {st.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          5. DRIVER BENEFITS & ADVANTAGES (#benefits)
          ========================================================================= */}
      <section id="benefits" style={{
        padding: '5rem 2rem',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.65rem'
            }}>
              Customer Experience
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Why Drivers Love Smart Car Parking
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Designed from the ground up to eliminate parking frustration in busy commercial & city centers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {customerBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: `${b.color}15`,
                    color: b.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={22} />
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          6. DRIVER REVIEWS & TESTIMONIALS (#reviews)
          ========================================================================= */}
      <section id="reviews" style={{
        padding: '5rem 2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.65rem'
            }}>
              Customer Stories
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Trusted by Daily Drivers & Commuters
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b' }}>
              Over 2,500+ successful parking reservations this month alone.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {reviews.map((r) => (
              <div
                key={r.name}
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.85rem' }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    "{r.comment}"
                  </p>
                </div>

                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>{r.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.role}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>





      {/* =========================================================================
          8. CUSTOMER-FACING FOOTER
          ========================================================================= */}
      <footer style={{
        backgroundColor: '#0a0f1d',
        color: '#64748b',
        padding: '3rem 2rem 2rem 2rem',
        borderTop: '1px solid #1e293b',
        fontSize: '0.85rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid #1e293b'
          }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Car size={18} />
              </div>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '1rem', display: 'block' }}>Smart Car Parking System</strong>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Real-time Online Parking Reservations</span>
              </div>
            </div>

            {/* Customer Links */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/booking" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Book a Spot</Link>
              <Link to="/slots" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Live Bays</Link>
              <Link to="/my-bookings" style={{ color: '#cbd5e1', textDecoration: 'none' }}>My Bookings</Link>
              <Link to="/dashboard" style={{ color: '#38bdf8', textDecoration: 'none' }}>System Portal &rarr;</Link>
            </div>
          </div>

          <div style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            <div>
              &copy; {new Date().getFullYear()} Smart Car Parking System. All rights reserved.
            </div>
            <div>
              24/7 Support & Contactless Automated Entry
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
