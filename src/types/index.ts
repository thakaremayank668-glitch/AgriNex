export type Role = 'landing' | 'farmer' | 'buyer' | 'fpo' | 'logistics' | 'admin';
export type UserRole = Role;

export type Language = 'en' | 'hi' | 'gu' | 'mr';

export interface Crop {
  id: string;
  name: string;
  category: 'Vegetables' | 'Grains' | 'Pulses' | 'Fruits' | 'Cash Crops';
  variety: string;
  expectedYieldKg: number;
  listedKg: number;
  fairFloorPricePerKg: number;
  marketPricePerKg: number;
  costPerKg: number;
  farmerMarginPerKg: number;
  qualityGrade: 'A+' | 'A' | 'B' | 'C';
  qualityScore: number; // 0-100
  freshness: 'Excellent' | 'Good' | 'Fair';
  harvestDate: string;
  image: string;
  farmerName: string;
  farmerVillage: string;
  farmerDistrict: string;
  farmerState: string;
  distanceKm: number;
  landVerified: boolean;
  status: 'draft' | 'listed' | 'pooled' | 'sold';
}

export interface YieldPool {
  id: string;
  cropName: string;
  buyerRequirementKg: number;
  collectedKg: number;
  targetPricePerKg: number;
  farmersCount: number;
  distanceKm: number;
  expectedPickup: string;
  buyerName: string;
  buyerType: 'Institutional' | 'Processor' | 'Retail Chain';
  status: 'Open' | 'Nearly Full' | 'Fulfilled' | 'In Transit';
  contributions: {
    farmerId: string;
    farmerName: string;
    village: string;
    quantityKg: number;
    sharePercent: number;
    status: 'Ready' | 'Inspected' | 'Loaded';
  }[];
  pickupHub: string;
}

export interface Order {
  id: string;
  cropName: string;
  quantityKg: number;
  pricePerKg: number;
  totalAmount: number;
  farmerName: string;
  buyerName: string;
  orderDate: string;
  escrowStatus: 'ESCROWED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'RELEASED';
  deliveryStatus?: string;
  isPooled?: boolean;
  expectedDelivery?: string;
  timeline: {
    buyerPaid: boolean;
    paymentSecured: boolean;
    pickup: boolean;
    delivery: boolean;
    paymentRelease: boolean;
  };
  pickupOtp?: string;
  deliveryOtp?: string;
}

export interface LogisticsStopDetail {
  id: string;
  farmerName: string;
  location: string;
  cargoWeightKg: number;
  eta: string;
  status: 'pending' | 'in-transit' | 'completed';
  otp: string;
}

export interface LogisticsRoute {
  id: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  reeferTempCelsius: number;
  totalCargoKg: number;
  totalDistanceKm: number;
  estimatedTravelTimeMinutes: number;
  estimatedFuelSavingsInr: number;
  stops: LogisticsStopDetail[];
}

export interface MandiPrice {
  cropName: string;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  marketLocation: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  historicalTrend: { day: string; price: number; modalPrice: number }[];
}

export interface LogisticsStop {
  id: number;
  type: 'warehouse' | 'farmer' | 'fpo' | 'buyer';
  label: string;
  name: string;
  location: string;
  quantityKg: number;
  cumulativeKg: number;
  status: 'Pending' | 'On the Way' | 'Picked Up' | 'Completed';
  timeEstimate: string;
  x: number; // For interactive visual map coords (0-100%)
  y: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'order' | 'pool' | 'price' | 'payment' | 'logistics' | 'verification' | 'quality';
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  actionUrl?: string;
}

export interface FarmerProfile {
  name: string;
  phone: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  farmerId: string;
  landAreaAcres: number;
  surveyNumber: string;
  khataNumber: string;
  soilHealthCard: boolean;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected' | 'Needs Review';
  verificationDocName: string;
  preferredLanguage: Language;
}
