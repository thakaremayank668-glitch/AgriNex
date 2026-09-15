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
  ChevronRight,
  History,
  Download,
  FileText
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
  const [orderFilter, setOrderFilter] = useState<'all' | 'escrow' | 'completed'>('all');

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

  const [orderSuccessBanner, setOrderSuccessBanner] = useState<string | null>(null);

  const handleExportBuyerHistory = () => {
    const timestamp = new Date().toLocaleString('en-IN');
    let csv = `AGRINEX - BUYER PROCUREMENT & ESCROW SETTLEMENT LEDGER\n`;
    csv += `Exported On,${timestamp}\n`;
    csv += `Organization,FreshAgro Retail Pvt Ltd\n`;
    csv += `Buyer Account,AGX-BYR-AHM-041\n\n`;
    csv += `Order ID,Crop / Lot Description,Quantity (kg),Price per kg (INR),Total Contract Value (INR),Farmer / Seller,Location,Order Date,Escrow Lock Status,Delivery Status\n`;
    orders.forEach((ord) => {
      csv += `"${ord.id}","${ord.cropName}",${ord.quantityKg},${ord.pricePerKg},${ord.totalAmount},"${ord.farmerName}","${ord.farmerLocation}","${ord.orderDate}","${ord.escrowStatus}","${ord.deliveryStatus}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Agrinex_Buyer_Procurement_History_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredBuyerOrders = orders.filter((o) => {
    if (orderFilter === 'escrow') return o.escrowStatus === 'ESCROWED' || !o.timeline?.paymentRelease;
    if (orderFilter === 'completed') return o.escrowStatus === 'RELEASED' || o.timeline?.paymentRelease;
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      {/* LEFT SIDEBAR: SUB-MENU BUTTONS */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 space-y-4">
        <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-xs space-y-2">
          <div className="px-3 pt-2 pb-1 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
              Buyer Sub-Menu
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Direct Trade
            </span>
          </div>

          <nav aria-label="Buyer sub-menu" className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible py-1">
            {[
              { id: 'marketplace', label: 'Procure Produce', icon: <ShoppingBag className="w-4 h-4" />, badge: `${crops.length} lots` },
              { id: 'orders', label: 'Procurement History', icon: <History className="w-4 h-4" />, badge: `${orders.length} orders` },
              { id: 'rfq', label: 'Bulk Demand (RFQ)', icon: <Layers className="w-4 h-4" />, badge: 'Create' },
            ].map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`buyer-submenu-${tab.id}`}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs transition-all w-auto shrink-0 whitespace-nowrap lg:w-full text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-white' : 'text-stone-500'}>{tab.icon}</span>
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                        isActive
                          ? 'bg-emerald-700 text-emerald-100'
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

        {/* Corporate Buyer Card on Left Sidebar */}
        <div className="hidden lg:block bg-stone-900 rounded-3xl p-4 text-white border border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600/30 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold text-sm">
              FA
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-white block truncate">FreshAgro Retail Pvt Ltd</span>
              <span className="text-[11px] text-stone-400 block truncate">Corporate Wholesale Buyer</span>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-400">Escrow Balance</span>
              <span className="font-mono font-bold text-emerald-400">₹8,50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">GSTIN</span>
              <span className="font-mono text-stone-300">24AAACF1092M1Z8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Smart Contract</span>
              <span className="text-sky-400 font-medium">Auto-Disbursing</span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE: MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 w-full space-y-6">
        {orderSuccessBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs font-semibold animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{orderSuccessBanner}</span>
            </div>
            <button onClick={() => setOrderSuccessBanner(null)} className="text-emerald-700 hover:text-emerald-950">✕</button>
          </div>
        )}

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

      {/* SUB-VIEW: BUYER PROCUREMENT & ESCROW CONTRACT HISTORY */}
      {activeSubTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-700 shrink-0" />
                <h2 className="text-lg font-black text-stone-900">Buyer Procurement & Escrow History</h2>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Audit trail of all spot market & smart pool contracts with 100% verified escrow protection.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                id="export-buyer-history-btn"
                onClick={handleExportBuyerHistory}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                title="Download CSV of all past and active buyer procurements"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Export Procurement Ledger (CSV)</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: `All Contracts (${orders.length})` },
                { id: 'escrow', label: `Secured In Escrow (${orders.filter(o => o.escrowStatus === 'ESCROWED').length})` },
                { id: 'completed', label: `Dispatched / Delivered (${orders.filter(o => o.escrowStatus === 'RELEASED').length})` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOrderFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                    orderFilter === f.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shrink-0 whitespace-nowrap">
              ₹84,500 Total Escrow Volume
            </span>
          </div>

          {/* Contracts List */}
          <div className="space-y-3">
            {filteredBuyerOrders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      {ord.id}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-bold text-stone-900">{ord.cropName}</span>
                    {ord.isPooled && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                        Smart Pooled Lot
                      </span>
                    )}
                    <span className="text-stone-300">•</span>
                    <span className="text-[11px] text-stone-500">{ord.orderDate}</span>
                  </div>
                  <span className="text-xs text-stone-600 block">
                    Producer / Source: <strong className="text-stone-800">{ord.farmerName}</strong> • {ord.quantityKg.toLocaleString()} kg @ ₹{ord.pricePerKg}/kg
                  </span>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-200">
                  <div className="text-left md:text-right">
                    <span className="text-sm font-mono font-black text-stone-900 block">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      ord.escrowStatus === 'RELEASED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-sky-100 text-sky-800 border border-sky-300'
                    }`}>
                      {ord.escrowStatus === 'RELEASED' ? '✓ Completed & Disbursed' : '🔒 Escrow Locked'}
                    </span>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold text-xs shrink-0 whitespace-nowrap">
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
              onClick={() => setOrderSuccessBanner('RFQ broadcasted to 8 nearby FPO aggregators! Clusters will submit aggregation proposals within 2 hours.')}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-500 transition-colors"
            >
              Broadcast RFQ to Farmer Clusters
            </button>
          </form>
        </div>
      )}
      </div>

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
          setOrderSuccessBanner(`Order ${newOrder.id} placed! ₹${newOrder.totalAmount?.toLocaleString()} secured in Smart Escrow.`);
        }}
      />
    </div>
  );
};
