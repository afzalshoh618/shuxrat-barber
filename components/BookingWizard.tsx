'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  UserCheck,
  Scissors,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Sparkles,
  Phone,
  User,
  MessageSquare,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { MASTERS, SERVICES, TIME_SLOTS, Master, Service } from '@/data/barbershop';

interface BookingWizardProps {
  preselectedMasterId?: string;
  preselectedServiceIds?: string[];
}

export default function BookingWizard({
  preselectedMasterId,
  preselectedServiceIds = [],
}: BookingWizardProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Wizard State
  const [step, setStep] = useState<number>(1);
  const [selectedMasterId, setSelectedMasterId] = useState<string>(
    preselectedMasterId || 'master-any'
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    preselectedServiceIds.length > 0 ? preselectedServiceIds : ['royal-cut']
  );
  const [nextDays, setNextDays] = useState<Array<{ iso: string; dayName: string; dayNumber: number; monthName: string }>>([]);

  // Form State
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('+998 ');
  const [notes, setNotes] = useState<string>('');

  // Async & Response State
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);

  // Generate Next 14 Days safely on client mount
  useEffect(() => {
    setIsMounted(true);
    const days = [];
    const today = new Date();
    const weekDaysUz = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
    const monthsUz = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const isoDate = `${year}-${month}-${day}`;

      days.push({
        iso: isoDate,
        dayName: weekDaysUz[d.getDay()],
        dayNumber: d.getDate(),
        monthName: monthsUz[d.getMonth()],
      });
    }

    setNextDays(days);
    if (days.length > 0 && !selectedDate) {
      setSelectedDate(days[0].iso);
    }
  }, []);

  useEffect(() => {
    if (preselectedMasterId) {
      setSelectedMasterId(preselectedMasterId);
    }
  }, [preselectedMasterId]);

  useEffect(() => {
    if (preselectedServiceIds && preselectedServiceIds.length > 0) {
      setSelectedServiceIds(preselectedServiceIds);
    }
  }, [preselectedServiceIds]);

  // Fetch booked slots for selected master and date
  const fetchSlots = useCallback(async () => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/slots?masterId=${selectedMasterId}&date=${selectedDate}`);
      const data = await res.json();
      if (data.success) {
        setBookedSlots(data.bookedSlots || []);
      }
    } catch (err) {
      console.error('Slots fetch error:', err);
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedMasterId, selectedDate]);

  useEffect(() => {
    if (isMounted) {
      fetchSlots();
    }
  }, [fetchSlots, isMounted]);

  // Toggle service selection
  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((s) => s !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  // Select Master & Auto Advance to Step 2
  const handleSelectMaster = (masterId: string) => {
    setSelectedMasterId(masterId);
    setStep(2);
  };

  // Calculations
  const currentMaster = MASTERS.find((m) => m.id === selectedMasterId) || MASTERS[0];
  const currentServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalDuration = currentServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  // Submit Booking Handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedDate || !selectedTime) {
      setErrorMessage('Iltimos, sana va vaqtni tanlang');
      return;
    }

    if (!clientName.trim() || clientName.trim().length < 2) {
      setErrorMessage('Iltimos, ismingizni kiriting');
      return;
    }

    if (!clientPhone || clientPhone.trim().length < 9) {
      setErrorMessage('Iltimos, amaldagi telefon raqamingizni kiriting');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          masterId: selectedMasterId,
          serviceIds: selectedServiceIds,
          date: selectedDate,
          time: selectedTime,
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          notes: notes.trim(),
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Bron qilishda xatolik yuz berdi');
      }

      setBookingSuccessData(resData.booking);
    } catch (err: any) {
      setErrorMessage(err.message || 'Xatolik yuz berdi. Qayta urinib ko\'ring.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <section id="booking" className="py-16 bg-[#070709] flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-[#C9A15A] text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Booking Widget Yuklanmoqda...</span>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-16 sm:py-20 bg-[#070709] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#C9A15A]/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A15A]/15 border border-[#C9A15A]/40 text-[#C9A15A] text-xs font-bold uppercase tracking-wider mb-3 shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TEZKOR 4-BOSQICHLI BRON QILISH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            NAVBAT OLISH <span className="gold-gradient-text">WIDGETI</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto">
            1. Ustani tanlang → 2. Vaqtni tanlang → 3. Xizmatlarni tanlang → 4. Tasdiqlang.
          </p>
        </div>

        {/* Successful Booking Ticket Screen */}
        {bookingSuccessData ? (
          <div className="glass-panel-gold p-8 sm:p-10 rounded-3xl text-center max-w-xl mx-auto animate-in zoom-in-95 duration-500 shadow-2xl border border-[#C9A15A]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7A5B20] via-[#C9A15A] to-[#F8E7BE] text-black flex items-center justify-center mx-auto mb-5 shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-[#F8E7BE]">
              ROYAL CUTS BARBERSHOP
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
              BRON QABUL QILINDI! ✅
            </h3>
            <p className="text-xs text-zinc-300 mb-6">
              Rahmat, <span className="text-white font-bold">{bookingSuccessData.clientName}</span>! Sizning navbatingiz ro&apos;yxatga olindi va Telegram botimizga yuborildi.
            </p>

            {/* Ticket Card */}
            <div className="bg-[#070709]/95 border border-zinc-800 rounded-2xl p-5 text-left space-y-3 mb-6 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <span className="text-xs text-zinc-400">Bron Chiptasi (Ticket ID):</span>
                <span className="font-mono text-xs font-bold text-[#C9A15A] bg-[#C9A15A]/15 px-2.5 py-1 rounded-lg border border-[#C9A15A]/30">
                  {bookingSuccessData.id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-zinc-400 block mb-0.5">Usta:</span>
                  <span className="font-bold text-white text-xs">{bookingSuccessData.masterName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block mb-0.5">Sana & Vaqt:</span>
                  <span className="font-bold text-[#F8E7BE] text-xs">
                    {bookingSuccessData.date} | {bookingSuccessData.time}
                  </span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-2.5">
                <span className="text-zinc-400 text-xs block mb-1">Tanlangan Xizmatlar:</span>
                <div className="text-xs text-white font-medium">
                  {bookingSuccessData.serviceNames.join(', ')}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingSuccessData(null);
                setStep(1);
              }}
              className="gold-btn py-3 px-6 rounded-xl text-xs uppercase font-extrabold tracking-wider w-full"
            >
              Yangi Bron Qilish
            </button>
          </div>
        ) : (
          /* 4-Step Booking Container */
          <div className="glass-panel rounded-3xl border border-zinc-800/90 shadow-2xl overflow-hidden">
            {/* Step Progress Bar */}
            <div className="bg-[#111115] border-b border-zinc-800/80 p-4 sm:p-6">
              <div className="flex items-center justify-between max-w-xl mx-auto">
                {[
                  { stepNum: 1, label: '1. Usta', icon: UserCheck },
                  { stepNum: 2, label: '2. Sana & Vaqt', icon: CalendarIcon },
                  { stepNum: 3, label: '3. Xizmat', icon: Scissors },
                  { stepNum: 4, label: '4. Tasdiqlash', icon: Clock },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = step === item.stepNum;
                  const isDone = step > item.stepNum;

                  return (
                    <div key={item.stepNum} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <button
                          type="button"
                          onClick={() => setStep(item.stepNum)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                            isDone
                              ? 'bg-[#C9A15A] text-black font-extrabold'
                              : isActive
                              ? 'bg-[#C9A15A]/20 border-2 border-[#C9A15A] text-[#C9A15A] scale-105 shadow-lg'
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
                        </button>
                        <span
                          className={`text-[11px] font-bold mt-1.5 hidden sm:inline ${
                            isActive || isDone ? 'text-white' : 'text-zinc-500'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {idx < 3 && (
                        <div
                          className={`h-0.5 flex-1 transition-all ${
                            step > item.stepNum ? 'bg-[#C9A15A]' : 'bg-zinc-800'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content Container */}
            <div className="p-5 sm:p-7">
              {/* STEP 1: BARBER SELECTION */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">1-Bosqich: Ustani Tanlang</h3>
                    <span className="text-xs text-[#C9A15A] font-semibold flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Ustanikiga bosing — Avtomatik keyingi oynaga o&apos;tadi</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {MASTERS.map((master: Master) => {
                      const isAny = master.id === 'master-any';
                      const isSelected = selectedMasterId === master.id;

                      return (
                        <div
                          key={master.id}
                          onClick={() => handleSelectMaster(master.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col items-center text-center relative hover:scale-102 ${
                            isAny
                              ? isSelected
                                ? 'border-[#C9A15A] bg-gradient-to-b from-[#7A5B20]/40 to-[#1a1a24] ring-2 ring-[#C9A15A]'
                                : 'border-[#C9A15A]/60 bg-[#171720] hover:border-[#C9A15A]'
                              : isSelected
                              ? 'border-[#C9A15A] bg-[#1a1a24] ring-2 ring-[#C9A15A]/40 shadow-xl'
                              : 'border-zinc-800 bg-[#111115] hover:border-zinc-700'
                          }`}
                        >
                          {isAny && (
                            <span className="absolute -top-2.5 bg-[#C9A15A] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                              ⚡ TEZKOʻR NAVBAT
                            </span>
                          )}

                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 border-2 border-[#C9A15A]/40 shadow-md shrink-0">
                            <Image
                              src={master.photoUrl}
                              alt={master.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <h4 className="text-sm font-bold text-white mb-0.5">{master.name}</h4>
                          <p className="text-[10px] text-[#F8E7BE] uppercase font-bold mb-1">
                            {master.role}
                          </p>
                          <span className="text-[11px] text-zinc-400 font-medium">
                            {master.experienceYears} yil tajriba ⭐ {master.rating.toFixed(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => setStep(2)}
                      className="gold-btn px-6 py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center gap-2"
                    >
                      <span>Keyingi: Sana & Vaqt</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TIME SLOT PICKER */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">2-Bosqich: Sana va Vaqtni Tanlang</h3>
                    <span className="text-xs text-zinc-400 font-medium">
                      ⏱️ 40 Minutlik Interval
                    </span>
                  </div>

                  {/* Master Selected Info Banner */}
                  <div className="p-3.5 rounded-xl bg-[#171720] border border-[#C9A15A]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full relative overflow-hidden border border-[#C9A15A]">
                        <Image src={currentMaster.photoUrl} alt={currentMaster.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">Tanlangan Usta:</span>
                        <span className="text-xs font-bold text-white">{currentMaster.name}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#C9A15A] hover:underline font-semibold"
                    >
                      Ustanikini O&apos;zgartirish
                    </button>
                  </div>

                  {/* Date Selector Slider/Grid */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      Qulay Sanani Tanlang:
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {nextDays.map((day) => {
                        const isSelected = selectedDate === day.iso;
                        return (
                          <button
                            key={day.iso}
                            onClick={() => {
                              setSelectedDate(day.iso);
                              setSelectedTime('');
                            }}
                            className={`px-3.5 py-3 rounded-xl border shrink-0 text-center transition-all ${
                              isSelected
                                ? 'border-[#C9A15A] bg-[#C9A15A] text-black shadow-lg font-extrabold'
                                : 'border-zinc-800 bg-[#111115] text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            <div className="text-[10px] uppercase font-bold">{day.dayName}</div>
                            <div className="text-lg font-black my-0.5">{day.dayNumber}</div>
                            <div className="text-[10px] uppercase font-medium">{day.monthName}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-zinc-300">
                        Mavjud Vaqt Slotlari:
                      </label>
                      {loadingSlots && (
                        <div className="flex items-center gap-1.5 text-xs text-[#C9A15A]">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Slotlar yuklanmoqda...</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {TIME_SLOTS.map((time) => {
                        const isBooked = bookedSlots.includes(time);
                        const isSelected = selectedTime === time;

                        return (
                          <button
                            key={time}
                            disabled={isBooked}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl border text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                              isBooked
                                ? 'border-zinc-800 bg-zinc-900/60 text-zinc-600 cursor-not-allowed line-through opacity-50'
                                : isSelected
                                ? 'border-[#C9A15A] bg-[#C9A15A] text-black shadow-md scale-105'
                                : 'border-zinc-800 bg-[#111115] text-white hover:border-[#C9A15A]/60'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{time}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => setStep(1)}
                      className="gold-btn-outline px-4 py-2.5 rounded-xl text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Orqaga</span>
                    </button>
                    <button
                      disabled={!selectedTime}
                      onClick={() => setStep(3)}
                      className={`px-6 py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center gap-2 transition-all ${
                        selectedTime
                          ? 'gold-btn'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Keyingi: Xizmat Tanlash</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SERVICE SELECTION WITH THUMBNAIL IMAGES AND NO PRICES */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">3-Bosqich: Xizmatlarni Tanlang</h3>
                    <span className="text-xs text-zinc-400">
                      (Bir nechta xizmat tanlash mumkin)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                    {SERVICES.map((service: Service) => {
                      const isChecked = selectedServiceIds.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                            isChecked
                              ? 'border-[#C9A15A] bg-[#1a1a24] ring-1 ring-[#C9A15A]/40'
                              : 'border-zinc-800 bg-[#111115] hover:border-zinc-700'
                          }`}
                        >
                          {/* Thumbnail Image */}
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-zinc-700/60">
                            <Image
                              src={service.imageUrl}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-white leading-snug truncate">
                              {service.title}
                            </div>
                            <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-[#C9A15A]" />
                              <span>{service.durationMinutes} daqiqa</span>
                            </div>
                          </div>

                          {/* Checkbox */}
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                              isChecked
                                ? 'bg-[#C9A15A] border-[#C9A15A] text-black font-bold'
                                : 'border-zinc-600 bg-zinc-900'
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Bar */}
                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <Scissors className="w-4 h-4 text-[#C9A15A]" />
                      <span>
                        Jami Tanlangan: <strong className="text-white font-bold">{currentServices.length} xizmat</strong> ({totalDuration} daqiqa)
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => setStep(2)}
                      className="gold-btn-outline px-4 py-2.5 rounded-xl text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Orqaga</span>
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="gold-btn px-6 py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center gap-2"
                    >
                      <span>Keyingi: Tasdiqlash</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CLIENT INFO & CONFIRMATION */}
              {step === 4 && (
                <form onSubmit={handleBookingSubmit} className="space-y-5 animate-in fade-in duration-300">
                  <h3 className="text-lg font-black text-white">4-Bosqich: Ma&apos;lumotlarni Kiriting</h3>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-[#111115] border border-zinc-800 space-y-2 text-xs shadow-inner">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Usta:</span>
                      <span className="font-bold text-white">{currentMaster.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Sana & Vaqt:</span>
                      <span className="font-bold text-[#F8E7BE]">
                        {selectedDate} | {selectedTime} ({totalDuration} daqiqa)
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-800 pt-2">
                      <span className="text-zinc-400">Xizmatlar:</span>
                      <span className="font-bold text-white">{currentServices.map((s) => s.title).join(', ')}</span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Inputs */}
                  <div className="space-y-3.5">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">
                        Ismingiz: *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Masalan: Aziz Rahimov"
                          className="w-full bg-[#111115] border border-zinc-800 focus:border-[#C9A15A] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">
                        Telefon Raqamingiz: *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+998 90 123 45 67"
                          className="w-full bg-[#111115] border border-zinc-800 focus:border-[#C9A15A] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">
                        Qo&apos;shimcha Izoh (Ixtiyoriy):
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Alohida istak yoki eslatma..."
                          className="w-full bg-[#111115] border border-zinc-800 focus:border-[#C9A15A] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="gold-btn-outline px-4 py-2.5 rounded-xl text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Orqaga</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="gold-btn px-7 py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Yuborilmoqda...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Bronni Tasdiqlash</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
