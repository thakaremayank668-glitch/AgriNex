import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Clock, 
  Filter, 
  Search, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Info
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MandiPrice } from '../../types';

interface MarketPricesViewProps {
  mandiPrices: MandiPrice[];
  onSelectCropForCalculator?: (cropName: string) => void;
}

export const MarketPricesView: React.FC<MarketPricesViewProps> = ({
  mandiPrices,
  onSelectCropForCalculator,
}) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const [locationFilter, setLocationFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const activeMandi = mandiPrices[selectedCropIndex] || mandiPrices[0];

  const filteredPrices = mandiPrices.filter((item) => {
    const matchesSearch = item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.marketLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLoc = locationFilter === 'All' || item.marketLocation.includes(locationFilter);
    return matchesSearch && matchesLoc;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-900 tracking-tight">Live APMC Mandi Market Prices</h1>
              <p className="text-xs text-stone-700">Real-time terminal market intelligence across Gujarat & Western India APMC mandis</p>
            </div>
          </div>
        </div>

        {/* Search & Location Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search crop or APMC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 focus:outline-hidden"
          >
            <option value="All">All Mandis</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Nashik">Nashik</option>
            <option value="Deesa">Deesa</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Crop Cards & Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CROP CARDS & TABLE */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredPrices.map((mandi, idx) => {
              const isSelected = activeMandi.cropName === mandi.cropName;
              return (
                <div
                  key={mandi.cropName}
                  onClick={() => setSelectedCropIndex(idx)}
                  className={`p-5 rounded-3xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-sm font-black text-stone-900 block">{mandi.cropName}</span>
                      <span className="text-[11px] text-stone-700 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-600" />
                        <span className="truncate max-w-[140px]">{mandi.marketLocation}</span>
                      </span>
                    </div>

                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      mandi.trend === 'up'
                        ? 'bg-emerald-100 text-emerald-800'
                        : mandi.trend === 'down'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-stone-100 text-stone-800'
                    }`}>
                      {mandi.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                      {mandi.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                      {mandi.trend === 'stable' && <Minus className="w-3 h-3" />}
                      <span>{mandi.changePercent > 0 ? `+${mandi.changePercent}%` : `${mandi.changePercent}%`}</span>
                    </div>
                  </div>

                  {/* Big Price Display */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-stone-900 tracking-tight">
                        ₹{mandi.currentPrice}
                      </span>
                      <span className="text-xs font-semibold text-stone-700"> / kg</span>
                    </div>
                    <span className="text-[10px] text-stone-700 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-stone-600" />
                      <span>{mandi.lastUpdated}</span>
                    </span>
                  </div>

                  {/* Range Spread: Min, Avg, Max */}
                  <div className="mt-3 pt-2 border-t border-stone-100 grid grid-cols-3 text-center text-[10px]">
                    <div>
                      <span className="text-stone-700 block">Min</span>
                      <span className="font-bold text-stone-800">₹{mandi.minPrice}</span>
                    </div>
                    <div className="border-x border-stone-100">
                      <span className="text-stone-700 block">Average</span>
                      <span className="font-bold text-emerald-800">₹{mandi.averagePrice}</span>
                    </div>
                    <div>
                      <span className="text-stone-700 block">Max</span>
                      <span className="font-bold text-stone-800">₹{mandi.maxPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Guidance Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Smart Mandi Arbitrage Alert:</span>
              <span>
                AgriNex monitors 42 nearby mandis. When local APMC rates drop below your calculated fair cost (e.g. Tomato at ₹28 vs Fair Floor of ₹30), our smart yield pooling matches you with institutional buyers paying above fair floor price.
              </span>
            </div>
          </div>
        </div>

        {/* 7-DAY PRICE TREND RECHARTS GRAPH */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                7-Day Price Movement & Modal Rates
              </span>
              <h2 className="text-base font-black text-stone-900 mt-0.5">
                {activeMandi.cropName} @ {activeMandi.marketLocation}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-stone-900">₹{activeMandi.currentPrice}/kg</span>
              <span className="text-[10px] text-stone-500 block">Current Modal Rate</span>
            </div>
          </div>

          {/* Recharts Line Chart */}
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeMandi.historicalTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                  formatter={(val: any, name: any) => [`₹${val}/kg`, name === 'price' ? 'Closing Price' : 'Modal Rate']}
                />
                <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="modalPrice" stroke="#d97706" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-stone-600 border-t border-stone-100 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span>APMC Trading Price (₹/kg)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-amber-600 border border-amber-600 border-dashed" />
              <span>Weighted Modal Average</span>
            </div>
          </div>

          {/* Direct Action */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (onSelectCropForCalculator) onSelectCropForCalculator(activeMandi.cropName);
              }}
              className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Calculate Fair Floor for {activeMandi.cropName}</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
