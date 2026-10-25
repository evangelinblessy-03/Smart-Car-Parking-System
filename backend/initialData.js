/**
 * Initial Seed Data for Smart Car Parking System (GWO & Fog Computing)
 */

export const INITIAL_PARKING_SLOTS = [
  // Zone A - Ground Floor (Near Entrance & EV Charging)
  { id: 'A1', section: 'A', floor: 'Ground Floor', type: 'EV Charging', status: 'available', distanceMeters: 12, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹250', rateINR: 250, vehicle: null, lastUpdated: 'Just now' },
  { id: 'A2', section: 'A', floor: 'Ground Floor', type: 'EV Charging', status: 'occupied', distanceMeters: 15, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹250', rateINR: 250, vehicle: { regNumber: 'KA-01-EV-2024', model: 'Tesla Model 3', entryTime: '09:30 AM', expectedDuration: '3 hrs', driver: 'Rahul S.' }, lastUpdated: '15 mins ago' },
  { id: 'A3', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 18, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', rateINR: 150, vehicle: null, lastUpdated: 'Just now' },
  { id: 'A4', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'reserved', distanceMeters: 22, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', rateINR: 150, vehicle: { regNumber: 'MH-12-AB-9921', model: 'Honda City', entryTime: '11:00 AM (Reserved)', expectedDuration: '2 hrs', driver: 'Ananya P.' }, lastUpdated: '5 mins ago' },
  { id: 'A5', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 25, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', rateINR: 150, vehicle: { regNumber: 'DL-04-CK-4040', model: 'Hyundai Creta', entryTime: '10:05 AM', expectedDuration: '4 hrs', driver: 'Vikram M.' }, lastUpdated: '25 mins ago' },
  { id: 'A6', section: 'A', floor: 'Ground Floor', type: 'Accessible / VIP', status: 'available', distanceMeters: 14, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹200', rateINR: 200, vehicle: null, lastUpdated: 'Just now' },
  { id: 'A7', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 28, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', rateINR: 150, vehicle: null, lastUpdated: 'Just now' },
  { id: 'A8', section: 'A', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 32, fogNodeId: 'Fog-Node-Alpha (Entrance Gate)', ratePerHour: '₹150', rateINR: 150, vehicle: { regNumber: 'KA-05-NB-7812', model: 'Kia Seltos', entryTime: '08:45 AM', expectedDuration: '5 hrs', driver: 'Pooja K.' }, lastUpdated: '40 mins ago' },

  // Zone B - Ground Floor Central
  { id: 'B1', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 36, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: null, lastUpdated: 'Just now' },
  { id: 'B2', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 40, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: { regNumber: 'TN-09-XY-3120', model: 'Volkswagen Virtus', entryTime: '10:20 AM', expectedDuration: '2 hrs', driver: 'Karthik N.' }, lastUpdated: '10 mins ago' },
  { id: 'B3', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 44, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: null, lastUpdated: 'Just now' },
  { id: 'B4', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'reserved', distanceMeters: 48, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: { regNumber: 'KA-03-MR-1104', model: 'Tata Nexon EV', entryTime: '11:30 AM (Reserved)', expectedDuration: '1.5 hrs', driver: 'Sneha R.' }, lastUpdated: '12 mins ago' },
  { id: 'B5', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 52, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: { regNumber: 'HR-26-DQ-5501', model: 'Maruti Suzuki Swift', entryTime: '09:10 AM', expectedDuration: '3 hrs', driver: 'Arjun V.' }, lastUpdated: '50 mins ago' },
  { id: 'B6', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'available', distanceMeters: 55, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: null, lastUpdated: 'Just now' },
  { id: 'B7', section: 'B', floor: 'Ground Floor', type: 'Standard', status: 'occupied', distanceMeters: 58, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹100', rateINR: 100, vehicle: { regNumber: 'KA-51-MM-8832', model: 'BMW 3 Series', entryTime: '10:45 AM', expectedDuration: '2 hrs', driver: 'Devraj B.' }, lastUpdated: '2 mins ago' },
  { id: 'B8', section: 'B', floor: 'Ground Floor', type: 'Accessible / VIP', status: 'available', distanceMeters: 38, fogNodeId: 'Fog-Node-Beta (Zone B Hub)', ratePerHour: '₹200', rateINR: 200, vehicle: null, lastUpdated: 'Just now' },

  // Zone C - Level 1 North Wing
  { id: 'C1', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 62, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'C2', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 66, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'C3', section: 'C', floor: 'Level 1', type: 'Standard', status: 'occupied', distanceMeters: 70, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: { regNumber: 'AP-16-TZ-9011', model: 'Toyota Innova', entryTime: '08:30 AM', expectedDuration: '6 hrs', driver: 'Manish T.' }, lastUpdated: '1 hr ago' },
  { id: 'C4', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 74, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'C5', section: 'C', floor: 'Level 1', type: 'Standard', status: 'reserved', distanceMeters: 78, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: { regNumber: 'KA-04-JG-6677', model: 'Skoda Slavia', entryTime: '12:00 PM (Reserved)', expectedDuration: '3 hrs', driver: 'Deepak G.' }, lastUpdated: '18 mins ago' },
  { id: 'C6', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 82, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'C7', section: 'C', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 85, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'C8', section: 'C', floor: 'Level 1', type: 'EV Charging', status: 'occupied', distanceMeters: 65, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹220', rateINR: 220, vehicle: { regNumber: 'KA-02-EE-1994', model: 'MG ZS EV', entryTime: '09:55 AM', expectedDuration: '2.5 hrs', driver: 'Tanvi M.' }, lastUpdated: '35 mins ago' },

  // Zone D - Level 1 South Wing & Reserved Executive
  { id: 'D1', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 88, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'D2', section: 'D', floor: 'Level 1', type: 'Standard', status: 'occupied', distanceMeters: 92, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: { regNumber: 'MH-02-FE-4211', model: 'Mahindra XUV700', entryTime: '10:12 AM', expectedDuration: '4 hrs', driver: 'Gaurav S.' }, lastUpdated: '22 mins ago' },
  { id: 'D3', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 95, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'D4', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 98, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'D5', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 102, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
  { id: 'D6', section: 'D', floor: 'Level 1', type: 'Standard', status: 'occupied', distanceMeters: 106, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: { regNumber: 'KA-01-MJ-4021', model: 'Audi A4', entryTime: '07:50 AM', expectedDuration: '8 hrs', driver: 'Aditya C.' }, lastUpdated: '1.5 hrs ago' },
  { id: 'D7', section: 'D', floor: 'Level 1', type: 'Accessible / VIP', status: 'reserved', distanceMeters: 89, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹200', rateINR: 200, vehicle: { regNumber: 'KA-05-EX-0001', model: 'Mercedes C-Class', entryTime: '01:00 PM (Reserved)', expectedDuration: '3 hrs', driver: 'Dr. Ramesh N.' }, lastUpdated: '30 mins ago' },
  { id: 'D8', section: 'D', floor: 'Level 1', type: 'Standard', status: 'available', distanceMeters: 110, fogNodeId: 'Fog-Node-Delta (Level 1 Gateway)', ratePerHour: '₹80', rateINR: 80, vehicle: null, lastUpdated: 'Just now' },
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BKG-8021',
    vehicleReg: 'KA-01-EV-2024',
    driverName: 'Rahul Sharma',
    slotId: 'A2',
    zone: 'Zone A (Ground Floor)',
    slotType: 'EV Charging',
    arrivalTime: '09:30 AM',
    departureTime: '12:30 PM',
    durationHours: 3,
    totalCost: '₹750',
    status: 'Active',
    fogNodeAssigned: 'Fog-Node-Alpha (Entrance Gate)',
    createdAt: '2026-10-23 09:25 AM',
  },
  {
    id: 'BKG-8022',
    vehicleReg: 'MH-12-AB-9921',
    driverName: 'Ananya Patel',
    slotId: 'A4',
    zone: 'Zone A (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '11:00 AM',
    departureTime: '01:00 PM',
    durationHours: 2,
    totalCost: '₹300',
    status: 'Upcoming',
    fogNodeAssigned: 'Fog-Node-Alpha (Entrance Gate)',
    createdAt: '2026-10-23 10:15 AM',
  },
  {
    id: 'BKG-8023',
    vehicleReg: 'KA-03-MR-1104',
    driverName: 'Sneha Rao',
    slotId: 'B4',
    zone: 'Zone B (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '11:30 AM',
    departureTime: '01:00 PM',
    durationHours: 1.5,
    totalCost: '₹150',
    status: 'Upcoming',
    fogNodeAssigned: 'Fog-Node-Beta (Zone B Hub)',
    createdAt: '2026-10-23 10:30 AM',
  },
  {
    id: 'BKG-8019',
    vehicleReg: 'KA-05-NB-7812',
    driverName: 'Pooja Kulkarni',
    slotId: 'A8',
    zone: 'Zone A (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '08:45 AM',
    departureTime: '01:45 PM',
    durationHours: 5,
    totalCost: '₹750',
    status: 'Active',
    fogNodeAssigned: 'Fog-Node-Alpha (Entrance Gate)',
    createdAt: '2026-10-23 08:35 AM',
  },
  {
    id: 'BKG-7998',
    vehicleReg: 'DL-01-AA-1234',
    driverName: 'Karan Mehra',
    slotId: 'B1',
    zone: 'Zone B (Ground Floor)',
    slotType: 'Standard',
    arrivalTime: '07:00 AM',
    departureTime: '09:00 AM',
    durationHours: 2,
    totalCost: '₹200',
    status: 'Completed',
    fogNodeAssigned: 'Fog-Node-Beta (Zone B Hub)',
    createdAt: '2026-10-23 06:50 AM',
  }
];

export const INITIAL_ACTIVITIES = [
  { id: 1, type: 'booking', title: 'Automated Slot Allocation', desc: 'Vehicle KA-01-EV-2024 allocated to slot A2', time: '12 mins ago', icon: 'Cpu' },
  { id: 2, type: 'booking', title: 'New Reservation', desc: 'Slot B4 reserved for 11:30 AM (Tata Nexon EV)', time: '18 mins ago', icon: 'Calendar' },
  { id: 3, type: 'release', title: 'Slot Released', desc: 'Slot B1 freed by DL-01-AA-1234, status set to Available', time: '35 mins ago', icon: 'CheckCircle' },
  { id: 4, type: 'fog', title: 'Fog Node Tuple Executed', desc: 'Fog-Node-Beta synchronized 8 slot states with Cloud Broker', time: '42 mins ago', icon: 'Server' },
  { id: 5, type: 'booking', title: 'Batch Allocation Complete', desc: '16 incoming request tuples scheduled across Zones A, B, and C', time: '1 hr ago', icon: 'Activity' },
];

export const INITIAL_USERS = [
  {
    id: 'USR-001',
    name: 'SCHOLAR',
    email: 'scholar@fogresearch.ac.in',
    password: 'password123',
    vehicleReg: 'KA-01-MJ-4021',
    phone: '+91 98450 12345',
    role: 'SmartPark Member',
    memberSince: 'March 2024',
    membershipTier: 'Gold Priority'
  },
  {
    id: 'USR-002',
    name: 'ADMIN',
    email: 'admin@smartparking.in',
    password: 'adminpassword',
    vehicleReg: 'KA-05-SP-9000',
    phone: '+91 98765 43210',
    role: 'SmartPark Administrator',
    memberSince: 'January 2024',
    membershipTier: 'System Admin'
  }
];
