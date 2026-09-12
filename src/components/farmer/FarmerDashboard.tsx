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
  AlertCircle
} from 'lucide-react';
import { Crop, YieldPool, Order, MandiPrice } from '../../types';
import { FairPriceCalculator } from './FairPriceCalculator';
import { MarketPricesView } from './MarketPricesView';
import { YieldPoolingView } from './YieldPoolingView';
import { LandVerificationView } from './LandVerificationView';
import { FarmerOrdersView } from './FarmerOrdersView';

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crops' | 'fair-price' | 'market-prices' | 'pools' | 'orders' | 'verification'>('dashboard');
  const [addCropModalOpen, setAddCropModalOpen] = useState(false);

  // New crop form state
  const [newCropName, setNewCropName] = useState('Tomato (Hybrid Desi)');
  const [newYieldKg, setNewYieldKg] = useState(1000);
  const [newListKg, setNewListKg] = useState(500);
  const [newFairPrice, setNewFairPrice] = useState(30);

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
    { id: 'dashboard', label: 'Dashboard', icon: <Sprout className="w-4 h-4" /> },
    { id: 'crops', label: 'My Crops', icon: <Layers className="w-4 h-4" /> },
    { id: 'fair-price', label: 'Fair Price', icon: <Calculator className="w-4 h-4" /> },
    { id: 'market-prices', label: 'Market Prices', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'pools', label: 'Yield Pools', icon: <Users className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'verification', label: 'Verification', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl p-1.5 border border-stone-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

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

              {/* Status Badge mandated in spec */}
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>✓ Land Verified</span>
                </div>
                <button
                  onClick={onOpenVoiceAssistant}
                  className="px-3.5 py-1.5 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-400 transition-colors animate-pulse"
                >
                  <Mic className="w-4 h-4" />
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
              onClick={() => setActiveTab('orders')} 
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

          {/* MAIN CTA AND SECONDARY ACTIONS (From Prompt):
              Main CTA: "+ Add Crop"
              Secondary actions: "Calculate Fair Price", "List Produce", "Join Pool"
          */}
          <div className="bg-stone-100 rounded-3xl p-4 border border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Main CTA */}
            <button
              onClick={() => setAddCropModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>+ Add Crop</span>
            </button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-3 gap-2 flex-1 sm:max-w-md">
              <button
                onClick={() => setActiveTab('fair-price')}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs shadow-xs text-center transition-all"
              >
                Calculate Fair Price
              </button>
              <button
                onClick={() => setAddCropModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs shadow-xs text-center transition-all"
              >
                List Produce
              </button>
              <button
                onClick={() => setActiveTab('pools')}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs shadow-xs text-center transition-all"
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

      {/* VIEW: LAND VERIFICATION */}
      {activeTab === 'verification' && (
        <LandVerificationView />
      )}

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
