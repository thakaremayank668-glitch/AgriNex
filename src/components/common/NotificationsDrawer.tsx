import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  Truck, 
  Users,
  Clock
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'pool':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'quality':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'logistics':
        return <Truck className="w-4 h-4 text-sky-400" />;
      case 'verification':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'price':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-stone-400" />;
    }
  };

  const getPriorityBadge = (priority: NotificationItem['priority']) => {
    switch (priority) {
      case 'high':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">CRITICAL</span>;
      case 'medium':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">ADVISORY</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-stone-700 text-stone-300">INFO</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl text-stone-100 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Decision & Alert Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                !n.read
                  ? 'bg-stone-850 border-emerald-500/40 shadow-sm'
                  : 'bg-stone-800/40 border-stone-800 text-stone-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-stone-800 border border-stone-700">
                    {getCategoryIcon(n.category)}
                  </div>
                  <span className={`text-xs font-bold ${!n.read ? 'text-white' : 'text-stone-300'}`}>
                    {n.title}
                  </span>
                </div>
                {getPriorityBadge(n.priority)}
              </div>

              <p className="text-xs text-stone-300 mt-1 leading-relaxed pl-8">
                {n.description}
              </p>

              <div className="mt-2 pl-8 flex items-center gap-1.5 text-[10px] text-stone-500">
                <Clock className="w-3 h-3" />
                <span>{n.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-stone-800 bg-stone-950/80 text-center text-[11px] text-stone-400">
          AgriNex Priority Push Dispatcher v2.6
        </div>
      </div>
    </div>
  );
};
