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
    'restaurant delivery Addis Ababa',
    'online food ordering Ethiopia',
    'ምግብ ማድረሻ',
    'Ethiopian restaurant online',
  ],
  authors: [{ name: 'Yene Delivery', url: 'https://yenedelivery.et' }],
  creator: 'Yene Delivery',
  publisher: 'Yene Delivery',
  category: 'Food Delivery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://yenedelivery.et',
  ),
  alternates: {
    canonical: '/',
    languages: {
      'en-ET': '/en',
      'am-ET': '/am',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    alternateLocale: ['am_ET'],
    url: 'https://yenedelivery.et',
    siteName: 'Yene Delivery',
    title: 'Yene Delivery — Food Delivery in Ethiopia',
    description:
      'Order food from your favorite restaurants across Ethiopia. Fast delivery to your door.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yene Delivery — Food Delivery in Ethiopia',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yenedelivery',
    creator: '@yenedelivery',
    title: 'Yene Delivery — Food Delivery in Ethiopia',
    description:
      'Order food from your favorite restaurants across Ethiopia. Fast delivery to your door.',
    images: [
      {
        url: '/og-image.png',
        alt: 'Yene Delivery — Food Delivery in Ethiopia',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  applicationName: 'Yene Delivery',
  referrer: 'origin-when-cross-origin',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E85D04' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

const skipLinkClass = [
  'sr-only',
  'focus:not-sr-only',
  'focus:fixed',
  'focus:top-4',
  'focus:left-4',
  'focus:z-50',
  'focus:px-4',
  'focus:py-2',
  'focus:rounded-lg',
  'focus:bg-primary',
  'focus:text-primary-foreground',
  'focus:font-semibold',
  'focus:text-sm',
  'focus:shadow-lg',
  'focus:outline-none',
].join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  const fontClasses = [
    inter.variable,
    poppins.variable,
    jetbrainsMono.variable,
    notoSansEthiopic.variable,
  ].join(' ');

  return (
    <html lang="en" suppressHydrationWarning className={fontClasses}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="msapplication-TileColor" content="#E85D04" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
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