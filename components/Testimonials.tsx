'use client';

import { Star, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '@/data/barbershop';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0D0D10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C9A15A]/10 border border-[#C9A15A]/30 text-[#C9A15A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-[#C9A15A]" />
            <span>MIJOZLARIMIZ FIKRI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            SAMIMIY <span className="gold-gradient-text">TASARRUFLAR</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            ROYAL CUTS mehmonlarining xizmatimiz va muhitimiz haqidagi haqiqiy sharhlari.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item: Testimonial) => (
            <div
              key={item.id}
              className="glass-panel p-8 rounded-3xl border border-zinc-800/80 flex flex-col justify-between relative hover:border-[#C9A15A]/40 transition-all duration-300 shadow-xl"
            >
              <Quote className="w-10 h-10 text-[#C9A15A]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A15A] text-[#C9A15A]" />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6 italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A15A] to-[#8C6A2E] text-black font-extrabold text-xs flex items-center justify-center shadow-md">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1">
                      <span>{item.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#C9A15A]" />
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Usta: <span className="text-[#F3E0AC]">{item.masterName}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-zinc-500 font-medium">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
