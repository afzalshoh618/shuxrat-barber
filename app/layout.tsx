import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '9D Barbershop — Onlayn navbat',
  description: '9D Barbershop — Zamonaviy raqamli uslub va oliy darajadagi erkaklar parvarishi. Qulay va tezkor 4-bosqichli onlayn navbat olish.',
  keywords: ['9D Barbershop', '9D', 'barbershop', 'toshkent', 'soch olish', 'soqol parvarishi', 'online booking', 'barber navbat'],
  openGraph: {
    title: '9D Barbershop — Onlayn navbat',
    description: 'Zamonaviy raqamli uslub va oliy darajadagi erkaklar parvarishi maskani.',
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
