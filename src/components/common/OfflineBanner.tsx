import React, { useState } from 'react';
import { WifiOff, RefreshCw, Send, CheckCircle2, AlertTriangle, Smartphone } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
  onReconnect: () => void;
  pendingSyncCount: number;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline,
  onReconnect,
  pendingSyncCount,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  if (!isOffline) return null;

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onReconnect();
    }, 1200);
  };

  const handleTriggerSmsFallback = () => {
    setSmsSentNotice(true);
    setTimeout(() => {
      setSmsSentNotice(false);
    }, 4000);
  };

  return (
    <div className="bg-amber-950/90 border-b border-amber-800/80 text-amber-100 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>● Low-Connectivity / Offline Mode</span>
          </div>
          <span className="text-amber-200">
            Running on local encrypted cache. Your calculated fair prices and listings are safely stored on device.
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/60 text-[11px]">
            {pendingSyncCount} action{pendingSyncCount !== 1 ? 's' : ''} queued
          </span>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-900 font-semibold text-xs shadow-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Testing signal...' : 'Retry Connection'}</span>
          </button>

          <button
            onClick={handleTriggerSmsFallback}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-800 text-xs font-medium transition-colors"
            title="Send crop listing via toll-free SMS when 2G/3G data is absent"
          >
            <Smartphone className="w-3 h-3 text-amber-400" />
            <span>SMS Fallback (Toll-Free 1800-AGRI)</span>
          </button>
        </div>
      </div>

      {smsSentNotice && (
        <div className="max-w-7xl mx-auto mt-2 p-2 rounded bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              SMS Packet generated: <code className="bg-emerald-900/80 px-1 py-0.5 rounded text-[11px]">AGX LIST TOMATO 500KG 30INR SANAND</code> sent to AgriNex IVR Gateway.
            </span>
          </div>
          <span className="text-emerald-400 font-semibold text-[11px]">Syncing via GSM Network</span>
        </div>
      )}
    </div>
  );
};
