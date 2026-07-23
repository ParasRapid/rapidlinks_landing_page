'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Truck, FileText, Banknote, Upload, Code2, ShieldCheck, BarChart3, ArrowUpRight,
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Track every shipment live on a map with automated status updates and delivery confirmation.',
    size: 'large',
    visual: 'map',
  },
  {
    icon: Truck,
    title: 'Multi-Carrier Integration',
    description: 'Connect with Bluedart, Delhivery, FedEx, DHL and 20+ carriers from one dashboard.',
    size: 'small',
  },
  {
    icon: FileText,
    title: 'Automated Invoicing',
    description: 'Generate GST-compliant invoices automatically with every shipment.',
    size: 'small',
  },
  {
    icon: Banknote,
    title: 'COD Management',
    description: 'Track COD collections, reconcile remittances, and flag discrepancies automatically. Full settlement tracking built in.',
    size: 'wide',
  },
  {
    icon: Upload,
    title: 'Bulk Order Processing',
    description: 'Upload thousands of orders via CSV or API in seconds.',
    size: 'small',
  },
  {
    icon: Code2,
    title: 'Full API Access',
    description: 'REST API and webhooks for custom integrations with your existing systems.',
    size: 'tall',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access Control',
    description: 'Granular permissions for ops, finance, and admin teams. Secure by design.',
    size: 'small',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time KPIs, profitability analysis, and exportable reports for informed decisions.',
    size: 'wide',
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="features" className="relative py-24 lg:py-32 bg-[#F4F4F5] overflow-hidden">
      {/* Background mesh */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #0F766E, transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-teal-700 font-semibold text-sm uppercase tracking-widest mb-4">
            Everything You Need
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            Built for{' '}
            <span className="teal-gradient-text">Modern Logistics</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Every feature you need to run a logistics business — included with your product license.
            No add-ons. No upsells.
          </p>
        </motion.div>

        {/* Bento grid — mixed sizes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[minmax(180px,auto)]">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const colSpan = feature.size === 'large' ? 'lg:col-span-2' :
              feature.size === 'wide' ? 'lg:col-span-2' :
              feature.size === 'tall' ? 'lg:row-span-2' : '';
            const rowSpan = feature.size === 'large' ? 'lg:row-span-2' : '';
            const isLarge = feature.size === 'large' || feature.size === 'wide' || feature.size === 'tall';

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`group relative ${colSpan} ${rowSpan}`}
              >
                <div className={`relative h-full card-organic bg-white border border-gray-100/80 shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden p-6 lg:p-7`}>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-100/0 group-hover:from-teal-50/50 group-hover:to-teal-100/20 transition-all duration-500" />

                  {/* Floating orb */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-teal-200/20 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                  <div className="relative flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-gradient-to-br group-hover:from-teal-700 group-hover:to-teal-500 flex items-center justify-center mb-5 transition-all duration-300 ${isLarge ? 'lg:w-14 lg:h-14' : ''}`}>
                      <Icon className={`w-6 h-6 text-teal-700 group-hover:text-white transition-colors duration-300 ${isLarge ? 'lg:w-7 lg:h-7' : ''}`} />
                    </div>

                    <h3 className={`font-black text-gray-900 mb-2 ${isLarge ? 'text-lg lg:text-xl' : 'text-base'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-gray-500 leading-relaxed ${isLarge ? 'text-sm lg:text-base' : 'text-xs'}`}>
                      {feature.description}
                    </p>

                    {/* Arrow on hover */}
                    <div className="mt-auto pt-4">
                      <ArrowUpRight className="w-4 h-4 text-teal-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
