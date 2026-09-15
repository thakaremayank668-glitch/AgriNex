import React, { useState } from 'react';
import { 
  Sprout, 
  Plus, 
  Calculator, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  ShieldCheck, 
  Mic, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Filter, 
  FileCheck, 
  AlertCircle,
  Download,
  History
} from 'lucide-react';
import { Crop, YieldPool, Order, MandiPrice } from '../../types';
import { CURRENT_FARMER } from '../../data/mockData';
import { FairPriceCalculator } from './FairPriceCalculator';
import { MarketPricesView } from './MarketPricesView';
import { YieldPoolingView } from './YieldPoolingView';
import { LandVerificationView } from './LandVerificationView';
import { FarmerOrdersView } from './FarmerOrdersView';
import { FarmerSalesHistoryView } from './FarmerSalesHistoryView';

interface FarmerDashboardProps {
  crops: Crop[];
  pools: YieldPool[];
  orders: Order[];
  mandiPrices: MandiPrice[];
  onOpenVoiceAssistant: () => void;
  onOpenAiQuality: () => void;
  onAddNewCrop: (crop: Partial<Crop>) => void;
  onJoinPool: (poolId: string, quantityKg: number) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  crops,
  pools,
  orders,
  mandiPrices,
  onOpenVoiceAssistant,
  onOpenAiQuality,
  onAddNewCrop,
  onJoinPool,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crops' | 'fair-price' | 'market-prices' | 'pools' | 'orders' | 'verification' | 'history'>('dashboard');
  const [addCropModalOpen, setAddCropModalOpen] = useState(false);

  // New crop form state
  const [newCropName, setNewCropName] = useState('Tomato (Hybrid Desi)');
  const [newYieldKg, setNewYieldKg] = useState(1000);
  const [newListKg, setNewListKg] = useState(500);
  const [newFairPrice, setNewFairPrice] = useState(30);

  // CSV Report Generator for Crop Listings and Sales History
  const handleDownloadReport = () => {
    const timestamp = new Date().toLocaleString('en-IN');
    let csv = `AGRINEX - FARMER COMPREHENSIVE ACTIVITY & SALES REPORT\n`;
    csv += `Generated On,${timestamp}\n`;
    csv += `Farmer Name,${CURRENT_FARMER.name}\n`;
    csv += `Farmer ID,${CURRENT_FARMER.farmerId}\n`;
    csv += `Location,"${CURRENT_FARMER.village}, ${CURRENT_FARMER.taluka}, ${CURRENT_FARMER.district}, ${CURRENT_FARMER.state}"\n`;
    csv += `Land Verification Status,${CURRENT_FARMER.verificationStatus} (Survey #${CURRENT_FARMER.surveyNumber} - ${CURRENT_FARMER.landAreaAcres} Acres)\n\n`;

    // SECTION 1: CURRENT CROP LISTINGS
    csv += `--- CURRENT CROP LISTINGS & HARVEST INVENTORY ---\n`;
    csv += `Crop ID,Crop Name,Category,Variety,Expected Yield (kg),Listed Qty (kg),Cost per kg (INR),Fair Floor Price (INR),Market Price (INR),Quality Grade,Quality Score,Freshness,Status\n`;
    crops.forEach((c) => {
      csv += `"${c.id}","${c.name}","${c.category}","${c.variety}",${c.expectedYieldKg},${c.listedKg},${c.costPerKg},${c.fairFloorPricePerKg},${c.marketPricePerKg},"${c.qualityGrade}",${c.qualityScore},"${c.freshness}","${c.status}"\n`;
    });
    csv += `\n`;

    // SECTION 2: SALES & ESCROW SETTLEMENT HISTORY
    csv += `--- SALES & ESCROW SETTLEMENT HISTORY ---\n`;
    csv += `Order ID,Crop / Lot Description,Quantity (kg),Price per kg (INR),Total Contract Value (INR),Buyer Name,Order Date,Escrow Status,Payment Secured,Pickup Completed,Delivery Completed,Fund Released\n`;
    orders.forEach((o) => {
      csv += `"${o.id}","${o.cropName}",${o.quantityKg},${o.pricePerKg},${o.totalAmount},"${o.buyerName}","${o.orderDate}","${o.escrowStatus}",${o.timeline?.paymentSecured ? 'YES' : 'NO'},${o.timeline?.pickup ? 'YES' : 'NO'},${o.timeline?.delivery ? 'YES' : 'NO'},${o.timeline?.paymentRelease ? 'YES' : 'NO'}\n`;
    });
    csv += `\n`;

    // SECTION 3: SUMMARY TOTALS
    const totalListedKg = crops.reduce((sum, c) => sum + (c.listedKg || 0), 0);
    const totalOrderValue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const releasedEarnings = orders
      .filter((o) => o.escrowStatus === 'RELEASED' || o.timeline?.paymentRelease)
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    csv += `--- SUMMARY AGGREGATES ---\n`;
    csv += `Total Active Crops Listed,${crops.length}\n`;
    csv += `Total Volume Listed (kg),${totalListedKg}\n`;
    csv += `Total Contracted Sales Value (INR),Rs ${totalOrderValue}\n`;
    csv += `Settled & Disbursed Earnings (INR),Rs ${releasedEarnings}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Agrinex_Farmer_Report_${CURRENT_FARMER.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNewCrop({
      name: newCropName,
      expectedYieldKg: newYieldKg,
      listedKg: newListKg,
      fairFloorPricePerKg: newFairPrice,
      marketPricePerKg: 28,
      qualityGrade: 'A',
      qualityScore: 87,
      freshness: 'Good',
      status: 'listed',
    });
    setAddCropModalOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Sprout className="w-4 h-4" />, badge: 'Overview' },
    { id: 'crops', label: 'My Crops', icon: <Layers className="w-4 h-4" />, badge: `${crops.length} listed` },
    { id: 'history', label: 'Sales & Settlement History', icon: <History className="w-4 h-4" />, badge: 'Ledger' },
    { id: 'fair-price', label: 'Fair Price Calculator', icon: <Calculator className="w-4 h-4" />, badge: '12 factors' },
    { id: 'market-prices', label: 'Market Benchmarks', icon: <TrendingUp className="w-4 h-4" />, badge: 'APMC Live' },
    { id: 'pools', label: 'Yield Pooling', icon: <Users className="w-4 h-4" />, badge: `${pools.length} pools` },
    { id: 'orders', label: 'Escrow Orders', icon: <CreditCard className="w-4 h-4" />, badge: `${orders.length} active` },
    { id: 'verification', label: '7/12 Land Verification', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Verified' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      {/* LEFT SIDEBAR: SUB-MENU BUTTONS */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 space-y-4">
        <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-xs space-y-2">
          <div className="px-3 pt-2 pb-1 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-stone-700 uppercase">
              Farmer Sub-Menu
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
              8 Modules
            </span>
          </div>

          <nav aria-label="Farmer sub-menu" className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`farmer-submenu-${item.id}`}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs transition-all w-auto shrink-0 whitespace-nowrap lg:w-full text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-white' : 'text-emerald-700'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                        isActive
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Farmer Profile & Voice Quick Access on Left Sidebar */}
        <div className="hidden lg:block bg-stone-900 rounded-3xl p-4 text-white border border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
              RP
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white truncate">Ramesh Patel</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <span className="text-[11px] text-stone-400 block truncate">Sanand Taluka, Gujarat</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-400">Land Title</span>
              <span className="font-mono font-semibold text-emerald-400">7/12 RoR Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Survey No.</span>
              <span className="font-mono font-medium">142/2-A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Holding Size</span>
              <span className="font-medium">4.5 Acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Escrow Safety</span>
              <span className="text-emerald-400 font-semibold font-mono">100% Protected</span>
            </div>
          </div>

          <button
            onClick={onOpenVoiceAssistant}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Assistant (Gujarati/Hindi)</span>
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE: MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 w-full space-y-6">

      {/* VIEW: MAIN FARMER DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section 6 Header Mandated in Prompt:
              "Good morning, [Farmer Name]"
              Show verification status: "✓ Land Verified"
          */}
          <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-800 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-emerald-300 font-medium">Sanand Taluka, Ahmedabad</span>
                  <span className="text-stone-600">•</span>
                  <span className="text-xs text-stone-300">Mon, Sep 14, 2026</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Good morning, Ramesh Patel
                </h1>
                <p className="text-xs text-stone-300 mt-1">
                  Survey #142/2-A • 4.5 Acres • Kharif Harvest Phase
                </p>
              </div>

              {/* Status Badge & Action Controls */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>✓ Land Verified</span>
                </div>
                <button
                  id="farmer-hdr-download-report-btn"
                  onClick={handleDownloadReport}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all shrink-0 whitespace-nowrap"
                  title="Export complete crop listings and sales history as CSV"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={onOpenVoiceAssistant}
                  className="px-3.5 py-1.5 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-400 transition-colors shrink-0 whitespace-nowrap"
                >
                  <Mic className="w-4 h-4 shrink-0" />
                  <span>Voice Assist</span>
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CARDS MANDATED IN SECTION 6:
              Fair Price: ₹30/kg
              Market Price: ₹28/kg
              Active Pool: 1,600 / 2,000 kg
              Pending Orders: 3
              Earnings: ₹24,500
          */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Card 1: Fair Price */}
            <div 
              onClick={() => setActiveTab('fair-price')} 
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 cursor-pointer transition-all text-left group"
            >
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Fair Price</span>
                <Calculator className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">₹30</span>
                <span className="text-xs font-semibold text-stone-700">/kg</span>
              </div>
              <span className="mt-1 block text-[11px] text-emerald-800 font-bold">Guaranteed Floor</span>
            </div>

            {/* Card 2: Market Price */}
            <div 
              onClick={() => setActiveTab('market-prices')} 
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-amber-500 cursor-pointer transition-all text-left group"
            >
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Market Price</span>
                <TrendingDown className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">₹28</span>
                <span className="text-xs font-semibold text-stone-700">/kg</span>
              </div>
              <span className="mt-1 block text-[11px] text-red-700 font-semibold">Ahmedabad Mandi (-₹2)</span>
            </div>

            {/* Card 3: Active Pool */}
            <div 
              onClick={() => setActiveTab('pools')} 
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-purple-500 cursor-pointer transition-all text-left group"
            >
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Active Pool</span>
                <Users className="w-4 h-4 text-purple-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2">
                <span className="text-xl sm:text-2xl font-black text-purple-800 tracking-tight">1,600</span>
                <span className="text-xs font-semibold text-stone-700"> / 2,000 kg</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            {/* Card 4: Pending Orders */}
            <div 
              onClick={() => setActiveTab('orders')} 
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-sky-500 cursor-pointer transition-all text-left group"
            >
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Pending Orders</span>
                <ShoppingBag className="w-4 h-4 text-sky-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-sky-800 tracking-tight">3</span>
                <span className="text-xs font-semibold text-stone-700">orders</span>
              </div>
              <span className="mt-1 block text-[11px] text-sky-800 font-semibold">₹60,000 Escrowed</span>
            </div>

            {/* Card 5: Earnings */}
            <div 
              onClick={() => setActiveTab('history')} 
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 cursor-pointer transition-all text-left col-span-2 lg:col-span-1 group"
            >
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Earnings</span>
                <CreditCard className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">₹24,500</span>
              </div>
              <span className="mt-1 block text-[11px] text-emerald-800 font-semibold">September Payouts</span>
            </div>
          </div>

          {/* MAIN CTA AND SECONDARY ACTIONS:
              Main CTA: "+ Add Crop"
              Secondary actions: "Download Report", "Sales History", "Calculate Fair Price", "Join Pool"
          */}
          <div className="bg-stone-100 rounded-3xl p-4 border border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Main CTA */}
            <button
              id="farmer-add-crop-cta-btn"
              onClick={() => setAddCropModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
            >
              <Plus className="w-5 h-5 shrink-0" />
              <span>+ Add Crop</span>
            </button>

            {/* Secondary Actions */}
            <div className="flex flex-wrap items-center gap-2 flex-1 sm:justify-end">
              <button
                id="farmer-download-report-action-btn"
                onClick={handleDownloadReport}
                className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-emerald-300 text-emerald-800 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                title="Download CSV report of crop listings and sales history"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Download Report</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <History className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span>Sales History</span>
              </button>
              <button
                onClick={() => setActiveTab('fair-price')}
                className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs shadow-xs transition-all shrink-0 whitespace-nowrap"
              >
                Calculate Fair Price
              </button>
              <button
                onClick={() => setActiveTab('pools')}
                className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs shadow-xs transition-all shrink-0 whitespace-nowrap"
              >
                Join Pool
              </button>
            </div>
          </div>

          {/* SECTION: "MY CROPS"
              Crop card format mandated in spec:
              Tomato
              Expected Yield: 1,000 kg
              Listed: 500 kg
              Fair Price: ₹30/kg
              Market Price: ₹28/kg
              Use simple visuals.
          */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-stone-900 tracking-tight">My Crops (તમારા પાક)</h2>
              <button 
                onClick={() => setActiveTab('crops')} 
                className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>View All ({crops.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div key={crop.id} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4 text-left">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-stone-100 shadow-xs"
                      />
                      <div>
                        <h3 className="font-black text-base text-stone-900 leading-tight">{crop.name}</h3>
                        <span className="text-xs text-stone-700">{crop.variety}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Grade {crop.qualityGrade} ({crop.qualityScore}%)
                    </span>
                  </div>

                  {/* Mandated Visual Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-700 block text-[10px]">Expected Yield</span>
                      <span className="font-black text-stone-900 text-sm">{crop.expectedYieldKg.toLocaleString()} kg</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-700 block text-[10px]">Listed for Sale</span>
                      <span className="font-black text-stone-900 text-sm">{crop.listedKg.toLocaleString()} kg</span>
                    </div>
                  </div>

                  {/* Price Comparison Row */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-700 block text-[10px]">Fair Price</span>
                      <span className="font-black text-emerald-800 text-base">₹{crop.fairFloorPricePerKg}/kg</span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-700 block text-[10px]">Market Price</span>
                      <span className="font-bold text-stone-800 text-sm line-through">₹{crop.marketPricePerKg}/kg</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setActiveTab('fair-price')}
                      className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
                    >
                      Cost Breakdown
                    </button>
                    <button
                      onClick={() => setActiveTab('pools')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Allocate to Pool
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: MY CROPS DETAILED */}
      {activeTab === 'crops' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-stone-900">My Crop Portfolio & Inventory</h2>
              <p className="text-xs text-stone-700">Track cultivation costs, listed harvests, and pending consignments</p>
            </div>
            <button
              onClick={() => setAddCropModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Crop</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop) => (
              <div key={crop.id} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="flex gap-3">
                  <img src={crop.image} alt={crop.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700">{crop.category}</span>
                    <h3 className="text-base font-black text-stone-900 leading-tight">{crop.name}</h3>
                    <span className="text-xs text-stone-700">{crop.variety}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-stone-700 block text-[10px]">Expected Yield</span>
                    <span className="font-black text-stone-900">{crop.expectedYieldKg} kg</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-stone-700 block text-[10px]">Listed Produce</span>
                    <span className="font-black text-stone-900">{crop.listedKg} kg</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-stone-700 block text-[10px]">Cost / kg</span>
                    <span className="font-black text-stone-900">₹{crop.costPerKg}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900">
                    <span className="block text-[10px]">Fair Price</span>
                    <span className="font-black text-emerald-800">₹{crop.fairFloorPricePerKg}/kg</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={onOpenAiQuality}
                    className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Quality Scan</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('fair-price')}
                    className="flex-1 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold"
                  >
                    Recalculate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: FAIR FLOOR PRICE */}
      {activeTab === 'fair-price' && (
        <FairPriceCalculator
          onApplyToListing={(cropName, fairPrice, costPerKg) => {
            setNewCropName(cropName);
            setNewFairPrice(fairPrice);
            setActiveTab('crops');
          }}
          onJoinPool={() => setActiveTab('pools')}
        />
      )}

      {/* VIEW: MARKET PRICES */}
      {activeTab === 'market-prices' && (
        <MarketPricesView
          mandiPrices={mandiPrices}
          onSelectCropForCalculator={(name) => {
            setNewCropName(name);
            setActiveTab('fair-price');
          }}
        />
      )}

      {/* VIEW: YIELD POOLING */}
      {activeTab === 'pools' && (
        <YieldPoolingView
          pools={pools}
          onContributeToPool={(poolId, qty) => onJoinPool(poolId, qty)}
        />
      )}

      {/* VIEW: ORDERS & ESCROW */}
      {activeTab === 'orders' && (
        <FarmerOrdersView
          orders={orders}
        />
      )}

      {/* VIEW: SALES & SETTLEMENT HISTORY */}
      {activeTab === 'history' && (
        <FarmerSalesHistoryView
          orders={orders}
          crops={crops}
          onDownloadReport={handleDownloadReport}
        />
      )}

      {/* VIEW: LAND VERIFICATION */}
      {activeTab === 'verification' && (
        <LandVerificationView />
      )}
      </div>

      {/* ADD CROP MODAL */}
      {addCropModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-black text-base text-stone-900">Add Crop for Direct Sale</h3>
              <button onClick={() => setAddCropModalOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddCropSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-800 block mb-1">Crop Variety</label>
                <select
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-semibold text-stone-900"
                >
                  <option value="Tomato (Hybrid Desi)">Tomato (Hybrid Desi)</option>
                  <option value="Red Onion (Nashik Quality)">Red Onion (Nashik Quality)</option>
                  <option value="Kufri Jyoti Potato">Kufri Jyoti Potato</option>
                  <option value="Sharbati Wheat">Sharbati Wheat</option>
                  <option value="Green Capsicum">Green Capsicum</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Expected Yield (kg)</label>
                  <input
                    type="number"
                    value={newYieldKg}
                    onChange={(e) => setNewYieldKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">List for Sale (kg)</label>
                  <input
                    type="number"
                    value={newListKg}
                    onChange={(e) => setNewListKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Fair Floor Price (₹/kg)</label>
                <input
                  type="number"
                  value={newFairPrice}
                  onChange={(e) => setNewFairPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-black text-sm text-emerald-800"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Based on your ₹25/kg production cost + ₹5 guaranteed margin.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddCropModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
