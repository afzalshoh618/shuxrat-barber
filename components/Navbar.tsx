'use client';

import { useState, useEffect } from 'react';
import { Scissors, Phone, Menu, X, CalendarCheck } from 'lucide-react';
import { SHOP_INFO } from '@/data/barbershop';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Ustalar', href: '#masters' },
    { name: 'Xizmatlar', href: '#services' },
    { name: 'Sharhlar', href: '#testimonials' },
    { name: 'Manzil', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#C9A15A]/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8C6A2E] via-[#C9A15A] to-[#F3E0AC] p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#09090b] rounded-full flex items-center justify-center">
              <Scissors className="w-5 h-5 text-[#C9A15A]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
              ROYAL <span className="text-[#C9A15A]">CUTS</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium -mt-1">
              Barbershop & Lounge
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-[#C9A15A] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${SHOP_INFO.phoneFormatted}`}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 rounded-full border border-zinc-800 hover:border-[#C9A15A]/40 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A15A]" />
            <span>{SHOP_INFO.phone}</span>
          </a>

          <a
            href="#booking"
            className="gold-btn px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Navbat olish</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#booking"
            className="gold-btn text-xs px-3.5 py-2 rounded-full font-bold flex items-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Navbat</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121215]/95 backdrop-blur-xl border-b border-[#C9A15A]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-200 hover:text-[#C9A15A] py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
              <a
                href={`tel:${SHOP_INFO.phoneFormatted}`}
                className="flex items-center justify-center gap-2 text-sm text-zinc-300 py-2.5 rounded-xl border border-zinc-800"
              >
                <Phone className="w-4 h-4 text-[#C9A15A]" />
                <span>{SHOP_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
