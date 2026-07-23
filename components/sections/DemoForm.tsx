'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, User, Building2, Mail, Phone, MessageSquare, Package, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const demoSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  businessName: z.string().min(2, 'Please enter your business name'),
  businessEmail: z.string().email('Enter a valid business email'),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid phone number'),
  shipmentVolume: z.string().min(1, 'Please select a volume range'),
  products: z.array(z.string()).min(1, 'Select at least one product'),
  message: z.string().optional(),
});

type DemoForm = z.infer<typeof demoSchema>;

const volumeOptions = [
  'Less than 500 orders/month',
  '500 – 2,000 orders/month',
  '2,000 – 5,000 orders/month',
  '5,000 – 15,000 orders/month',
  '15,000 – 50,000 orders/month',
  'More than 50,000 orders/month',
];

const productOptions = [
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
  { id: 'accounting', label: 'Accounting' },
];

const reassurances = [
  'No credit card required',
  '30-minute personalized walkthrough',
  'Response within 24 hours',
  'No commitment — just see if it fits',
];

export default function DemoForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<DemoForm>({
    resolver: zodResolver(demoSchema),
    defaultValues: { products: [] },
  });

  const selectedProducts = watch('products') || [];

  const toggleProduct = (id: string) => {
    const current = new Set(selectedProducts);
    if (current.has(id)) current.delete(id);
    else current.add(id);
    setValue('products', Array.from(current), { shouldValidate: true });
  };

  const onSubmit = (data: DemoForm) => {
    console.log('Demo booking:', data);
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="demo" className="relative py-24 lg:py-32 overflow-hidden mesh-bg-dark">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-20 animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0F766E, transparent)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-15 animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(60px)', animationDelay: '5s' }} />

      {/* Floating diamonds */}
      <div className="absolute top-[15%] right-[8%] w-20 h-20 rounded-3xl opacity-10 animate-float-slow" style={{ background: 'linear-gradient(135deg, #2DD4BF, #5EEAD4)', transform: 'rotate(45deg)' }} />
      <div className="absolute bottom-[20%] left-[5%] w-12 h-12 rounded-xl opacity-10 animate-float" style={{ background: 'linear-gradient(135deg, #0F766E, #0D9488)', transform: 'rotate(35deg)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass-teal rounded-full px-4 py-2 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span className="text-xs font-bold text-teal-200 tracking-wide uppercase">Book Your Free Demo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 text-balance">
              See RapidLinks{' '}
              <span className="teal-gradient-text">in Action</span>
            </h2>
            <p className="text-lg text-teal-100/80 leading-relaxed mb-8">
              Get a personalized 30-minute walkthrough of the products you are interested in.
              We will show you exactly how the license and per-order pricing works for your business.
            </p>

            <div className="space-y-3 mb-8">
              {reassurances.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-teal-300" />
                  </div>
                  <span className="text-sm font-medium text-teal-50">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="glass card-organic-lg p-6 lg:p-8 shadow-float">
                <h3 className="text-xl font-black text-gray-900 mb-6">Book My Free Demo</h3>

                <div className="space-y-4">
                  {/* Name */}
                  <FormField icon={User} label="Full Name" id="fullName" placeholder="Rajesh Kumar" register={register('fullName')} error={errors.fullName?.message} />

                  {/* Business */}
                  <FormField icon={Building2} label="Business Name" id="businessName" placeholder="FastShip Logistics Pvt Ltd" register={register('businessName')} error={errors.businessName?.message} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField icon={Mail} label="Business Email" id="businessEmail" type="email" placeholder="rajesh@fastship.in" register={register('businessEmail')} error={errors.businessEmail?.message} />
                    <FormField icon={Phone} label="Phone" id="phone" placeholder="+91 98765 43210" register={register('phone')} error={errors.phone?.message} />
                  </div>

                  {/* Volume */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Monthly Shipment Volume</Label>
                    <Select onValueChange={(v) => setValue('shipmentVolume', v, { shouldValidate: true })}>
                      <SelectTrigger className="w-full bg-white/50 rounded-xl">
                        <SelectValue placeholder="Select your monthly volume" />
                      </SelectTrigger>
                      <SelectContent>
                        {volumeOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.shipmentVolume && <p className="text-xs text-red-500">{errors.shipmentVolume.message}</p>}
                  </div>

                  {/* Products */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Which Product(s) Are You Interested In?</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {productOptions.map(p => {
                        const isSelected = selectedProducts.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => toggleProduct(p.id)}
                            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                              isSelected ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-glow' : 'border-gray-200 text-gray-500 hover:border-teal-200'
                            }`}
                          >
                            <Package className="w-3.5 h-3.5" />
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.products && <p className="text-xs text-red-500">{errors.products.message}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Message (Optional)</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Textarea id="message" placeholder="Tell us about your logistics operations..." className="pl-9 min-h-[80px] bg-white/50 rounded-xl" {...register('message')} />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-bold text-base rounded-full py-6 shadow-glow transition-all group">
                    Book My Free Demo
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    No credit card required. 30-minute walkthrough. Response within 24 hours.
                  </p>
                </div>
              </form>
            ) : (
              <div className="glass card-organic-lg p-12 text-center shadow-float">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-glow"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Demo Request Received!</h3>
                <p className="text-gray-500 mb-6 px-6">
                  Thank you for your interest. Our team will contact you within 24 hours to schedule your personalized demo.
                </p>
                <Button onClick={() => { setSubmitted(false); reset(); }} variant="outline" className="border-teal-700 text-teal-700 hover:bg-teal-50 font-semibold rounded-full">
                  Submit Another Request
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
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
      <Label htmlFor={id} className="text-sm font-semibold text-gray-700">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input id={id} type={type} placeholder={placeholder} className="pl-9 bg-white/50 rounded-xl" {...register} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
