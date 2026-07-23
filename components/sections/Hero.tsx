'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import {
  motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight, Calculator, CheckCircle2, ChevronDown, Package, Truck, MapPin,
  TrendingUp, Star, Zap, Bell, QrCode, Barcode, ShieldCheck, Activity,
  Clock, Navigation, CircleDot, Building2, Sparkles, Globe, Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedNumber from '@/components/AnimatedNumber';

// ═══════════════════════════════════════════════════
//  Magnetic Button — premium interactive CTA
// ═══════════════════════════════════════════════════
function MagneticButton({
  children, onClick, variant = 'primary',
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  if (variant === 'primary') {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY }}
        className="relative"
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
        <Button
          size="lg"
          onClick={onClick}
          className="group relative bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-bold text-base px-8 py-6 rounded-full shadow-glow transition-all overflow-hidden"
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute top-0 left-0 h-full w-1/3 bg-white/20 blur-md animate-shimmer-sweep" />
          </span>
          <span className="relative flex items-center">
            {children}
          </span>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      <Button
        size="lg"
        variant="ghost"
        onClick={onClick}
        className="group relative text-gray-700 hover:text-teal-700 font-bold text-base px-8 py-6 rounded-full transition-all border border-gray-200 hover:border-teal-300 bg-white/50 backdrop-blur-sm overflow-hidden"
      >
        {/* Gradient border on hover */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-50 to-teal-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center">
          {children}
        </span>
      </Button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  Live Shipment Feed — rotating shipment statuses
// ═══════════════════════════════════════════════════
const shipments = [
  { awb: 'RL-2024-001284', from: 'Mumbai', to: 'Delhi', status: 'In Transit', color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  { awb: 'RL-2024-001283', from: 'Bangalore', to: 'Hyderabad', status: 'Delivered', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  { awb: 'RL-2024-001282', from: 'Chennai', to: 'Pune', status: 'Out for Delivery', color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-500' },
  { awb: 'RL-2024-001281', from: 'Delhi', to: 'Kolkata', status: 'Booked', color: 'text-teal-600', bg: 'bg-teal-50', dot: 'bg-teal-500' },
  { awb: 'RL-2024-001280', from: 'Ahmedabad', to: 'Surat', status: 'Picked Up', color: 'text-indigo-600', bg: 'bg-indigo-50', dot: 'bg-indigo-500' },
];

function LiveShipmentFeed() {
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        const next = prev + 1;
        return next > shipments.length ? 3 : next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1.5">
      <AnimatePresence mode="popLayout">
        {shipments.slice(0, visibleCount).map((item, i) => (
          <motion.div
            key={`${item.awb}-${i}`}
            layout
            initial={{ opacity: 0, x: 20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between p-2.5 bg-white/50 rounded-xl border border-white/40"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-2 h-2 rounded-full ${item.dot} shrink-0 relative`}>
                <span className={`absolute inset-0 rounded-full ${item.dot} animate-ping opacity-40`} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-800 text-[11px] truncate">{item.awb}</p>
                <p className="text-gray-500 text-[10px] truncate">{item.from} → {item.to}</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.bg} ${item.color} shrink-0`}>
              {item.status}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  Animated Bar Chart
// ═══════════════════════════════════════════════════
function MiniBarChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];
  return (
    <div className="flex items-end justify-between h-16 gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${h}%`, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-teal-500 to-teal-300 min-h-[2px]"
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  Route Map — animated SVG with moving dots
// ═══════════════════════════════════════════════════
function RouteMap() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      {/* Route paths */}
      <path d="M 30 90 Q 60 40 100 60 T 170 30" stroke="url(#routeGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-dash-move" opacity="0.5" />
      <path d="M 30 90 Q 80 70 120 80 T 170 50" stroke="url(#routeGrad)" strokeWidth="1" fill="none" strokeDasharray="3 3" className="animate-dash-move" opacity="0.3" />

      {/* City nodes */}
      {[
        { cx: 30, cy: 90, label: 'MUM' },
        { cx: 100, cy: 60, label: 'DEL' },
        { cx: 170, cy: 30, label: 'KOL' },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.cx} cy={node.cy} r="4" fill="#0F766E" />
          <circle cx={node.cx} cy={node.cy} r="4" fill="none" stroke="#0F766E" strokeWidth="1" className="animate-pulse-ring" style={{ transformOrigin: `${node.cx}px ${node.cy}px` }} />
          <text x={node.cx} y={node.cy - 8} textAnchor="middle" className="fill-teal-700" fontSize="6" fontWeight="700">{node.label}</text>
        </g>
      ))}

      {/* Moving shipment dot */}
      <motion.circle
        r="2.5"
        fill="#2DD4BF"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ offsetPath: "path('M 30 90 Q 60 40 100 60 T 170 30')" }}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════
//  Main Dashboard — the centerpiece
// ═══════════════════════════════════════════════════
function MainDashboard({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [3, -3]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [-3, 3]);

  return (
    <motion.div
      style={{ rotateY, rotateX, transformPerspective: 1200 }}
      className="relative glass card-organic-lg shadow-float overflow-hidden"
    >
      {/* Window header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/30 bg-white/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
            <Globe className="w-3 h-3" />
            rapidlinks.in/dashboard
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-600 font-semibold">LIVE</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="p-4 space-y-3">
        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Orders Today', value: 1284, change: '+12%', icon: Package, color: 'text-teal-600', bg: 'bg-teal-50' },
            { label: 'In Transit', value: 847, change: '+5%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Delivered', value: 9431, change: '+18%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-white/60 rounded-2xl p-3 border border-white/40"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`w-6 h-6 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <span className={`text-[9px] font-bold ${stat.color}`}>{stat.change}</span>
                </div>
                <p className="text-[9px] text-gray-500 mb-0.5">{stat.label}</p>
                <p className="text-lg font-black text-gray-900 tabular-nums">
                  <AnimatedNumber value={stat.value} duration={2} />
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Chart + Route Map row */}
        <div className="grid grid-cols-5 gap-2.5">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="col-span-3 bg-white/60 rounded-2xl p-3 border border-white/40"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-gray-700">Weekly Volume</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5 text-teal-600" />
                <span className="text-[9px] font-bold text-teal-600">+24%</span>
              </div>
            </div>
            <MiniBarChart />
          </motion.div>

          {/* Route map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            className="col-span-2 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-2 border border-white/40 relative overflow-hidden"
          >
            <p className="text-[9px] font-bold text-gray-700 mb-1">Active Routes</p>
            <div className="h-16">
              <RouteMap />
            </div>
          </motion.div>
        </div>

        {/* Live shipment feed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white/40 rounded-2xl p-3 border border-white/30"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-teal-600" />
              <p className="text-[10px] font-bold text-gray-700">Live Shipments</p>
            </div>
            <span className="text-[9px] text-gray-400 font-medium">Updated 2s ago</span>
          </div>
          <LiveShipmentFeed />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  Floating Logistics Widgets
// ═══════════════════════════════════════════════════
function FloatingWidget({
  children, className, delay = 0, floatDelay = 0,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
  floatDelay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ShipmentLabelWidget() {
  return (
    <FloatingWidget className="-left-6 top-[8%] w-44" delay={1.2} floatDelay={0}>
      <div className="glass card-organic-sm shadow-float p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center">
            <Package className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-800">AWB Generated</p>
            <p className="text-[9px] text-teal-600 font-semibold">RL-2024-001284</p>
          </div>
        </div>
        {/* Barcode */}
        <div className="flex gap-px h-6 items-end bg-white/60 rounded-md p-1.5">
          {[3, 1, 4, 1, 2, 5, 1, 3, 2, 4, 1, 3, 5, 2, 1, 4, 3, 1, 2, 5].map((w, i) => (
            <div key={i} className="bg-gray-800 rounded-sm" style={{ width: `${w}px`, height: '100%' }} />
          ))}
        </div>
        <p className="text-[8px] text-gray-400 mt-1 text-center font-mono">*1284RL2024*</p>
      </div>
    </FloatingWidget>
  );
}

function TrackingNotificationWidget() {
  return (
    <FloatingWidget className="-right-4 top-[2%] w-48" delay={1.4} floatDelay={1.5}>
      <div className="glass card-organic-sm shadow-float p-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-gray-800">Delivery Alert</p>
            <p className="text-[9px] text-gray-500 leading-tight mt-0.5">Shipment RL-001283 delivered to Hyderabad</p>
            <p className="text-[8px] text-emerald-600 font-semibold mt-1">2 min ago</p>
          </div>
        </div>
      </div>
    </FloatingWidget>
  );
}

function QRCodeWidget() {
  return (
    <FloatingWidget className="-right-6 bottom-[8%] w-36" delay={1.6} floatDelay={0.8}>
      <div className="glass card-organic-sm shadow-float p-3">
        <div className="flex items-center gap-2 mb-2">
          <QrCode className="w-3.5 h-3.5 text-teal-700" />
          <p className="text-[10px] font-black text-gray-800">Scan to Track</p>
        </div>
        {/* Fake QR code */}
        <div className="grid grid-cols-6 gap-0.5 p-1.5 bg-white/60 rounded-lg">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm ${
                [0,1,5,6,7,11,12,13,17,18,23,24,29,30,35].includes(i) || (i % 7 === 0) ? 'bg-gray-900' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </FloatingWidget>
  );
}

function UsageWidget() {
  return (
    <FloatingWidget className="-left-4 bottom-[12%] w-44" delay={1.8} floatDelay={2}>
      <div className="glass card-organic-sm shadow-float p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-800 to-teal-600 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-800">Usage This Month</p>
            <p className="text-[9px] text-teal-600 font-semibold">1,284 orders · ₹1,284</p>
          </div>
        </div>
        {/* Mini progress */}
        <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '64%' }}
            transition={{ delay: 2, duration: 1 }}
            className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"
          />
        </div>
        <p className="text-[8px] text-gray-400 mt-1">64% of 2,000 order cap</p>
      </div>
    </FloatingWidget>
  );
}

function LicenseWidget() {
  return (
    <FloatingWidget className="left-[2%] top-[45%] w-40" delay={2.0} floatDelay={1.2}>
      <div className="glass card-organic-sm shadow-float p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          <p className="text-[10px] font-black text-gray-800">Domestic License</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-gray-500">Active</span>
          <span className="text-[9px] font-bold text-teal-600">11 months left</span>
        </div>
        {/* Time bar */}
        <div className="mt-2 h-1 bg-gray-200/60 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '92%' }}
            transition={{ delay: 2.2, duration: 1 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          />
        </div>
      </div>
    </FloatingWidget>
  );
}

// ═══════════════════════════════════════════════════
//  Secondary Windows — layered behind/around main
// ═══════════════════════════════════════════════════
function LabelGenerationWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.3, duration: 0.7 }}
      className="absolute -left-12 top-[55%] w-52 z-10"
    >
      <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="glass card-organic shadow-float overflow-hidden">
          <div className="px-3 py-2 bg-white/30 border-b border-white/30 flex items-center gap-1.5">
            <Barcode className="w-3 h-3 text-teal-700" />
            <span className="text-[10px] font-bold text-gray-700">Label Generator</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="bg-white/60 rounded-lg p-2 space-y-1.5">
              <div className="flex justify-between text-[8px]">
                <span className="text-gray-500">From:</span>
                <span className="font-bold text-gray-800">Mumbai</span>
              </div>
              <div className="flex justify-between text-[8px]">
                <span className="text-gray-500">To:</span>
                <span className="font-bold text-gray-800">Delhi</span>
              </div>
              <div className="flex gap-px h-5 items-end bg-white/80 rounded p-1">
                {[2, 4, 1, 3, 5, 2, 1, 4, 3, 2, 5, 1, 3, 4, 2, 1].map((w, i) => (
                  <div key={i} className="bg-gray-800 rounded-sm" style={{ width: `${w}px`, height: '100%' }} />
                ))}
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-teal-700 to-teal-500 text-white text-[9px] font-bold py-1.5 rounded-lg">
              Generate AWB
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileAppWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.5, duration: 0.7 }}
      className="absolute -right-10 top-[50%] w-32 z-10"
    >
      <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <div className="glass card-organic shadow-float overflow-hidden">
          <div className="px-3 py-2 bg-gradient-to-r from-teal-700 to-teal-500">
            <span className="text-[10px] font-bold text-white">RapidLinks App</span>
          </div>
          <div className="p-2.5 space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-teal-100 flex items-center justify-center">
                <Navigation className="w-3 h-3 text-teal-700" />
              </div>
              <div className="flex-1">
                <p className="text-[8px] font-bold text-gray-800">Track Shipment</p>
                <p className="text-[7px] text-gray-500">Real-time GPS</p>
              </div>
            </div>
            <div className="bg-teal-50 rounded-lg p-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[7px] text-gray-500">ETA</span>
                <span className="text-[8px] font-bold text-teal-700">2h 14m</span>
              </div>
              <div className="mt-1 h-1 bg-teal-200/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 2, duration: 1.5 }}
                  className="h-full bg-teal-600 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  Credibility Section — metrics, logos, ratings
// ═══════════════════════════════════════════════════
const credibilityMetrics = [
  { value: 500, suffix: '+', label: 'Businesses Served', icon: Building2 },
  { value: 10, suffix: 'M+', label: 'Orders Processed', icon: Package },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', icon: Activity },
  { value: 120, suffix: '+', label: 'Cities Covered', icon: MapPin },
];

const companyLogos = ['FastShip', 'GlobalReach', 'Speedy', 'PrimeCargo', 'ExpressWay', 'LogiPro'];

function formatStat(n: number): string {
  return Number.isInteger(n) ? Math.floor(n).toLocaleString('en-IN') : n.toFixed(1);
}

function CredibilitySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-16 lg:mt-20"
    >
      {/* Rating + social proof bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          {/* Star rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1 + i * 0.08, type: 'spring' }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">4.9/5</span>
            <span className="text-xs text-gray-400">from 200+ reviews</span>
          </div>
        </div>

        {/* Avatars */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-sm"
                style={{ background: `linear-gradient(135deg, #0F766E, #${['2DD4BF','14B8A6','0D9488','0F766E','115E59'][i]})` }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Trusted by <span className="font-black text-gray-900">500+</span> businesses
          </p>
        </div>
      </div>

      {/* Animated metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {credibilityMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group glass card-organic p-5 border-gradient text-center"
            >
              <div className="inline-flex w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 items-center justify-center mb-3 group-hover:from-teal-700 group-hover:to-teal-500 transition-all">
                <Icon className="w-5 h-5 text-teal-700 group-hover:text-white transition-colors" />
              </div>
              <p className="text-2xl lg:text-3xl font-black text-gray-950 tabular-nums">
                <AnimatedNumber value={metric.value} format={formatStat} duration={2.5} />
                <span className="teal-gradient-text">{metric.suffix}</span>
              </p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Company logo strip */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-8 animate-scroll-x w-max">
          {[...companyLogos, ...companyLogos].map((logo, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 opacity-40 hover:opacity-70 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="font-black text-teal-700 text-sm">{logo.charAt(0)}</span>
              </div>
              <span className="font-bold text-gray-600 text-sm whitespace-nowrap">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  Animated Headline — word-by-word reveal
// ═══════════════════════════════════════════════════
function AnimatedHeadline() {
  const words = [
    { text: 'Logistics', className: '' },
    { text: 'Software', className: '' },
    { text: 'That', className: '' },
    { text: 'Scales', className: 'teal-gradient-text' },
    { text: 'With', className: '' },
    { text: 'Your', className: '' },
    { text: 'Business', className: '' },
  ];

  return (
    <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[68px] font-black leading-[1.05] tracking-tight text-gray-950 mb-6 text-balance">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block mr-[0.25em] ${word.className}`}
        >
          {word.text}
        </motion.span>
      ))}
      {' — '}
      <motion.span
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.15 + words.length * 0.08, duration: 0.5 }}
        className="relative inline-block"
      >
        Not Your Bill.
        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M2 7C60 2 180 1 298 5"
            stroke="#2DD4BF"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.8 + words.length * 0.08 }}
          />
        </svg>
      </motion.span>
    </h1>
  );
}

// ═══════════════════════════════════════════════════
//  MAIN HERO SECTION
// ═══════════════════════════════════════════════════
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 100]);
  const y2 = useTransform(scrollY, [0, 800], [0, -60]);
  const y3 = useTransform(scrollY, [0, 800], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg noise-overlay pt-24 pb-16 lg:pt-28 lg:pb-12"
      aria-label="Hero"
    >
      {/* ── Layer 1: Grid pattern ── */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* ── Layer 2: Animated glowing blobs ── */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[6%] right-[8%] w-[400px] h-[400px] opacity-20 animate-glow-breathe"
          style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-[5%] left-[3%] w-[500px] h-[500px] opacity-15 animate-glow-breathe"
          style={{ background: 'radial-gradient(circle, #0F766E, transparent 70%)', filter: 'blur(80px)', animationDelay: '3s' }}
        />
        <div
          className="absolute top-[40%] left-[35%] w-[300px] h-[300px] opacity-10 animate-glow-breathe"
          style={{ background: 'radial-gradient(circle, #14B8A6, transparent 70%)', filter: 'blur(50px)', animationDelay: '6s' }}
        />
      </motion.div>

      {/* ── Layer 3: Curved logistics route lines ── */}
      <motion.div style={{ y: y2, opacity }} className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            <linearGradient id="heroRoute" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0F766E" stopOpacity="0" />
              <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M -100 200 Q 400 100 800 300 T 1600 200" stroke="url(#heroRoute)" strokeWidth="1.5" fill="none" strokeDasharray="6 8" className="animate-dash-move" />
          <path d="M -100 600 Q 500 500 900 700 T 1600 500" stroke="url(#heroRoute)" strokeWidth="1" fill="none" strokeDasharray="4 6" className="animate-dash-move" opacity="0.5" />
        </svg>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top: headline + copy + CTAs */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          {/* Left — text content */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 glass-teal rounded-full pl-1.5 pr-4 py-1.5 mb-7">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </span>
                <span className="text-xs font-bold text-teal-800 tracking-wide uppercase">License-Based Logistics Software</span>
              </div>
            </motion.div>

            {/* Animated headline */}
            <AnimatedHeadline />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-500 mb-8 leading-relaxed max-w-xl"
            >
              One-time product license. Pay only for what you actually ship.
              No per-seat fees. No recurring surprises. Full control over your logistics operations.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-x-5 gap-y-2.5 mb-10"
            >
              {[
                'No monthly subscription',
                'Pay per order booked',
                'One-time license fee',
                'Unlimited team members',
              ].map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="flex items-center gap-1.5 text-sm text-gray-600 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  {point}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs — magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton variant="primary" onClick={() => scrollTo('demo')}>
                Book a Free Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollTo('pricing')}>
                <Calculator className="mr-2 w-4 h-4" />
                Calculate Your Pricing
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Dashboard composition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: y3 }}
            className="lg:col-span-6 relative h-[520px] hidden lg:block"
          >
            {/* Main dashboard */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-md">
                <MainDashboard mouseX={smoothMouseX} mouseY={smoothMouseY} />
              </div>
            </div>

            {/* Floating logistics widgets */}
            <ShipmentLabelWidget />
            <TrackingNotificationWidget />
            <QRCodeWidget />
            <UsageWidget />
            <LicenseWidget />

            {/* Secondary windows */}
            <LabelGenerationWindow />
            <MobileAppWindow />
          </motion.div>
        </div>

        {/* Credibility section — full width */}
        <CredibilitySection />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
