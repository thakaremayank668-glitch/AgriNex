import React, { useState } from 'react';
import { UserRole, Crop, YieldPool, Order, MandiPrice, LogisticsRoute, NotificationItem } from './types';
import { 
  INITIAL_CROPS, 
  INITIAL_POOLS, 
  INITIAL_ORDERS, 
  INITIAL_MANDI_PRICES, 
  MOCK_LOGISTICS_ROUTE, 
  INITIAL_NOTIFICATIONS,
  CURRENT_FARMER 
} from './data/mockData';

// Common Components
import { Navbar } from './components/common/Navbar';
import { OfflineBanner } from './components/common/OfflineBanner';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';
import { AiQualityModal } from './components/common/AiQualityModal';
import { DesignSystemModal } from './components/common/DesignSystemModal';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { AuthModal } from './components/auth/AuthModal';

// Persona Screen Views
import { LandingPage } from './components/landing/LandingPage';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { BuyerMarketplace } from './components/buyer/BuyerMarketplace';
import { FpoDashboard } from './components/fpo/FpoDashboard';
import { LogisticsDashboard } from './components/logistics/LogisticsDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole | 'landing'>('farmer'); // Default to Farmer as primary experience requested in prompt
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'gu'>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Core Data States
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [pools, setPools] = useState<YieldPool[]>(INITIAL_POOLS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [mandiPrices, setMandiPrices] = useState<MandiPrice[]>(INITIAL_MANDI_PRICES);
  const [logisticsRoute, setLogisticsRoute] = useState<LogisticsRoute>(MOCK_LOGISTICS_ROUTE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals Visibility State
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [isQualityOpen, setIsQualityOpen] = useState<boolean>(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Unread notifications count
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Handler: Add new crop
  const handleAddNewCrop = (newCropData: Partial<Crop>) => {
    const newCrop: Crop = {
      id: `crop-${Date.now()}`,
      name: newCropData.name || 'Tomato (Hybrid Desi)',
      category: 'Vegetables',
      variety: 'Desi Roma High-Lycopene',
      expectedYieldKg: newCropData.expectedYieldKg || 1000,
      listedKg: newCropData.listedKg || 500,
      costPerKg: 25,
      farmerMarginPerKg: (newCropData.fairFloorPricePerKg || 30) - 25,
      fairFloorPricePerKg: newCropData.fairFloorPricePerKg || 30,
      marketPricePerKg: newCropData.marketPricePerKg || 28,
      qualityScore: newCropData.qualityScore || 87,
      qualityGrade: newCropData.qualityGrade || 'A',
      freshness: newCropData.freshness || 'Good',
      farmerName: CURRENT_FARMER.name,
      farmerVillage: CURRENT_FARMER.village,
      farmerDistrict: CURRENT_FARMER.district,
      farmerState: CURRENT_FARMER.state,
      landVerified: true,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      harvestDate: 'Sep 13, 2026',
      status: 'listed',
      distanceKm: 12,
    };

    setCrops((prev) => [newCrop, ...prev]);

    // Push notification
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Produce Successfully Listed',
      description: `${newCrop.name} (${newCrop.listedKg} kg) listed at fair floor price ₹${newCrop.fairFloorPricePerKg}/kg.`,
      category: 'price',
      timestamp: 'Just now',
      read: false,
      priority: 'medium',
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Handler: Contribute to Yield Pool
  const handleContributeToPool = (poolId: string, quantityKg: number) => {
    setPools((prevPools) =>
      prevPools.map((p) => {
        if (p.id === poolId) {
          const updatedCollected = Math.min(p.buyerRequirementKg, p.collectedKg + quantityKg);
          return {
            ...p,
            collectedKg: updatedCollected,
            farmersCount: p.farmersCount + 1,
            contributions: [
              ...p.contributions,
              {
                farmerId: 'farmer-ramesh',
                farmerName: 'Ramesh Patel (You)',
                village: 'Sanand',
                quantityKg: quantityKg,
                sharePercent: Math.round((quantityKg / p.buyerRequirementKg) * 100),
                status: 'Allocated',
              },
            ],
          };
        }
        return p;
      })
    );

    // Push notification
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Allocation Locked in Pool',
      description: `Allocated ${quantityKg} kg to active pool. Escrow will lock upon 100% capacity.`,
      category: 'pool',
      timestamp: 'Just now',
      read: false,
      priority: 'high',
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Handler: Buyer creates an order
  const handleCreateOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: orderData.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      cropName: orderData.cropName || 'Tomato (Hybrid Desi)',
      buyerName: orderData.buyerName || 'FreshAgro Retail Pvt Ltd',
      farmerName: orderData.farmerName || CURRENT_FARMER.name,
      quantityKg: orderData.quantityKg || 500,
      pricePerKg: orderData.pricePerKg || 30,
      totalAmount: orderData.totalAmount || 15000,
      escrowStatus: 'ESCROWED',
      deliveryStatus: 'Payment Secured in Escrow',
      orderDate: 'Today',
      expectedDelivery: 'Tomorrow',
      pickupOtp: orderData.pickupOtp || '4921',
      isPooled: orderData.isPooled || false,
      timeline: {
        buyerPaid: true,
        paymentSecured: true,
        pickup: false,
        delivery: false,
        paymentRelease: false,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Push notification
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Escrow Deposit Received',
      description: `Buyer deposited ₹${newOrder.totalAmount.toLocaleString('en-IN')} for ${newOrder.quantityKg} kg of ${newOrder.cropName}.`,
      category: 'payment',
      timestamp: 'Just now',
      read: false,
      priority: 'high',
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Handler: Driver pickup OTP verification
  const handleUpdateLogisticsStopStatus = (stopId: string) => {
    setLogisticsRoute((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.id === stopId ? { ...s, status: 'completed' } : s)),
    }));

    // Update order pickup state if matches
    setOrders((prev) =>
      prev.map((o) => ({
        ...o,
        timeline: {
          ...o.timeline,
          pickup: true,
        },
      }))
    );
  };

  // Handler: Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Low-Connectivity / Offline Banner */}
      <OfflineBanner
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
      />

      {/* Primary Sticky Header & Multi-Persona Switcher */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => setCurrentRole(role)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={(lang) => setSelectedLanguage(lang)}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
        onOpenAiQuality={() => setIsQualityOpen(true)}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: LANDING PAGE & ECOSYSTEM SHOWCASE */}
        {currentRole === 'landing' && (
          <LandingPage
            onSelectRole={(role) => setCurrentRole(role)}
            onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
            onOpenAiQuality={() => setIsQualityOpen(true)}
            onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
          />
        )}

        {/* VIEW 2: FARMER DASHBOARD (Primary Flow) */}
        {currentRole === 'farmer' && (
          <FarmerDashboard
            crops={crops}
            pools={pools}
            orders={orders}
            mandiPrices={mandiPrices}
            onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
            onOpenAiQuality={() => setIsQualityOpen(true)}
            onAddNewCrop={handleAddNewCrop}
            onJoinPool={handleContributeToPool}
          />
        )}

        {/* VIEW 3: BUYER MARKETPLACE */}
        {currentRole === 'buyer' && (
          <BuyerMarketplace
            crops={crops}
            orders={orders}
            onOrderCreated={handleCreateOrder}
          />
        )}

        {/* VIEW 4: FPO / AGGREGATOR HUB */}
        {currentRole === 'fpo' && (
          <FpoDashboard
            pools={pools}
            crops={crops}
            onOpenAiQuality={() => setIsQualityOpen(true)}
          />
        )}

        {/* VIEW 5: LOGISTICS PARTNER & ROUTE OPTIMIZATION */}
        {currentRole === 'logistics' && (
          <LogisticsDashboard
            route={logisticsRoute}
            onUpdateStopStatus={handleUpdateLogisticsStopStatus}
          />
        )}

        {/* VIEW 6: ADMIN GOVERNANCE CONSOLE */}
        {currentRole === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* GLOBAL MODALS */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={(lang) => setSelectedLanguage(lang)}
        onNavigate={(target) => {
          if (target === 'fair-price' || target === 'pools' || target === 'crops') {
            setCurrentRole('farmer');
          } else if (target === 'market') {
            setCurrentRole('buyer');
          }
        }}
      />

      <AiQualityModal
        isOpen={isQualityOpen}
        onClose={() => setIsQualityOpen(false)}
        onApplyInspection={(grade, score) => {
          // Update farmer tomato quality
          setCrops((prev) =>
            prev.map((c, i) => (i === 0 ? { ...c, qualityGrade: grade, qualityScore: score } : c))
          );
        }}
      />

      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSelectRole={(role) => setCurrentRole(role)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />
    </div>
  );
}
