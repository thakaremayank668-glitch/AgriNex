import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Clock, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Plus,
  Navigation,
  Info
} from 'lucide-react';
import { YieldPool } from '../../types';

interface YieldPoolingViewProps {
  pools: YieldPool[];
  onContributeToPool?: (poolId: string, quantityKg: number) => void;
}

export const YieldPoolingView: React.FC<YieldPoolingViewProps> = ({
  pools,
  onContributeToPool,
}) => {
  const [selectedPoolId, setSelectedPoolId] = useState<string>(pools[0]?.id || 'pool-1');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [contributionKg, setContributionKg] = useState<number>(400);
  const [joinedSuccessNotice, setJoinedSuccessNotice] = useState(false);

  const activePool = pools.find((p) => p.id === selectedPoolId) || pools[0];
  const progressPercent = Math.round((activePool.collectedKg / activePool.buyerRequirementKg) * 100);

  const handleConfirmJoin = () => {
    if (onContributeToPool) {
      onContributeToPool(activePool.id, contributionKg);
    }
    setJoinModalOpen(false);
    setJoinedSuccessNotice(true);
    setTimeout(() => setJoinedSuccessNotice(false), 5000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-900 tracking-tight">Nearby Yield Pools</h1>
              <p className="text-xs text-stone-700">
                Smart crop aggregation pooling smallholder harvests to fulfill bulk institutional enterprise orders directly.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
            {pools.length} Active Village Clusters
          </span>
        </div>
      </div>

      {joinedSuccessNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">Contribution Locked into {activePool.cropName}!</span>
              <span>Your harvest allocation is reserved at ₹{activePool.targetPricePerKg}/kg with escrow payment guarantee.</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]">
            Ready for Pickup
          </span>
        </div>
      )}

      {/* Pools Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {pools.map((pool) => {
          const isSelected = pool.id === activePool.id;
          const pct = Math.round((pool.collectedKg / pool.buyerRequirementKg) * 100);
          return (
            <button
              key={pool.id}
              onClick={() => setSelectedPoolId(pool.id)}
              className={`px-4 py-2.5 rounded-2xl border text-left whitespace-nowrap transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <span className="text-xs font-black block">{pool.cropName}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-400' : 'text-stone-700'}`}>
                  {pool.collectedKg.toLocaleString()} / {pool.buyerRequirementKg.toLocaleString()} kg ({pct}%)
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isSelected ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
              }`}>
                ₹{pool.targetPricePerKg}/kg
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Aggregation Showcase (From Spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Core Pool Card & Contributor Stack */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase tracking-wider">
                  {activePool.status}
                </span>
                <h2 className="text-xl font-black text-stone-900 mt-1">{activePool.cropName}</h2>
                <span className="text-xs text-stone-700 flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  <span>Buyer: <strong>{activePool.buyerName}</strong> ({activePool.buyerType})</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-700 block">Agreed Purchase Rate</span>
                <span className="text-2xl font-black text-emerald-800">₹{activePool.targetPricePerKg}</span>
                <span className="text-xs font-semibold text-stone-700"> / kg</span>
              </div>
            </div>

            {/* Core Highlight Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Buyer Order</span>
                <span className="text-base font-black text-stone-900 mt-0.5 block">{activePool.buyerRequirementKg.toLocaleString()} kg</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Aggregated</span>
                <span className="text-base font-black text-emerald-800 mt-0.5 block">{activePool.collectedKg.toLocaleString()} kg</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Progress</span>
                <span className="text-base font-black text-purple-700 mt-0.5 block">{progressPercent}%</span>
              </div>
            </div>

            {/* Progress Bar with markers */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-stone-700">Aggregated: {activePool.collectedKg} kg</span>
                <span className="text-purple-700">{progressPercent}% Capacity</span>
              </div>
              <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-purple-600 rounded-full transition-all duration-700" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-700 font-medium">
                <span>Remaining to Fill: <strong>{activePool.buyerRequirementKg - activePool.collectedKg} kg</strong></span>
                <span>Pickup Hub: {activePool.pickupHub.split(' ')[0]}</span>
              </div>
            </div>

            {/* Logistics & Location Details */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-700 block">Distance to Cluster Hub</span>
                  <span className="font-bold text-stone-800">{activePool.distanceKm} km away</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-700 block">Expected Pickup</span>
                  <span className="font-bold text-stone-800">{activePool.expectedPickup}</span>
                </div>
              </div>
            </div>

            {/* Join Pool CTA */}
            <button
              onClick={() => setJoinModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Join Pool (Add Your Harvest)</span>
            </button>
          </div>

          {/* Visual Breakdown of Contributing Farmers (From Prompt) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-stone-900">
                Farmer Contributions in this Pool ({activePool.farmersCount} Farmers)
              </h2>
              <span className="text-[11px] text-stone-700 font-medium">Aggregated Lot</span>
            </div>

            <div className="space-y-2.5">
              {activePool.contributions.map((c) => (
                <div key={c.farmerId} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center">
                      {c.farmerName.charAt(7) || 'F'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">{c.farmerName}</span>
                      <span className="text-[10px] text-stone-700">{c.village} Village • Status: {c.status}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-stone-900 block">{c.quantityKg} kg</span>
                    <span className="text-[10px] font-semibold text-purple-700">{c.sharePercent}% Share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Visual Aggregation Map Diagram */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Cluster Geolocation & Aggregation Hub
              </span>
              <h2 className="text-base font-black text-stone-900">Sanand Cluster Map</h2>
            </div>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>Sanand APMC Hub</span>
            </span>
          </div>

          {/* SVG Map of nearby farmers */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 p-4 aspect-4/3 flex items-center justify-center">
            {/* Grid styling to look like an authentic GIS map */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Connecting Route lines from farmers to hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="25%" y1="35%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
              <line x1="75%" y1="28%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
              <line x1="30%" y1="75%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
              <line x1="78%" y1="72%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
            </svg>

            {/* CENTRAL AGGREGATION HUB */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 border-2 border-white shadow-xl flex items-center justify-center text-white animate-pulse">
                <Truck className="w-6 h-6" />
              </div>
              <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-stone-900/90 border border-purple-500 text-white text-[10px] font-bold whitespace-nowrap">
                Sanand Hub (1,600 kg)
              </div>
            </div>

            {/* FARMER PINS */}
            {/* Farmer A (You) */}
            <div className="absolute left-[25%] top-[35%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                A
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-emerald-300 text-[9px] font-bold">
                Farmer A (You): 400kg
              </div>
            </div>

            {/* Farmer B */}
            <div className="absolute left-[75%] top-[28%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-700 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                B
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-stone-300 text-[9px]">
                Farmer B: 600kg
              </div>
            </div>

            {/* Farmer C */}
            <div className="absolute left-[30%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-700 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                C
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-stone-300 text-[9px]">
                Farmer C: 500kg
              </div>
            </div>

            {/* Farmer D */}
            <div className="absolute left-[78%] top-[72%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-stone-700 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                D
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-stone-900/90 text-stone-300 text-[9px]">
                Farmer D: 100kg
              </div>
            </div>
          </div>

          {/* Explain Why Pooling Works */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
            <span className="font-bold text-stone-900 block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Why Smallholders Win with Smart Pooling:</span>
            </span>
            <p className="leading-relaxed">
              Institutional retail chains and processors (e.g. FreshAgro, Reliance Retail) demand 2,000–10,000 kg single-lot consignments. By aggregating 8 smallholders within a 12 km radius, AgriNex bypasses middlemen and guarantees <strong>₹30/kg directly to farmers</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* JOIN POOL POPUP MODAL */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-stone-900">Join {activePool.cropName}</h3>
              <button onClick={() => setJoinModalOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="font-bold block">Guaranteed Payout Rate:</span>
                <span className="text-lg font-black text-emerald-800">₹{activePool.targetPricePerKg} / kg</span>
                <span className="block text-[11px] mt-0.5">Escrow secured before pickup tomorrow.</span>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Enter Quantity to Allocate (kg):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={contributionKg}
                    onChange={(e) => setContributionKg(Math.max(50, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold text-base text-stone-900"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-stone-500 font-bold">kg</span>
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Total expected payout: <strong>₹{(contributionKg * activePool.targetPricePerKg).toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setJoinModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmJoin}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
