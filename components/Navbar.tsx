'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X, CalendarCheck } from 'lucide-react';
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
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-[#C9A15A]/25 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 9D Barbershop Sharp Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7A5B20] via-[#C9A15A] to-[#F8E7BE] p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#070709] rounded-[10px] flex items-center justify-center font-logo text-2xl font-black text-[#C9A15A] tracking-tighter">
              9D
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-logo text-2xl sm:text-3xl tracking-wide text-white leading-none flex items-center gap-1">
              9D <span className="text-[#C9A15A]">BARBERSHOP</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.28em] text-zinc-400 font-bold -mt-0.5">
              EST. 2026 • PREMIUM LOUNGE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-[#C9A15A] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${SHOP_INFO.phoneFormatted}`}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-full border border-zinc-800 hover:border-[#C9A15A]/40 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A15A]" />
            <span>{SHOP_INFO.phone}</span>
          </a>

          <a
            href="#booking"
            className="gold-btn px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
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
        <div className="md:hidden bg-[#121215]/98 backdrop-blur-xl border-b border-[#C9A15A]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#C9A15A] py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
              <a
                href={`tel:${SHOP_INFO.phoneFormatted}`}
                className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-300 py-2.5 rounded-xl border border-zinc-800"
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
