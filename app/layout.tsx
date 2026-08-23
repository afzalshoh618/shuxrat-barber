import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROYAL CUTS — Premium Barbershop & Booking',
  description: 'Toshkentdagi eng sara premium barbershop. Erkaklar uchun oliy darajadagi soch va soqol parvarishi, qulay onlayn navbat olish.',
  keywords: ['barbershop', 'toshkent', 'soch olish', 'soqol parvarishi', 'royal cuts', 'online booking', 'barber'],
  openGraph: {
    title: 'ROYAL CUTS — Premium Barbershop',
    description: 'Shahar bo\'ylab eng oliy darajadagi erkaklar uslubi. Qulay va tezkor onlayn navbat oling.',
    images: ['/images/hero.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#070709] text-[#f4f4f5] antialiased selection:bg-[#C9A15A] selection:text-black min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
