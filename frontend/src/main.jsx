import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Guarantee that reloading always opens the main landing page ('/')
if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
  try {
    history.replaceState(null, '', window.location.pathname + window.location.search + '#/');
  } catch (e) {
    window.location.hash = '#/';
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
