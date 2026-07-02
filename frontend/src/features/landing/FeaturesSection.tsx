'use client';

import * as React from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Zap,
  MapPin,
  CreditCard,
  Star,
  Shield,
  Clock,
  Smartphone,
  Headphones,
  ChefHat,
  Bike,
  Package,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Feature Data ─────────────────────────────────────────────────────────────
const features = [
  {
    id: 1,
    icon: Zap,
    emoji: '⚡',
    title: 'Lightning Fast Delivery',
    titleAm: 'ፈጣን ዴሊቨሪ',
    description:
      'Get your food delivered in 30 minutes or less. Our network of dedicated riders ensures your meal arrives hot and fresh every time.',
    descriptionAm:
      'ምግብዎን በ30 ደቂቃ ወይም ባነሰ ጊዜ ያቀርብልዎታል።',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500/20',
    stat: '30 min',
    statLabel: 'Average delivery',
  },
  {
    id: 2,
    icon: ChefHat,
    emoji: '🍽️',
    title: '500+ Restaurants',
    titleAm: '500+ ምግብ ቤቶች',
    description:
      'Choose from hundreds of restaurants offering Ethiopian cuisine, international dishes, fast food, coffee, and more across 6 cities.',
    descriptionAm:
      'ከ500 በላይ ምግብ ቤቶች ውስጥ ይምረጡ። ኢትዮጵያዊ ምግቦች፣ አለምአቀፍ ምግቦች፣ ቡና እና ሌሎችም።',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    borderColor: 'border-green-500/20',
    stat: '500+',
    statLabel: 'Restaurants',
  },
  {
    id: 3,
    icon: MapPin,
    emoji: '📍',
    title: 'Real-Time Tracking',
    titleAm: 'በቀጥታ ክትትል',
    description:
      'Track your order in real-time on a live map. Know exactly where your rider is and get accurate arrival time estimates.',
    descriptionAm:
      'ትዕዛዝዎን በቀጥታ ካርታ ላይ ይከታተሉ። ደላላው የት እንዳለ ይወቁ።',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500/20',
    stat: 'Live',
    statLabel: 'GPS tracking',
  },
  {
    id: 4,
    icon: CreditCard,
    emoji: '💳',
    title: 'Multiple Payments',
    titleAm: 'ብዙ የክፍያ መንገዶች',
    description:
      'Pay with Telebirr, Chapa, CBE Birr, or cash on delivery. Secure and convenient payment options for every Ethiopian.',
    descriptionAm:
      'በቴሌብር፣ ቻፓ፣ ሲቢኢ ብር ወይም ጥሬ ገንዘብ ይክፈሉ።',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500/20',
    stat: '4',
    statLabel: 'Payment methods',
  },
  {
    id: 5,
    icon: Shield,
    emoji: '🛡️',
    title: 'Safe & Secure',
    titleAm: 'ደህንነቱ የተጠበቀ',
    description:
      'Your data and payments are protected with bank-level security. Shop with confidence knowing your information is always safe.',
    descriptionAm:
      'መረጃዎ እና ክፍያዎ በባንክ ደረጃ ደህንነት የተጠበቀ ነው።',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/20',
    stat: '100%',
    statLabel: 'Secure',
  },
  {
    id: 6,
    icon: Star,
    emoji: '⭐',
    title: 'Top Rated Restaurants',
    titleAm: 'ከፍተኛ ደረጃ ምግብ ቤቶች',
    description:
      'Every restaurant on our platform is rated by real customers. Only the best make it to Yene Delivery — quality guaranteed.',
    descriptionAm:
      'በእውነተኛ ደንበኞች የተደረጃ ምግብ ቤቶች ብቻ። ጥራት ዋስትና።',
    color: 'from-yellow-500 to-amber-400',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500/20',
    stat: '4.8★',
    statLabel: 'Avg rating',
  },
  {
    id: 7,
    icon: Smartphone,
    emoji: '📱',
    title: 'Easy to Use App',
    titleAm: 'ቀላል መተግበሪያ',
    description:
      'Order in just a few taps. Our intuitive interface makes it easy to find your favorite food and place an order in seconds.',
    descriptionAm:
      'በጥቂት ጠቅታዎች ትዕዛዝ ይስጡ። ቀላልና ፈጣን።',
    color: 'from-pink-500 to-rose-400',
    bgColor: 'bg-pink-500/10',
    textColor: 'text-pink-500',
    borderColor: 'border-pink-500/20',
    stat: '4.9',
    statLabel: 'App rating',
  },
  {
    id: 8,
    icon: Headphones,
    emoji: '🎧',
    title: '24/7 Support',
    titleAm: '24/7 ድጋፍ',
    description:
      'Our customer support team is available around the clock. Have a question or issue? We are here to help anytime.',
    descriptionAm:
      'የደንበኛ ድጋፍ ቡድናችን ሁሌም ዝግጁ ነው። ጥያቄ ካለዎት እናግዝዎታለን።',
    color: 'from-teal-500 to-cyan-400',
    bgColor: 'bg-teal-500/10',
    textColor: 'text-teal-500',
    borderColor: 'border-teal-500/20',
    stat: '24/7',
    statLabel: 'Support',
  },
  {
    id: 9,
    icon: Bike,
    emoji: '🛵',
    title: 'Dedicated Riders',
    titleAm: 'ዕወቃ ደላሎች',
    description:
      'Our professional riders are trained to deliver your food safely and on time. Tracked, insured, and always on the move.',
    descriptionAm:
      'ሙያዊ ደላሎቻችን ምግብዎን ደህንነቱ በተጠበቀ ሁኔታ ያቀርባሉ።',
    color: 'from-indigo-500 to-blue-400',
    bgColor: 'bg-indigo-500/10',
    textColor: 'text-indigo-500',
    borderColor: 'border-indigo-500/20',
    stat: '1000+',
    statLabel: 'Active riders',
  },
  {
    id: 10,
    icon: Package,
    emoji: '📦',
    title: 'Fresh Packaging',
    titleAm: 'ትኩስ ማሸጊያ',
    description:
      'All orders are packaged with food-grade materials to keep your food fresh, hot, and hygienic from restaurant to your door.',
    descriptionAm:
      'ሁሉም ትዕዛዞች ምግብዎን ትኩስ እና ንፁህ ለማቆየት ይሸጋሉ።',
    color: 'from-lime-500 to-green-400',
    bgColor: 'bg-lime-500/10',
    textColor: 'text-lime-500',
    borderColor: 'border-lime-500/20',
    stat: '100%',
    statLabel: 'Food safe',
  },
  {
    id: 11,
    icon: Clock,
    emoji: '⏰',
    title: 'Schedule Orders',
    titleAm: 'ትዕዛዝ ጊዜ ይለጥፉ',
    description:
      'Plan ahead by scheduling your orders up to 7 days in advance. Perfect for office lunches, parties, and special occasions.',
    descriptionAm:
      'እስከ 7 ቀናት አስቀድሞ ትዕዛዝዎን ያቅዱ። ለቢሮ ምሳ፣ ድግስ ወይም ልዩ ዕለቶች።',
    color: 'from-orange-400 to-yellow-400',
    bgColor: 'bg-orange-400/10',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-400/20',
    stat: '7 days',
    statLabel: 'Advance order',
  },
  {
    id: 12,
    icon: Heart,
    emoji: '❤️',
    title: 'Favourites & Reorder',
    titleAm: 'ተወዳጆች እና እንደገና ትዕዛዝ',
    description:
      'Save your favorite restaurants and meals. Reorder your usual in one tap — we remember what you love.',
    descriptionAm:
      'ተወዳጅ ምግብ ቤቶችዎን እና ምግቦችዎን ያስቀምጡ። በአንድ ጠቅታ እንደገና ይዘዙ።',
    color: 'from-rose-500 to-pink-400',
    bgColor: 'bg-rose-500/10',
    textColor: 'text-rose-500',
    borderColor: 'border-rose-500/20',
    stat: '1-tap',
    statLabel: 'Reorder',
  },
];

// ─── Feature Card Component ───────────────────────────────────────────────────
interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps): React.JSX.Element => {
  const [isHovered, setIsHovered] = React.useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative group cursor-pointer',
        'rounded-2xl p-6',
        'bg-card border',
        'transition-all duration-300',
        'overflow-hidden',
        isHovered ? feature.borderColor : 'border-border',
        isHovered ? 'shadow-xl' : 'shadow-card',
      )}
    >
      {/* Background gradient on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'absolute inset-0 opacity-5',
          `bg-gradient-to-br ${feature.color}`,
        )}
        aria-hidden="true"
      />

      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.4 }}
        className={cn(
          'absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl',
          `bg-gradient-to-br ${feature.color}`,
        )}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Icon */}
        <div className="flex items-start justify-between">
          <motion.div
            animate={{
              rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
            className={cn(
              'w-14 h-14 rounded-2xl',
              'flex items-center justify-center',
              'transition-colors duration-300',
              feature.bgColor,
            )}
          >
            <Icon
              className={cn('w-7 h-7', feature.textColor)}
              aria-hidden="true"
            />
          </motion.div>

          {/* Stat Badge */}
          <div className={cn(
            'flex flex-col items-end',
          )}>
            <span className={cn(
              'text-lg font-black leading-none',
              feature.textColor,
            )}>
              {feature.stat}
            </span>
            <span className="text-xs text-muted-foreground">
              {feature.statLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className={cn(
            'text-base font-bold text-foreground',
            'transition-colors duration-300',
            isHovered && feature.textColor,
          )}>
            {feature.title}
          </h3>
          <p className="text-xs text-muted-foreground font-amharic mt-0.5">
            {feature.titleAm}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
          className={cn(
            'h-0.5 rounded-full',
            `bg-gradient-to-r ${feature.color}`,
          )}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
};

// ─── Features Section Component ───────────────────────────────────────────────
export const FeaturesSection = (): React.JSX.Element => {
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
      className="section bg-background relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(232,93,4,0.08) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
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
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          }}
          className="text-center mb-16 space-y-4"
        >
          {/* Badge */}
          <div className="flex justify-center">
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full',
              'bg-primary/10 text-primary text-sm font-medium',
              'border border-primary/20',
            )}>
              <Zap className="w-4 h-4" aria-hidden="true" />
              Why Choose Yene Delivery
            </span>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2
              id="features-heading"
              className="font-heading font-black text-foreground"
            >
              Everything You Need,{' '}
              <span className="gradient-text">All in One Place</span>
            </h2>
            <p className="font-amharic text-muted-foreground text-lg">
              ሁሉም የሚፈልጉት ነገር በአንድ ቦታ
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From lightning-fast delivery to real-time tracking and multiple
            payment options — Yene Delivery is built for Ethiopia, by Ethiopians.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.8, ease: 'easeOut' },
            },
          }}
          className="mt-16 text-center"
        >
          <div className={cn(
            'inline-flex flex-col sm:flex-row items-center gap-6',
            'px-8 py-6 rounded-2xl',
            'bg-card border border-border',
            'shadow-lg',
          )}>
            <div className="flex items-center gap-4">
              {[
                { emoji: '🚀', label: 'Fast Delivery' },
                { emoji: '🔒', label: 'Secure Payment' },
                { emoji: '⭐', label: 'Top Quality' },
                { emoji: '📱', label: 'Easy to Use' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" aria-hidden="true" />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground">
                Join 50,000+ happy customers
              </p>
              <p className="text-sm text-muted-foreground">
                Delivering across Ethiopia since 2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;