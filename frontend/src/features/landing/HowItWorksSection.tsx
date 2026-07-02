'use client';

import * as React from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  CreditCard,
  MapPin,
  Check,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/cn';

// ─── Steps Data ───────────────────────────────────────────────────────────────
const steps = [
  {
    id: 1,
    number: '01',
    icon: Search,
    emoji: '🔍',
    title: 'Find Your Restaurant',
    titleAm: 'ምግብ ቤትዎን ያግኙ',
    description:
      'Browse hundreds of restaurants in your city. Filter by cuisine, rating, delivery time, or price. Find exactly what you are craving.',
    descriptionAm:
      'በከተማዎ ውስጥ ብዙ ምግብ ቤቶችን ይፈልጉ። በምግብ አይነት፣ ደረጃ ወይም ዋጋ ይለኩ።',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500/30',
    tip: 'Use filters to find the perfect restaurant',
    tipAm: 'ፍልተሮችን ተጠቀሙ',
    mockContent: {
      type: 'search',
      items: [
        { name: 'Yod Abyssinia', rating: 4.9, time: '25 min', cuisine: 'Ethiopian' },
        { name: 'Kategna', rating: 4.8, time: '20 min', cuisine: 'Ethiopian' },
        { name: 'Burger House', rating: 4.7, time: '30 min', cuisine: 'Fast Food' },
      ],
    },
  },
  {
    id: 2,
    number: '02',
    icon: ShoppingCart,
    emoji: '🛒',
    title: 'Add to Your Cart',
    titleAm: 'ወደ ጋሪዎ ይጨምሩ',
    description:
      'Browse the menu, customize your order with addons and special instructions. Add multiple items to your cart in seconds.',
    descriptionAm:
      'ሜኑን ይፈልጉ፣ ትዕዛዝዎን ያስተካክሉ። ብዙ ምግቦችን ወደ ጋሪዎ ይጨምሩ።',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    borderColor: 'border-green-500/30',
    tip: 'Customize with addons and special notes',
    tipAm: 'ተጨማሪዎች ጨምሩ',
    mockContent: {
      type: 'cart',
      items: [
        { name: 'Special Tibs', price: 180, qty: 2, emoji: '🥩' },
        { name: 'Injera', price: 25, qty: 4, emoji: '🫓' },
        { name: 'Tej', price: 45, qty: 1, emoji: '🍶' },
      ],
    },
  },
  {
    id: 3,
    number: '03',
    icon: CreditCard,
    emoji: '💳',
    title: 'Pay Your Way',
    titleAm: 'እንደ ፈለጉ ይክፈሉ',
    description:
      'Choose from Telebirr, Chapa, CBE Birr, or cash on delivery. Fast, secure checkout in just a few taps.',
    descriptionAm:
      'ቴሌብር፣ ቻፓ፣ ሲቢኢ ብር ወይም ጥሬ ገንዘብ ይምረጡ። ፈጣን እና ደህንነቱ የተጠበቀ።',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500/30',
    tip: 'All payments are 100% secure',
    tipAm: 'ሁሉም ክፍያዎች ደህንነቱ የተጠበቀ ነው',
    mockContent: {
      type: 'payment',
      methods: [
        { name: 'Telebirr', emoji: '📱', color: 'bg-blue-500' },
        { name: 'Chapa', emoji: '💳', color: 'bg-green-500' },
        { name: 'CBE Birr', emoji: '🏦', color: 'bg-red-500' },
        { name: 'Cash', emoji: '💵', color: 'bg-yellow-500' },
      ],
    },
  },
  {
    id: 4,
    number: '04',
    icon: MapPin,
    emoji: '📍',
    title: 'Track & Enjoy',
    titleAm: 'ይከታተሉ እና ይደሰቱ',
    description:
      'Watch your order in real-time on a live map. Get notified at every step — from preparation to delivery at your door.',
    descriptionAm:
      'ትዕዛዝዎን በቀጥታ ካርታ ላይ ይከታተሉ። ከምግብ ዝግጅት እስከ ቤትዎ ድረስ ይከታተሉ።',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    tip: 'Live GPS tracking on every order',
    tipAm: 'በቀጥታ GPS ክትትል',
    mockContent: {
      type: 'tracking',
      statuses: [
        { label: 'Order Confirmed', done: true, emoji: '✅' },
        { label: 'Preparing', done: true, emoji: '👨‍🍳' },
        { label: 'Rider Picked Up', done: true, emoji: '🛵' },
        { label: 'On the Way', done: false, emoji: '📍', active: true },
        { label: 'Delivered', done: false, emoji: '🏠' },
      ],
    },
  },
];

// ─── Step Mock UI ─────────────────────────────────────────────────────────────
const StepMockUI = ({
  step,
  isActive,
}: {
  step: typeof steps[0];
  isActive: boolean;
}): React.JSX.Element => {
  if (step.mockContent.type === 'search') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-xs text-muted-foreground">
          <Search className="w-3 h-3" aria-hidden="true" />
          <span>Search restaurants in Addis Ababa...</span>
        </div>
        {step.mockContent.items?.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
              🍽️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">{item.cuisine} • ⭐ {item.rating}</p>
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (step.mockContent.type === 'cart') {
    const total = step.mockContent.items?.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.qty ?? 1),
      0,
    );
    return (
      <div className="space-y-2">
        {step.mockContent.items?.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
          >
            <span className="text-lg" aria-hidden="true">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">{item.price} ETB × {item.qty}</p>
            </div>
            <span className="text-xs font-bold text-primary">
              {(item.price ?? 0) * (item.qty ?? 1)} ETB
            </span>
          </motion.div>
        ))}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-xs font-semibold text-foreground">Total</span>
          <span className="text-sm font-black text-primary">{total} ETB</span>
        </div>
      </div>
    );
  }

  if (step.mockContent.type === 'payment') {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground px-1">
          Select payment method:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {step.mockContent.methods?.map((method, i) => (
            <motion.button
              key={method.name}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                'flex items-center gap-2 p-2.5 rounded-xl',
                'border-2 transition-all duration-200',
                i === 0
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/50 hover:border-primary/30',
              )}
            >
              <span className="text-base" aria-hidden="true">{method.emoji}</span>
              <span className="text-xs font-semibold text-foreground">{method.name}</span>
              {i === 0 && (
                <Check className="w-3 h-3 text-primary ml-auto" aria-hidden="true" />
              )}
            </motion.button>
          ))}
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
        >
          Pay Now — 430 ETB
        </motion.button>
      </div>
    );
  }

  if (step.mockContent.type === 'tracking') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-medium text-foreground">Order #YD-2024-001</p>
          <span className="text-[10px] text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
            On the Way
          </span>
        </div>
        <div className="relative pl-4">
          {step.mockContent.statuses?.map((status, i) => (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 mb-2 last:mb-0 relative"
            >
              {/* Line connector */}
              {i < (step.mockContent.statuses?.length ?? 0) - 1 && (
                <div
                  className={cn(
                    'absolute left-3 top-5 w-0.5 h-5',
                    status.done ? 'bg-primary' : 'bg-border',
                  )}
                  aria-hidden="true"
                />
              )}
              {/* Status dot */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 z-10',
                  status.done
                    ? 'bg-primary text-white'
                    : status.active
                      ? 'bg-primary/20 border-2 border-primary animate-pulse'
                      : 'bg-muted border-2 border-border',
                )}
              >
                {status.done ? (
                  <Check className="w-3 h-3" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{status.emoji}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs',
                  status.done
                    ? 'text-foreground font-medium'
                    : status.active
                      ? 'text-primary font-bold'
                      : 'text-muted-foreground',
                )}
              >
                {status.label}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <span className="text-xs" aria-hidden="true">🛵</span>
          <span className="text-xs text-success font-medium">
            Rider is 2.3 km away — ETA 8 min
          </span>
        </div>
      </div>
    );
  }

  return <div />;
};

// ─── How It Works Section ─────────────────────────────────────────────────────
export const HowItWorksSection = (): React.JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      void controls.start('visible');
    }
  }, [isInView, controls]);

  // Auto-cycle through steps
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="section bg-muted/30 relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20">
              <Smartphone className="w-4 h-4" aria-hidden="true" />
              How It Works
            </span>
          </div>
          <div className="space-y-2">
            <h2
              id="how-it-works-heading"
              className="font-heading font-black text-foreground"
            >
              Order Food in{' '}
              <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="font-amharic text-muted-foreground text-lg">
              ምግብ ለማዘዝ 4 ቀላል ደረጃዎች
            </p>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting your favorite food delivered has never been easier.
            Follow these simple steps and enjoy your meal.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — Steps List */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: index * 0.1 },
                    },
                  }}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    'flex gap-4 p-4 rounded-2xl cursor-pointer',
                    'transition-all duration-300',
                    'border',
                    isActive
                      ? cn('bg-card shadow-lg', step.borderColor)
                      : 'bg-transparent border-transparent hover:bg-card/50',
                  )}
                >
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center',
                        'transition-all duration-300',
                        isActive
                          ? cn(`bg-gradient-to-br ${step.color}`, 'shadow-lg')
                          : step.bgColor,
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-6 h-6 transition-colors duration-300',
                          isActive ? 'text-white' : step.textColor,
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          'w-0.5 h-4 rounded-full transition-colors duration-300',
                          isActive ? 'bg-primary' : 'bg-border',
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          'text-xs font-black transition-colors duration-300',
                          isActive ? step.textColor : 'text-muted-foreground',
                        )}
                      >
                        STEP {step.number}
                      </span>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium"
                        >
                          Current
                        </motion.span>
                      )}
                    </div>
                    <h3
                      className={cn(
                        'font-bold text-base transition-colors duration-300',
                        isActive ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs font-amharic text-muted-foreground">
                      {step.titleAm}
                    </p>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={cn(
                                'w-1.5 h-1.5 rounded-full',
                                step.textColor.replace('text-', 'bg-'),
                              )}
                              aria-hidden="true"
                            />
                            <p className="text-xs text-muted-foreground italic">
                              💡 {step.tip}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 flex items-center">
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-all duration-300',
                        isActive
                          ? cn(step.textColor, 'translate-x-1')
                          : 'text-muted-foreground/30',
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right — Mock Phone UI */}
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
            className="flex justify-center lg:sticky lg:top-24"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div
                className={cn(
                  'w-72 rounded-[3rem] overflow-hidden',
                  'border-8 border-foreground/10',
                  'bg-background shadow-2xl',
                  'relative',
                )}
              >
                {/* Phone Notch */}
                <div className="h-6 bg-foreground/5 flex items-center justify-center">
                  <div className="w-20 h-3 bg-foreground/10 rounded-full" aria-hidden="true" />
                </div>

                {/* App Header */}
                <div className="px-4 py-3 bg-card border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <span className="text-xs" aria-hidden="true">🍽️</span>
                    </div>
                    <span className="text-xs font-bold gradient-text">Yene Delivery</span>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
                      <div className="w-1.5 h-1.5 rounded-full bg-success/60" aria-hidden="true" />
                      <div className="w-1.5 h-1.5 rounded-full bg-success/30" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Step Indicator */}
                <div className="px-4 pt-3 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground">
                      Step {steps[activeStep]?.number}
                    </span>
                    <span className={cn('text-xs font-medium', steps[activeStep]?.textColor)}>
                      {steps[activeStep]?.title}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        'h-full rounded-full',
                        `bg-gradient-to-r ${steps[activeStep]?.color}`,
                      )}
                      animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Mock Content */}
                <div className="px-4 pb-4 min-h-[240px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepMockUI
                        step={steps[activeStep]!}
                        isActive={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Phone Bottom Bar */}
                <div className="h-6 bg-foreground/5 flex items-center justify-center">
                  <div className="w-20 h-1 bg-foreground/20 rounded-full" aria-hidden="true" />
                </div>
              </div>

              {/* Step Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === activeStep
                        ? 'w-8 h-2 bg-primary'
                        : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50',
                    )}
                    aria-label={`Step ${i + 1}`}
                    aria-current={i === activeStep ? 'step' : undefined}
                  />
                ))}
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className={cn(
                  'absolute -left-12 top-1/4',
                  'bg-card border border-border rounded-2xl',
                  'p-3 shadow-lg',
                  'flex items-center gap-2',
                )}
              >
                <span className="text-lg" aria-hidden="true">⚡</span>
                <div>
                  <p className="text-[10px] font-bold text-foreground">Super Fast</p>
                  <p className="text-[10px] text-muted-foreground">30 min avg</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className={cn(
                  'absolute -right-12 bottom-1/4',
                  'bg-card border border-border rounded-2xl',
                  'p-3 shadow-lg',
                )}
              >
                <p className="text-[10px] font-bold text-foreground">50K+ Orders</p>
                <p className="text-[10px] text-muted-foreground">Delivered ✅</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;