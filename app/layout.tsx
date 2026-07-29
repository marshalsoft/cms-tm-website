import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cmstaxiandmotor.com'),
  title: 'CMS T&M - Reliable Mobility. Structured Operations.',
  description:
    'Proud operator of the Lekki-Ajah Transport Corridor, delivering safe, regulated, and reliable mobility solutions for Lagos residents.',
  keywords: [
    'travels',
    'Reliable',
    'Mobility',
    'Structured',
    'Operations',
    'transportation',
    'logistics',
    'hire Vehicles'
  ],
  authors: [{ name: 'treepz' }],
  creator: 'Marshall Ekene',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'cmstaxiandmotor | transportation,logistics, Rent Vehicles',
    description:
      'Book stress-free corporate travel with cmstaxiandmotor-event & vacation packages, car rentals and airport transfers for executives in 6+ countries.',
    url: 'https://www.cmstaxiandmotor.com/',
    siteName: 'CMS T&M',
    images: [
      {
        url: 'https://raw.githubusercontent.com/marshalsoft/cms-tm-website/mobile-responsiveness/images/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'CMS T&M'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cmstaxiandmotor',
    title: 'CMS T&M',
    description: 'transportation,logistics, Rent Vehicles.',
    images: [
      'https://raw.githubusercontent.com/marshalsoft/cms-tm-website/mobile-responsiveness/images/screenshot.png'
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@400;500;600;700;800&family=Urbanist:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
