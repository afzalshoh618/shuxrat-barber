'use client';

import Image from 'next/image';
import { Calendar, Star, ShieldCheck, Sparkles, ArrowDownRight, Clock } from 'lucide-react';
import { SHOP_INFO } from '@/data/barbershop';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background Image with Dark Vignette & Gold Light Rays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="9D Barbershop Interior"
          fill
          priority
          className="object-cover object-center brightness-[0.32] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070709]/50 to-[#070709]" />
        
        {/* Animated Ambient Gold Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A15A]/12 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Live Status & Premium Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17171d]/90 border border-[#C9A15A]/40 text-[#F8E7BE] text-xs font-bold uppercase tracking-widest shadow-2xl backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>HOZIR OCHIQ (09:00 - 21:00)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A15A]/15 border border-[#C9A15A]/40 text-[#C9A15A] text-xs font-extrabold uppercase tracking-widest shadow-2xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>9D PREMIUM LOUNGE</span>
          </div>
        </div>

        {/* Main Catchy Title with 9D Emblem */}
        <div className="relative mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            <span className="text-[#C9A15A] font-logo text-5xl sm:text-7xl md:text-8xl tracking-wider block mb-1">
              9D BARBERSHOP&apos;GA XUSH KELIBSIZ
            </span>
            <span className="gold-gradient-text flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <span>MUKAMMAL ERKAKLAR USLUBI</span>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#7A5B20] via-[#C9A15A] to-[#F8E7BE] p-0.5 shadow-2xl inline-flex items-center justify-center">
                <div className="w-full h-full bg-[#070709] rounded-2xl flex items-center justify-center font-logo text-2xl sm:text-3xl text-[#C9A15A]">
                  9D
                </div>
              </div>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-3xl font-light leading-relaxed mb-12">
          Altegio va umumiy vidjetlardan xalos bo&apos;ling. <strong className="text-white font-bold">{SHOP_INFO.name}</strong> — bu shunchaki soch olish emas, bu zamonaviy raqamli muhit, yuqori darajadagi xizmat hamda o&apos;ziga xos imidjingiz maskani.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-16">
          <a
            href="#booking"
            className="gold-btn px-9 py-4.5 rounded-2xl text-sm uppercase tracking-wider font-extrabold w-full sm:w-auto flex items-center justify-center gap-3 group shadow-2xl"
          >
            <Calendar className="w-5 h-5 text-black" />
            <span>HOZIR NAVBAT OLISH</span>
            <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform text-black" />
          </a>

          <a
            href="#masters"
            className="gold-btn-outline px-9 py-4.5 rounded-2xl text-sm uppercase tracking-wider font-bold w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>Ustalar Bilan Tanishish</span>
          </a>
        </div>

        {/* Key Trust Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
          <div className="glass-panel p-5 rounded-2xl flex items-center justify-center gap-4 border border-zinc-800/90 hover:border-[#C9A15A]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#C9A15A]/15 flex items-center justify-center text-[#C9A15A] shrink-0 font-logo text-xl">
              9D
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white">5.0 / 5.0</div>
              <div className="text-xs text-zinc-400">800+ Mijozlar bahosi</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center justify-center gap-4 border border-zinc-800/90 hover:border-[#C9A15A]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#C9A15A]/15 flex items-center justify-center text-[#C9A15A] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white">100% Sifat</div>
              <div className="text-xs text-zinc-400">Kafolatlangan parvarish</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center justify-center gap-4 border border-zinc-800/90 hover:border-[#C9A15A]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#C9A15A]/15 flex items-center justify-center text-[#C9A15A] shrink-0">
              <Clock className="w-6 h-6 text-[#C9A15A]" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-white">Vaqtda Qabul</div>
              <div className="text-xs text-zinc-400">Navbatsiz va kutishsiz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
