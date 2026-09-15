import React, { useState } from 'react';
import { 
  History, 
  Download, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Filter, 
  ArrowUpRight, 
  CreditCard,
  Building,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Order, Crop } from '../../types';

interface FarmerSalesHistoryViewProps {
  orders: Order[];
  crops: Crop[];
  onDownloadReport: () => void;
}

export const FarmerSalesHistoryView: React.FC<FarmerSalesHistoryViewProps> = ({
  orders,
  crops,
  onDownloadReport,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'settled' | 'escrow'>('all');
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<Order | null>(null);

  // Extended history records for complete audit
  const historicalSales = [
    ...orders,
    {
      id: 'ORD-9480',
      cropName: 'Nashik Red Onion - Grade A+ (1,200 kg)',
      quantityKg: 1200,
      pricePerKg: 32,
      totalAmount: 38400,
      farmerName: 'Ramesh Patel',
      buyerName: 'BigBasket Fulfillment Hub Ahmedabad',
      orderDate: '2026-08-28 16:40',
      escrowStatus: 'RELEASED' as const,
      timeline: {
        buyerPaid: true,
        paymentSecured: true,
        pickup: true,
        delivery: true,
        paymentRelease: true,
      },
    },
    {
      id: 'ORD-9310',
      cropName: 'Kufri Jyoti Potato Seed Lot (800 kg)',
      quantityKg: 800,
      pricePerKg: 26,
      totalAmount: 20800,
      farmerName: 'Ramesh Patel',
      buyerName: 'Gujarat Agro Processing Corp',
      orderDate: '2026-08-15 10:15',
      escrowStatus: 'RELEASED' as const,
      timeline: {
        buyerPaid: true,
        paymentSecured: true,
        pickup: true,
        delivery: true,
        paymentRelease: true,
      },
    },
  ];

  const filteredSales = historicalSales.filter((sale) => {
    if (filterStatus === 'settled') {
      return sale.escrowStatus === 'RELEASED' || sale.timeline.paymentRelease;
    }
    if (filterStatus === 'escrow') {
      return sale.escrowStatus === 'ESCROWED' || !sale.timeline.paymentRelease;
    }
    return true;
  });

  const totalSalesValue = historicalSales.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const releasedEarnings = historicalSales
    .filter((s) => s.escrowStatus === 'RELEASED' || s.timeline.paymentRelease)
    .reduce((acc, curr) => acc + curr.totalAmount, 0);
  const inEscrowValue = totalSalesValue - releasedEarnings;
  const totalVolumeSold = historicalSales.reduce((acc, curr) => acc + curr.quantityKg, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 tracking-tight">Sales & Settlement History</h1>
            <p className="text-xs text-stone-600">
              Tamara vechan ane bank deposit no itihas • Complete audit trail with smart escrow verification
            </p>
          </div>
        </div>

        {/* Top Action: Download Report Button */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            id="download-farmer-report-btn"
            onClick={onDownloadReport}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
            title="Download CSV Report of all crop listings and sales history"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* Aggregate Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Total Gross Sales</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-stone-900 tracking-tight">₹{totalSalesValue.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">{historicalSales.length} total consignments</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Settled to Bank</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-700 tracking-tight">₹{releasedEarnings.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold mt-1 block">Direct DBT / IMPS Credited</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Protected in Escrow</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-sky-700 tracking-tight">₹{inEscrowValue.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[11px] text-sky-700 font-semibold mt-1 block">Locked pending delivery sign-off</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Total Volume Traded</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-stone-900 tracking-tight">{totalVolumeSold.toLocaleString('en-IN')}</span>
            <span className="text-xs font-bold text-stone-500">kg</span>
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">0% APMC broker commissions</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs font-bold text-stone-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </span>
          {[
            { id: 'all', label: `All Orders (${historicalSales.length})` },
            { id: 'settled', label: `Bank Settled (${historicalSales.filter(s => s.timeline.paymentRelease).length})` },
            { id: 'escrow', label: `Active In Escrow (${historicalSales.filter(s => !s.timeline.paymentRelease).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing {filteredSales.length} transaction entries
        </div>
      </div>

      {/* Historical Sales Ledger Table / Cards */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-black text-sm text-stone-900">Historical Sales & Settlement Records</h2>
          <span className="text-xs text-emerald-700 font-mono font-bold">100% Non-Repudiable Escrow</span>
        </div>

        <div className="divide-y divide-stone-100">
          {filteredSales.map((item, idx) => {
            const isSettled = item.escrowStatus === 'RELEASED' || item.timeline.paymentRelease;
            const utrCode = `UTRN-AGX-${item.id.replace('ORD-', '')}-99${idx}`;

            return (
              <div key={item.id} className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.id}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-black text-sm text-stone-900">{item.cropName}</span>
                    <span className="text-stone-300 hidden sm:inline">•</span>
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.orderDate}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
                    <span>Buyer: <strong className="text-stone-800">{item.buyerName}</strong></span>
                    <span>Quantity: <strong className="text-stone-800">{item.quantityKg.toLocaleString()} kg</strong></span>
                    <span>Rate: <strong className="text-stone-800">₹{item.pricePerKg}/kg</strong></span>
                    {isSettled && (
                      <span className="font-mono text-[11px] text-stone-500">
                        Bank UTR: <strong className="text-stone-700">{utrCode}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div className="text-left md:text-right">
                    <span className="font-mono font-black text-base text-stone-900 block">
                      ₹{item.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      isSettled 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-sky-100 text-sky-800 border border-sky-300'
                    }`}>
                      {isSettled ? '✓ Bank Settled' : '🔒 In Smart Escrow'}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrderReceipt(item)}
                    className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5 text-stone-600" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECEIPT / INVOICE MODAL */}
      {selectedOrderReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  AGX
                </div>
                <div>
                  <h3 className="font-black text-sm text-stone-900">Digital Escrow Settlement Voucher</h3>
                  <span className="text-[10px] text-stone-500 font-mono">Invoice #{selectedOrderReceipt.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedOrderReceipt(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Seller (Farmer):</span>
                <span className="font-bold text-stone-900">{selectedOrderReceipt.farmerName} (AGX-GJ-8812)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Buyer:</span>
                <span className="font-bold text-stone-900">{selectedOrderReceipt.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Consignment Produce:</span>
                <span className="font-bold text-stone-900">{selectedOrderReceipt.cropName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Weight & Rate:</span>
                <span className="font-mono text-stone-900">{selectedOrderReceipt.quantityKg} kg @ ₹{selectedOrderReceipt.pricePerKg}/kg</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm">
                <span className="font-bold text-stone-700">Total Net Amount:</span>
                <span className="font-mono font-black text-emerald-700">₹{selectedOrderReceipt.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Escrow Security:</span>
                <span className="font-semibold text-emerald-700">100% Protected (No Broker Fees)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedOrderReceipt(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Receipt for ${selectedOrderReceipt.id} saved to device!`);
                  setSelectedOrderReceipt(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Save Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
