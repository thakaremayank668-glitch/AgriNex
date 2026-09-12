import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  CreditCard,
  Building,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'price-policy'>('overview');

  const verificationQueue = [
    { id: 'VER-401', farmerName: 'Suresh Patel', surveyNo: '189/4', village: 'Sanand', district: 'Ahmedabad', acres: 3.2, doc: 'RoR_7_12_Suresh.pdf', status: 'Pending OCR' },
    { id: 'VER-402', farmerName: 'Dhirubhai Ahir', surveyNo: '72/B', village: 'Deesa', district: 'Banaskantha', acres: 6.0, doc: 'RoR_7_12_Dhiru.pdf', status: 'Pending OCR' },
    { id: 'VER-403', farmerName: 'Laxman Solanki', surveyNo: '311/1', village: 'Mandal', district: 'Ahmedabad', acres: 2.5, doc: 'RoR_7_12_Laxman.pdf', status: 'Flagged Discrepancy' },
  ];

  const tradeMetricsData = [
    { month: 'Apr', volumeMt: 4200, valueCr: 9.2 },
    { month: 'May', volumeMt: 5800, valueCr: 12.8 },
    { month: 'Jun', volumeMt: 6400, valueCr: 14.1 },
    { month: 'Jul', volumeMt: 7100, valueCr: 16.3 },
    { month: 'Aug', volumeMt: 8900, valueCr: 21.0 },
    { month: 'Sep', volumeMt: 10400, valueCr: 24.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 rounded-3xl p-6 text-white border border-stone-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Smart India Hackathon 2026 Admin Operations Console
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Ecosystem Governance & Oversight</h1>
          <p className="text-xs text-stone-400">Auditing land verification pipelines, fair price policy formulas, and trust escrow balances</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            System Status: 100% Operational
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Registered Smallholders</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-stone-900 tracking-tight">14,820</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">+1,240 this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Total Traded Volume</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-stone-900 tracking-tight">38,400</span>
            <span className="text-xs text-stone-500">MT</span>
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">Zero intermediary leakages</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Farmer Income Lift</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-700 tracking-tight">+34.8%</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Compared to APMC Mandi rates</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Escrow Protected Funds</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-sky-700 tracking-tight">₹4.82 Cr</span>
          </div>
          <span className="text-[11px] text-sky-700 font-semibold mt-1 block">Held in virtual trustee vault</span>
        </div>
      </div>

      {/* Main Grid: Recharts Platform Growth + Verification Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recharts Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-stone-900">Procurement Volume Progression (MT Traded)</h2>
              <p className="text-xs text-stone-500">Demonstrating institutional buyer migration from APMC to AgriNex Smart Pools</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">+147% YoY</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradeMetricsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val} MT`, 'Volume']}
                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="volumeMt" fill="#15803d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Queue Mandated in Spec */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-stone-900">Land Verification Audit Queue</h2>
              <p className="text-xs text-stone-500">AnyRoR 7/12 OCR extraction validation</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              3 Pending
            </span>
          </div>

          <div className="space-y-3">
            {verificationQueue.map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">{item.farmerName}</span>
                    <span className="text-[10px] text-stone-500">
                      Survey #{item.surveyNo} • {item.village}, {item.district} ({item.acres} Acres)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-stone-500 font-mono">{item.doc}</span>
                  <button
                    onClick={() => alert(`Validated 7/12 RoR for ${item.farmerName}. Trust badge issued!`)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                  >
                    Approve ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
