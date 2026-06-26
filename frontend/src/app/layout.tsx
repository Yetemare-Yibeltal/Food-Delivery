import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, JetBrains_Mono, Noto_Sans_Ethiopic } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/Toast';
import '@/styles/globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────
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

// ─── Metadata ─────────────────────────────────────────────────────────────────
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
  ],
  authors: [{ name: 'Yene Delivery' }],
  creator: 'Yene Delivery',
  publisher: 'Yene Delivery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://yenedelivery.et',
  ),
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    alternateLocale: 'am_ET',
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
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yene Delivery — Food Delivery in Ethiopia',
    description:
      'Order food from your favorite restaurants across Ethiopia. Fast delivery to your door.',
    images: ['/og-image.png'],
    creator: '@yenedelivery',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E85D04' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        inter.variable,
        poppins.variable,
        jetbrainsMono.variable,
        notoSansEthiopic.variable,
      ].join(' ')}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={[
          'min-h-screen bg-background text-foreground font-sans antialiased',
          'selection:bg-primary/20 selection:text-primary',
        ].join(' ')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Skip to main content for accessibility */}
          
            href="#main-content"
            className={[
              'sr-only focus:not-sr-only',
              'focus:fixed focus:top-4 focus:left-4 focus:z-[9999]',
              'focus:px-4 focus:py-2 focus:rounded-lg',
              'focus:bg-primary focus:text-primary-foreground',
              'focus:font-semibold focus:text-sm',
              'focus:shadow-lg',
            ].join(' ')}
          >
            Skip to main content
          </a>

          {/* Main Content */}
          <main id="main-content">{children}</main>

          {/* Global Toast Notifications */}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}