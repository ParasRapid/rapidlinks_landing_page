'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Package, Globe, BookOpen, Check, Calendar, TrendingUp, Receipt, Sparkles, ArrowRight, Phone, Mail, Building2, User, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AnimatedNumber from '@/components/AnimatedNumber';
import {
  PRODUCT_INFO,
  DURATION_SAVINGS,
  calculateEstimate,
  formatINR,
  type ProductId,
  type DurationMonths,
} from '@/lib/pricing-config';

const productMeta: Record<ProductId, { icon: React.ElementType; gradient: string }> = {
  domestic: { icon: Package, gradient: 'from-teal-700 to-teal-500' },
  international: { icon: Globe, gradient: 'from-teal-800 to-teal-600' },
  accounting: { icon: BookOpen, gradient: 'from-teal-600 to-teal-400' },
};

const durations: DurationMonths[] = [3, 6, 12];

const quoteSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  company: z.string().min(2, 'Please enter your company name'),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  monthlyVolume: z.string().min(1, 'Please enter estimated monthly orders'),
});

type QuoteForm = z.infer<typeof quoteSchema>;

export default function PricingCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const [selected, setSelected] = useState<Set<ProductId>>(new Set<ProductId>(['domestic']));
  const [duration, setDuration] = useState<DurationMonths>(6);
  const [monthlyOrders, setMonthlyOrders] = useState(1000);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
  });

  const toggleProduct = (id: ProductId) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const estimate = useMemo(() => {
    const arr = Array.from(selected);
    if (arr.length === 0) return null;
    return calculateEstimate(arr, duration, monthlyOrders);
  }, [selected, duration, monthlyOrders]);

  const onSubmit = (data: QuoteForm) => {
    console.log('Quote request:', { ...data, products: Array.from(selected), duration, monthlyOrders });
    setSubmitted(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setTimeout(() => { setSubmitted(false); reset(); }, 300);
  };

  return (
    <section ref={ref} id="pricing" className="relative py-24 lg:py-32 mesh-bg overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 opacity-[0.04] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 opacity-[0.03] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0F766E, transparent)', filter: 'blur(60px)', animationDelay: '6s' }} />

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
            <span className="text-xs font-bold text-teal-800 tracking-wide uppercase">Interactive Pricing Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            Estimate Your{' '}
            <span className="teal-gradient-text">Total Cost</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Pick your products, choose a license duration, and estimate your monthly order volume.
            See your license fee and usage cost update in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left — inputs (3/5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Step 1: Product selection */}
            <div className="glass card-organic p-6 lg:p-8 shadow-soft border-gradient">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-500 text-white text-sm font-black flex items-center justify-center shadow-glow">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Select Your Product License(s)</h3>
                  <p className="text-xs text-gray-500">Add one, two, or all three products. Each is a separate license.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {(Object.keys(PRODUCT_INFO) as ProductId[]).map((id, i) => {
                  const product = PRODUCT_INFO[id];
                  const meta = productMeta[id];
                  const Icon = meta.icon;
                  const isSelected = selected.has(id);
                  return (
                    <motion.button
                      key={id}
                      onClick={() => toggleProduct(id)}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className={`relative text-left p-5 card-organic-sm border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/50 shadow-glow'
                          : 'border-gray-200/60 bg-white/40 hover:border-teal-200 hover:bg-teal-50/20'
                      }`}
                    >
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center shadow-md"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                        isSelected ? `bg-gradient-to-br ${meta.gradient} shadow-glow` : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <p className="font-black text-gray-900 mb-1 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500 leading-snug mb-2">{product.tagline}</p>
                      <p className="text-xs font-bold text-teal-700">
                        from {formatINR(product.startingPrice.price)}/{product.startingPrice.months}mo
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div className="glass card-organic p-6 lg:p-8 shadow-soft border-gradient">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-500 text-white text-sm font-black flex items-center justify-center shadow-glow">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Choose License Duration</h3>
                  <p className="text-xs text-gray-500">Longer durations offer better per-month license value.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {durations.map((d, i) => {
                  const savings = DURATION_SAVINGS[d];
                  const isActive = duration === d;
                  return (
                    <motion.button
                      key={d}
                      onClick={() => setDuration(d)}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className={`relative p-5 card-organic-sm border-2 transition-all ${
                        isActive ? 'border-teal-500 bg-teal-50/50 shadow-glow' : 'border-gray-200/60 hover:border-teal-200'
                      }`}
                    >
                      {savings > 0 && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs px-2.5 py-0.5 border-0 shadow-md">
                            Save {savings}%
                          </Badge>
                        </div>
                      )}
                      <p className="text-2xl font-black text-gray-900">{d}</p>
                      <p className="text-sm text-gray-500 font-medium">months</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Order volume */}
            <div className="glass card-organic p-6 lg:p-8 shadow-soft border-gradient">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-500 text-white text-sm font-black flex items-center justify-center shadow-glow">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Estimated Monthly Order Volume</h3>
                  <p className="text-xs text-gray-500">How many orders do you expect to book per month?</p>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">0</span>
                  <motion.div
                    key={monthlyOrders}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-black teal-gradient-text tabular-nums"
                  >
                    {monthlyOrders.toLocaleString('en-IN')}
                  </motion.div>
                  <span className="text-sm text-gray-400">50,000</span>
                </div>
                <Slider
                  value={[monthlyOrders]}
                  onValueChange={(v) => setMonthlyOrders(v[0])}
                  max={50000}
                  min={0}
                  step={100}
                  className="[&_[role=slider]]:bg-teal-700 [&_[role=slider]]:border-teal-700 [&_[role=slider]]:shadow-glow [&_.bg-primary]:bg-teal-100"
                />
                <div className="flex justify-between mt-3 text-xs text-gray-400">
                  <span>Small business</span>
                  <span>Mid-market</span>
                  <span>Enterprise</span>
                </div>
              </div>

              <AnimatePresence>
                {estimate && estimate.volumeDiscount.discountPercent > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-5 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">
                      {estimate.volumeDiscount.label} applied
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — output panel (2/5, sticky) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden card-organic shadow-float">
                {/* Gradient header */}
                <div className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 p-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex items-center gap-2 mb-1">
                    <Receipt className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-black text-white">Your Cost Estimate</h3>
                  </div>
                  <p className="relative text-sm text-teal-100">
                    {selected.size} product{selected.size !== 1 ? 's' : ''} · {duration} month license
                  </p>
                </div>

                {/* Body — glass */}
                <div className="glass p-6">
                  {estimate && estimate.breakdown.length > 0 ? (
                    <div className="space-y-3 mb-5">
                      <AnimatePresence mode="popLayout">
                        {estimate.breakdown.map((b) => {
                          const product = PRODUCT_INFO[b.productId];
                          const Icon = productMeta[b.productId].icon;
                          return (
                            <motion.div
                              key={b.productId}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex items-center justify-between p-3 bg-white/60 rounded-2xl border border-white/40"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center">
                                  <Icon className="w-4 h-4 text-teal-700" />
                                </div>
                                <div>
                                  <p className="text-sm font-black text-gray-900">{product.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatINR(b.licenseFee)} · {formatINR(b.perOrderRate)}/order
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm font-bold text-gray-900">
                                {formatINR(b.monthlyUsage)}/mo
                              </p>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Select at least one product to see your estimate.
                    </p>
                  )}

                  <Separator className="my-4 bg-teal-100/50" />

                  {/* Cost summary */}
                  <div className="space-y-3">
                    <CostRow icon={Calendar} label={`License Fee (${duration} months)`} value={estimate?.licenseFee ?? 0} />
                    <CostRow icon={Package} label={`Usage Cost (${duration} months)`} value={estimate?.totalUsageCost ?? 0} />
                    <CostRow icon={TrendingUp} label="Effective Monthly License" value={estimate?.effectiveMonthlyLicenseCost ?? 0} suffix="/mo" />
                  </div>

                  <Separator className="my-4 bg-teal-100/50" />

                  {/* Total — animated */}
                  <div className="flex justify-between items-center p-5 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl border border-teal-100">
                    <div>
                      <p className="text-sm text-teal-700 font-semibold">Total for {duration} months</p>
                      <p className="text-xs text-gray-500">License + Usage combined</p>
                    </div>
                    <p className="text-3xl font-black teal-gradient-text tabular-nums">
                      <AnimatedNumber value={estimate?.totalCost ?? 0} format={(n) => formatINR(n)} duration={0.8} />
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="group w-full mt-6 bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-bold text-base rounded-full py-6 shadow-glow transition-all"
                  >
                    Get Exact Quote
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Our team will call you within 24 hours with a customized quote.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quote Dialog */}
      <Dialog open={dialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md card-organic overflow-hidden">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Get Your Exact Quote</DialogTitle>
                <DialogDescription>
                  Based on your selections: {Array.from(selected).map(s => PRODUCT_INFO[s].name).join(', ')} · {duration} months · {monthlyOrders.toLocaleString('en-IN')} orders/mo
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <QuoteField icon={User} label="Full Name" id="name" placeholder="Rajesh Kumar" register={register('name')} error={errors.name?.message} />
                <QuoteField icon={Building2} label="Company Name" id="company" placeholder="FastShip Logistics Pvt Ltd" register={register('company')} error={errors.company?.message} />
                <QuoteField icon={Phone} label="Phone Number" id="phone" placeholder="+91 98765 43210" register={register('phone')} error={errors.phone?.message} />
                <QuoteField icon={Mail} label="Business Email" id="email" type="email" placeholder="rajesh@fastship.in" register={register('email')} error={errors.email?.message} />
                <div className="space-y-1.5">
                  <Label htmlFor="monthlyVolume" className="text-sm font-semibold">Monthly Order Volume</Label>
                  <Input id="monthlyVolume" type="number" defaultValue={monthlyOrders} {...register('monthlyVolume')} className="rounded-xl" />
                  {errors.monthlyVolume && <p className="text-xs text-red-500">{errors.monthlyVolume.message}</p>}
                </div>

                <DialogFooter className="mt-6">
                  <Button type="submit" className="w-full bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-bold rounded-full py-6 text-base shadow-glow">
                    Request My Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-glow"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Quote Request Received!</h3>
              <p className="text-gray-500 mb-6 px-6">
                Our team will call you within 24 hours with a customized quote tailored to your business.
              </p>
              <Button onClick={closeDialog} className="bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function CostRow({ icon: Icon, label, value, suffix }: { icon: React.ElementType; label: string; value: number; suffix?: string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-bold text-gray-900 tabular-nums">
        <AnimatedNumber value={value} format={(n) => formatINR(n)} duration={0.6} />
        {suffix}
      </span>
    </div>
  );
}

function QuoteField({
  icon: Icon, label, id, type = 'text', placeholder, register, error,
}: {
  icon: React.ElementType;
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input id={id} type={type} placeholder={placeholder} className="pl-9 rounded-xl" {...register} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
