'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { X, Check, TrendingUp, Users, DollarSign, RefreshCw, Lock, Zap, ArrowRight } from 'lucide-react';

const traditional = [
  { icon: DollarSign, text: 'Monthly subscription fees whether you ship or not' },
  { icon: Users, text: 'Per-seat pricing that penalizes team growth' },
  { icon: Lock, text: 'Vendor lock-in with annual contracts & auto-renewals' },
  { icon: TrendingUp, text: 'Costs escalate as your business scales' },
  { icon: RefreshCw, text: 'Surprise charges for "add-on" features' },
];

const rapidLinks = [
  { icon: Zap, text: 'One-time license fee for your chosen duration' },
  { icon: Check, text: 'Unlimited team members — no per-seat limits' },
  { icon: TrendingUp, text: 'Pay only per order booked — no order, no charge' },
  { icon: Check, text: 'Renew only when your license period ends' },
  { icon: Check, text: 'Full feature access from day one, no upgrades needed' },
];

export default function ProblemSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 mesh-bg overflow-hidden">
      {/* Background organic shape */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(80px)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-teal-700 font-semibold text-sm uppercase tracking-widest mb-4">
            The Problem With Traditional SaaS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            Tired of Per-Seat Pricing That{' '}
            <span className="teal-gradient-text">Punishes Growth?</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Most logistics SaaS tools charge you more as you grow — more users, more orders, more costs.
            RapidLinks flips the model: buy a license, pay per shipment, grow freely.
          </p>
        </motion.div>

        {/* Comparison — staggered asymmetric layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Traditional — shifted down */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:mt-8"
          >
            <div className="bg-white card-organic border border-red-100/50 p-8 lg:p-10 shadow-soft relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400/50 to-rose-300/50" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Traditional SaaS</h3>
                  <p className="text-sm text-gray-400">How most logistics software works</p>
                </div>
              </div>

              <ul className="space-y-5">
                {traditional.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                      className="flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed pt-1">{item.text}</span>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 p-4 bg-red-50/50 rounded-2xl border border-red-100/50">
                <p className="text-sm text-red-700 font-semibold text-center">
                  Result: Your software costs grow faster than your profits
                </p>
              </div>
            </div>
          </motion.div>

          {/* RapidLinks — shifted up */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:-mt-8"
          >
            <div className="bg-white card-organic border border-teal-100 p-8 lg:p-10 shadow-glow relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-teal-400" />

              {/* Glow accent */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)' }}
              />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center shadow-glow">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">RapidLinks</h3>
                  <p className="text-sm text-gray-400">License-based · Pay per shipment</p>
                </div>
              </div>

              <ul className="space-y-5">
                {rapidLinks.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                      className="flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed font-medium pt-1">{item.text}</span>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 p-4 bg-teal-50 rounded-2xl border border-teal-100">
                <p className="text-sm text-teal-800 font-bold text-center">
                  Result: Your costs stay proportional to actual revenue
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
