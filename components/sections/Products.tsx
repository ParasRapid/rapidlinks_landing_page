'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Package, Globe, BookOpen, ArrowRight, Layers, Sparkles, TrendingUp,
  Check, Star, Zap, ShieldCheck, MapPin, Truck, FileText, Banknote,
  Building2, DollarSign, BarChart3, Receipt, Calculator, Crown,
  Navigation, Clock, CircleDot, Activity, Plus, Minus, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCT_INFO, type ProductId, formatINR } from '@/lib/pricing-config';

// ═══════════════════════════════════════════════════
//  Feature Chip — animated pill with icon
// ═══════════════════════════════════════════════════
function FeatureChip({ icon: Icon, label, delay = 0 }: {
  icon: React.ElementType;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group/chip inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-teal-100 rounded-full px-3 py-1.5 cursor-default transition-all hover:border-teal-300 hover:shadow-glow"
    >
      <Icon className="w-3 h-3 text-teal-600 group-hover/chip:text-teal-700 transition-colors" />
      <span className="text-xs font-semibold text-gray-700 group-hover/chip:text-teal-800 transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  Browser Window — reusable layered window frame
// ═══════════════════════════════════════════════════
function BrowserWindow({
  title, children, className = '', delay = 0,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`glass card-organic-sm shadow-soft overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/30 border-b border-white/30">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/50" />
          <div className="w-2 h-2 rounded-full bg-amber-400/50" />
          <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
        </div>
        <span className="text-[9px] font-bold text-gray-500 ml-1">{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  Animated Bar Chart
// ═══════════════════════════════════════════════════
function MiniBars({ bars, delay = 0 }: { bars: number[]; delay?: number }) {
  return (
    <div className="flex items-end justify-between h-12 gap-0.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-teal-600 to-teal-300 min-h-[2px]"
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  Pricing Badge
// ═══════════════════════════════════════════════════
function PricingBadge({ label, icon: Icon, variant = 'default' }: {
  label: string;
  icon: React.ElementType;
  variant?: 'default' | 'featured';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
        variant === 'featured'
          ? 'bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-glow'
          : 'bg-teal-50 text-teal-700 border border-teal-100'
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  DOMESTIC PREVIEW — flagship product dashboard
// ═══════════════════════════════════════════════════
function DomesticPreview({ inView }: { inView: boolean }) {
  const shipments = [
    { awb: 'RL-001284', route: 'MUM → DEL', status: 'In Transit', color: 'bg-blue-500', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { awb: 'RL-001283', route: 'BLR → HYD', status: 'Delivered', color: 'bg-emerald-500', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { awb: 'RL-001282', route: 'CHE → PUN', status: 'Out for Delivery', color: 'bg-amber-500', textColor: 'text-amber-600', bgColor: 'bg-amber-50' },
  ];

  return (
    <div className="relative">
      {/* Main dashboard window */}
      <BrowserWindow title="rapidlinks.in/domestic/orders" className="relative z-10">
        <div className="p-3 space-y-2.5">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Orders', value: '1,284', change: '+12%', icon: Package, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'In Transit', value: '847', change: '+5%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Delivered', value: '9,431', change: '+18%', icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="bg-white/60 rounded-xl p-2 border border-white/40"
                >
                  <div className={`w-5 h-5 rounded-lg ${kpi.bg} flex items-center justify-center mb-1`}>
                    <Icon className={`w-2.5 h-2.5 ${kpi.color}`} />
                  </div>
                  <p className="text-[8px] text-gray-500">{kpi.label}</p>
                  <p className="text-sm font-black text-gray-900">{kpi.value}</p>
                  <p className={`text-[8px] font-bold ${kpi.color}`}>{kpi.change}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Shipment list */}
          <div className="space-y-1.5">
            {shipments.map((s, i) => (
              <motion.div
                key={s.awb}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center justify-between p-2 bg-white/40 rounded-lg border border-white/30"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                  <div>
                    <p className="text-[9px] font-bold text-gray-800">{s.awb}</p>
                    <p className="text-[8px] text-gray-500">{s.route}</p>
                  </div>
                </div>
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-semibold ${s.bgColor} ${s.textColor}`}>
                  {s.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </BrowserWindow>

      {/* Floating delivery timeline widget */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -right-4 -bottom-4 z-20"
      >
        <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="glass card-organic-sm shadow-float p-2.5 w-36">
            <p className="text-[9px] font-bold text-gray-700 mb-2 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-teal-600" />
              Delivery Timeline
            </p>
            <div className="space-y-1.5">
              {[
                { label: 'Booked', done: true },
                { label: 'Picked Up', done: true },
                { label: 'In Transit', done: true },
                { label: 'Delivered', done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-teal-500' : 'bg-gray-200'}`} />
                  <span className={`text-[8px] ${step.done ? 'text-gray-700 font-semibold' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating warehouse pin */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1, type: 'spring' }}
        className="absolute -left-3 top-1/2 z-20"
      >
        <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          <div className="glass card-organic-sm shadow-float p-2 flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center">
              <Building2 className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[8px] font-bold text-gray-800">Warehouse</p>
              <p className="text-[7px] text-teal-600 font-semibold">Mumbai Hub</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  INTERNATIONAL PREVIEW
// ═══════════════════════════════════════════════════
function InternationalPreview({ inView }: { inView: boolean }) {
  return (
    <div className="relative">
      <BrowserWindow title="rapidlinks.in/international/customs" className="relative z-10">
        <div className="p-3 space-y-2.5">
          {/* Customs doc preview */}
          <div className="bg-white/60 rounded-xl p-2.5 border border-white/40">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-gray-700">Customs Declaration</p>
              <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-emerald-50 text-emerald-600">Cleared</span>
            </div>
            <div className="space-y-1">
              {[
                { label: 'HS Code', value: '8517.62.00' },
                { label: 'Origin', value: 'India' },
                { label: 'Destination', value: 'United States' },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex justify-between text-[8px]"
                >
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-bold text-gray-800">{row.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Currency conversion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 p-2 bg-white/40 rounded-lg border border-white/30"
          >
            <div className="flex-1 text-center">
              <p className="text-[8px] text-gray-500">INR</p>
              <p className="text-sm font-black text-gray-900">₹84,250</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-teal-700" />
            </div>
            <div className="flex-1 text-center">
              <p className="text-[8px] text-gray-500">USD</p>
              <p className="text-sm font-black text-gray-900">$1,012</p>
            </div>
          </motion.div>
        </div>
      </BrowserWindow>

      {/* Floating global tracking widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, type: 'spring' }}
        className="absolute -right-3 -top-3 z-20"
      >
        <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="glass card-organic-sm shadow-float p-2 flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-800 to-teal-600 flex items-center justify-center">
              <Globe className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[8px] font-bold text-gray-800">Global Track</p>
              <p className="text-[7px] text-teal-600 font-semibold">12 countries</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  ACCOUNTING PREVIEW
// ═══════════════════════════════════════════════════
function AccountingPreview({ inView }: { inView: boolean }) {
  return (
    <div className="relative">
      <BrowserWindow title="rapidlinks.in/accounting/dashboard" className="relative z-10">
        <div className="p-3 space-y-2.5">
          {/* Profit chart */}
          <div className="bg-white/60 rounded-xl p-2.5 border border-white/40">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-gray-700">Profit Analysis</p>
              <div className="flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5 text-teal-600" />
                <span className="text-[8px] font-bold text-teal-600">+24%</span>
              </div>
            </div>
            <MiniBars bars={[35, 55, 40, 70, 50, 85, 65, 80, 60, 90, 75, 95]} delay={0.4} />
          </div>

          {/* GST + Invoice row */}
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-white/60 rounded-xl p-2 border border-white/40"
            >
              <div className="w-5 h-5 rounded-lg bg-teal-50 flex items-center justify-center mb-1">
                <FileText className="w-2.5 h-2.5 text-teal-700" />
              </div>
              <p className="text-[8px] text-gray-500">GST Filed</p>
              <p className="text-sm font-black text-gray-900">₹2.4L</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="bg-white/60 rounded-xl p-2 border border-white/40"
            >
              <div className="w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center mb-1">
                <Receipt className="w-2.5 h-2.5 text-emerald-600" />
              </div>
              <p className="text-[8px] text-gray-500">Invoices</p>
              <p className="text-sm font-black text-gray-900">847</p>
            </motion.div>
          </div>
        </div>
      </BrowserWindow>

      {/* Floating billing automation widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, type: 'spring' }}
        className="absolute -left-3 -bottom-3 z-20"
      >
        <motion.div animate={{ y: [2, -2, 2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
          <div className="glass card-organic-sm shadow-float p-2 flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[8px] font-bold text-gray-800">Auto-Billing</p>
              <p className="text-[7px] text-teal-600 font-semibold">847 invoices sent</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PRODUCT DATA
// ═══════════════════════════════════════════════════
const productConfig = {
  domestic: {
    icon: Package,
    gradient: 'from-teal-700 to-teal-500',
    accent: 'text-teal-700',
    chips: [
      { icon: Package, label: 'Order Booking' },
      { icon: Truck, label: 'Pickup Scheduling' },
      { icon: MapPin, label: 'Real-time Tracking' },
      { icon: Banknote, label: 'COD Management' },
      { icon: Layers, label: 'Bulk Upload' },
      { icon: FileText, label: 'AWB Generation' },
    ],
    badge: { label: 'Most Popular', icon: Crown, variant: 'featured' as const },
    pricingLabel: 'License from',
    pricingNote: 'One-time · No monthly fees',
  },
  international: {
    icon: Globe,
    gradient: 'from-teal-800 to-teal-600',
    accent: 'text-teal-800',
    chips: [
      { icon: FileText, label: 'Customs Docs' },
      { icon: BarChart3, label: 'HS Codes' },
      { icon: DollarSign, label: 'Multi-Currency' },
      { icon: Truck, label: 'Carrier Integration' },
      { icon: ShieldCheck, label: 'Compliance' },
      { icon: Globe, label: 'Global Tracking' },
    ],
    badge: { label: 'Cross-Border', icon: Globe, variant: 'default' as const },
    pricingLabel: 'License from',
    pricingNote: 'One-time · No monthly fees',
  },
  accounting: {
    icon: BookOpen,
    gradient: 'from-teal-600 to-teal-400',
    accent: 'text-teal-700',
    chips: [
      { icon: BookOpen, label: 'Automated Ledgers' },
      { icon: FileText, label: 'GST Reconciliation' },
      { icon: Banknote, label: 'COD Settlement' },
      { icon: BarChart3, label: 'P&L Dashboards' },
      { icon: Receipt, label: 'Billing Automation' },
      { icon: ShieldCheck, label: 'Audit Exports' },
    ],
    badge: { label: 'Best Value', icon: Star, variant: 'default' as const },
    pricingLabel: 'License from',
    pricingNote: 'One-time · No monthly fees',
  },
};

// ═══════════════════════════════════════════════════
//  PRODUCT CARD — flagship vs supporting
// ═══════════════════════════════════════════════════
function ProductCard({
  id, inView, onCta, variant = 'supporting',
}: {
  id: ProductId;
  inView: boolean;
  onCta: () => void;
  variant?: 'flagship' | 'supporting';
}) {
  const config = productConfig[id];
  const product = PRODUCT_INFO[id];
  const Icon = config.icon;
  const isFlagship = variant === 'flagship';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: isFlagship ? 0.1 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div className={`relative bg-white card-organic${isFlagship ? '-lg' : ''} border border-gray-100/80 shadow-soft hover:shadow-glow overflow-hidden h-full transition-all duration-500`}>
        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-100/0 group-hover:from-teal-50/40 group-hover:to-teal-100/20 transition-all duration-500`} />

        {/* Floating gradient orb */}
        <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${config.gradient} opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-500 blur-3xl`} />

        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} opacity-60`} />

        <div className={`relative ${isFlagship ? 'p-7 lg:p-9' : 'p-6 lg:p-7'}`}>
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 text-white`} />
              </div>
              <div>
                <h3 className={`${isFlagship ? 'text-2xl' : 'text-xl'} font-black text-gray-950`}>{product.name}</h3>
                <p className={`text-xs font-semibold ${config.accent}`}>{product.tagline}</p>
              </div>
            </div>
            <PricingBadge
              label={config.badge.label}
              icon={config.badge.icon}
              variant={config.badge.variant}
            />
          </div>

          {/* Description */}
          <p className={`text-sm text-gray-500 leading-relaxed mb-5 ${isFlagship ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>

          {/* Software preview */}
          <div className="mb-5">
            {id === 'domestic' && <DomesticPreview inView={inView} />}
            {id === 'international' && <InternationalPreview inView={inView} />}
            {id === 'accounting' && <AccountingPreview inView={inView} />}
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {config.chips.map((chip, i) => (
              <FeatureChip key={i} icon={chip.icon} label={chip.label} delay={0.4 + i * 0.06} />
            ))}
          </div>

          {/* Pricing block */}
          <div className="flex items-end justify-between p-4 bg-gradient-to-br from-teal-50/60 to-teal-100/30 rounded-2xl border border-teal-100/50 mb-5">
            <div>
              <p className="text-xs text-gray-500 font-medium">{config.pricingLabel}</p>
              <p className="text-2xl font-black text-gray-900">
                {formatINR(product.startingPrice.price)}
                <span className="text-sm text-gray-400 font-medium">/{product.startingPrice.months}mo</span>
              </p>
              <p className="text-[10px] text-teal-600 font-semibold mt-0.5">{config.pricingNote}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Per order</p>
              <p className="text-lg font-black teal-gradient-text">{formatINR(product.perOrderRate)}</p>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onCta}
            className={`group/btn w-full bg-gradient-to-r ${config.gradient} hover:shadow-glow text-white font-semibold rounded-full transition-all`}
          >
            Calculate Pricing
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  CONNECTOR LINES — SVG overlay connecting products
// ═══════════════════════════════════════════════════
function ConnectorLines({ inView }: { inView: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="connectorGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F766E" stopOpacity="0" />
          <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Domestic → International */}
      <motion.path
        d="M 700 200 Q 800 180 900 160"
        stroke="url(#connectorGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
      />
      {/* Domestic → Accounting */}
      <motion.path
        d="M 700 500 Q 800 520 900 560"
        stroke="url(#connectorGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
      />
      {/* Junction node */}
      <motion.circle
        cx="700"
        cy="350"
        r="4"
        fill="#2DD4BF"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.2, type: 'spring' }}
      />
      <motion.circle
        cx="700"
        cy="350"
        r="4"
        fill="none"
        stroke="#2DD4BF"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 2.5], opacity: [0.6, 0] } : {}}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════
//  MAIN SECTION
// ═══════════════════════════════════════════════════
export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} id="products" className="relative py-24 lg:py-32 overflow-hidden mesh-bg noise-overlay">
      {/* Background mesh gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] opacity-[0.04] animate-drift"
          style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] opacity-[0.04] animate-drift"
          style={{ background: 'radial-gradient(circle, #0F766E, transparent)', filter: 'blur(60px)', animationDelay: '4s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-teal rounded-full px-4 py-2 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-xs font-bold text-teal-800 tracking-wide uppercase">Three Products · One Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            Choose Your{' '}
            <span className="teal-gradient-text">Product License</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Each product is a separate software module with its own license.
            Mix and match — buy 1, 2, or all 3 products together.
          </p>
        </motion.div>

        {/* Mix-and-match note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-100 rounded-full px-5 py-2.5 shadow-soft">
            <Layers className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-800">
              Mix and match — buy 1, 2, or all 3 products together
            </span>
          </div>
        </motion.div>

        {/* Masonry layout — Domestic flagship left, International + Accounting right */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Connector lines overlay */}
          <ConnectorLines inView={inView} />

          {/* Domestic — flagship, 7 cols, tall */}
          <div className="lg:col-span-7 lg:row-span-2 relative z-10">
            <ProductCard id="domestic" inView={inView} onCta={() => scrollTo('pricing')} variant="flagship" />
          </div>

          {/* International — 5 cols, top right */}
          <div className="lg:col-span-5 relative z-10">
            <ProductCard id="international" inView={inView} onCta={() => scrollTo('pricing')} />
          </div>

          {/* Accounting — 5 cols, bottom right */}
          <div className="lg:col-span-5 relative z-10">
            <ProductCard id="accounting" inView={inView} onCta={() => scrollTo('pricing')} />
          </div>
        </div>

        {/* Bottom unified platform note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 glass card-organic-sm px-6 py-3 shadow-soft">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-sm font-bold text-gray-700">Domestic</span>
            </div>
            <Plus className="w-3 h-3 text-gray-400" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-600" />
              <span className="text-sm font-bold text-gray-700">International</span>
            </div>
            <Plus className="w-3 h-3 text-gray-400" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-sm font-bold text-gray-700">Accounting</span>
            </div>
            <span className="text-sm text-gray-400 ml-2">= One unified logistics platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
