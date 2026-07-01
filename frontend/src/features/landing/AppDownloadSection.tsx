'use client';

import * as React from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Smartphone,
  Star,
  Download,
  Zap,
  MapPin,
  Bell,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { floatVariants } from '@/lib/animations/variants';
import { APP_INFO } from '@yene/shared';

// ─── App Features ─────────────────────────────────────────────────────────────
const appFeatures = [
  {
    icon: Zap,
    title: 'Order in seconds',
    titleAm: 'በሰከንዶች ይዘዙ',
    description: 'Streamlined ordering process',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: MapPin,
    title: 'Live tracking',
    titleAm: 'በቀጥታ ክትትል',
    description: 'Watch your delivery in real-time',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Bell,
    title: 'Smart notifications',
    titleAm: 'ስማርት ማሳወቂያዎች',
    description: 'Stay updated at every step',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Secure payments',
    titleAm: 'ደህንነቱ የተጠበቀ ክፍያ',
    description: 'Bank-level security',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
];

// ─── App Stats ────────────────────────────────────────────────────────────────
const appStats = [
  { value: '4.9', label: 'App Store', icon: '⭐' },
  { value: '4.8', label: 'Play Store', icon: '⭐' },
  { value: '50K+', label: 'Downloads', icon: '📥' },
  { value: '98%', label: 'Satisfaction', icon: '💯' },
];

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
const PhoneMockup = (): React.JSX.Element => {
  const [currentScreen, setCurrentScreen] = React.useState(0);

  const screens = [
    {
      bg: 'from-orange-500 to-amber-500',
      content: (
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-xs">🍽️</span>
            </div>
            <span className="text-white text-xs font-bold">Yene Delivery</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5">
            <p className="text-white/70 text-[9px]">Search restaurants...</p>
          </div>
          {[
            { name: 'Yod Abyssinia', time: '25 min', rating: '4.9' },
            { name: 'Kategna', time: '20 min', rating: '4.8' },
            { name: 'Burger House', time: '30 min', rating: '4.7' },
          ].map((r) => (
            <div key={r.name} className="bg-white/10 rounded-xl p-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-base">🍽️</div>
              <div className="flex-1">
                <p className="text-white text-[10px] font-bold">{r.name}</p>
                <p className="text-white/60 text-[9px]">⏱ {r.time} • ⭐ {r.rating}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      bg: 'from-green-500 to-emerald-500',
      content: (
        <div className="p-3 space-y-2">
          <p className="text-white font-bold text-xs mb-3">🛒 Your Cart</p>
          {[
            { name: 'Special Tibs', price: '360', qty: 2 },
            { name: 'Injera', price: '100', qty: 4 },
            { name: 'Tej', price: '45', qty: 1 },
          ].map((item) => (
            <div key={item.name} className="bg-white/10 rounded-xl p-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center text-xs">{item.qty}</div>
              <p className="text-white text-[10px] flex-1">{item.name}</p>
              <p className="text-white/80 text-[10px] font-bold">{item.price} ETB</p>
            </div>
          ))}
          <div className="bg-white/20 rounded-xl p-2 flex justify-between">
            <p className="text-white text-[10px] font-bold">Total</p>
            <p className="text-white text-[10px] font-black">505 ETB</p>
          </div>
          <div className="bg-white rounded-xl p-2 text-center">
            <p className="text-green-600 text-[10px] font-black">Checkout Now</p>
          </div>
        </div>
      ),
    },
    {
      bg: 'from-blue-500 to-cyan-500',
      content: (
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-bold text-xs">📍 Tracking</p>
            <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full">On the Way</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2 h-20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <motion.div
              animate={{ x: [-20, 20, -20], y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl z-10"
            >
              🛵
            </motion.div>
          </div>
          {['Order Confirmed ✅', 'Preparing 👨‍🍳', 'Picked Up 🛵', 'On the Way 📍'].map((s, i) => (
            <div key={s} className={cn('flex items-center gap-2 text-[9px]', i < 3 ? 'text-white' : 'text-white font-bold')}>
              <div className={cn('w-3 h-3 rounded-full flex-shrink-0', i < 3 ? 'bg-white/60' : 'bg-white animate-pulse')} />
              {s}
            </div>
          ))}
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screens.length]);

  return (
    <div className="relative flex justify-center">
      {/* Phone Frame */}
      <div className="relative w-56">
        <div className={cn(
          'w-56 h-[460px] rounded-[3rem]',
          'border-8 border-foreground/10',
          'overflow-hidden shadow-2xl',
          'relative',
        )}>
          {/* Status Bar */}
          <div className={cn(
            'h-8 flex items-center justify-between px-4',
            `bg-gradient-to-r ${screens[currentScreen]?.bg ?? 'from-orange-500 to-amber-500'}`,
          )}>
            <span className="text-white text-[9px] font-bold">9:41</span>
            <div className="w-16 h-4 bg-black/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-2 bg-black/50 rounded-full" aria-hidden="true" />
            </div>
            <div className="flex gap-1">
              <div className="w-3 h-2 border border-white/60 rounded-sm">
                <div className="w-2 h-full bg-white/80 rounded-sm" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className={cn(
            'flex-1 h-full',
            `bg-gradient-to-br ${screens[currentScreen]?.bg ?? 'from-orange-500 to-amber-500'}`,
          )}>
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {screens[currentScreen]?.content}
            </motion.div>
          </div>

          {/* Home Indicator */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 h-6',
            'flex items-center justify-center',
            `bg-gradient-to-r ${screens[currentScreen]?.bg ?? 'from-orange-500 to-amber-500'}`,
          )}>
            <div className="w-20 h-1 bg-white/40 rounded-full" aria-hidden="true" />
          </div>
        </div>

        {/* Screen Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {screens.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentScreen(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === currentScreen
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-muted-foreground/30',
              )}
              aria-label={`Screen ${i + 1}`}
            />
          ))}
        </div>

        {/* Floating Notification Cards */}
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className={cn(
            'absolute -left-20 top-1/4',
            'bg-card border border-border rounded-2xl',
            'p-3 shadow-xl',
            'flex items-center gap-2',
            'w-40',
          )}
        >
          <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
            <span className="text-base" aria-hidden="true">✅</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground">Delivered!</p>
            <p className="text-[9px] text-muted-foreground">Order #YD-001</p>
          </div>
        </motion.div>

        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '1.5s' }}
          className={cn(
            'absolute -right-20 bottom-1/3',
            'bg-card border border-border rounded-2xl',
            'p-3 shadow-xl',
            'w-36',
          )}
        >
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-2.5 h-2.5 fill-accent text-accent" aria-hidden="true" />
            ))}
          </div>
          <p className="text-[10px] font-bold text-foreground">Great Food!</p>
          <p className="text-[9px] text-muted-foreground">— Hiwot A.</p>
        </motion.div>

        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '0.8s' }}
          className={cn(
            'absolute -right-16 top-1/5',
            'bg-primary text-primary-foreground rounded-2xl',
            'p-3 shadow-xl',
            'flex items-center gap-2',
          )}
        >
          <span className="text-base" aria-hidden="true">🛵</span>
          <div>
            <p className="text-[10px] font-bold">On the way</p>
            <p className="text-[9px] opacity-80">8 min away</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── App Download Section ─────────────────────────────────────────────────────
export const AppDownloadSection = (): React.JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      void controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden"
      aria-labelledby="app-download-heading"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-amber-600" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6 },
              },
            }}
            className="flex flex-col gap-8 text-white"
          >
            {/* Badge */}
            <div>
              <Badge
                variant="glass"
                size="md"
                icon={<Smartphone className="w-4 h-4" aria-hidden="true" />}
                className="border-white/30 text-white bg-white/10 w-fit"
              >
                Download the App
              </Badge>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2
                id="app-download-heading"
                className="font-heading font-black text-white"
              >
                Order Food Faster
                <br />
                <span className="text-white/80">with Our Mobile App</span>
              </h2>
              <p className="font-amharic text-white/70 text-lg">
                በሞባይል መተግበሪያችን ምግብ ፈጠን ብለው ይዘዙ
              </p>
              <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                Get the best experience with our mobile app. Exclusive app-only
                deals, faster checkout, and real-time tracking right in your
                pocket.
              </p>
            </div>

            {/* App Features */}
            <div className="grid grid-cols-2 gap-3">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ scale: 1.03 }}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-2xl',
                      'bg-white/10 backdrop-blur-sm',
                      'border border-white/20',
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-xl flex items-center justify-center shrink-0',
                      'bg-white/20',
                    )}>
                      <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {feature.title}
                      </p>
                      <p className="text-white/60 text-[10px] font-amharic">
                        {feature.titleAm}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* App Stats */}
            <div className="flex flex-wrap gap-4">
              {appStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2"
                >
                  <span aria-hidden="true">{stat.icon}</span>
                  <div>
                    <p className="text-white font-black text-lg leading-none">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* iOS */}
              <motion.a
                href={APP_INFO.IOS_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center gap-3 px-6 py-4 rounded-2xl',
                  'bg-white text-foreground',
                  'shadow-xl hover:shadow-2xl',
                  'transition-all duration-300',
                  'group',
                )}
                aria-label="Download on App Store"
              >
                <svg
                  className="w-8 h-8 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Download on the
                  </p>
                  <p className="text-sm font-black text-foreground">
                    App Store
                  </p>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </motion.a>

              {/* Android */}
              <motion.a
                href={APP_INFO.ANDROID_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center gap-3 px-6 py-4 rounded-2xl',
                  'bg-white/10 text-white',
                  'border border-white/30',
                  'backdrop-blur-sm',
                  'hover:bg-white/20',
                  'transition-all duration-300',
                  'group',
                )}
                aria-label="Get it on Google Play"
              >
                <svg
                  className="w-8 h-8 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3.18 23.76c.3.16.64.2.96.12l13.2-7.62-2.82-2.82-11.34 10.32zm-1.44-20.4c-.18.3-.3.66-.3 1.08v17.12c0 .42.12.78.3 1.08l.06.06 9.6-9.6v-.24L1.8 3.3l-.06.06zm19.5 8.4l-2.7-1.56-3 3 3 3 2.7-1.56c.78-.42.78-1.44.0-1.88zm-18.06 9.42l13.2-7.62-2.82-2.82-10.38 10.44z" />
                </svg>
                <div>
                  <p className="text-xs text-white/60">Get it on</p>
                  <p className="text-sm font-black text-white">Google Play</p>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-white/60 ml-auto group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
              </motion.a>
            </div>

            {/* Web App CTA */}
            <p className="text-white/60 text-sm">
              Or{' '}
              
                href="#"
                className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                continue using the web app
              </a>{' '}
              — no download required.
            </p>
          </motion.div>

          {/* Right — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.3 },
              },
            }}
            className="flex justify-center relative"
          >
            <PhoneMockup />

            {/* Download count badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.8, type: 'spring' },
                },
              }}
              className={cn(
                'absolute bottom-20 left-1/2 -translate-x-1/2',
                'bg-white text-foreground rounded-2xl',
                'px-4 py-2 shadow-xl',
                'flex items-center gap-2',
              )}
            >
              <Download className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-black">50,000+ Downloads</span>
              <span className="text-xs text-muted-foreground">& counting</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AppDownloadSection;