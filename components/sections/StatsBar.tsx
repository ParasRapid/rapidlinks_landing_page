'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, PackageCheck, Activity, HeadphonesIcon } from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';

const stats = [
  { value: 500, suffix: '+', label: 'Businesses Onboarded', icon: Building2, note: '{{EDIT_ME}}' },
  { value: 10, suffix: 'M+', label: 'Orders Processed', icon: PackageCheck, note: '{{EDIT_ME}}' },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', icon: Activity, note: '{{EDIT_ME}}' },
  { value: 24, suffix: '/7', label: 'Expert Support', icon: HeadphonesIcon, note: '{{EDIT_ME}}' },
];

function formatStat(n: number): string {
  return Number.isInteger(n) ? Math.floor(n).toLocaleString('en-IN') : n.toFixed(1);
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 mesh-bg overflow-hidden">
      {/* Top organic divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300/40 to-transparent" />

      {/* Floating decorative blobs */}
      <div
        className="absolute top-1/2 left-0 w-64 h-64 opacity-[0.04] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute top-1/4 right-0 w-80 h-80 opacity-[0.03] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0F766E, transparent)', filter: 'blur(50px)', animationDelay: '5s' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="glass card-organic p-6 lg:p-8 text-center border-gradient transition-all duration-300 hover:shadow-glow">
                  {/* Icon */}
                  <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 items-center justify-center mb-5 group-hover:from-teal-700 group-hover:to-teal-500 transition-all duration-300">
                    <Icon className="w-6 h-6 text-teal-700 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Number */}
                  <div className="text-4xl lg:text-5xl font-black text-gray-950 mb-2 tabular-nums">
                    <AnimatedNumber value={stat.value} format={formatStat} duration={2} />
                    <span className="teal-gradient-text">{stat.suffix}</span>
                  </div>

                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300/40 to-transparent" />
    </section>
  );
}
