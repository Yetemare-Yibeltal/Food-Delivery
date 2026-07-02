 import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Send, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { APP_INFO, ETHIOPIAN_CITIES } from '@yene/shared';
import { toast } from '@/components/ui/Toast';

const footerLinks = {
  company: { title: 'Company', titleAm: 'ኩባንያ', links: [{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Press', href: '/press' }, { label: 'Blog', href: '/blog' }, { label: 'Partner With Us', href: '/partner' }] },
  forCustomers: { title: 'For Customers', titleAm: 'ለደንበኞች', links: [{ label: 'How It Works', href: '/#how-it-works' }, { label: 'Track Order', href: '/track' }, { label: 'Deals & Offers', href: '/deals' }, { label: 'Gift Cards', href: '/gift-cards' }, { label: 'Refer a Friend', href: '/refer' }] },
  forRestaurants: { title: 'For Restaurants', titleAm: 'ለምግብ ቤቶች', links: [{ label: 'Join as Partner', href: '/restaurant/register' }, { label: 'Restaurant Dashboard', href: '/restaurant/dashboard' }, { label: 'Success Stories', href: '/success-stories' }, { label: 'Marketing Tools', href: '/marketing' }] },
  support: { title: 'Support', titleAm: 'ድጋፍ', links: [{ label: 'Help Center', href: '/help' }, { label: 'Contact Us', href: '/contact' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }, { label: 'Cookie Policy', href: '/cookies' }] },
};

const socialLinks = [
  { label: 'Facebook', href: APP_INFO.FACEBOOK_URL, icon: Facebook, color: 'hover:text-blue-500 hover:bg-blue-500/10' },
  { label: 'Instagram', href: APP_INFO.INSTAGRAM_URL, icon: Instagram, color: 'hover:text-pink-500 hover:bg-pink-500/10' },
  { label: 'Telegram', href: APP_INFO.TELEGRAM_URL, icon: Send, color: 'hover:text-blue-400 hover:bg-blue-400/10' },
  { label: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-500 hover:bg-red-500/10' },
];

const paymentMethods = [
  { label: 'Telebirr', emoji: '📱', color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Chapa', emoji: '💳', color: 'bg-green-500/10 text-green-600' },
  { label: 'CBE Birr', emoji: '🏦', color: 'bg-red-500/10 text-red-600' },
  { label: 'Cash', emoji: '💵', color: 'bg-yellow-500/10 text-yellow-600' },
];

const NewsletterForm = (): React.JSX.Element => {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Subscribed!', { description: 'You will receive our latest deals.' });
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-96" aria-label="Newsletter">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder:text-white/50 outline-none focus:border-white transition-all" />
      <Button type="submit" isLoading={isSubscribing} loadingText="Subscribing..." rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />} className="border border-white/30 text-white bg-white/10 hover:bg-white/20 shrink-0 px-6 py-3 rounded-xl font-semibold" animate={false}>
        Subscribe
      </Button>
    </form>
  );
};

export const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border" aria-label="Site footer">
      <div className="bg-gradient-primary">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="text-white text-center lg:text-left flex-1">
              <h3 className="font-heading font-black text-2xl mb-2">Get Exclusive Deals in Your Inbox</h3>
              <p className="font-amharic text-white/80">ልዩ ቅናሾችን በኢሜልዎ ይቀበሉ</p>
              <p className="text-white/70 text-sm mt-1">Subscribe to get exclusive offers, restaurant news, and food inspiration from across Ethiopia.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-2xl" aria-hidden="true">🍽️</span>
              </div>
              <div>
                <p className="font-heading font-black text-lg leading-none gradient-text">{APP_INFO.NAME}</p>
                <p className="text-xs font-amharic text-muted-foreground">{APP_INFO.NAME_AM}</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">{APP_INFO.TAGLINE}. Connecting Ethiopian restaurants with hungry customers across 6 cities.</p>
            <p className="font-amharic text-muted-foreground text-sm">{APP_INFO.TAGLINE_AM}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{APP_INFO.SUPPORT_PHONE}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{APP_INFO.SUPPORT_EMAIL}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground bg-muted transition-all duration-200', social.color)} aria-label={`Follow us on ${social.label}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground text-sm">{section.title}</h4>
                <p className="font-amharic text-muted-foreground text-xs">{section.titleAm}</p>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h4 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
            We Deliver In
            <span className="font-amharic text-muted-foreground font-normal">— እናደርሳለን</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {ETHIOPIAN_CITIES.map((city) => (
              <Link key={city.id} href={`/restaurants?city=${city.id}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-all duration-200">
                <span aria-hidden="true">📍</span>
                <span>{city.name}</span>
                <span className="font-amharic text-xs opacity-70">{city.nameAm}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <h4 className="font-bold text-foreground text-sm mb-4">Accepted Payment Methods</h4>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <div key={method.label} className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm font-semibold', method.color)}>
                <span aria-hidden="true">{method.emoji}</span>
                {method.label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-foreground text-sm">Download Our App</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Available on iOS and Android</p>
            </div>
            <div className="flex gap-3">
              <a href={APP_INFO.IOS_APP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity" aria-label="Download on App Store">🍎 App Store</a>
              <a href={APP_INFO.ANDROID_APP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity" aria-label="Get it on Google Play">🤖 Google Play</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {`© ${currentYear} `}
              <span className="text-foreground font-semibold">{APP_INFO.NAME}</span>
              {'. All rights reserved. Made with '}
              <Heart className="inline w-3.5 h-3.5 text-destructive fill-destructive" aria-label="love" />
              {' in Ethiopia 🇪🇹'}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <span aria-hidden="true">•</span>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <span aria-hidden="true">•</span>
              <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
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
