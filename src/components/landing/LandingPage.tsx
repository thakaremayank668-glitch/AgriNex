import React from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  Users, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  Mic, 
  WifiOff, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../../types';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  onOpenVoiceAssistant: () => void;
  onOpenAiQuality: () => void;
  onOpenDesignSystem: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  onOpenVoiceAssistant,
  onOpenAiQuality,
  onOpenDesignSystem,
}) => {
  const personas = [
    {
      role: 'farmer' as UserRole,
      title: 'Farmer Persona',
      subtitle: 'Ramesh Patel • 4.5 Acres • Sanand',
      description: 'Calculate fair floor price across 12 cultivation parameters, join nearby smart yield pools, scan crop quality with AI, and track guaranteed escrow payouts.',
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
      badge: 'Primary Mobile-First Flow',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      actionText: 'Launch Farmer Dashboard',
      features: ['Fair Price Calculator', '1,600kg Active Pool', '✓ Land Verified 7/12', 'Multilingual Voice'],
    },
    {
      role: 'buyer' as UserRole,
      title: 'Enterprise Buyer Persona',
      subtitle: 'FreshAgro Retail Pvt Ltd • Ahmedabad',
      description: 'Procure verified quality produce directly from farm gate clusters. Auto-aggregate bulk requirements when orders exceed single farmer yield.',
      icon: <ShoppingBag className="w-6 h-6 text-emerald-600" />,
      badge: 'Wholesale Marketplace',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      actionText: 'Launch Buyer Marketplace',
      features: ['Direct Farm Listings', 'Smart Pool Aggregation', 'AI Grade Inspections', 'Escrow Contract Vault'],
    },
    {
      role: 'fpo' as UserRole,
      title: 'FPO / Aggregator Persona',
      subtitle: 'Sanand Farmers Producer Co-op',
      description: 'Coordinate 128 village smallholders, manage collective yield pools, monitor cold warehouse capacity, and negotiate high-value corporate contracts.',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      badge: 'Cooperative Hub',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      actionText: 'Launch FPO Hub',
      features: ['128 Member Smallholders', 'Cluster Yield Pools', 'Shared Patronage Ledger', 'Batch QC Grading'],
    },
    {
      role: 'logistics' as UserRole,
      title: 'Logistics Partner Persona',
      subtitle: 'Fleet Truck #GJ-01-AX-9912',
      description: 'Multi-stop TSP route optimization connecting farmers -> aggregation hub -> buyer DC. Real-time reefer telematics and pickup OTP security.',
      icon: <Truck className="w-6 h-6 text-sky-600" />,
      badge: 'Cold-Chain Dispatch',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      actionText: 'Launch Logistics Route',
      features: ['Multi-Farmer Pickup Map', '32% Fuel Savings', 'Cold Reefer Monitoring', 'Farmer OTP Security'],
    },
    {
      role: 'admin' as UserRole,
      title: 'Admin Governance Persona',
      subtitle: 'Smart India Hackathon Operations',
      description: 'Ecosystem governance console monitoring ₹4.8 Cr escrow transactions, reviewing 7/12 land verification audit queues, and tuning price policy.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      badge: 'SIH 2026 Governance',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      actionText: 'Launch Admin Console',
      features: ['Volume Analytics (38,400 MT)', '7/12 RoR OCR Approvals', '+34.8% Farmer Income', 'Escrow Ledger Auditing'],
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <section className="relative rounded-3xl bg-stone-900 border border-stone-800 text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 top-0 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 Finalist Prototype</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-xs font-mono font-medium">
              AgriTech + FinTech + Logistics
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Fair Pricing. Smart Pooling. <br />
            <span className="text-emerald-400">Direct Farm-to-Enterprise</span> Ecosystem.
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-normal">
            Eliminating predatory middlemen to return <strong>85%+ of retail value directly to farmers</strong>. Powered by 12-parameter cultivation cost calculation, automated yield aggregation, vision-based quality grading, and guaranteed escrow contracts.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectRole('farmer')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
            >
              <span>Explore Farmer App (Primary)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVoiceAssistant}
              className="px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 transition-all flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Try Multilingual Voice</span>
            </button>

            <button
              onClick={onOpenAiQuality}
              className="px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Crop Scanner</span>
            </button>

            <button
              onClick={onOpenDesignSystem}
              className="px-4 py-3.5 rounded-2xl bg-stone-800/60 hover:bg-stone-800 text-stone-300 font-semibold text-xs border border-stone-700/60 transition-all"
            >
              Design Tokens
            </button>
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION COMPARISON */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="p-6 rounded-3xl bg-red-50/50 border border-red-200/80 space-y-4">
          <div className="flex items-center gap-2 text-red-700 font-black text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>The Broken Status Quo (4–7 Intermediaries)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">Why Traditional Mandis Fail Farmers:</h2>
          <ul className="space-y-2.5 text-xs text-stone-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>Distress Selling:</strong> Farmers forced to sell at ₹12–₹18/kg when cost of cultivation is ₹25/kg.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>Fragmentation:</strong> Smallholders (86% of Indian farmers) lack volume to sell to large institutional buyers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>Subjective Quality Cuts:</strong> Traders arbitrarily discount produce by 20–30% claiming sub-par grade.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>Payment Delays & Bad Debt:</strong> Unofficial credit cycles cause 30–90 day payment uncertainty.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>The AgriNex AI Ecosystem Architecture</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">How AgriNex Restores Farmer Sovereignty:</h2>
          <ul className="space-y-2.5 text-xs text-stone-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Scientific Fair Floor Price:</strong> Live formula over 12 cultivation parameters gives farmers living profit margins.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Smart Yield Pooling:</strong> Geo-clusters smallholders into bulk lots (2,000–10,000 kg) for corporate enterprises.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>AI Vision Quality Index:</strong> Objective on-device computer vision grade scoring prevents arbitrary trader price cuts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Guaranteed Escrow Payouts:</strong> 100% of purchase amount locked before pickup and released instantly on verified delivery.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ALL 5 PERSONAS LAUNCHPAD (MANDATED: Farmer, Buyer, FPO, Logistics, Admin) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Complete Multi-Stakeholder Simulation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Explore All 5 Dedicated Ecosystem Interfaces
          </h2>
          <p className="text-xs text-stone-700">
            Click any persona card below to switch role contexts instantly during your evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {personas.map((p) => (
            <div
              key={p.role}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-stone-900 tracking-tight">{p.title}</h3>
                  <span className="text-xs font-semibold text-stone-700">{p.subtitle}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {p.description}
                </p>

                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectRole(p.role)}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{p.actionText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <footer className="p-6 rounded-3xl bg-stone-100 border border-stone-200 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-stone-800">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>AGRINEX • AI-POWERED FARMER DECISION-SUPPORT ECOSYSTEM</span>
        </div>
        <p className="text-xs text-stone-700">
          Smart India Hackathon 2026 Demonstration Prototype • Engineered for Rural-Friendly Web & Mobile Execution
        </p>
      </footer>
    </div>
  );
};
