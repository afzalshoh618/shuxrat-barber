'use client';

import { Scissors, ArrowUp } from 'lucide-react';
import { SHOP_INFO } from '@/data/barbershop';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-900">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#C9A15A] text-black flex items-center justify-center">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-wider text-white">
                ROYAL <span className="text-[#C9A15A]">CUTS</span>
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm text-xs font-light">
              {SHOP_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-300">
            <a href="#about" className="hover:text-[#C9A15A] transition-colors">Biz haqimizda</a>
            <a href="#masters" className="hover:text-[#C9A15A] transition-colors">Ustalar</a>
            <a href="#services" className="hover:text-[#C9A15A] transition-colors">Xizmatlar</a>
            <a href="#booking" className="hover:text-[#C9A15A] transition-colors font-bold text-[#F3E0AC]">Navbat Olish</a>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#C9A15A] text-zinc-300 hover:text-white flex items-center justify-center transition-all"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#C9A15A]" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-600 gap-4">
          <p>© 2026 {SHOP_INFO.name}. Barcha huquqlar himoyalangan.</p>
          <p className="text-[11px]">Bespoke Luxury Barbershop & Booking Experience</p>
        </div>
      </div>
    </footer>
  );
}
