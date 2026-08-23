'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Masters from '@/components/Masters';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamically import BookingWizard without SSR to eliminate React hydration mismatch
const BookingWizard = dynamic(() => import('@/components/BookingWizard'), {
  ssr: false,
});

export default function Home() {
  const [selectedMasterId, setSelectedMasterId] = useState<string>('master-alex');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['royal-cut']);

  const handleSelectMaster = (masterId: string) => {
    setSelectedMasterId(masterId);
  };

  const handleToggleService = (serviceId: string) => {
    if (selectedServiceIds.includes(serviceId)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((id) => id !== serviceId));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, serviceId]);
    }
  };

  return (
    <main className="min-h-screen bg-[#070709] text-white flex flex-col font-sans selection:bg-[#C9A15A] selection:text-black">
      {/* Sticky Header */}
      <Navbar />

      {/* Hero Entrance */}
      <Hero />

      {/* Quick About Section */}
      <About />

      {/* Barber Masters Showcase */}
      <Masters onSelectMaster={handleSelectMaster} />

      {/* Services & Pricing Menu */}
      <Services
        selectedServiceIds={selectedServiceIds}
        onToggleService={handleToggleService}
      />

      {/* Interactive 4-Step Booking Wizard (Client Side Rendered) */}
      <BookingWizard
        preselectedMasterId={selectedMasterId}
        preselectedServiceIds={selectedServiceIds}
      />

      {/* Location, Contact & Editable Social Links */}
      <Contact />

      {/* Compact Footer */}
      <Footer />
    </main>
  );
}
