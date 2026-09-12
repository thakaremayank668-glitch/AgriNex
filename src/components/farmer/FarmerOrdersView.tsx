import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Truck, 
  KeyRound, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Download
} from 'lucide-react';
import { Order } from '../../types';

interface FarmerOrdersViewProps {
  orders: Order[];
  onSimulatePickup?: (orderId: string) => void;
  onSimulateDeliveryRelease?: (orderId: string) => void;
}

export const FarmerOrdersView: React.FC<FarmerOrdersViewProps> = ({
  orders,
  onSimulatePickup,
  onSimulateDeliveryRelease,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'ORD-9821');
  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-900 tracking-tight">Orders & Escrow Payouts</h1>
              <p className="text-xs text-stone-700">
                100% Guaranteed Escrow Protected payments released automatically upon verified buyer delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Demo payment environment label mandated in spec */}
        <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold font-mono">
          Demo Payment Environment (RBI Sandbox Protocol)
        </div>
      </div>

      {/* Orders & Escrow Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Orders List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Your Dispatched & Active Consignments
          </span>
          {orders.map((order) => {
            const isSelected = order.id === activeOrder.id;
            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={`p-4 rounded-3xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700">{order.id}</span>
                    <h3 className="text-sm font-black text-stone-900 mt-0.5">{order.cropName}</h3>
                    <span className="text-[11px] text-stone-700">Buyer: {order.buyerName}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    order.escrowStatus === 'ESCROWED'
                      ? 'bg-sky-100 text-sky-800 border border-sky-300'
                      : order.escrowStatus === 'RELEASED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-100 text-stone-800'
                  }`}>
                    {order.escrowStatus}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-baseline justify-between text-xs">
                  <div>
                    <span className="text-stone-700 block text-[10px]">Total Escrow Value</span>
                    <span className="text-base font-black text-stone-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-700 block text-[10px]">Quantity</span>
                    <span className="font-bold text-stone-800">{order.quantityKg} kg @ ₹{order.pricePerKg}/kg</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Order Escrow Timeline & Detail (Mandated in Section 15 of Prompt) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-stone-700">Consignment #{activeOrder.id}</span>
              <h2 className="text-xl font-black text-stone-900 mt-0.5">{activeOrder.cropName}</h2>
              <span className="text-xs text-stone-700">Order Initiated: {activeOrder.orderDate}</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-stone-700 block">Locked in Escrow</span>
              <span className="text-3xl font-black text-emerald-800">
                ₹{activeOrder.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Payment Status Banner */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-sky-950 uppercase tracking-wide block">
                  Payment Status: {activeOrder.escrowStatus}
                </span>
                <p className="text-xs text-sky-800 mt-0.5">
                  Buyer funds are deposited and locked in the AgriNex Trust Escrow Vault.
                </p>
              </div>
            </div>
          </div>

          {/* ESCROW TIMELINE MANDATED IN SPEC:
              Buyer Paid ✓
              Payment Secured ✓
              Pickup ○
              Delivery ○
              Payment Release ○
          */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              AgriNex 5-Stage Escrow Timeline
            </span>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
              {/* Stage 1: Buyer Paid */}
              <div className="relative flex items-start gap-3">
                <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeOrder.timeline.buyerPaid ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                }`}>
                  {activeOrder.timeline.buyerPaid ? '✓' : '1'}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Buyer Paid</span>
                  <span className="text-[11px] text-stone-700">Buyer transferred ₹{activeOrder.totalAmount.toLocaleString('en-IN')} via corporate net banking.</span>
                </div>
              </div>

              {/* Stage 2: Payment Secured */}
              <div className="relative flex items-start gap-3">
                <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeOrder.timeline.paymentSecured ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                }`}>
                  {activeOrder.timeline.paymentSecured ? '✓' : '2'}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Payment Secured</span>
                  <span className="text-[11px] text-stone-700">Escrow account holds the balance. Farmer is guaranteed payout.</span>
                </div>
              </div>

              {/* Stage 3: Pickup */}
              <div className="relative flex items-start gap-3">
                <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeOrder.timeline.pickup ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-stone-400 text-stone-600'
                }`}>
                  {activeOrder.timeline.pickup ? '✓' : '○'}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Pickup from Farm / Cluster Hub</span>
                  <span className="text-[11px] text-stone-700">
                    {activeOrder.timeline.pickup 
                      ? 'Loaded onto AgriNex refrigerated vehicle #GJ-01-AX-9912.' 
                      : 'Scheduled for tomorrow 08:30 AM.'}
                  </span>
                </div>
              </div>

              {/* Stage 4: Delivery */}
              <div className="relative flex items-start gap-3">
                <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeOrder.timeline.delivery ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-stone-400 text-stone-600'
                }`}>
                  {activeOrder.timeline.delivery ? '✓' : '○'}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Delivery at Distribution Center</span>
                  <span className="text-[11px] text-stone-700">Digital weighment and AI quality re-confirmation by buyer.</span>
                </div>
              </div>

              {/* Stage 5: Payment Release */}
              <div className="relative flex items-start gap-3">
                <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeOrder.timeline.paymentRelease ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-stone-400 text-stone-600'
                }`}>
                  {activeOrder.timeline.paymentRelease ? '✓' : '○'}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Payment Release to Farmer Bank Account</span>
                  <span className="text-[11px] text-stone-700">Instant direct transfer via NPCI e-RUPI / IMPS to Bank of Baroda.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Required Microcopy from Prompt */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold">
              "Funds are released after successful delivery."
            </span>
          </div>

          {/* Interactive Driver Pickup OTP */}
          {activeOrder.pickupOtp && (
            <div className="p-4 rounded-2xl bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Pickup Security PIN</span>
                <span className="text-[11px] text-stone-300">Share with AgriNex truck driver when loading</span>
              </div>
              <div className="px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500 font-mono font-black text-lg tracking-widest">
                {activeOrder.pickupOtp}
              </div>
            </div>
          )}

          {/* Simulation Controls for Demonstration */}
          <div className="pt-2 flex gap-2">
            {!activeOrder.timeline.pickup && (
              <button
                onClick={() => onSimulatePickup && onSimulatePickup(activeOrder.id)}
                className="flex-1 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Simulate Driver Pickup OTP</span>
              </button>
            )}

            {!activeOrder.timeline.paymentRelease && (
              <button
                onClick={() => onSimulateDeliveryRelease && onSimulateDeliveryRelease(activeOrder.id)}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Delivery & Release Escrow</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
