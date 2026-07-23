import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rapidlinks.in'),
  title: {
    default: 'RapidLinks — Logistics & Courier Management Software',
    template: '%s | RapidLinks',
  },
  description:
    'RapidLinks is a license-based logistics & courier management software for Indian businesses. Manage domestic shipments, international exports, and accounting — pay a one-time license fee plus per-order usage charges.',
  keywords: [
    'logistics software India',
    'courier management software',
    'domestic shipment management',
    'international courier software',
    'logistics accounting software',
    'COD management',
    'shipping software India',
    'courier management system',
  ],
  authors: [{ name: 'RapidLinks', url: 'https://rapidlinks.in' }],
  creator: 'RapidLinks',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rapidlinks.in',
    siteName: 'RapidLinks',
    title: 'RapidLinks — Logistics & Courier Management Software',
    description:
      'One-time license per product. Pay only for what you actually ship. Manage domestic, international, and accounting operations in one platform.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RapidLinks — Logistics & Courier Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RapidLinks — Logistics & Courier Management Software',
    description:
      'One-time license per product. Pay only for what you actually ship.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
