import React, { useState } from 'react';
import { 
  X, 
  Sprout, 
  ShoppingBag, 
  Building2, 
  Truck, 
  Mic, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  FileText,
  KeyRound,
  Phone
} from 'lucide-react';
import { Role, Language } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: Role) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'otp'>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('farmer');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState(['4', '8', '9', '2']);
  const [farmerName, setFarmerName] = useState('Ramesh Patel');
  const [village, setVillage] = useState('Sanand');
  const [taluka, setTaluka] = useState('Sanand');
  const [district, setDistrict] = useState('Ahmedabad');
  const [state, setState] = useState('Gujarat');
  const [preferredLang, setPreferredLang] = useState<Language>('gu');
  const [farmerId, setFarmerId] = useState('AGX-GJ-2026-8812');
  const [landDocUploaded, setLandDocUploaded] = useState(true);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMode('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
    onClose();
  };

  const roles = [
    { id: 'farmer' as Role, title: 'I am a Farmer', desc: 'Get fair floor prices, join yield pools, sell direct', icon: <Sprout className="w-5 h-5 text-emerald-400" /> },
    { id: 'buyer' as Role, title: 'I am a Buyer', desc: 'Direct farm sourcing, AI quality graded, traceable produce', icon: <ShoppingBag className="w-5 h-5 text-sky-400" /> },
    { id: 'fpo' as Role, title: 'I represent an FPO', desc: 'Aggregate village harvests, institutional bulk contracts', icon: <Building2 className="w-5 h-5 text-amber-400" /> },
    { id: 'logistics' as Role, title: 'I am a Logistics Partner', desc: 'Optimized cluster routes, high vehicle load factors', icon: <Truck className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-stone-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {authMode === 'login' ? 'AgriNex Secure Sign In' : authMode === 'otp' ? 'Enter 4-Digit OTP' : 'Quick Rural Registration'}
              </h2>
              <p className="text-xs text-stone-400">Direct Digital Gateway for Agriculture</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Mode Selector */}
          {authMode !== 'otp' && (
            <div className="grid grid-cols-2 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs">
              <button
                onClick={() => setAuthMode('login')}
                className={`py-2 rounded-lg font-semibold transition-all ${
                  authMode === 'login' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                Sign In with Mobile
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`py-2 rounded-lg font-semibold transition-all ${
                  authMode === 'register' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                Register New User
              </button>
            </div>
          )}

          {/* Role Selection Grid */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300">Choose Your Role:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    selectedRole === r.id
                      ? 'bg-emerald-950/80 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                      : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-stone-900 border border-stone-700 shrink-0">
                    {r.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-snug">{r.title}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5 leading-tight">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* LOGIN FLOW */}
          {authMode === 'login' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Mobile Number (मोबाइल नंबर / ફોન નંબર)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-stone-400 font-mono text-xs">+91</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-10 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm font-semibold tracking-wide focus:outline-hidden focus:border-emerald-500"
                  />
                  <Phone className="w-4 h-4 absolute right-3 top-3 text-stone-400" />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">One-time password (OTP) will be sent via SMS.</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 flex items-center justify-between">
                <span>Demo Quick Login (Pre-filled):</span>
                <span className="font-mono font-bold bg-emerald-900 px-2 py-0.5 rounded text-[11px]">Ramesh Patel (Farmer)</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Get OTP / ઓટીપી મેળવો</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* OTP VERIFICATION FLOW */}
          {authMode === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Enter OTP sent to +91 {phoneNumber}</h3>
                <p className="text-xs text-stone-400 mt-0.5">Automated SMS detection active (Demo OTP: 4892)</p>
              </div>

              <div className="flex justify-center gap-3 my-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otp];
                      next[idx] = e.target.value;
                      setOtp(next);
                    }}
                    className="w-12 h-12 text-center text-xl font-bold bg-stone-800 border-2 border-emerald-500 rounded-xl text-white focus:outline-hidden"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Enter AgriNex</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-xs text-stone-400 hover:text-white"
              >
                Change Phone Number
              </button>
            </form>
          )}

          {/* FARMER REGISTRATION FLOW */}
          {authMode === 'register' && (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Full Name (ખેડૂતનું નામ)</label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Mobile (+91)</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Village</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Taluka</label>
                  <input
                    type="text"
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Farmer ID / PM-KISAN ID</label>
                  <input
                    type="text"
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Preferred Language</label>
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value as Language)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                  >
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="en">English</option>
                    <option value="mr">मराठी (Marathi)</option>
                  </select>
                </div>
              </div>

              {/* 7/12 Land Document Upload Component */}
              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">7/12 Land Record Verification</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Survey #142/2-A</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl bg-stone-900 border border-stone-700">
                  <FileText className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-stone-200 truncate">Gujarat_AnyRoR_7_12_Sanand_142_2.pdf</div>
                    <div className="text-[10px] text-stone-400">4.5 Acres Verified Parcel</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLandDocUploaded(!landDocUploaded)}
                    className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                  >
                    {landDocUploaded ? 'Attached ✓' : 'Upload'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Register with 1-Click Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
