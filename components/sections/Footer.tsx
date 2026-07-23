'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';

const footerLinks = {
  Products: [
    { label: 'Domestic', href: '#products' },
    { label: 'International', href: '#products' },
    { label: 'Accounting', href: '#products' },
    { label: 'Pricing Calculator', href: '#pricing' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#demo' },
    { label: 'Partners', href: '#' },
  ],
  Resources: [
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '#faq' },
    { label: 'API Documentation', href: '#' },
    { label: 'Case Studies', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
    { label: 'Data Security', href: '#' },
  ],
};

const socialIcons = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleNav = (href: string) => {
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative mesh-bg-dark text-gray-400 pt-24 pb-8 overflow-hidden">
      {/* Organic wave divider at top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-12 lg:h-20" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,20 C960,40 1200,80 1440,30 L1440,0 L0,0 Z" fill="#FAFAFA" />
        </svg>
      </div>

      {/* Background orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 opacity-[0.04] animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent)', filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Logo variant="white" size="md" showTagline />
            <p className="text-sm text-gray-500 leading-relaxed mt-5 mb-6 max-w-xs">
              License-based logistics & courier management software for Indian businesses.
              Pay for what you ship — not for seats you don't use.
            </p>

            {/* Newsletter — glass */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3">Stay updated</p>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-full"
                  />
                  <Button type="submit" size="icon" className="bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white shrink-0 rounded-full shadow-glow">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <p className="text-sm text-teal-400 font-medium">Thanks for subscribing!</p>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <a href="mailto:hello@rapidlinks.in" className="hover:text-teal-400 transition-colors">hello@rapidlinks.in</a>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <a href="tel:+918000000000" className="hover:text-teal-400 transition-colors">+91 80000 00000 {/* {{EDIT_ME}} */}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span>India {/* {{EDIT_ME}} */}</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{category}</h4>
                <ul className="space-y-3">
                  {links.map(link => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleNav(link.href)}
                        className="text-sm text-gray-500 hover:text-teal-400 transition-colors text-left relative group"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-400 group-hover:w-full transition-all duration-300" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} RapidLinks. All rights reserved. · logistics & courier solution
          </p>
          <div className="flex items-center gap-3">
            {socialIcons.map(social => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-500 flex items-center justify-center transition-all hover:scale-110 hover:shadow-glow"
                >
                  <Icon className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
