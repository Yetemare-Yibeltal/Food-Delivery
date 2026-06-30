'use client';

import * as React from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareHeart } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';

// ─── Testimonials Data ────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: 'Bethelhem Tesfaye',
    nameAm: 'ቤተልሄም ተስፋዬ',
    role: 'Marketing Manager',
    roleAm: 'የግብይት ስራ አስኪያጅ',
    city: 'Addis Ababa',
    rating: 5,
    review:
      'Yene Delivery has completely changed how I order food for my office. The app is fast, easy to use, and my orders always arrive hot and on time. The Telebirr payment option is so convenient!',
    reviewAm:
      'የኔ ዴሊቨሪ ለቢሮዬ ምግብ የማዘዝ ሁኔታዬን ሙሉ በሙሉ ቀይሮታል። መተግበሪያው ፈጣን እና ቀላል ነው።',
    avatar: null,
    orderCount: 87,
    favouriteFood: 'Special Tibs',
  },
  {
    id: 2,
    name: 'Dawit Mekonnen',
    nameAm: 'ዳዊት መኮንን',
    role: 'Software Engineer',
    roleAm: 'ሶፍትዌር ኢንጂነር',
    city: 'Adama',
    rating: 5,
    review:
      'Living in Adama, I never thought we would get such fast delivery service. Yene Delivery brought my favorite Habesha restaurant right to my doorstep in just 25 minutes!',
    reviewAm:
      'በአዳማ ስኖር፣ እንዲህ ያለ ፈጣን አገልግሎት እንደምናገኝ አስቤ አላውቅም። የኔ ዴሊቨሪ ምግቤን በ25 ደቂቃ አደረሰልኝ።',
    avatar: null,
    orderCount: 64,
    favouriteFood: 'Shiro Wot',
  },
  {
    id: 3,
    name: 'Hiwot Alemu',
    nameAm: 'ህይወት አለሙ',
    role: 'University Student',
    roleAm: 'ዩኒቨርሲቲ ተማሪ',
    city: 'Hawassa',
    rating: 5,
    review:
      'As a student, I love how affordable and reliable Yene Delivery is. I can track my order in real-time and the customer support is always there when I need help. Highly recommend!',
    reviewAm:
      'እንደ ተማሪ የኔ ዴሊቨሪ ምን ያህል ተመጣጣኝ እና አስተማማኝ እንደሆነ እወዳለሁ።',
    avatar: null,
    orderCount: 132,
    favouriteFood: 'Fish Tibs',
  },
  {
    id: 4,
    name: 'Yonas Girma',
    nameAm: 'ዮናስ ግርማ',
    role: 'Business Owner',
    roleAm: 'የንግድ ባለቤት',
    city: 'Dire Dawa',
    rating: 4,
    review:
      'I order from Yene Delivery almost every day for my business meetings. The multiple payment options including Chapa make it so easy to expense everything properly.',
    reviewAm:
      'ለንግድ ስብሰባዎቼ ከኔ ዴሊቨሪ ብዙ ጊዜ አዝዛለሁ። የቻፓ ክፍያ አማራጭ በጣም ጠቃሚ ነው።',
    avatar: null,
    orderCount: 215,
    favouriteFood: 'Maraq',
  },
  {
    id: 5,
    name: 'Selamawit Bekele',
    nameAm: 'ሰላማዊት በቀለ',
    role: 'Nurse',
    roleAm: 'ነርስ',
    city: 'Bahir Dar',
    rating: 5,
    review:
      'After long hospital shifts, ordering food through Yene Delivery is a lifesaver. The riders are always polite and the food quality is consistently excellent.',
    reviewAm:
      'ከረዥም የሆስፒታል ፈረቃ በኋላ በየኔ ዴሊቨሪ ምግብ ማዘዝ ለእኔ ትልቅ እርዳታ ነው።',
    avatar: null,
    orderCount: 98,
    favouriteFood: 'Tihlo',
  },
  {
    id: 6,
    name: 'Abel Tadesse',
    nameAm: 'አቤል ታደሰ',
    role: 'Coffee Shop Owner',
    roleAm: 'የቡና ቤት ባለቤት',
    city: 'Jimma',
    rating: 5,
    review:
      'Partnering with Yene Delivery as a restaurant owner has grown my business significantly. The dashboard is easy to use and payouts are always on time.',
    reviewAm:
      'ከየኔ ዴሊቨሪ ጋር በመተባበር የንግድ ስራዬ በከፍተኛ ሁኔታ አድጓል።',
    avatar: null,
    orderCount: 0,
    favouriteFood: 'Macchiato',
    isPartner: true,
  },
];

// ─── Stats Data ───────────────────────────────────────────────────────────────
const overallStats = [
  { value: '4.9', label: 'Average Rating', icon: '⭐' },
  { value: '50K+', label: 'Happy Customers', icon: '😊' },
  { value: '98%', label: 'Satisfaction Rate', icon: '💯' },
  { value: '200K+', label: 'Reviews', icon: '💬' },
];

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({
  testimonial,
}: {
  testimonial: typeof testimonials[0];
}): React.JSX.Element => {
  return (
    <div
      className={cn(
        'relative h-full',
        'p-6 sm:p-8 rounded-3xl',
        'bg-card border border-border',
        'shadow-xl',
        'flex flex-col gap-5',
      )}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10" aria-hidden="true">
        <Quote className="w-16 h-16 text-primary" fill="currentColor" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < testimonial.rating
                ? 'fill-accent text-accent'
                : 'text-muted-foreground/20',
            )}
            aria-hidden="true"
          />
        ))}
        {testimonial.isPartner && (
          <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
            Restaurant Partner
          </span>
        )}
      </div>

      {/* Review Text */}
      <div className="flex-1 space-y-2">
        <p className="text-foreground text-base leading-relaxed">
          &ldquo;{testimonial.review}&rdquo;
        </p>
        <p className="text-muted-foreground text-sm font-amharic leading-relaxed">
          {testimonial.reviewAm}
        </p>
      </div>

      {/* Order info */}
      {!testimonial.isPartner && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
          <span className="flex items-center gap-1">
            📦 {testimonial.orderCount} orders
          </span>
          <span className="flex items-center gap-1">
            ❤️ Loves {testimonial.favouriteFood}
          </span>
        </div>
      )}

      {/* User Info */}
      <div className="flex items-center gap-3 pt-2">
        <Avatar
          name={testimonial.name}
          size="lg"
          shape="circle"
        />
        <div>
          <p className="font-bold text-foreground text-sm">
            {testimonial.name}
          </p>
          <p className="text-xs font-amharic text-muted-foreground">
            {testimonial.nameAm}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role} • {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Testimonials Section Component ───────────────────────────────────────────
export const TestimonialsSection = (): React.JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(1);

  // Determine how many cards to show based on screen size
  const [cardsPerView, setCardsPerView] = React.useState(3);

  React.useEffect(() => {
    const updateCardsPerView = (): void => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1280) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  React.useEffect(() => {
    if (isInView) {
      void controls.start('visible');
    }
  }, [isInView, controls]);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const goToNext = React.useCallback((): void => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = (): void => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play carousel
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerView,
  );

  return (
    <section
      ref={ref}
      className="section bg-background relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
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
          className="text-center mb-12 space-y-4"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              <MessageSquareHeart className="w-4 h-4" aria-hidden="true" />
              Loved by Ethiopians
            </span>
          </div>
          <div className="space-y-2">
            <h2
              id="testimonials-heading"
              className="font-heading font-black text-foreground"
            >
              What Our{' '}
              <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="font-amharic text-muted-foreground text-lg">
              ደንበኞቻችን ምን ይላሉ
            </p>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real customers across Ethiopia who trust Yene
            Delivery for their everyday food needs.
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {overallStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-muted/50 border border-border"
            >
              <span className="text-2xl" aria-hidden="true">{stat.icon}</span>
              <span className="text-2xl font-black gradient-text">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons - Desktop */}
          <button
            type="button"
            onClick={goToPrev}
            className={cn(
              'hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20',
              'w-12 h-12 rounded-full',
              'bg-card border border-border shadow-lg',
              'items-center justify-center',
              'text-foreground hover:text-primary hover:border-primary/30',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            )}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className={cn(
              'hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20',
              'w-12 h-12 rounded-full',
              'bg-card border border-border shadow-lg',
              'items-center justify-center',
              'text-foreground hover:text-primary hover:border-primary/30',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            )}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={cn(
                  'grid gap-6',
                  cardsPerView === 1 && 'grid-cols-1',
                  cardsPerView === 2 && 'grid-cols-2',
                  cardsPerView === 3 && 'grid-cols-3',
                )}
              >
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={goToPrev}
              className={cn(
                'w-10 h-10 rounded-full',
                'bg-card border border-border',
                'flex items-center justify-center',
                'text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className={cn(
                'w-10 h-10 rounded-full',
                'bg-card border border-border',
                'flex items-center justify-center',
                'text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === currentIndex
                    ? 'w-8 h-2 bg-primary'
                    : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50',
                )}
                aria-label={`Go to testimonial group ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;