# Smart Car Parking System Using Grey Wolf Optimization (GWO) in Fog Computing

A modern, responsive React frontend application built for the research project:
**“Optimized Smart Car Parking Application in Fog Computing Using Grey Wolf Optimization (GWO)”**

---

## 🚀 Quick Start Instructions (VS Code)

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24.x tested)
- **npm**: v9.x or higher

### Option A: Running from Project Root (`d:\New\iFogSim1-master\iFogSim1-master`)
Open the terminal in VS Code and run:
```bash
npm run dev
```
*(This automatically delegates to the `frontend` subfolder).*

### Option B: Running from `frontend` Directory
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** (or `http://127.0.0.1:5173/`) in your browser.

---

## 📁 Project Structure

```
frontend/
├── index.html                   # HTML5 shell with Google Fonts (Inter & Outfit)
├── package.json                 # Project configuration & scripts
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── main.jsx                 # React root DOM mount point
    ├── App.jsx                  # Main router & responsive layout
    ├── App.css                  # Responsive sidebar & animation styles
    ├── index.css                # Global design system & theme tokens
    ├── context/
    │   └── ParkingContext.jsx   # Global reactive state (slots, bookings, activities, GWO sim)
    ├── data/
    │   └── sampleParkingData.js # Baseline demonstration dataset & GWO wolf parameters
    ├── components/
    │   ├── Sidebar.jsx          # Dark navy-blue responsive navigation sidebar
    │   ├── Header.jsx           # Top header with real-time slot counter pills & actions
    │   ├── StatCard.jsx         # Metric card with color accents & iconography
    │   ├── ParkingSlot.jsx      # Interactive parking bay tile (color-coded)
    │   ├── ParkingGrid.jsx      # Multi-zone grid with status filters, search, & modal
    │   └── Modal.jsx            # Reusable accessible dialog modal
    └── pages/
        ├── Home.jsx             # Research hero section, workflow pipeline & benefits
        ├── Dashboard.jsx        # Summary cards, Recharts occupancy area graph, mini-map
        ├── ParkingSlots.jsx     # Slot management with interactive demo status changes
        ├── GWOOptimization.jsx  # Research page: convergence curve, comparisons, wolf hierarchy
        ├── Booking.jsx          # Vehicle reservation form & live cost summary
        ├── MyBookings.jsx       # Active & historical bookings table with slot cancellation
        ├── About.jsx            # Research context, problem formulation & fog architecture
        ├── Login.jsx            # Authentication form with client-side validation
        └── Register.jsx         # Researcher demo registration
```

---

## 🎨 Theme & Color Specifications

- **Sidebar Background**: Dark Navy-Blue (`#0f172a` / `#1e293b`)
- **Dashboard Background**: Clean Off-White & Light-Grey (`#f8fafc`)
- **Primary Accent**: Electric Blue (`#2563eb`) & Violet (`#7c3aed`)
- **Available Slots**: Emerald Green (`#10b981`)
- **Occupied Slots**: Crimson Red (`#ef4444`)
- **Reserved Slots**: Amber Orange (`#f59e0b`)

---

## 🔬 Research Accuracy & Integrating Genuine Java/iFogSim Results

1. **Simulated Baseline Data**:
   All initial slot states, convergence curves, and execution latencies are clearly labeled as demonstration data to demonstrate UI behavior without modifying or requiring live execution of the Java simulation.
2. **State Synchronization**:
   When you book a slot or change a slot's status in **Parking Slots**, the status change propagates immediately across the entire dashboard, header pills, and occupancy metrics.
3. **Importing Genuine iFogSim Outputs**:
   - Navigate to the **GWO Optimization** page (`/gwo`).
   - Click the **"Import Java Results"** button in the top banner.
   - Paste the JSON output generated from your `GWOSmartParking.java` simulation run.
   - The convergence curves, fitness ratings, and vehicle allocation table will automatically render your authentic experimental findings.
