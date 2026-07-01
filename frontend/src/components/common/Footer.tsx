'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Send,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { APP_INFO, ETHIOPIAN_CITIES } from '@yene/shared';
import { toast } from '@/components/ui/Toast';

// ─── Footer Links ─────────────────────────────────────────────────────────────
const footerLinks = {
  company: {
    title: 'Company',
    titleAm: 'ኩባንያ',
    links: [
      { label: 'About Us', labelAm: 'ስለ እኛ', href: '/about' },
      { label: 'Careers', labelAm: 'ሥራዎች', href: '/careers' },
      { label: 'Press', labelAm: 'ፕሬስ', href: '/press' },
      { label: 'Blog', labelAm: 'ብሎግ', href: '/blog' },
      { label: 'Partner With Us', labelAm: 'ከእኛ ጋር ይሥሩ', href: '/partner' },
    ],
  },
  forCustomers: {
    title: 'For Customers',
    titleAm: 'ለደንበኞች',
    links: [
      { label: 'How It Works', labelAm: 'እንዴት ይሠራል', href: '/#how-it-works' },
      { label: 'Track Order', labelAm: 'ትዕዛዝ ይከታተሉ', href: '/track' },
      { label: 'Deals & Offers', labelAm: 'ቅናሾች', href: '/deals' },
      { label: 'Gift Cards', labelAm: 'ስጦታ ካርዶች', href: '/gift-cards' },
      { label: 'Refer a Friend', labelAm: 'ጓደኛ ይጋብዙ', href: '/refer' },
    ],
  },
  forRestaurants: {
    title: 'For Restaurants',
    titleAm: 'ለምግብ ቤቶች',
    links: [
      { label: 'Join as Partner', labelAm: 'አጋር ሆኑ', href: '/restaurant/register' },
      { label: 'Restaurant Dashboard', labelAm: 'ዳሽቦርድ', href: '/restaurant/dashboard' },
      { label: 'Success Stories', labelAm: 'የስኬት ታሪኮች', href: '/success-stories' },
      { label: 'Marketing Tools', labelAm: 'የግብይት መሣሪያዎች', href: '/marketing' },
    ],
  },
  support: {
    title: 'Support',
    titleAm: 'ድጋፍ',
    links: [
      { label: 'Help Center', labelAm: 'የእርዳታ ማዕከል', href: '/help' },
      { label: 'Contact Us', labelAm: 'አግኙን', href: '/contact' },
      { label: 'Privacy Policy', labelAm: 'የግላዊነት ፖሊሲ', href: '/privacy' },
      { label: 'Terms of Service', labelAm: 'የአገልግሎት ውል', href: '/terms' },
      { label: 'Cookie Policy', labelAm: 'የኩኪ ፖሊሲ', href: '/cookies' },
    ],
  },
};

// ─── Social Links ─────────────────────────────────────────────────────────────
const socialLinks = [
  {
    label: 'Facebook',
    href: APP_INFO.FACEBOOK_URL,
    icon: Facebook,
    color: 'hover:text-blue-500 hover:bg-blue-500/10',
  },
  {
    label: 'Instagram',
    href: APP_INFO.INSTAGRAM_URL,
    icon: Instagram,
    color: 'hover:text-pink-500 hover:bg-pink-500/10',
  },
  {
    label: 'Telegram',
    href: APP_INFO.TELEGRAM_URL,
    icon: Send,
    color: 'hover:text-blue-400 hover:bg-blue-400/10',
  },
  {
    label: 'YouTube',
    href: '#',
    icon: Youtube,
    color: 'hover:text-red-500 hover:bg-red-500/10',
  },
];

// ─── Payment Methods ──────────────────────────────────────────────────────────
const paymentMethods = [
  { label: 'Telebirr', emoji: '📱', color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Chapa', emoji: '💳', color: 'bg-green-500/10 text-green-600' },
  { label: 'CBE Birr', emoji: '🏦', color: 'bg-red-500/10 text-red-600' },
  { label: 'Cash', emoji: '💵', color: 'bg-yellow-500/10 text-yellow-600' },
];

// ─── Footer Component ─────────────────────────────────────────────────────────
export const Footer = (): React.JSX.Element => {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (
    e: React.FormEvent,
  ): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Subscribed successfully!', {
      description: 'You will receive our latest deals and updates.',
    });
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <footer
      className="bg-card border-t border-border"
      aria-label="Site footer"
    >
      {/* ─── Newsletter Section ────────────────────────────────────────── */}
      <div className="bg-gradient-primary">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="text-white text-center lg:text-left flex-1">
              <h3 className="font-heading font-black text-2xl mb-2">
                Get Exclusive Deals in Your Inbox
              </h3>
              <p className="font-amharic text-white/80">
                ልዩ ቅናሾችን በኢሜልዎ ይቀበሉ
              </p>
              <p className="text-white/70 text-sm mt-1">
                Subscribe to get exclusive offers, restaurant news, and food
                inspiration from across Ethiopia.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[400px]"
              aria-label="Newsletter subscription"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                aria-label="Email address for newsletter"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-white/20"
              />
              <Button
                type="submit"
                variant="glass"
                isLoading={isSubscribing}
                loadingText="Subscribing..."
                rightIcon={
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                }
                className="border-white/30 text-white hover:bg-white/20 shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Content ───────────────────────────────────────── */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-2xl" aria-hidden="true">🍽️</span>
              </div>
              <div>
                <p className="font-heading font-black text-lg leading-none gradient-text">
                  {APP_INFO.NAME}
                </p>
                <p className="text-xs font-amharic text-muted-foreground">
                  {APP_INFO.NAME_AM}
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {APP_INFO.TAGLINE}. Connecting Ethiopian restaurants with hungry
              customers across 6 cities. Fast, reliable, and always delicious.
            </p>
            <p className="font-amharic text-muted-foreground text-sm">
              {APP_INFO.TAGLINE_AM}
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              
                href={`tel:${APP_INFO.SUPPORT_PHONE}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                {APP_INFO.SUPPORT_PHONE}
              </a>
              
                href={`mailto:${APP_INFO.SUPPORT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                {APP_INFO.SUPPORT_EMAIL}
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center',
                      'text-muted-foreground bg-muted',
                      'transition-all duration-200',
                      social.color,
                    )}
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground text-sm">
                  {section.title}
                </h4>
                <p className="font-amharic text-muted-foreground text-xs">
                  {section.titleAm}
                </p>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-muted-foreground',
                        'hover:text-primary transition-colors duration-200',
                        'flex items-center gap-1 group',
                      )}
                    >
                      <ArrowRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <h4 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
            We Deliver In
            <span className="font-amharic text-muted-foreground font-normal">
              — እናደርሳለን
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {ETHIOPIAN_CITIES.map((city) => (
              <Link
                key={city.id}
                href={`/restaurants?city=${city.id}`}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full',
                  'bg-muted text-sm text-muted-foreground',
                  'hover:bg-primary/10 hover:text-primary',
                  'border border-border hover:border-primary/30',
                  'transition-all duration-200',
                )}
              >
                <span aria-hidden="true">📍</span>
                <span>{city.name}</span>
                <span className="font-amharic text-xs opacity-70">
                  {city.nameAm}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-border">
          <h4 className="font-bold text-foreground text-sm mb-4">
            Accepted Payment Methods
          </h4>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.label}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl',
                  'border border-border',
                  method.color,
                  'text-sm font-semibold',
                )}
              >
                <span aria-hidden="true">{method.emoji}</span>
                {method.label}
              </div>
            ))}
          </div>
        </div>

        {/* App Download */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-foreground text-sm">
                Download Our App
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Available on iOS and Android
              </p>
            </div>
            <div className="flex gap-3">
              
                href={APP_INFO.IOS_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl',
                  'bg-foreground text-background',
                  'text-sm font-semibold',
                  'hover:opacity-90 transition-opacity',
                )}
                aria-label="Download on App Store"
              >
                🍎 App Store
              </a>
              
                href={APP_INFO.ANDROID_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl',
                  'bg-foreground text-background',
                  'text-sm font-semibold',
                  'hover:opacity-90 transition-opacity',
                )}
                aria-label="Get it on Google Play"
              >
                🤖 Google Play
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ────────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear}{' '}
              <span className="text-foreground font-semibold">
                {APP_INFO.NAME}
              </span>
              . All rights reserved. Made with{' '}
              <Heart
                className="inline w-3.5 h-3.5 text-destructive fill-destructive"
                aria-label="love"
              />{' '}
              in Ethiopia 🇪🇹
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/cookies"
                className="hover:text-primary transition-colors"
              >
                Cookies
              </Link>
              <span aria-hidden="true">•</span>
              <span className="font-amharic">ኢትዮጵያ 🇪🇹</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;