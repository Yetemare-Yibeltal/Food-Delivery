import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Poppins,
  JetBrains_Mono,
  Noto_Sans_Ethiopic,
} from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-noto-sans-ethiopic',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Yene Delivery | የኔ ዴሊቨሪ — Food Delivery in Ethiopia',
    template: '%s | Yene Delivery',
  },
  description:
    'Order food from your favorite restaurants in Addis Ababa, Adama, Hawassa, Dire Dawa, Bahir Dar and Jimma. Fast, reliable food delivery across Ethiopia.',
  keywords: [
    'food delivery Ethiopia',
    'Addis Ababa food delivery',
    'Ethiopian food delivery app',
    'order food online Ethiopia',
    'Yene Delivery',
    'የኔ ዴሊቨሪ',
  ],
  authors: [{ name: 'Yene Delivery', url: 'https://yenedelivery.et' }],
  creator: 'Yene Delivery',
  publisher: 'Yene Delivery',
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://yenedelivery.et',
  ),
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    url: 'https://yenedelivery.et',
    siteName: 'Yene Delivery',
    title: 'Yene Delivery — Food Delivery in Ethiopia',
    description: 'Order food from your favorite restaurants across Ethiopia.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Yene Delivery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yene Delivery — Food Delivery in Ethiopia',
    description: 'Order food from your favorite restaurants across Ethiopia.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const skipLinkClass = 'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-none';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const fontClasses = [
    inter.variable,
    poppins.variable,
    jetbrainsMono.variable,
    notoSansEthiopic.variable,
  ].join(' ');

  return (
    <html lang="en" suppressHydrationWarning className={`dark ${fontClasses}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <Providers>
          <a href="#main-content" className={skipLinkClass}>
            Skip to main content
          </a>
          <main id="main-content" className="relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
