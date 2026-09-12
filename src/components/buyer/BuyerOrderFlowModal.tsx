import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Calendar, 
  Sparkles, 
  MapPin, 
  Info,
  AlertCircle
} from 'lucide-react';
import { Crop, Order } from '../../types';

interface BuyerOrderFlowModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (order: Partial<Order>) => void;
  initialSmartPool?: boolean;
}

export const BuyerOrderFlowModal: React.FC<BuyerOrderFlowModalProps> = ({
  crop,
  isOpen,
  onClose,
  onOrderCompleted,
  initialSmartPool = false,
}) => {
  if (!isOpen || !crop) return null;

  const [step, setStep] = useState<number>(1);
  const [quantityKg, setQuantityKg] = useState<number>(initialSmartPool ? 2000 : Math.min(crop.listedKg, 500));
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'self_pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('Central Warehouse, Sarkhej-Bavla Highway, Ahmedabad');
  const [paymentMethod, setPaymentMethod] = useState<'escrow_upi' | 'escrow_bank' | 'erupi'>('escrow_bank');
  const [useSmartPool, setUseSmartPool] = useState<boolean>(initialSmartPool || quantityKg > crop.listedKg);

  // Check if quantity exceeds single farmer stock
  const isOverSingleFarmerStock = quantityKg > crop.listedKg;
  const directAvailableKg = Math.min(quantityKg, crop.listedKg);
  const pooledShortfallKg = isOverSingleFarmerStock ? quantityKg - crop.listedKg : 0;

  // Financial calculations
  const pricePerKg = crop.fairFloorPricePerKg;
  const cropSubtotal = quantityKg * pricePerKg;
  const logisticsFee = deliveryType === 'delivery' ? Math.round(quantityKg * 1.8) : 0;
  const platformFee = 0; // AgriNex 0% buyer commission
  const totalPayable = cropSubtotal + logisticsFee + platformFee;

  const handleNext = () => {
    if (step < 6) {
      setStep((prev) => prev + 1);
    } else {
      // Complete Order
      const newOrder: Partial<Order> = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        cropName: crop.name,
        buyerName: 'FreshAgro Retail Pvt Ltd',
        farmerName: useSmartPool ? `${crop.farmerName} + 3 Pooled Farmers` : crop.farmerName,
        quantityKg,
        pricePerKg,
        totalAmount: totalPayable,
        escrowStatus: 'ESCROWED',
        deliveryStatus: 'Order Confirmed',
        orderDate: 'Today',
        expectedDelivery: 'Tomorrow, 02:00 PM',
        pickupOtp: String(Math.floor(1000 + Math.random() * 9000)),
        isPooled: useSmartPool,
        timeline: {
          buyerPaid: true,
          paymentSecured: true,
          pickup: false,
          delivery: false,
          paymentRelease: false,
        },
      };
      onOrderCompleted(newOrder);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-stone-900 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block">
              Step {step} of 6 • Checkout Flow
            </span>
            <h2 className="text-base font-black text-stone-900">Procure {crop.name}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-stone-200 text-stone-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-stone-100 h-1">
          <div 
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: Select Quantity */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-stone-900">Step 1: Enter Required Quantity</h3>
                <p className="text-xs text-stone-700">Specify wholesale volume required for procurement.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800">Procurement Quantity (kg):</label>
                  <span className="text-xs font-semibold text-stone-700">
                    Direct Stock from {crop.farmerName}: <strong>{crop.listedKg} kg</strong>
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => {
                      const val = Math.max(50, Number(e.target.value));
                      setQuantityKg(val);
                      if (val > crop.listedKg) setUseSmartPool(true);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 font-black text-xl text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-bold text-stone-500">kg</span>
                </div>

                {/* Quick select buttons */}
                <div className="flex gap-2">
                  {[200, 500, 1000, 2000].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => {
                        setQuantityKg(qty);
                        if (qty > crop.listedKg) setUseSmartPool(true);
                      }}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold ${
                        quantityKg === qty
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {qty} kg
                    </button>
                  ))}
                </div>
              </div>

              {/* MANDATED REQUIREMENT FROM SPEC (SECTION 12):
                  If requested quantity exceeds one farmer's inventory:
                  "650 kg available directly. 1,350 kg can be fulfilled through nearby pooled supply."
                  CTA: "Use Smart Pool"
              */}
              {isOverSingleFarmerStock && (
                <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-300 text-purple-950 space-y-3 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-black block text-purple-900 uppercase tracking-wide">
                        AgriNex Smart Pool Auto-Aggregation Detected
                      </span>
                      <p className="text-xs text-purple-800 font-medium mt-1 leading-relaxed">
                        <strong>{directAvailableKg} kg</strong> available directly from {crop.farmerName}.
                        <br />
                        <strong>{pooledShortfallKg} kg</strong> can be fulfilled through nearby pooled supply in Sanand cluster!
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[11px] text-purple-700 font-medium">Uniform Grade A Quality Guaranteed</span>
                    <button
                      type="button"
                      onClick={() => setUseSmartPool(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-xs flex items-center gap-1.5"
                    >
                      <span>✓ Use Smart Pool</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Select Pickup / Delivery */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-stone-900">Step 2: Select Logistics & Fulfillment</h3>
                <p className="text-xs text-stone-700">Choose between door-to-hub delivery or direct farm gate pickup.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryType === 'delivery'
                      ? 'bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Truck className="w-5 h-5 text-emerald-600 mb-2" />
                  <span className="text-xs font-bold text-stone-900 block">AgriNex Freight Delivery</span>
                  <span className="text-[11px] text-stone-700 mt-1 block">Temperature-controlled reefer to your DC</span>
                  <span className="text-xs font-black text-emerald-800 mt-2 block">+₹1.80/kg</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('self_pickup')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryType === 'self_pickup'
                      ? 'bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-stone-600 mb-2" />
                  <span className="text-xs font-bold text-stone-900 block">Self Pickup (Farm Gate)</span>
                  <span className="text-[11px] text-stone-700 mt-1 block">Your own fleet picks up from Sanand Hub</span>
                  <span className="text-xs font-black text-stone-900 mt-2 block">₹0.00 (Free)</span>
                </button>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">Destination Warehouse / DC Address:</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-hidden"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Review Price */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-stone-900">Step 3: Commercial & Rate Review</h3>
                <p className="text-xs text-stone-700">Clear cost breakdown adhering to Fair Price standards.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex justify-between text-xs pb-2 border-b border-stone-200">
                  <span className="text-stone-700">Crop Value ({quantityKg} kg @ ₹{pricePerKg}/kg):</span>
                  <span className="font-bold text-stone-900">₹{cropSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs pb-2 border-b border-stone-200">
                  <span className="text-stone-700">Freight & Multi-Stop Aggregation:</span>
                  <span className="font-bold text-stone-900">₹{logisticsFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs pb-2 border-b border-stone-200">
                  <span className="text-stone-700">AgriNex Platform Escrow Commission:</span>
                  <span className="font-bold text-emerald-800">₹0 (Free / Open Protocol)</span>
                </div>

                <div className="flex justify-between text-sm pt-1">
                  <span className="font-black text-stone-900">Total Escrow Deposit:</span>
                  <span className="font-black text-emerald-800 text-lg">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fair Trade Guarantee: Farmer receives ₹{cropSubtotal.toLocaleString('en-IN')} with zero deductions.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Quality Information */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-stone-900">Step 4: AI Quality & Batch Inspection</h3>
                <p className="text-xs text-stone-700">Verified computer vision grading report before locking funds.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs">Quality Index Certificate</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 text-[10px] font-bold font-mono">
                    GRADE {crop.qualityGrade} (87/100)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-stone-800">
                    <span className="text-stone-400 block text-[10px]">Surface Defect Ratio</span>
                    <span className="font-bold text-stone-200">1.8% (Tolerance &lt; 5%)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-800">
                    <span className="text-stone-400 block text-[10px]">Average Diameter</span>
                    <span className="font-bold text-stone-200">54mm ± 3mm</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-800">
                    <span className="text-stone-400 block text-[10px]">Color Ripeness</span>
                    <span className="font-bold text-emerald-400">Deep Crimson (92% ripe)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-800">
                    <span className="text-stone-400 block text-[10px]">Shelf Life Index</span>
                    <span className="font-bold text-stone-200">6 Days @ 14°C</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
                Buyer Protection: Upon arrival at your warehouse, your staff confirms physical grade. If discrepancy &gt; 5%, automated escrow adjustment applies.
              </div>
            </div>
          )}

          {/* STEP 5: Payment */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-stone-900">Step 5: Lock Escrow Payment</h3>
                <p className="text-xs text-stone-700">Funds are placed in AgriNex Escrow Trust and NOT released until verified delivery.</p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('escrow_bank')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between ${
                    paymentMethod === 'escrow_bank'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                      RTGS
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Corporate Escrow Net Banking / RTGS</span>
                      <span className="text-[10px] text-stone-500">Virtual account powered by State Bank of India</span>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'escrow_bank'} readOnly className="accent-emerald-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('escrow_upi')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between ${
                    paymentMethod === 'escrow_upi'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Instant Corporate UPI Autopay</span>
                      <span className="text-[10px] text-stone-500">Auto-debit upon delivery OTP validation</span>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'escrow_upi'} readOnly className="accent-emerald-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('erupi')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between ${
                    paymentMethod === 'erupi'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                      e₹
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">NPCI e-RUPI Programmable Voucher</span>
                      <span className="text-[10px] text-stone-500">Purpose-bound agricultural voucher release</span>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'erupi'} readOnly className="accent-emerald-600" />
                </button>
              </div>

              {/* Demo Payment Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <strong>Demo Sandbox Mode:</strong> Clicking Confirm will simulate instant virtual account funding without charging a live credit line.
              </div>
            </div>
          )}

          {/* STEP 6: Order Confirmation Preview */}
          {step === 6 && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-black text-stone-900">Confirm & Lock Escrow Contract</h3>
                <p className="text-xs text-stone-700 mt-0.5">
                  Order will be dispatched to {useSmartPool ? 'Sanand Cluster Farmers' : crop.farmerName}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-700">Procurement:</span>
                  <span className="font-bold text-stone-900">{quantityKg} kg of {crop.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-700">Aggregation Type:</span>
                  <span className="font-bold text-purple-700">{useSmartPool ? 'Smart Multi-Farmer Pool' : 'Single Farmer Direct'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-700">Pickup Date:</span>
                  <span className="font-bold text-stone-900">Tomorrow 08:30 AM</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 font-black text-sm">
                  <span>Escrow Locked Total:</span>
                  <span className="text-emerald-800">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-700">
                "Funds are released after successful delivery."
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold"
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 ml-auto"
          >
            <span>{step === 6 ? 'Authorize & Lock Escrow' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
