'use client';

import { MapPin, Phone, Clock, Send, ExternalLink, Globe } from 'lucide-react';
import { SHOP_INFO } from '@/data/barbershop';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.19a6.34 6.34 0 1 0 6.34 6.34V9.28a8.28 8.28 0 0 0 4.77 1.47V7.3a4.84 4.84 0 0 1-1-.61z"/>
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Info & Social Links */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A15A]/15 border border-[#C9A15A]/40 text-[#C9A15A] text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>MANZIL & ALOQA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              BIZNING BARBERSHOPGA <br />
              <span className="gold-gradient-text">TASHRIF BUYURING</span>
            </h2>

            <p className="text-zinc-300 font-light text-xs sm:text-sm leading-relaxed mb-6">
              Shahrining eng qulay markazida joylashgan premium barbershopimizda sizni kutib qolamiz. Bepul parking, shinam atmosphere va yuqori darajadagi xizmat.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#111115] border border-[#C9A15A]/30 flex items-center justify-center text-[#C9A15A] shrink-0 shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">Manzil</h3>
                  <p className="text-xs text-zinc-300">{SHOP_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#111115] border border-[#C9A15A]/30 flex items-center justify-center text-[#C9A15A] shrink-0 shadow-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">Ish Vaqti</h3>
                  <p className="text-xs text-zinc-300">{SHOP_INFO.workingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#111115] border border-[#C9A15A]/30 flex items-center justify-center text-[#C9A15A] shrink-0 shadow-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">Telefon / Telegram Admin</h3>
                  <a
                    href={`tel:${SHOP_INFO.phoneFormatted}`}
                    className="text-xs font-bold text-[#F8E7BE] hover:underline"
                  >
                    {SHOP_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Buttons Area */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C9A15A]" />
                <span>Ijtimoiy Tarmoqlarimiz:</span>
              </h4>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SHOP_INFO.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-btn px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                  <span>Telegram</span>
                  <ExternalLink className="w-3 h-3 text-black" />
                </a>

                <a
                  href={SHOP_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-btn-outline px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#C9A15A]" />
                  <span>Instagram</span>
                </a>

                {SHOP_INFO.tiktok && (
                  <a
                    href={SHOP_INFO.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="gold-btn-outline px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                  >
                    <TikTokIcon className="w-3.5 h-3.5 text-[#C9A15A]" />
                    <span>TikTok</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dark Modern Map Embed Card */}
          <div className="relative">
            <div className="glass-panel p-2.5 rounded-3xl border border-[#C9A15A]/30 shadow-2xl overflow-hidden">
              <div className="relative w-full h-[360px] rounded-2xl overflow-hidden bg-zinc-900">
                <iframe
                  title="9D Barbershop Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.2600%2C41.2900%2C69.2900%2C41.3100&amp;layer=mapnik&amp;marker=41.2995%2C69.2785"
                  className="w-full h-full border-0 contrast-125 grayscale invert opacity-80"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#070709]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#C9A15A]/40 text-xs font-bold text-white flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A15A]" />
                  <span>{SHOP_INFO.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
