import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  Warehouse, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Search, 
  Truck, 
  DollarSign, 
  ChevronRight,
  PieChart
} from 'lucide-react';
import { YieldPool, Crop } from '../../types';

interface FpoDashboardProps {
  pools: YieldPool[];
  crops: Crop[];
  onOpenAiQuality: () => void;
}

export const FpoDashboard: React.FC<FpoDashboardProps> = ({
  pools,
  crops,
  onOpenAiQuality,
}) => {
  const [activeTab, setActiveTab] = useState<'pools' | 'farmers' | 'inventory'>('pools');
  const [newPoolModalOpen, setNewPoolModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Metric Strip for FPO Aggregator */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Member Farmers</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-stone-900 tracking-tight">128</span>
            <span className="text-xs text-stone-500">smallholders</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">100% 7/12 Land Verified</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Active Pools</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-purple-700 tracking-tight">{pools.length}</span>
            <span className="text-xs text-stone-500">village clusters</span>
          </div>
          <span className="text-[11px] text-purple-700 font-semibold mt-1 block">4,200 kg committed</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Hub Cold Storage</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-stone-900 tracking-tight">64%</span>
            <span className="text-xs text-stone-500">capacity</span>
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">Sanand Aggregation Hub</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">FPO Shared Patronage</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-700 tracking-tight">₹1,42,800</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Direct to Village Cooperative</span>
        </div>
      </div>

      {/* Main Hub Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-stone-900">Sanand Farmers Producer Organization (FPO)</h2>
            <p className="text-xs text-stone-700">Multi-farmer inventory pooling, collective price bargaining, and quality certification hub</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiQuality}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Batch Quality Grading</span>
            </button>

            <button
              onClick={() => setNewPoolModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Pool</span>
            </button>
          </div>
        </div>

        {/* Aggregated Pools List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
              Active Institutional Aggregation Pools
            </h3>
            <span className="text-xs text-stone-700">Fulfilling corporate contracts with smallholder supply</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pools.map((pool) => {
              const pct = Math.round((pool.collectedKg / pool.buyerRequirementKg) * 100);
              return (
                <div key={pool.id} className="p-5 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        {pool.status}
                      </span>
                      <h4 className="text-base font-black text-stone-900 mt-1">{pool.cropName}</h4>
                      <span className="text-xs text-stone-700">Buyer: <strong>{pool.buyerName}</strong></span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-700 block">Floor Rate</span>
                      <span className="text-xl font-black text-emerald-800">₹{pool.targetPricePerKg}/kg</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-stone-700">
                      <span>{pool.collectedKg.toLocaleString()} / {pool.buyerRequirementKg.toLocaleString()} kg</span>
                      <span className="text-purple-700">{pct}%</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-700 border-t border-stone-200/60">
                    <span>{pool.farmersCount} Participating Farmers</span>
                    <span>Hub: {pool.pickupHub.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CREATE POOL MODAL */}
      {newPoolModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-stone-900">Create Aggregated Yield Pool</h3>
              <button onClick={() => setNewPoolModalOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('New Yield Pool created and broadcasted to 128 registered farmers in Sanand cluster via SMS & App notification!');
              setNewPoolModalOpen(false);
            }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-800 block mb-1">Target Crop</label>
                <input type="text" defaultValue="Green Chilli (G4 Teja)" className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Target Volume (kg)</label>
                  <input type="number" defaultValue={3000} className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Contract Floor (₹/kg)</label>
                  <input type="number" defaultValue={45} className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-emerald-800" />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Buyer Partner</label>
                <input type="text" defaultValue="Zomato Hyperpure Ltd" className="w-full px-3 py-2 rounded-xl border border-stone-300" />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPoolModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold shadow-md"
                >
                  Broadcast Pool to Farmers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
