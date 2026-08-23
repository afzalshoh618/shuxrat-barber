'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock, PlusCircle, Check, Flame, Sparkles } from 'lucide-react';
import { SERVICES, Service } from '@/data/barbershop';

interface ServicesProps {
  selectedServiceIds?: string[];
  onToggleService?: (serviceId: string) => void;
}

export default function Services({ selectedServiceIds = [], onToggleService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barcha xizmatlar' },
    { id: 'soch', label: 'Soch Usullari' },
    { id: 'soqol', label: 'Soqol Spa' },
    { id: 'kompleks', label: 'VIP Kompleks' },
    { id: 'boshqa', label: 'Qo\'shimcha' },
  ];

  const filteredServices = SERVICES.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  const handleServiceSelect = (serviceId: string) => {
    if (onToggleService) {
      onToggleService(serviceId);
    }
    if (typeof window !== 'undefined') {
      const bookingElem = document.getElementById('booking');
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#0D0D10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A15A]/15 border border-[#C9A15A]/40 text-[#C9A15A] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>XIZMATLAR MENYUSI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            BIZNING <span className="gold-gradient-text">XIZMATLARIMIZ</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Har bir xizmat yuqori darajadagi parvarish va individual uslub bilan bajariladi. O&apos;zingizga mos xizmatni tanlab navbat oling.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A15A] text-black shadow-lg shadow-[#C9A15A]/20 scale-105 font-extrabold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: Service) => {
            const isSelected = selectedServiceIds.includes(service.id);

            return (
              <div
                key={service.id}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-[#C9A15A] bg-[#1A1A20]'
                    : 'border-zinc-800/80 hover:border-[#C9A15A]/40'
                }`}
              >
                {service.isPopular && (
                  <div className="absolute -top-3 right-5 bg-gradient-to-r from-[#D4AF37] to-[#C9A15A] text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                    <Flame className="w-3 h-3 fill-black" />
                    <span>Eng Ko&apos;p Tanlangan</span>
                  </div>
                )}

                <div>
                  {/* Service Thumbnail Image */}
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 border border-zinc-800">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent opacity-60" />
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug mb-1.5">
                    {service.title}
                  </h3>

                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C9A15A]" />
                    <span>{service.durationMinutes} daqiqa</span>
                  </div>

                  <button
                    onClick={() => handleServiceSelect(service.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-[#C9A15A] text-black'
                        : 'bg-zinc-800 text-zinc-200 hover:bg-[#C9A15A] hover:text-black'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Tanlangan</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>Tanlash</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
