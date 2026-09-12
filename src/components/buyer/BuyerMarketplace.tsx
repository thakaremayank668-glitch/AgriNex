import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Users, 
  ArrowRight, 
  Calendar,
  Layers,
  Clock,
  TrendingUp,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Crop, Order } from '../../types';
import { ProductDetailModal } from './ProductDetailModal';
import { BuyerOrderFlowModal } from './BuyerOrderFlowModal';

interface BuyerMarketplaceProps {
  crops: Crop[];
  orders: Order[];
  onOrderCreated: (order: Partial<Order>) => void;
}

export const BuyerMarketplace: React.FC<BuyerMarketplaceProps> = ({
  crops,
  orders,
  onOrderCreated,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'marketplace' | 'orders' | 'rfq'>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Modals state
  const [detailModalCrop, setDetailModalCrop] = useState<Crop | null>(null);
  const [orderModalCrop, setOrderModalCrop] = useState<Crop | null>(null);
  const [orderModalIsSmartPool, setOrderModalIsSmartPool] = useState(false);

  // Filter crops
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.farmerDistrict.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesQuality = selectedQuality === 'All' || crop.qualityGrade === selectedQuality;
    const matchesLoc = selectedLocation === 'All' || crop.farmerDistrict === selectedLocation;
    return matchesSearch && matchesCat && matchesQuality && matchesLoc;
  });

  return (
    <div className="space-y-6">
      {/* Sub tabs navigation */}
      <div className="bg-white rounded-2xl p-1.5 border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[
            { id: 'marketplace', label: 'Procure Produce' },
            { id: 'orders', label: 'Escrow Contracts & Orders' },
            { id: 'rfq', label: 'Create Bulk Demand (RFQ)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-2 text-xs font-bold text-stone-500">
          <span>Logged in as: <strong>FreshAgro Retail Pvt Ltd</strong></span>
        </div>
      </div>

      {activeSubTab === 'marketplace' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header & Filter Controls */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-black text-stone-900 tracking-tight">Direct Farm Procurement Exchange</h1>
                <p className="text-xs text-stone-700">Source verified crops directly from verified farmers & aggregated clusters</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search crop, variety, or district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-hidden focus:border-emerald-600 font-medium"
                />
              </div>
            </div>

            {/* Filter Pills mandated in Section 10: Crop, Location, Quantity, Price, Quality, Delivery Date */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-stone-100 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Crop Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 focus:outline-hidden"
                >
                  <option value="All">All Categories</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains">Grains & Cereals</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Quality Grade</label>
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 focus:outline-hidden"
                >
                  <option value="All">All Grades (A, B, C)</option>
                  <option value="A">Grade A (Premium Retail)</option>
                  <option value="B">Grade B (Standard)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-700 block mb-1">District / Mandi Zone</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 focus:outline-hidden"
                >
                  <option value="All">All Districts</option>
                  <option value="Ahmedabad">Ahmedabad Hub</option>
                  <option value="Nashik">Nashik Region</option>
                  <option value="Banaskantha">Banaskantha (Deesa)</option>
                  <option value="Sehore">Sehore (MP)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Fulfillment Speed</label>
                <select className="w-full px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 focus:outline-hidden">
                  <option>Next Day Delivery (Reefer)</option>
                  <option>Same Day Farm Gate Pickup</option>
                  <option>Scheduled 48hr Window</option>
                </select>
              </div>
            </div>
          </div>

          {/* PRODUCT CARDS GRID (Mandated in Section 10):
              Tomato
              Available: 500 kg
              Quality: A
              Freshness: Good
              Fair Price: ₹30/kg
              Location: Ahmedabad
              Verified Farmer ✓
              CTA: "View Details"
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Crop Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Quality Badge */}
                  <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Grade {crop.qualityGrade}</span>
                  </div>

                  {/* Verified Farmer Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Farmer ✓</span>
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded-lg text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{crop.farmerDistrict} ({crop.distanceKm} km)</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {crop.variety}
                    </span>
                    <h3 className="text-lg font-black text-stone-900 tracking-tight mt-0.5">
                      {crop.name}
                    </h3>
                    <p className="text-xs text-stone-700 mt-0.5">
                      Sold by <strong>{crop.farmerName}</strong> • {crop.farmerVillage}
                    </p>
                  </div>

                  {/* 4 Specifications Required by Section 10 */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-700 block text-[10px]">Available</span>
                      <span className="font-black text-stone-900">{crop.listedKg.toLocaleString()} kg</span>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-700 block text-[10px]">Freshness</span>
                      <span className="font-black text-emerald-800">{crop.freshness}</span>
                    </div>
                  </div>

                  {/* Big Fair Floor Price Display */}
                  <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-700 block">Fair Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-emerald-800">₹{crop.fairFloorPricePerKg}</span>
                        <span className="text-xs font-semibold text-stone-700">/kg</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-700 font-mono">0% Middleman</span>
                  </div>

                  {/* CTA "View Details" as explicitly required */}
                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={() => setDetailModalCrop(crop)}
                      className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>

                    <button
                      onClick={() => {
                        setOrderModalCrop(crop);
                        setOrderModalIsSmartPool(false);
                      }}
                      className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center"
                      title="Direct Buy"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW: BUYER ORDERS & ESCROW CONTRACTS */}
      {activeSubTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-black text-stone-900">Institutional Escrow Orders</h2>
              <p className="text-xs text-stone-700">Real-time status of secured funds, dispatches, and delivery sign-offs</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
              ₹84,500 Locked in Escrow
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-700">{ord.id}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-bold text-stone-900">{ord.cropName}</span>
                    {ord.isPooled && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                        Smart Pooled
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-700 mt-1 block">
                    Seller: <strong>{ord.farmerName}</strong> • {ord.quantityKg} kg @ ₹{ord.pricePerKg}/kg
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-stone-900">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-sky-700 font-bold block uppercase">{ord.escrowStatus}</span>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold text-xs">
                    {ord.deliveryStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW: RFQ / BULK DEMAND */}
      {activeSubTab === 'rfq' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 max-w-2xl">
          <div>
            <h2 className="text-base font-black text-stone-900">Post Institutional Bulk Requirement (RFQ)</h2>
            <p className="text-xs text-stone-700">Broadcast your procurement need to FPOs and farmer clusters to form instant Smart Pools.</p>
          </div>

          <form className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Crop Required</label>
              <input type="text" defaultValue="Fresh Tomato (Salad Grade)" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-semibold" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-800 block mb-1">Bulk Volume (kg)</label>
                <input type="number" defaultValue={5000} className="w-full px-3.5 py-2 rounded-xl border border-stone-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-stone-800 block mb-1">Target Price (₹/kg)</label>
                <input type="number" defaultValue={31} className="w-full px-3.5 py-2 rounded-xl border border-stone-300 font-bold text-emerald-800" />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Delivery Destination</label>
              <input type="text" defaultValue="Sanand Central Warehouse, Ahmedabad" className="w-full px-3.5 py-2 rounded-xl border border-stone-300" />
            </div>

            <button
              type="button"
              onClick={() => alert('RFQ broadcasted to 8 nearby FPO aggregators! Clusters will submit aggregation proposals.')}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-500 transition-colors"
            >
              Broadcast RFQ to Farmer Clusters
            </button>
          </form>
        </div>
      )}

      {/* MODALS */}
      <ProductDetailModal
        crop={detailModalCrop}
        isOpen={!!detailModalCrop}
        onClose={() => setDetailModalCrop(null)}
        onInitiateOrder={(crop, isSmartPool) => {
          setDetailModalCrop(null);
          setOrderModalCrop(crop);
          setOrderModalIsSmartPool(isSmartPool);
        }}
      />

      <BuyerOrderFlowModal
        crop={orderModalCrop}
        isOpen={!!orderModalCrop}
        initialSmartPool={orderModalIsSmartPool}
        onClose={() => setOrderModalCrop(null)}
        onOrderCompleted={(newOrder) => {
          onOrderCreated(newOrder);
          alert(`Order ${newOrder.id} placed! ₹${newOrder.totalAmount?.toLocaleString()} secured in Escrow.`);
        }}
      />
    </div>
  );
};
