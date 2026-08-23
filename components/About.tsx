'use client';

import Image from 'next/image';
import { Clock, Coffee, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { SHOP_INFO } from '@/data/barbershop';

export default function About() {
  const highlights = [
    {
      icon: Clock,
      title: 'Vaqtingizni Qadrlaymiz',
      desc: 'Aniq belgilangan vaqtda qabul qilish. Bir daqiqa ham kutib qolmaysiz.',
    },
    {
      icon: Coffee,
      title: 'VIP Lounge & Qahva Bar',
      desc: 'Bepul espresso, elit ichimliklar va qulay charmli divanlarda hordiq.',
    },
    {
      icon: Award,
      title: 'Yuqori Kosmetika',
      desc: 'Faqatgina Yevropaning sertifikatlangan erkaklar parvarish brendlari.',
    },
    {
      icon: Sparkles,
      title: 'Individual Yondashuv',
      desc: 'Bosh va yuz tuzilishingizga mos ravishda noyob uslub tanlash.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0D0D10] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Showroom Photo Showcase */}
          <div className="relative group">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#C9A15A]/30 to-[#8C6A2E]/10 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-[#C9A15A]/20 shadow-2xl">
              <Image
                src="/images/showroom.png"
                alt="Royal Cuts Lounge Showroom"
                fill
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />

              {/* Float Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-gold p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#F3E0AC] font-semibold">
                    SHOWROOM & LOUNGE
                  </div>
                  <div className="text-sm text-zinc-200 font-medium mt-0.5">
                    {SHOP_INFO.address}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#C9A15A] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Har kuni 09:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C9A15A]/10 border border-[#C9A15A]/30 text-[#C9A15A] text-xs font-semibold uppercase tracking-wider mb-4">
              <span>BIZ HAQIMIZDA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              ODDIY SALON EMAS — <br />
              <span className="gold-gradient-text">HAQIQIY ERKAKLAR MAZIZI</span>
            </h2>

            <p className="text-zinc-300 leading-relaxed font-light mb-8 text-base">
              {SHOP_INFO.name} — bu shunchaki soch qisqartirish joyi emas. Bu yerda har bir harakat, ustara tushishi va qaychi teginishi san&apos;at darajasiga ko&apos;tarilgan. Altegio kabi shablon vidjetli joylardan farqli o&apos;laroq, bizda har bir mijoz mehmon deb qabul qilinadi va individual parvarish qilinadi.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1F1F24] border border-[#C9A15A]/20 flex items-center justify-center text-[#C9A15A] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
