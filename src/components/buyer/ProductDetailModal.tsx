import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Truck, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Crop } from '../../types';

interface ProductDetailModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
  onInitiateOrder: (crop: Crop, isSmartPool: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  crop,
  isOpen,
  onClose,
  onInitiateOrder,
}) => {
  if (!isOpen || !crop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden text-stone-900 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-700">{crop.category}</span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-700">Batch #{crop.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Large Crop Image & Grade Overlay */}
          <div className="relative rounded-2xl overflow-hidden aspect-video max-h-64 border border-stone-200 shadow-inner">
            <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Quality Score: {crop.qualityScore}/100</span>
            </div>

            <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-black shadow-md">
              Grade {crop.qualityGrade}
            </div>

            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-stone-900 px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{crop.distanceKm} km away ({crop.farmerVillage}, {crop.farmerDistrict})</span>
            </div>
          </div>

          {/* Title & Seller Verification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">{crop.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-stone-700">Seller: {crop.farmerName}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Farmer ✓</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-stone-700 block">Fair Floor Price</span>
              <span className="text-3xl font-black text-emerald-800">₹{crop.fairFloorPricePerKg}</span>
              <span className="text-xs font-semibold text-stone-700"> / kg</span>
            </div>
          </div>

          {/* Mandated Specification Metrics:
              Quality Score: 87/100
              Freshness: Good
              Grade: A
              Available: 500 kg
              Fair Floor Price: ₹30/kg
          */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Available Stock</span>
              <span className="text-xl font-black text-stone-900 mt-0.5 block">{crop.listedKg.toLocaleString()} kg</span>
              <span className="text-[10px] text-stone-700">Direct from single farm</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Quality Grade</span>
              <span className="text-xl font-black text-amber-700 mt-0.5 block">Grade {crop.qualityGrade}</span>
              <span className="text-[10px] text-stone-700">{crop.qualityScore}/100 Score</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Freshness</span>
              <span className="text-xl font-black text-emerald-800 mt-0.5 block">{crop.freshness}</span>
              <span className="text-[10px] text-stone-700">Harvest: {crop.harvestDate}</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold block">Location</span>
              <span className="text-base font-black text-stone-900 mt-0.5 block truncate">{crop.farmerDistrict}</span>
              <span className="text-[10px] text-stone-700">{crop.distanceKm} km transit</span>
            </div>
          </div>

          {/* TRANSPARENT COST BREAKDOWN MANDATED IN SECTION 11:
              Cultivation Cost: ₹25/kg
              Farmer Margin: ₹5/kg
              Fair Price: ₹30/kg
          */}
          <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>AgriNex Open Cost Transparency Ledger</span>
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Zero Middleman Markup</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-stone-800 border border-stone-700">
                <span className="text-[10px] text-stone-400 block font-medium">Cultivation Cost</span>
                <span className="text-base font-black text-stone-200 mt-0.5 block">₹{crop.costPerKg}/kg</span>
                <span className="text-[10px] text-stone-400">Seeds, Water, Labour</span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-800 border border-stone-700">
                <span className="text-[10px] text-stone-400 block font-medium">Farmer Margin</span>
                <span className="text-base font-black text-emerald-400 mt-0.5 block">+₹{crop.farmerMarginPerKg}/kg</span>
                <span className="text-[10px] text-stone-400">Living wage profit</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-600">
                <span className="text-[10px] text-emerald-300 block font-medium">Fair Price</span>
                <span className="text-base font-black text-white mt-0.5 block">₹{crop.fairFloorPricePerKg}/kg</span>
                <span className="text-[10px] text-emerald-400 font-bold">100% to Farmer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs: "Buy Now" and "Join Pool" */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={() => onInitiateOrder(crop, true)}
            className="flex-1 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Users className="w-4 h-4 text-purple-700" />
            <span>Procure via Smart Pool</span>
          </button>

          <button
            onClick={() => onInitiateOrder(crop, false)}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy Now (Direct)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
