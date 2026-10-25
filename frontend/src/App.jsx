import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ParkingSlots from './pages/ParkingSlots';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import { SimpleLoginModal, SimpleRegisterModal } from './components/AuthModals';
import { ParkingProvider } from './context/ParkingContext';
import './App.css';

function MainAppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // When the browser reloads or opens afresh, always open the main landing page ('/')
  useEffect(() => {
    if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search + '#/');
      } catch (e) {
        window.location.hash = '#/';
      }
    }
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }

    const handleBeforeUnload = () => {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search + '#/');
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  }, []);

  // If user is on root landing page, show immersive full-width Home page
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {isLandingPage ? (
        <main style={{ minHeight: '100vh', width: '100%' }}>
          <Home
            onOpenLogin={() => {
              setIsDemoMode(false);
              setLoginModalOpen(true);
            }}
            onOpenRegister={() => {
              setRegisterModalOpen(true);
            }}
            onBookDemo={() => {
              setIsDemoMode(true);
              setLoginModalOpen(true);
            }}
          />
        </main>
      ) : (
        <div className="app-layout">
          {/* Dark Navy-Blue Navigation Sidebar */}
          <Sidebar
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />

          {/* Main Workspace Area */}
          <div className="main-content-area">
            {/* Top Header */}
            <Header
              onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
            />

            {/* Dynamic Page Router */}
            <main style={{ flex: 1, minHeight: 'calc(100vh - 65px)' }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/slots" element={<ParkingSlots />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<MyBookings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}

      {/* Global Simple Login Dialog */}
      <SimpleLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        isDemoMode={isDemoMode}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />

      {/* Global Simple Register Dialog */}
      <SimpleRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ParkingProvider>
      <HashRouter>
        <MainAppShell />
      </HashRouter>
    </ParkingProvider>
  );
}
