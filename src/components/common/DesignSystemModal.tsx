import React, { useState } from 'react';
import { 
  Layers, 
  X, 
  Check, 
  AlertCircle, 
  Loader2, 
  Search, 
  ChevronDown, 
  Mic, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'buttons' | 'inputs' | 'badges' | 'cards'>('tokens');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden text-stone-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">AgriNex UI/UX Design System</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SIH 2026 Specification
                </span>
              </div>
              <p className="text-xs text-stone-400">Human-Centered, Rural-Friendly & Data-Driven AgriTech System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-stone-800 bg-stone-950/40 flex gap-2 overflow-x-auto text-xs py-2">
          {[
            { id: 'tokens', label: '1. Foundations & Tokens' },
            { id: 'buttons', label: '2. Button States' },
            { id: 'inputs', label: '3. Inputs & Forms' },
            { id: 'badges', label: '4. Badges & Trust Metrics' },
            { id: 'cards', label: '5. Data Cards & Steppers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-300">
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              {/* Color System */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Color Architecture (AgriTech + FinTech + Logistics)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                    <div className="h-10 rounded-lg bg-emerald-600 mb-2 shadow-inner" />
                    <span className="font-bold text-white block">Primary Green</span>
                    <span className="text-[11px] text-stone-400 font-mono">#16a34a / emerald-600</span>
                    <p className="text-[10px] text-stone-400 mt-1">Growth, Agriculture, Verified Trust</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                    <div className="h-10 rounded-lg bg-amber-600 mb-2 shadow-inner" />
                    <span className="font-bold text-white block">Earth Ochre / Amber</span>
                    <span className="text-[11px] text-stone-400 font-mono">#d97706 / amber-600</span>
                    <p className="text-[10px] text-stone-400 mt-1">Harvest, Grain, Fair Pricing Accent</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                    <div className="h-10 rounded-lg bg-stone-700 mb-2 shadow-inner" />
                    <span className="font-bold text-white block">Neutral Soil / Stone</span>
                    <span className="text-[11px] text-stone-400 font-mono">#44403c / stone-700</span>
                    <p className="text-[10px] text-stone-400 mt-1">Foundational contrast & surfaces</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                    <div className="h-10 rounded-lg bg-sky-600 mb-2 shadow-inner" />
                    <span className="font-bold text-white block">Escrow Blue</span>
                    <span className="text-[11px] text-stone-400 font-mono">#0284c7 / sky-600</span>
                    <p className="text-[10px] text-stone-400 mt-1">Secure banking & logistics routing</p>
                  </div>
                </div>
              </div>

              {/* Typography Scale */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Typography Scale (Plus Jakarta Sans)</h3>
                <div className="space-y-3 p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
                  <div className="flex items-baseline justify-between border-b border-stone-700 pb-2">
                    <span className="text-2xl font-extrabold text-white">Display 24-30px (Bold/Black)</span>
                    <span className="text-[11px] text-stone-400 font-mono">Hero titles, Fair Price numbers</span>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-stone-700 pb-2">
                    <span className="text-lg font-bold text-white">Heading 18-20px (Bold)</span>
                    <span className="text-[11px] text-stone-400 font-mono">Card headers, Section labels</span>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-stone-700 pb-2">
                    <span className="text-sm font-semibold text-stone-200">Subheading 14px (Semibold)</span>
                    <span className="text-[11px] text-stone-400 font-mono">Form labels, Table headers</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-normal text-stone-300">Body text 12-13px (Regular / 1.6 line height)</span>
                    <span className="text-[11px] text-stone-400 font-mono">Accessible rural microcopy</span>
                  </div>
                </div>
              </div>

              {/* Spacing System */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">4px/8px Geometric Spacing System</h3>
                <p className="text-stone-400 mb-3 text-xs">
                  All paddings and margins adhere to strict 4px increments: 4px (tight), 8px (element gap), 16px (card inner), 24px (section padding), 32px (container bounds).
                </p>
                <div className="flex items-center gap-3">
                  {[4, 8, 12, 16, 24, 32].map((px) => (
                    <div key={px} className="text-center">
                      <div className="bg-emerald-600/30 border border-emerald-500/50 rounded flex items-center justify-center font-mono text-[10px] text-emerald-300 h-8" style={{ width: `${Math.max(28, px * 2)}px` }}>
                        {px}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 block">{px}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'buttons' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Button States & Variants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2.5">
                  <span className="text-stone-400 block font-semibold">Primary Button (CTA):</span>
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all">
                    Primary CTA (+ Add Crop)
                  </button>
                  <span className="text-[11px] text-stone-400 block">High visual hierarchy for primary agricultural actions.</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2.5">
                  <span className="text-stone-400 block font-semibold">Secondary Button:</span>
                  <button className="px-4 py-2 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-100 font-medium text-xs border border-stone-600 transition-all">
                    Calculate Fair Price
                  </button>
                  <span className="text-[11px] text-stone-400 block">Supporting actions with clean contrast.</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2.5">
                  <span className="text-stone-400 block font-semibold">Destructive Action:</span>
                  <button className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 font-semibold text-xs transition-all">
                    Cancel Listing
                  </button>
                  <span className="text-[11px] text-stone-400 block">Safeguards against accidental crop pool cancellations.</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2.5">
                  <span className="text-stone-400 block font-semibold">Loading State:</span>
                  <button disabled className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-xs opacity-80 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying 7/12 Land Record...</span>
                  </button>
                  <span className="text-[11px] text-stone-400 block">Visual spinner for async AI and government API checks.</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2.5">
                  <span className="text-stone-400 block font-semibold">Disabled State:</span>
                  <button disabled className="px-4 py-2 rounded-xl bg-stone-800 text-stone-500 border border-stone-700 text-xs font-semibold cursor-not-allowed">
                    Proceed to Escrow (Incomplete)
                  </button>
                  <span className="text-[11px] text-stone-400 block">Clear opacity & cursor changes preventing invalid actions.</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2.5">
                  <span className="text-stone-400 block font-semibold">Voice Trigger Button:</span>
                  <button className="px-4 py-2 rounded-full bg-amber-500 text-stone-900 font-bold text-xs flex items-center gap-1.5 shadow-lg animate-pulse">
                    <Mic className="w-3.5 h-3.5" />
                    <span>बोलें / Speak Now</span>
                  </button>
                  <span className="text-[11px] text-stone-400 block">Accessible large touch-target for non-literate farmers.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inputs' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Rural-Friendly Inputs & Steppers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Expected Yield (kg)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      defaultValue={1000} 
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm font-semibold focus:outline-hidden focus:border-emerald-500" 
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-stone-400">Kilograms</span>
                  </div>
                  <span className="text-[11px] text-stone-400">Large touch targets (&gt;44px height) for mobile field use.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Search Mandi or Produce</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <input 
                      type="text" 
                      placeholder="Search Tomato, Onion, Wheat..." 
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-emerald-500" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Error Validation State</label>
                  <input 
                    type="text" 
                    defaultValue="0 kg" 
                    className="w-full px-3 py-2.5 rounded-xl bg-red-950/40 border border-red-500 text-red-200 text-xs focus:outline-hidden" 
                  />
                  <span className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Minimum harvest allocation must exceed 50 kg for pool aggregation</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Success Validation State</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      readOnly 
                      value="GJ-142-2026-SANAND (Verified)" 
                      className="w-full px-3 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500 text-emerald-200 text-xs" 
                    />
                    <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Survey parcel matched with revenue records</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Status Badges & Trust Symbols</h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Land Verified ✓</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Escrow Secured</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Grade A (87%)</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <span>80% Pool Fulfilled</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-900/60 text-emerald-200 border border-emerald-600">
                  <span>Fair Floor: ₹30/kg</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                  <span>Mandi: ₹28/kg (Below Fair Price)</span>
                </span>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Information Hierarchy & Stepper Workflows</h3>
              <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700 space-y-3">
                <span className="text-xs font-bold text-white block">Escrow Milestone Timeline</span>
                <div className="flex items-center justify-between relative py-2">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-700 -translate-y-1/2 z-0" />
                  {[
                    { label: 'Buyer Paid', done: true },
                    { label: 'Payment Secured', done: true },
                    { label: 'Truck Pickup', done: false },
                    { label: 'Delivery at Hub', done: false },
                    { label: 'Auto Release', done: false },
                  ].map((step, idx) => (
                    <div key={step.label} className="relative z-10 flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.done ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400 border border-stone-600'
                      }`}>
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <span className="text-[10px] text-stone-300 mt-1">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md"
          >
            Close Design System Guide
          </button>
        </div>
      </div>
    </div>
  );
};
