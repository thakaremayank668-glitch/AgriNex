import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { CURRENT_FARMER } from '../../data/mockData';

export const LandVerificationView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'record' | 'cadastral' | 'audit'>('record');
  const farmer = CURRENT_FARMER;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-stone-900 tracking-tight">Farmer Verification</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>✓ Land Verified</span>
                </span>
              </div>
              <p className="text-xs text-stone-700">Official digital RoR (Record of Rights 7/12 & 8-A) authentication</p>
            </div>
          </div>
        </div>

        <div className="p-2 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
          <Info className="w-4 h-4 text-stone-500" />
          <span className="text-[11px] font-mono">Demo Verification Sandbox (AnyRoR Gujarat API)</span>
        </div>
      </div>

      {/* Main Grid: Details + Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Land Parcel & Verification Status */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-stone-900">Verified Land Registry Extract</h2>
              <span className="text-xs text-emerald-700 font-mono font-bold">Active Survey Parcel</span>
            </div>

            {/* Information Grid mandated in spec */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] text-stone-500 block font-medium">Farmer Name</span>
                <span className="text-sm font-black text-stone-900 mt-0.5 block">{farmer.name}</span>
                <span className="text-[10px] text-stone-400 font-mono">ID: {farmer.farmerId}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] text-stone-500 block font-medium">Village</span>
                <span className="text-sm font-black text-stone-900 mt-0.5 block">{farmer.village}</span>
                <span className="text-[10px] text-stone-400">Taluka: {farmer.taluka}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] text-stone-500 block font-medium">Survey Number</span>
                <span className="text-sm font-black text-emerald-700 mt-0.5 block font-mono">{farmer.surveyNumber}</span>
                <span className="text-[10px] text-stone-400 font-mono">Khata: {farmer.khataNumber}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] text-stone-500 block font-medium">Land Area</span>
                <span className="text-sm font-black text-stone-900 mt-0.5 block">{farmer.landAreaAcres} Acres</span>
                <span className="text-[10px] text-stone-400">(1.82 Hectares)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] text-stone-500 block font-medium">District & State</span>
                <span className="text-sm font-black text-stone-900 mt-0.5 block">{farmer.district}</span>
                <span className="text-[10px] text-stone-400">{farmer.state}, India</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] text-stone-500 block font-medium">Soil Health Card</span>
                <span className="text-sm font-black text-emerald-700 mt-0.5 block">Linked ✓</span>
                <span className="text-[10px] text-stone-400">NPK Certified 2026</span>
              </div>
            </div>

            {/* Verification Status Legend as specified */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-stone-800 block">AgriNex Tier Verification System:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white border border-emerald-300 flex items-center gap-1.5 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified ✓</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-amber-300 flex items-center gap-1.5 text-amber-800 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pending</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-red-300 flex items-center gap-1.5 text-red-800 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  <span>Rejected</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-stone-300 flex items-center gap-1.5 text-stone-700 font-medium">
                  <Layers className="w-3.5 h-3.5 text-stone-500" />
                  <span>Needs Review</span>
                </div>
              </div>
            </div>

            {/* Why Buyers Care */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Buyer Trust Shield:</span>
              </span>
              <p className="leading-relaxed">
                7/12 Land Verification prevents ghost sellers, trader masquerading, and fake volume listings. Institutional buyers pay a <strong>5% premium</strong> for crops from 100% verified acreage.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Document Section Preview */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900">Document Records (RoR 7/12)</h2>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Digitally Signed</span>
            </span>
          </div>

          {/* Digital Document Box Preview */}
          <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-[11px] truncate max-w-[200px]">{farmer.verificationDocName}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px]">VERIFIED</span>
            </div>

            <div className="space-y-1 text-[11px] text-stone-300">
              <p>State: Revenue Department, Govt of Gujarat</p>
              <p>District: Ahmedabad (07) | Taluka: Sanand (04)</p>
              <p>Survey No: 142/2-A | Area: 1-82-11 Ha</p>
              <p>Primary Cultivator: RAMESH K PATEL</p>
              <p>Soil Type: Black Cotton Loam | Water Source: Borewell</p>
              <p className="text-emerald-400 pt-1">Cryptographic Hash: e8f92a10c439...[Verified]</p>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[10px] text-stone-400">Timestamp: 2026-09-01 10:14 IST</span>
              <button className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] flex items-center gap-1 font-sans">
                <Download className="w-3 h-3" />
                <span>Download RoR</span>
              </button>
            </div>
          </div>

          {/* Mandatory Demo Disclaimer from user prompt */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
            <span className="font-bold text-stone-800 block">Demonstration Transparency Notice:</span>
            <p>
              This screen displays a simulated <strong>Demo Verification</strong> workflow connecting with the Indian State Revenue Land Records standard. It demonstrates automated OCR extraction, cadastral plot boundary mapping, and digital signature validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
