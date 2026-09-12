import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  HelpCircle, 
  Sparkles,
  PieChart as PieIcon,
  ChevronRight,
  ShieldAlert,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface FairPriceCalculatorProps {
  onApplyToListing?: (cropName: string, fairPrice: number, costPerKg: number) => void;
  onJoinPool?: () => void;
}

export const FairPriceCalculator: React.FC<FairPriceCalculatorProps> = ({
  onApplyToListing,
  onJoinPool,
}) => {
  const [step, setStep] = useState<number>(3); // Default at step 3 to showcase rich calculator immediately!
  const [selectedCrop, setSelectedCrop] = useState('Tomato (Hybrid Desi)');
  const [expectedYieldKg, setExpectedYieldKg] = useState<number>(1000);
  const [desiredMarginPerKg, setDesiredMarginPerKg] = useState<number>(5);

  // 12 specific cultivation cost fields requested in user prompt
  const [costs, setCosts] = useState<Record<string, number>>({
    land: 3000,
    fieldPrep: 2500,
    seeds: 2200,
    fertilizer: 3800,
    pesticides: 1500,
    irrigation: 2000,
    labour: 4000,
    machinery: 2000,
    harvesting: 1800,
    packaging: 800,
    transportation: 1000,
    other: 400,
  });

  const costLabels: Record<string, { label: string; icon: string }> = {
    land: { label: 'Land Lease / Rent', icon: '🏞️' },
    fieldPrep: { label: 'Field Preparation', icon: '🚜' },
    seeds: { label: 'Seeds & Nursery', icon: '🌱' },
    fertilizer: { label: 'Fertilizer & Nutrients', icon: '🧪' },
    pesticides: { label: 'Pesticides & Bio-agents', icon: '🛡️' },
    irrigation: { label: 'Irrigation & Electricity', icon: '💧' },
    labour: { label: 'Manual Farm Labour', icon: '👥' },
    machinery: { label: 'Machinery & Tractor Fuel', icon: '⚙️' },
    harvesting: { label: 'Harvesting & Sorting', icon: '🌾' },
    packaging: { label: 'Crates & Packaging', icon: '📦' },
    transportation: { label: 'Local Transport to Hub', icon: '🚛' },
    other: { label: 'Other Sundries & Mandi Cesses', icon: '🧾' },
  };

  const handleCostChange = (key: string, val: number) => {
    setCosts((prev) => ({
      ...prev,
      [key]: isNaN(val) ? 0 : Math.max(0, val),
    }));
  };

  // Calculations
  const totalCost: number = (Object.values(costs) as number[]).reduce((sum: number, item: number) => sum + item, 0);
  const costPerKg: number = expectedYieldKg > 0 ? Number((totalCost / expectedYieldKg).toFixed(2)) : 0;
  const fairFloorPrice = costPerKg + desiredMarginPerKg;
  const marketPrice = 28; // APMC Mandi current benchmark price
  const priceDifference = fairFloorPrice - marketPrice;
  const potentialProfitAtFairPrice = desiredMarginPerKg * expectedYieldKg;
  const potentialLossAtMandi = (costPerKg - marketPrice) * expectedYieldKg;

  // Chart data
  const chartData = [
    { name: 'Fertilizer', amount: costs.fertilizer, fill: '#15803d' },
    { name: 'Labour', amount: costs.labour, fill: '#16a34a' },
    { name: 'Land', amount: costs.land, fill: '#b45309' },
    { name: 'Field Prep', amount: costs.fieldPrep, fill: '#d97706' },
    { name: 'Seeds', amount: costs.seeds, fill: '#059669' },
    { name: 'Irrigation', amount: costs.irrigation, fill: '#0284c7' },
    { name: 'Machinery', amount: costs.machinery, fill: '#475569' },
    { name: 'Harvesting', amount: costs.harvesting, fill: '#65a30d' },
    { name: 'Pesticides', amount: costs.pesticides, fill: '#84cc16' },
    { name: 'Transport', amount: costs.transportation, fill: '#0369a1' },
    { name: 'Packaging', amount: costs.packaging, fill: '#eab308' },
    { name: 'Other', amount: costs.other, fill: '#a8a29e' },
  ].sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Context Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-900 tracking-tight">Calculate Your Fair Price</h1>
              <p className="text-xs text-stone-700">
                Scientific cost-of-cultivation engine that computes your true break-even and guarantees living margins.
              </p>
            </div>
          </div>
        </div>

        {/* Stepper indicator */}
        <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-2xl border border-stone-200 text-xs">
          {[
            { num: 1, label: 'Crop' },
            { num: 2, label: 'Yield' },
            { num: 3, label: 'Cultivation Costs' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                step === s.num
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                step === s.num ? 'bg-emerald-900 text-white' : 'bg-stone-300 text-stone-800'
              }`}>
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input Forms (Steps 1, 2, 3) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1 & 2 Quick Controls */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Step 1 & 2: Crop & Harvest Parameters
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Recalculation</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Select Crop (પાક પસંદ કરો)
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Tomato (Hybrid Desi)">Tomato (Hybrid Desi)</option>
                  <option value="Red Onion (Nashik Quality)">Red Onion (Nashik Quality)</option>
                  <option value="Kufri Jyoti Potato">Kufri Jyoti Potato</option>
                  <option value="Sharbati Wheat">Sharbati Wheat</option>
                  <option value="Green Capsicum">Green Capsicum</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Expected Yield (અંદાજિત ઉત્પાદન)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={expectedYieldKg}
                    onChange={(e) => setExpectedYieldKg(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm font-black focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-bold text-stone-500">kg</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                <span>Farmer Desired Margin per kg:</span>
                <span className="font-bold text-emerald-800 text-sm">₹{desiredMarginPerKg} / kg (Fair Profit)</span>
              </div>
              <input
                type="range"
                min={2}
                max={15}
                step={1}
                value={desiredMarginPerKg}
                onChange={(e) => setDesiredMarginPerKg(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-600 mt-1">
                <span>₹2 (Minimum survival)</span>
                <span>₹5 (Recommended Fair Margin)</span>
                <span>₹15 (Premium grade export)</span>
              </div>
            </div>
          </div>

          {/* Step 3: Enter Cultivation Costs (The 12 Fields) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-stone-900">Step 3: Enter Cultivation Costs</h2>
                <p className="text-xs text-stone-700">Detailed expenditure for 1.0 Acre harvest cycle</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono font-bold">
                Total: ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {Object.keys(costs).map((key) => {
                const item = costLabels[key];
                return (
                  <div key={key} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs font-bold text-stone-500">₹</span>
                      <input
                        type="number"
                        value={costs[key]}
                        onChange={(e) => handleCostChange(key, Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-900 font-bold text-sm focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results Card & Economic Comparison */}
        <div className="lg:col-span-5 space-y-6">
          {/* THE RESULT CARD (From Spec) */}
          <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 rounded-3xl p-6 text-white border border-emerald-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase">
                AgriNex Fair Pricing Engine Output
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Verified Formula v2.6
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
                <span className="text-[11px] text-stone-400 block font-medium">Total Cost</span>
                <span className="text-lg font-black text-white mt-0.5 block">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-stone-400">for {expectedYieldKg.toLocaleString()} kg</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
                <span className="text-[11px] text-stone-400 block font-medium">Cost per kg (Break-even)</span>
                <span className="text-lg font-black text-amber-400 mt-0.5 block">
                  ₹{costPerKg} / kg
                </span>
                <span className="text-[10px] text-stone-400">Zero-profit baseline</span>
              </div>
            </div>

            {/* Farmer Margin & Big Fair Floor Price */}
            <div className="p-4 rounded-2xl bg-emerald-900/60 border-2 border-emerald-500/70 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-300 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Farmer Guaranteed Margin: ₹{desiredMarginPerKg}/kg</span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-emerald-200 font-bold block">
                FAIR FLOOR PRICE
              </span>
              <div className="text-4xl font-black text-white tracking-tight py-1">
                ₹{fairFloorPrice}<span className="text-lg font-normal text-emerald-300"> / kg</span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Formula: Cultivation Cost (₹{costPerKg}) + Fair Margin (₹{desiredMarginPerKg})
              </p>
            </div>

            {/* Comparison with Market Price */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium">Current Mandi Price:</span>
                <span className="font-bold text-stone-200 text-sm">₹{marketPrice} / kg</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-stone-800 pt-2">
                <span className="text-stone-400 font-medium">AgriNex Fair Price:</span>
                <span className="font-bold text-emerald-400 text-sm">₹{fairFloorPrice} / kg</span>
              </div>

              {/* Crucial Banner Mandated in Spec */}
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-xs font-black block text-amber-300 uppercase">
                    "Do not sell below ₹{fairFloorPrice}/kg"
                  </span>
                  <span className="text-[11px] text-amber-200/90">
                    Mandi price of ₹{marketPrice} creates a loss of ₹{priceDifference}/kg against your living cost.
                  </span>
                </div>
              </div>
            </div>

            {/* Potential Profit Showcase */}
            <div className="p-3.5 rounded-2xl bg-stone-800/70 border border-stone-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Net Farmer Profit at Fair Price</span>
                <span className="text-emerald-400 font-black text-base">
                  +₹{potentialProfitAtFairPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block text-[10px]">At Mandi Rate (₹28)</span>
                <span className="text-red-400 font-bold text-xs">
                  -₹{potentialLossAtMandi.toLocaleString('en-IN')} Loss
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  if (onApplyToListing) onApplyToListing(selectedCrop, fairFloorPrice, costPerKg);
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>List Crop at ₹{fairFloorPrice}/kg</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onJoinPool}
                className="w-full py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Join Yield Pool at ₹{fairFloorPrice}/kg</span>
              </button>
            </div>
          </div>

          {/* Visual Cost Breakdown Chart */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Cost Breakdown (Highest Expenses)
              </h2>
              <span className="text-[11px] text-stone-500 font-medium">Recharts Visualizer</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.slice(0, 6)} layout="vertical" margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11, fill: '#44403c' }} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Cost']}
                    contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {chartData.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
