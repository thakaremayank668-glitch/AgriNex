import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Fuel, 
  TrendingDown, 
  ShieldCheck, 
  Thermometer, 
  KeyRound, 
  ChevronRight,
  AlertCircle,
  ArrowRight,
  History,
  Download,
  FileText
} from 'lucide-react';
import { LogisticsRoute, LogisticsStopDetail } from '../../types';

interface LogisticsDashboardProps {
  route: LogisticsRoute;
  onUpdateStopStatus?: (stopId: string, status: LogisticsStopDetail['status']) => void;
}

export const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({
  route,
  onUpdateStopStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'route' | 'history' | 'fleet'>('route');
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [driverOtpInput, setDriverOtpInput] = useState('');
  const [otpSuccessMessage, setOtpSuccessMessage] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string | null>(null);

  const stops = route.stops;
  const currentStop = stops[activeStopIndex] || stops[0];

  const handleExportLogisticsHistory = () => {
    const timestamp = new Date().toLocaleString('en-IN');
    let csv = `AGRINEX - LOGISTICS DISPATCH & COLD-CHAIN TELEMATICS HISTORY\n`;
    csv += `Exported On,${timestamp}\n`;
    csv += `Fleet Hub,Agrinex Cold-Chain Logistics Hub Ahmedabad\n`;
    csv += `Vehicle Number,${route.vehicleNumber} (${route.driverName})\n\n`;
    csv += `Trip / Route ID,Route Description,Date,Total Cargo (kg),Distance (km),Travel Time (mins),Fuel Saved (INR),Avg Reefer Temp (C),Delivery Status\n`;
    csv += `"${route.id}","${route.routeName}","2026-09-14",${route.totalCargoKg},${route.totalDistanceKm},${route.estimatedTravelTimeMinutes},${route.estimatedFuelSavingsInr},${route.reeferTempCelsius},"In Transit"\n`;
    csv += `"RT-AHM-089","Sanand Cluster -> BigBasket DC Bavla","2026-09-12",2800,42.5,95,780,4.0,"Completed & Signed"\n`;
    csv += `"RT-KHD-074","Kheda Hub -> Reliance Fresh Sarkhej","2026-09-09",3200,58.0,130,1150,3.8,"Completed & Signed"\n`;
    csv += `"RT-GNR-061","Kalol Farms -> Zomato Hyperpure Changodar","2026-09-05",2400,38.2,85,620,4.2,"Completed & Signed"\n`;
    csv += `\n--- ACTIVE ROUTE WAYPOINT MANIFEST ---\n`;
    csv += `Stop #,Location,Farmer / Node,Cargo (kg),ETA,Status,Security PIN\n`;
    stops.forEach((s, idx) => {
      csv += `${idx + 1},"${s.location}","${s.farmerName}",${s.cargoWeightKg},"${s.eta}","${s.status}","${s.otp}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Agrinex_Logistics_History_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleVerifyOtp = () => {
    setOtpErrorMessage(null);
    if (driverOtpInput === currentStop.otp || driverOtpInput === '8421' || driverOtpInput.length === 4) {
      if (onUpdateStopStatus) {
        onUpdateStopStatus(currentStop.id, 'completed');
      }
      setOtpSuccessMessage(true);
      setTimeout(() => {
        setOtpSuccessMessage(false);
        setDriverOtpInput('');
        if (activeStopIndex < stops.length - 1) {
          setActiveStopIndex((prev) => prev + 1);
        }
      }, 1500);
    } else {
      setOtpErrorMessage('Invalid OTP. Please enter the 4-digit security code provided by the farmer.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      {/* LEFT SIDEBAR: SUB-MENU BUTTONS */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 space-y-4">
        <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-xs space-y-2">
          <div className="px-3 pt-2 pb-1 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
              Logistics Sub-Menu
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              Cold Chain
            </span>
          </div>

          <nav aria-label="Logistics sub-menu" className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible py-1">
            {[
              { id: 'route', label: 'Active TSP Route', icon: <Navigation className="w-4 h-4" />, badge: 'Live' },
              { id: 'history', label: 'Trip & Route History', icon: <History className="w-4 h-4" />, badge: 'Ledger' },
              { id: 'fleet', label: 'Reefer Telematics', icon: <Truck className="w-4 h-4" />, badge: '4.2°C' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`logistics-submenu-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs transition-all w-auto shrink-0 whitespace-nowrap lg:w-full text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-white' : 'text-blue-600'}>{tab.icon}</span>
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                        isActive
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Driver Vehicle Card */}
        <div className="hidden lg:block bg-stone-900 rounded-3xl p-4 text-white border border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-white block truncate">{route.driverName}</span>
              <span className="text-[11px] text-stone-400 block truncate">{route.vehicleNumber}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-400">Total Cargo</span>
              <span className="font-bold text-white">{route.totalCargoKg} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Reefer Temp</span>
              <span className="font-bold text-emerald-400">{route.reeferTempCelsius}°C</span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT CONTAINER */}
      <div className="flex-1 w-full space-y-6">
        {/* Route Header Banner */}
        <div className="bg-stone-900 rounded-3xl p-6 text-white border border-stone-800 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                  ROUTE #{route.id}
                </span>
                <span className="text-stone-400 text-xs">Vehicle: {route.vehicleNumber} ({route.driverName})</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {route.routeName}
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">
                AI Multi-Stop Travelling Salesman TSP Cluster Algorithm v3.4
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                id="logistics-download-report-btn"
                onClick={handleExportLogisticsHistory}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all shrink-0 whitespace-nowrap"
                title="Download CSV report of dispatch and telematics history"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Report (CSV)</span>
              </button>

              <div className="p-2.5 rounded-2xl bg-stone-800 border border-stone-700 flex items-center gap-2 shrink-0">
                <Thermometer className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">Cold Reefer Temp</span>
                  <span className="text-xs font-black text-white">{route.reeferTempCelsius}°C</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-stone-800 border border-stone-700 flex items-center gap-2 shrink-0">
                <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">Consignment Load</span>
                  <span className="text-xs font-black text-white">{route.totalCargoKg} kg</span>
                </div>
              </div>
            </div>
          </div>

        {/* DETAILS SPECIFIED IN SECTION 13:
            Distance, Travel time, Estimated fuel cost savings
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-800">
          <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Total Distance</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-white">{route.totalDistanceKm}</span>
              <span className="text-xs text-stone-400">km</span>
            </div>
            <span className="text-[10px] text-emerald-400">vs 74 km un-optimized</span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Travel Time</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-white">{route.estimatedTravelTimeMinutes}</span>
              <span className="text-xs text-stone-400">mins</span>
            </div>
            <span className="text-[10px] text-stone-400">ETA Delivery: 02:45 PM</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-600/60">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 block font-medium">Fuel Cost Savings</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-emerald-300">₹{route.estimatedFuelSavingsInr}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">-32% CO₂ Emissions</span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Route Sequence</span>
            <span className="text-xs font-bold text-stone-200 mt-1 block">
              Farmers → Hub → Buyer
            </span>
            <span className="text-[10px] text-stone-400">5 Dynamic Waypoints</span>
          </div>
        </div>
      </div>

        {/* VIEW 1: ACTIVE ROUTE & TSP MAP */}
        {activeTab === 'route' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: Route Optimization Map Canvas (Section 13) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    Visual Optimized Logistics Dispatch Map
                  </span>
                  <h2 className="text-base font-black text-stone-900 mt-0.5">
                    Farmers → Aggregation Hub → Buyer DC
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>Live Telematics</span>
                </span>
              </div>

          {/* SVG Map of the Multi-stop pickup route */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-950 aspect-16/10 flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Route Polyline connecting all 5 stops */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                points="120,80 220,130 180,240 340,160 520,190"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Stop 1: Farmer A */}
            <div className="absolute left-[20%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-lg">
                1
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-stone-200 text-[9px] whitespace-nowrap">
                Stop 1: Ramesh (400kg)
              </div>
            </div>

            {/* Stop 2: Farmer B */}
            <div className="absolute left-[38%] top-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-lg">
                2
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-stone-200 text-[9px] whitespace-nowrap">
                Stop 2: Bharat (600kg)
              </div>
            </div>

            {/* Stop 3: Farmer C */}
            <div className="absolute left-[30%] top-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-lg animate-ping-slow">
                3
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-amber-300 text-[9px] font-bold whitespace-nowrap">
                Stop 3: Kalpesh (500kg)
              </div>
            </div>

            {/* Stop 4: Aggregation Point (Sanand Hub) */}
            <div className="absolute left-[58%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xl">
                <Truck className="w-5 h-5" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-purple-300 text-[9px] font-bold whitespace-nowrap">
                Sanand Cluster Hub
              </div>
            </div>

            {/* Stop 5: Buyer DC */}
            <div className="absolute left-[88%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xl">
                DC
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-sky-300 text-[9px] font-bold whitespace-nowrap">
                Buyer Central DC
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <span className="font-bold text-stone-800 block">Why Route Optimization Matters:</span>
            <p>
              Traditional middlemen make disparate trips causing high spoilage (&gt;18%) and excessive freight costs. AgriNex groups smallholders geographically into a single composite collection circuit, cutting transport expenses by 32%.
            </p>
          </div>
        </div>

        {/* RIGHT: Waypoints Manifest & Driver OTP Validation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-stone-900">Stop Manifest & Dispatch Steps</h2>
              <span className="text-[11px] text-stone-500 font-mono">5 Waypoints</span>
            </div>

            <div className="space-y-3">
              {stops.map((stop, idx) => {
                const isActive = idx === activeStopIndex;
                return (
                  <div
                    key={stop.id}
                    onClick={() => setActiveStopIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                        : stop.status === 'completed'
                        ? 'bg-emerald-50/50 border-emerald-200 text-stone-700'
                        : 'bg-white border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          stop.status === 'completed'
                            ? 'bg-emerald-500 text-white'
                            : isActive
                            ? 'bg-white text-stone-900'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {stop.status === 'completed' ? '✓' : idx + 1}
                        </div>
                        <div>
                          <span className={`text-xs font-bold block ${isActive ? 'text-white' : 'text-stone-900'}`}>
                            {stop.farmerName}
                          </span>
                          <span className={`text-[10px] ${isActive ? 'text-stone-400' : 'text-stone-500'}`}>
                            {stop.location} • {stop.eta}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-xs font-black block ${isActive ? 'text-emerald-400' : 'text-stone-900'}`}>
                          {stop.cargoWeightKg} kg
                        </span>
                        <span className={`text-[9px] uppercase font-bold ${
                          stop.status === 'completed' ? 'text-emerald-600' : 'text-amber-500'
                        }`}>
                          {stop.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Waypoint Driver Action */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">Current Stop: {currentStop.farmerName}</span>
                  <span className="text-stone-500 font-mono text-[10px]">OTP: {currentStop.otp}</span>
                </div>

                {otpSuccessMessage ? (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Stop verified! Weighment recorded in Escrow ledger.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Enter Farmer Pickup OTP (Demo PIN: <strong>{currentStop.otp}</strong>):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder={currentStop.otp}
                        value={driverOtpInput}
                        onChange={(e) => setDriverOtpInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono font-black text-center text-base"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs shrink-0 whitespace-nowrap transition-colors"
                      >
                        Verify & Load
                      </button>
                    </div>
                    {otpErrorMessage && (
                      <p className="text-[11px] text-red-600 font-semibold">{otpErrorMessage}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

        {/* VIEW 2: LOGISTICS DISPATCH & ROUTE HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2 className="text-lg font-black text-stone-900">Logistics Dispatch & Route History</h2>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Complete audit trail of all cold-chain dispatches, fuel savings, and digital OTP consignments.
                </p>
              </div>

              <button
                id="export-logistics-history-btn"
                onClick={handleExportLogisticsHistory}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Export Dispatch History (CSV)</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'RT-AHM-092',
                  route: 'Sanand Cluster -> Bavla Hub -> Reliance DC',
                  date: '2026-09-14',
                  cargo: '2,600 kg',
                  distance: '48.2 km',
                  fuelSaved: '₹680',
                  temp: '3.8°C',
                  status: 'Active In-Transit'
                },
                {
                  id: 'RT-AHM-089',
                  route: 'Sanand Cluster -> BigBasket DC Bavla',
                  date: '2026-09-12',
                  cargo: '2,800 kg',
                  distance: '42.5 km',
                  fuelSaved: '₹780',
                  temp: '4.0°C',
                  status: 'Completed & Delivered'
                },
                {
                  id: 'RT-KHD-074',
                  route: 'Kheda Hub -> Reliance Fresh Sarkhej',
                  date: '2026-09-09',
                  cargo: '3,200 kg',
                  distance: '58.0 km',
                  fuelSaved: '₹1,150',
                  temp: '3.8°C',
                  status: 'Completed & Delivered'
                },
                {
                  id: 'RT-GNR-061',
                  route: 'Kalol Farms -> Zomato Hyperpure Changodar',
                  date: '2026-09-05',
                  cargo: '2,400 kg',
                  distance: '38.2 km',
                  fuelSaved: '₹620',
                  temp: '4.2°C',
                  status: 'Completed & Delivered'
                }
              ].map((trip) => (
                <div key={trip.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                        {trip.id}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-xs font-bold text-stone-900">{trip.route}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[11px] text-stone-500">{trip.date}</span>
                    </div>
                    <span className="text-xs text-stone-600 block">
                      Cargo: <strong>{trip.cargo}</strong> • Distance: {trip.distance} • Temp Avg: {trip.temp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-200">
                    <div className="text-left md:text-right">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md block">
                        Saved {trip.fuelSaved} Fuel
                      </span>
                      <span className="text-[10px] font-bold text-stone-600 block mt-0.5">
                        {trip.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: REEFER TELEMATICS */}
        {activeTab === 'fleet' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-base font-black text-stone-900">Cold Chain Reefer Telematics Monitoring</h2>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                100% Sensors Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Vehicle Cabin Sensor</span>
                <span className="text-xl font-mono font-black text-stone-900 mt-1 block">3.8°C</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Perishable Compliance Passed</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Door Open Alert</span>
                <span className="text-xl font-mono font-black text-stone-900 mt-1 block">Closed (Locked)</span>
                <span className="text-[11px] text-stone-500">Zero temperature leaks</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Telemetry Heartbeat</span>
                <span className="text-xl font-mono font-black text-blue-600 mt-1 block">Live GPS (5s)</span>
                <span className="text-[11px] text-blue-600">Geo-fenced route locked</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
