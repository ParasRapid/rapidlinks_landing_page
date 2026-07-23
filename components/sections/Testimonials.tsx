'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, TrendingDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    business: 'FastShip Logistics',
    location: 'Mumbai, MH',
    role: 'Operations Director',
    name: 'Rajesh Kumar',
    rating: 5,
    quote:
      'We switched from a per-seat SaaS to RapidLinks and cut our software costs by 40% in the first quarter. The license model means we pay for what we ship — nothing more. The domestic and accounting modules work flawlessly together.',
    metric: '40% cost reduction',
    metricLabel: 'in software spend',
  },
  {
    business: 'GlobalReach Express',
    location: 'Delhi NCR',
    role: 'Founder & CEO',
    name: 'Priya Sharma',
    rating: 5,
    quote:
      'The international module handles customs documentation and HS codes automatically. What used to take our team 3 hours per shipment now takes 10 minutes. The per-order pricing is transparent and fair — no surprise invoices.',
    metric: '3 hours → 10 min',
    metricLabel: 'per international shipment',
  },
  {
    business: 'Speedy Courier Services',
    location: 'Bangalore, KA',
    role: 'Finance Manager',
    name: 'Amit Patel',
    rating: 5,
    quote:
      'The accounting module transformed our billing process. GST reconciliation, courier partner billing, and COD settlements are all automated. We close our books in 2 days instead of 2 weeks.',
    metric: '2 weeks → 2 days',
    metricLabel: 'monthly book closing',
  },
  {
    business: 'PrimeCargo Solutions',
    location: 'Chennai, TN',
    role: 'Managing Director',
    name: 'Suresh Iyer',
    rating: 5,
    quote:
      'RapidLinks scaled with us from 500 orders a month to 50,000. Our license cost stayed flat — only usage charges grew with volume. That is the kind of pricing model a growing logistics business needs.',
    metric: '100x growth',
    metricLabel: 'without 100x software costs',
  },
];

// Duplicate for infinite scroll
const scrollTrack = [...testimonials, ...testimonials];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-advance featured testimonial
  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoScroll]);

  const next = () => { setAutoScroll(false); setActive(prev => (prev + 1) % testimonials.length); };
  const prev = () => { setAutoScroll(false); setActive(prev => (prev - 1 + testimonials.length) % testimonials.length); };

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-[0.03] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-[0.03] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0F766E, transparent)', filter: 'blur(60px)', animationDelay: '4s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-teal-700 font-semibold text-sm uppercase tracking-widest mb-4">
            Customer Stories
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            Trusted by{' '}
            <span className="teal-gradient-text">Logistics Leaders</span>
          </h2>
          <p className="text-sm text-gray-400 italic">
            {/* {{EDIT_ME: replace placeholder testimonials with real customer stories before launch}} */}
            Placeholder testimonials — replace with verified customer stories before launch.
          </p>
        </motion.div>

        {/* Featured testimonial — large glass card */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass card-organic-lg p-8 lg:p-12 shadow-float relative overflow-hidden"
          >
            {/* Quote icon */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote className="w-24 h-24 text-teal-700" />
            </div>

            {/* Rating stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.08, type: 'spring' }}
                >
                  <Star className="w-5 h-5 fill-teal-500 text-teal-500" />
                </motion.div>
              ))}
            </div>

            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 relative">
              {testimonials[active].quote}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-glow">
                  {testimonials[active].name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-gray-900">{testimonials[active].name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonials[active].role}, {testimonials[active].business}
                  </p>
                  <p className="text-xs text-gray-400">{testimonials[active].location}</p>
                </div>
              </div>

              {/* Metric badge */}
              <div className="flex items-center gap-3 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl px-5 py-3.5 border border-teal-100">
                <TrendingDown className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-lg font-black text-teal-800">{testimonials[active].metric}</p>
                  <p className="text-xs text-teal-600">{testimonials[active].metricLabel}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full glass shadow-soft hover:shadow-glow flex items-center justify-center transition-all hover:scale-110">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoScroll(false); setActive(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-10 bg-gradient-to-r from-teal-700 to-teal-500' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full glass shadow-soft hover:shadow-glow flex items-center justify-center transition-all hover:scale-110">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Auto-scrolling logo strip */}
        <div className="relative mt-16 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 animate-scroll-x w-max">
            {scrollTrack.map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm card-organic-sm px-6 py-4 border border-gray-100 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <span className="font-black text-teal-700 text-sm">{t.business.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm whitespace-nowrap">{t.business}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
