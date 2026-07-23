'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2'
          : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'glass shadow-soft rounded-full pl-5 pr-3 h-14'
              : 'bg-transparent h-16'
          }`}
        >
          <Logo size="sm" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="group relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 group-hover:w-6 transition-all duration-300 rounded-full" />
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNav('#pricing')}
              className="text-gray-700 hover:text-teal-700 hover:bg-teal-50 font-semibold rounded-full"
            >
              Get Pricing
            </Button>
            <Button
              size="sm"
              onClick={() => handleNav('#demo')}
              className="group bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-semibold rounded-full shadow-glow transition-all"
            >
              Book a Demo
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 border-0">
              <div className="flex flex-col h-full mesh-bg">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <Logo size="sm" />
                  <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {navLinks.map((link, i) => (
                    <button
                      key={link.href}
                      onClick={() => handleNav(link.href)}
                      className="w-full text-left px-4 py-3.5 text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50 rounded-2xl transition-all flex items-center gap-3 group"
                    >
                      <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 text-xs font-black flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="p-5 space-y-3 border-t border-gray-100">
                  <Button
                    variant="outline"
                    className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 font-semibold rounded-2xl"
                    onClick={() => handleNav('#pricing')}
                  >
                    Get Pricing
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl shadow-glow"
                    onClick={() => handleNav('#demo')}
                  >
                    Book a Demo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
