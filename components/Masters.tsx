'use client';

import Image from 'next/image';
import { Star, Award, Scissors, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { MASTERS, Master } from '@/data/barbershop';

interface MastersProps {
  onSelectMaster?: (masterId: string) => void;
}

export default function Masters({ onSelectMaster }: MastersProps) {
  // Exclude 'master-any' from showcase cards grid
  const realMasters = MASTERS.filter((m) => m.id !== 'master-any');

  const handleMasterClick = (masterId: string) => {
    if (onSelectMaster) {
      onSelectMaster(masterId);
    }
    if (typeof window !== 'undefined') {
      const bookingElem = document.getElementById('booking');
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="masters" className="py-20 sm:py-24 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A15A]/15 border border-[#C9A15A]/40 text-[#C9A15A] text-xs font-bold uppercase tracking-wider mb-4">
            <Scissors className="w-3.5 h-3.5" />
            <span>MAHORAT EGALARI (6 TA TOP BARBER)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            BIZNING <span className="gold-gradient-text">TOP USTA BARBERLAR</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Har bir ustamiz ko&apos;p yillik tajribaga va o&apos;ziga xos mualliflik texnikasiga ega. O&apos;zingizga mos ustani tanlang va uslubingizni unga ishonib topshiring.
          </p>
        </div>

        {/* 6 Masters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realMasters.map((master: Master) => (
            <div
              key={master.id}
              className="glass-panel rounded-3xl overflow-hidden border border-zinc-800/90 hover:border-[#C9A15A]/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-2 shadow-2xl relative"
            >
              <div>
                {/* Photo container */}
                <div className="relative h-80 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={master.photoUrl}
                    alt={master.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/30 to-transparent opacity-90" />

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-[#070709]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A15A]/40 flex items-center gap-1.5 text-xs text-white font-bold shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-[#C9A15A] text-[#C9A15A]" />
                    <span>{master.rating.toFixed(1)}</span>
                    <span className="text-zinc-400 font-normal">({master.reviewsCount})</span>
                  </div>

                  {/* Experience Tag */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A15A] text-black px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <Award className="w-3.5 h-3.5" />
                    <span>{master.experienceYears} Yil Tajriba</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#C9A15A] transition-colors">
                      {master.name}
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-[#C9A15A]" />
                  </div>

                  <div className="text-xs font-extrabold text-[#F8E7BE] uppercase tracking-wider mb-3">
                    {master.role}
                  </div>

                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-5">
                    {master.bio}
                  </p>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {master.popularTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-3 py-1 rounded-lg bg-[#18181f] text-zinc-300 border border-zinc-700/60 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleMasterClick(master.id)}
                  className="w-full gold-btn py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 text-black transition-all"
                >
                  <CalendarCheck className="w-4 h-4 text-black" />
                  <span>Ustanikiga Navbat Olish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
