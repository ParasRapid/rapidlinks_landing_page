'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Plus, Minus } from 'lucide-react';

type FAQCategory = 'Licensing' | 'Pricing' | 'Products' | 'Support';

const faqData: Record<FAQCategory, Array<{ question: string; answer: string }>> = {
  Licensing: [
    {
      question: 'Is this a monthly subscription?',
      answer:
        'No. RapidLinks is a license-based software, not a subscription. You pay a one-time license fee for your chosen duration (3, 6, or 12 months). During that period, the software is fully active with no recurring license charges. You only pay a small per-order usage fee for transactions you actually process.',
    },
    {
      question: 'What happens after my license period ends?',
      answer:
        'When your license period ends, you can renew your license for another 3, 6, or 12 months. You can also add or remove products at renewal time. If you choose not to renew, your data remains available for export for 30 days. There are no auto-renewals or hidden charges.',
    },
    {
      question: 'Can I upgrade from Domestic to all 3 products mid-term?',
      answer:
        'Yes. You can add a new product license at any time. The new product license runs for its own duration period independently. Your existing licenses continue unchanged. Contact our team to add International or Accounting to your existing Domestic license.',
    },
  ],
  Pricing: [
    {
      question: 'How is the per-order usage fee calculated and billed?',
      answer:
        'The per-order usage fee is charged only when you book or process an order through the system. For example, domestic orders cost ₹1 per order, international orders cost ₹2.5 per order, and accounting entries cost ₹0.5 per entry. Higher monthly volumes qualify for automatic volume discounts (up to 30%). Usage is billed monthly based on actual transactions — no order, no charge.',
    },
    {
      question: 'Is there a setup or onboarding fee?',
      answer:
        'No. There is no separate setup or onboarding fee. Your product license includes full onboarding support, carrier integrations, data migration from your existing system, and team training. Everything is included in the license price.',
    },
    {
      question: 'Do you charge per user or per seat?',
      answer:
        'Never. RapidLinks does not charge per user or per seat. Your product license includes unlimited team members. Add as many operations, finance, and admin users as you need — at no additional cost. We believe your software should not penalize you for growing your team.',
    },
  ],
  Products: [
    {
      question: 'Which courier carriers are integrated?',
      answer:
        'RapidLinks integrates with 20+ carriers including Bluedart, Delhivery, FedEx, DHL, DTDC, Ekart, Shadowfax, and more. For domestic shipments, all major Indian carriers are supported. For international, we integrate with global carriers including FedEx, DHL, UPS, and Aramex. New carrier integrations are added regularly.',
    },
    {
      question: 'Can I use RapidLinks for only one product, or do I need all three?',
      answer:
        'You can license any single product independently. Many customers start with just Domestic, or just Accounting, and add more products as their needs grow. There is no requirement to buy all three. Each product is a separate license with its own duration.',
    },
  ],
  Support: [
    {
      question: 'Is my data secure and backed up?',
      answer:
        'Yes. All data is encrypted in transit and at rest. Daily automatic backups are included with every license. We maintain 99.9% uptime with redundant infrastructure. You can export your data at any time — there is no vendor lock-in.',
    },
    {
      question: 'What kind of support is included?',
      answer:
        'Every license includes 24/7 access to our support team via email and phone. Onboarding and training are included at no extra cost. For enterprise volumes, we offer a dedicated account manager and priority response times.',
    },
  ],
};

const categories = Object.keys(faqData) as FAQCategory[];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('Licensing');

  const currentFaqs = faqData[activeCategory];

  return (
    <section ref={ref} id="faq" className="relative py-24 lg:py-32 mesh-bg overflow-hidden">
      {/* Background decorative orb */}
      <div className="absolute top-1/4 left-0 w-96 h-96 opacity-[0.03] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0F766E, transparent)', filter: 'blur(80px)' }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-50 to-teal-100 items-center justify-center mb-5">
            <HelpCircle className="w-8 h-8 text-teal-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 leading-[1.1] mb-5 text-balance">
            Frequently Asked{' '}
            <span className="teal-gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Everything you need to know about the RapidLinks license model.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-glow'
                  : 'glass text-gray-600 hover:text-teal-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {currentFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="group glass card-organic border border-white/40 shadow-soft overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-base font-bold text-gray-900 hover:text-teal-700 py-5 px-6 hover:no-underline flex items-center justify-between">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 leading-relaxed px-6 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </AnimatePresence>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <a href="#demo" className="inline-flex items-center gap-2 text-teal-700 font-bold hover:gap-3 transition-all">
            Talk to our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
