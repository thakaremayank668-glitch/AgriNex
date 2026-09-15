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
  PieChart,
  History,
  Download,
  FileText,
  Calendar
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
  const [activeTab, setActiveTab] = useState<'pools' | 'farmers' | 'inventory' | 'history'>('pools');
  const [newPoolModalOpen, setNewPoolModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const handleExportFpoHistory = () => {
    const timestamp = new Date().toLocaleString('en-IN');
    let csv = `AGRINEX - FPO POOL DISPATCH & MEMBER PAYOUT LEDGER\n`;
    csv += `Exported On,${timestamp}\n`;
    csv += `FPO Cooperative,Sanand Kisan Sangh Hub\n`;
    csv += `FPO Registration ID,FPO-GJ-SND-2024-098\n\n`;
    csv += `Pool / Batch ID,Crop Name,Aggregated Volume (kg),Target Buyer,Contract Value (INR),Contributing Farmers,Disbursement Status,Settlement Date\n`;
    csv += `"POOL-AHM-TOM-01","Tomato (Hybrid Desi)",2000,"Reliance Fresh Hub",Rs 60000,4,"100% Disbursed to Farmers","2026-09-10"\n`;
    csv += `"POOL-KHD-ONI-02","Red Onion (Nashik Quality)",3500,"BigBasket Fulfilment Center",Rs 112000,7,"100% Disbursed to Farmers","2026-09-02"\n`;
    csv += `"POOL-SND-POT-03","Kufri Jyoti Potato",4000,"ITC Foods Ltd",Rs 104000,6,"Escrow Released","2026-08-25"\n`;
    csv += `\n--- MEMBER FARMER DISBURSEMENT LEDGER ---\n`;
    csv += `Farmer ID,Farmer Name,Village,Contributed (kg),Rate (INR/kg),Gross Payout (INR),Bank UTR Reference,Status\n`;
    csv += `"GJ-SND-101","Ramesh Patel","Sanand",600,30,18000,"UTRN-AGX-SND-0918","Credited (DBT Direct)"\n`;
    csv += `"GJ-SND-104","Kalu Rabari","Bavla",400,30,12000,"UTRN-AGX-SND-0919","Credited (DBT Direct)"\n`;
    csv += `"GJ-SND-109","Dinesh Vaghela","Sanand",500,30,15000,"UTRN-AGX-SND-0920","Credited (DBT Direct)"\n`;
    csv += `"GJ-SND-112","Govind Solanki","Chhatral",500,30,15000,"UTRN-AGX-SND-0921","Credited (DBT Direct)"\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Agrinex_FPO_Settlement_History_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      {/* LEFT SIDEBAR: SUB-MENU BUTTONS */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 space-y-4">
        <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-xs space-y-2">
          <div className="px-3 pt-2 pb-1 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
              FPO Sub-Menu
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold border border-purple-200">
              Aggregator
            </span>
          </div>

          <nav aria-label="FPO sub-menu" className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible py-1">
            {[
              { id: 'pools', label: 'Aggregated Pools', icon: <Users className="w-4 h-4" />, badge: `${pools.length} active` },
              { id: 'farmers', label: 'Member Smallholders', icon: <CheckCircle2 className="w-4 h-4" />, badge: '128 total' },
              { id: 'inventory', label: 'Hub Cold Storage', icon: <Sparkles className="w-4 h-4" />, badge: '64% cap' },
              { id: 'history', label: 'Pool Settlement History', icon: <History className="w-4 h-4" />, badge: 'Ledger' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`fpo-submenu-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs transition-all w-auto shrink-0 whitespace-nowrap lg:w-full text-left ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-white' : 'text-purple-700'}>{tab.icon}</span>
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                        isActive
                          ? 'bg-purple-800 text-purple-100'
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

        {/* FPO Cooperative Info Card on Left Sidebar */}
        <div className="hidden lg:block bg-stone-900 rounded-3xl p-4 text-white border border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-sm">
              FPO
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-white block truncate">Sanand Kisan Sangh</span>
              <span className="text-[11px] text-stone-400 block truncate">Registered Cooperative Hub</span>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-400">Patronage Fund</span>
              <span className="font-mono font-bold text-emerald-400">₹1,42,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Hub Storage</span>
              <span className="font-medium text-stone-300">Sanand Aggregation Cold Store</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Land Verified</span>
              <span className="text-emerald-400 font-medium">100% 7/12 RoR</span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE: MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 w-full space-y-6">
        {notificationMsg && (
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 flex items-center justify-between text-xs font-semibold animate-in fade-in">
            <span>{notificationMsg}</span>
            <button onClick={() => setNotificationMsg(null)} className="text-purple-700 hover:text-purple-950">✕</button>
          </div>
        )}

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

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenAiQuality}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>AI Batch Quality Grading</span>
            </button>

            <button
              id="export-fpo-history-btn"
              onClick={handleExportFpoHistory}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-purple-300 text-purple-900 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap shadow-2xs"
              title="Download full FPO settlement and member payout ledger CSV"
            >
              <Download className="w-4 h-4 text-purple-700 shrink-0" />
              <span>Export History (CSV)</span>
            </button>

            <button
              onClick={() => setNewPoolModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Create New Pool</span>
            </button>
          </div>
        </div>

        {/* VIEW: AGGREGATED POOLS */}
        {activeTab === 'pools' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Active Institutional Aggregation Pools
              </h3>
              <span className="text-xs text-stone-600">Fulfilling corporate contracts with smallholder supply</span>
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
        )}

        {/* VIEW: MEMBER SMALLHOLDERS */}
        {activeTab === 'farmers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Registered Cooperative Smallholders (128 Farmers)
              </h3>
              <span className="text-xs text-emerald-700 font-bold">100% Land Records Synced</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'Ramesh Patel', village: 'Sanand', land: '4.5 Acres', crop: 'Tomato & Wheat', share: '₹18,000 paid' },
                { name: 'Kalu Rabari', village: 'Bavla', land: '3.2 Acres', crop: 'Red Onion', share: '₹12,000 paid' },
                { name: 'Dinesh Vaghela', village: 'Sanand', land: '5.0 Acres', crop: 'Potato (Kufri Jyoti)', share: '₹15,000 paid' },
                { name: 'Govind Solanki', village: 'Chhatral', land: '2.8 Acres', crop: 'Capsicum', share: '₹15,000 paid' },
              ].map((f, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">{f.name}</span>
                    <span className="text-[11px] text-stone-600">{f.village} • {f.land} • {f.crop}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                    {f.share}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: HUB COLD STORAGE */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Sanand Central Aggregation Hub • Cold Chamber #2
              </h3>
              <span className="text-xs text-purple-800 font-bold bg-purple-100 px-2.5 py-1 rounded-lg">64% Capacity (12.8 / 20 Tons)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Chamber Temperature</span>
                <span className="text-xl font-mono font-black text-stone-900 mt-1 block">4.2°C (Optimal)</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Zero post-harvest loss</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Relative Humidity</span>
                <span className="text-xl font-mono font-black text-stone-900 mt-1 block">88% RH</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Perishable safe</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Scheduled Dispatches</span>
                <span className="text-xl font-mono font-black text-purple-800 mt-1 block">3 Reefer Trucks</span>
                <span className="text-[11px] text-purple-700 font-semibold">Leaving today 18:00</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: POOL SETTLEMENT & MEMBER PAYOUT HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <div>
                <h3 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Aggregated Pool Payout & Settlement History</span>
                </h3>
                <p className="text-xs text-purple-900/80 mt-0.5">
                  Complete ledger of finalized corporate bulk contracts and direct DBT payouts to member farmers.
                </p>
              </div>

              <button
                id="fpo-history-download-btn"
                onClick={handleExportFpoHistory}
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 whitespace-nowrap transition-all"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Report (CSV)</span>
              </button>
            </div>

            {/* Historical Batches */}
            <div className="space-y-3">
              {[
                {
                  batchId: 'POOL-AHM-TOM-01',
                  crop: 'Tomato (Hybrid Desi)',
                  buyer: 'Reliance Fresh Hub',
                  volume: '2,000 kg',
                  value: '₹60,000',
                  farmers: 4,
                  date: '2026-09-10',
                  status: '100% Disbursed to Farmers'
                },
                {
                  batchId: 'POOL-KHD-ONI-02',
                  crop: 'Red Onion (Nashik Quality)',
                  buyer: 'BigBasket Fulfilment Center',
                  volume: '3,500 kg',
                  value: '₹1,12,000',
                  farmers: 7,
                  date: '2026-09-02',
                  status: '100% Disbursed to Farmers'
                },
                {
                  batchId: 'POOL-SND-POT-03',
                  crop: 'Kufri Jyoti Potato',
                  buyer: 'ITC Foods Ltd',
                  volume: '4,000 kg',
                  value: '₹1,04,000',
                  farmers: 6,
                  date: '2026-08-25',
                  status: 'Escrow Released & Settled'
                }
              ].map((item) => (
                <div key={item.batchId} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                        {item.batchId}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-xs font-bold text-stone-900">{item.crop}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[11px] text-stone-500">{item.date}</span>
                    </div>
                    <span className="text-xs text-stone-600 block">
                      Buyer: <strong className="text-stone-800">{item.buyer}</strong> • Volume: {item.volume} • {item.farmers} contributing smallholders
                    </span>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-200">
                    <div className="text-left md:text-right">
                      <span className="text-sm font-mono font-black text-stone-900 block">{item.value}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block">
                        ✓ {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
              setNotificationMsg('New Yield Pool created and broadcasted to 128 registered farmers in Sanand cluster via SMS & App notification!');
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
