'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calculator, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden card-organic-lg bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 px-6 py-16 lg:px-16 lg:py-20"
        >
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 opacity-20 gradient-animated"
            style={{ backgroundImage: 'linear-gradient(120deg, #0F766E, #14B8A6, #2DD4BF, #14B8A6, #0F766E)' }}
          />

          {/* Floating organic shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 rounded-3xl opacity-15 animate-float-slow" style={{ background: 'linear-gradient(135deg, #2DD4BF, #5EEAD4)', transform: 'rotate(45deg)' }} />
            <div className="absolute bottom-0 right-0 w-36 h-36 rounded-2xl opacity-15 animate-float" style={{ background: 'linear-gradient(135deg, #5EEAD4, #99F6E4)', transform: 'rotate(35deg)' }} />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-xl opacity-10 animate-float-delay" style={{ background: 'linear-gradient(135deg, #0F766E, #2DD4BF)', transform: 'rotate(50deg)' }} />
            <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-lg opacity-10 animate-float-slow" style={{ background: 'linear-gradient(135deg, #14B8A6, #5EEAD4)', transform: 'rotate(25deg)' }} />
          </div>

          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #14B8A6, transparent)' }} />

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 text-balance"
            >
              Stop Paying for Software You Don't Use.
              <br />
              Start Paying for What You Ship.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-teal-100 mb-10 leading-relaxed"
            >
              Join 500+ logistics businesses that switched from subscription SaaS to RapidLinks' license-based model.
              {/* {{EDIT_ME}} */}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => scrollTo('demo')}
                className="group bg-white text-teal-800 hover:bg-teal-50 font-bold text-base px-8 py-6 rounded-full shadow-xl transition-all hover:scale-105"
              >
                <CalendarCheck className="mr-2 w-4 h-4" />
                Book a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('pricing')}
                className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-bold text-base px-8 py-6 rounded-full transition-all bg-transparent"
              >
                <Calculator className="mr-2 w-4 h-4" />
                Calculate Pricing
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
