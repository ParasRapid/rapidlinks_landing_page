'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CalendarCheck, Boxes, Settings2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: 'Book a Demo',
    description: 'Schedule a 30-minute walkthrough. We assess your operations and recommend the right product mix.',
    step: '01',
    color: 'from-teal-700 to-teal-500',
  },
  {
    icon: Boxes,
    title: 'Choose Your Product License(s)',
    description: 'Select Domestic, International, Accounting — or all three. Pick a 3, 6, or 12-month license duration.',
    step: '02',
    color: 'from-teal-800 to-teal-600',
  },
  {
    icon: Settings2,
    title: 'Onboard & Integrate',
    description: 'Our team configures your account, integrates your carriers, and imports your existing data.',
    step: '03',
    color: 'from-teal-600 to-teal-400',
  },
  {
    icon: Rocket,
    title: 'Go Live & Pay-as-you-ship',
    description: 'Start booking orders. You only pay per order processed — no recurring fees during your license period.',
    step: '04',
    color: 'from-teal-700 to-teal-500',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Scroll-based path drawing
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathOffset = useTransform(scrollYProgress, [0, 1], [0.2, -0.2]);

  return (
    <section ref={ref} id="how-it-works" className="relative py-24 lg:py-32 mesh-bg overflow-hidden">
      {/* Background decorative path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1200 400">
        <path d="M 0 200 Q 300 50 600 200 T 1200 200" stroke="#0F766E" strokeWidth="2" fill="none" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-teal-700 font-semibold text-sm uppercase tracking-widest mb-4">
            Simple Onboarding
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            How It{' '}
            <span className="teal-gradient-text">Works</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From demo to go-live in days, not months. No lengthy contracts or complex implementations.
          </p>
        </motion.div>

        {/* Desktop — curved timeline */}
        <div className="hidden lg:block relative">
          {/* Animated SVG path */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 1200 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="50%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 100 80 Q 300 300 500 200 T 900 250 T 1100 120"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 8"
              style={{ pathLength, pathOffset }}
            />
          </svg>

          {/* Steps positioned along the curve */}
          <div className="relative grid grid-cols-4 gap-8 h-[500px]">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const positions = [
                { top: '0%', left: '0%' },
                { top: '40%', left: '25%' },
                { top: '35%', left: '55%' },
                { top: '0%', left: '75%' },
              ];
              const pos = positions[i];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}
                  className="absolute"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="relative">
                    {/* Node */}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="relative w-20 h-20 rounded-3xl bg-white shadow-float border border-teal-100 flex items-center justify-center"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-glow`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-teal-800 to-teal-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                        {step.step}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <div className="mt-6 max-w-[220px]">
                      <h3 className="text-lg font-black text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5"
              >
                {/* Node */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-float border border-teal-100 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-teal-300 to-transparent" />
                  )}
                </div>

                <div className="pt-2">
                  <span className="text-xs font-black text-teal-600">{step.step}</span>
                  <h3 className="text-lg font-black text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
