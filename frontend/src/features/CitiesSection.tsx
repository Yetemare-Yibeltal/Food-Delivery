'use client';

import * as React from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { MapPin, Store, Clock, ChevronRight, Bike } from 'lucide-react';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants } from '@/lib/animations/variants';
import { ETHIOPIAN_CITIES } from '@yene/shared';

// ─── City Extra Data ──────────────────────────────────────────────────────────
const cityExtraData: Record
  string,
  {
    emoji: string;
    image: string;
    restaurantCount: number;
    avgDeliveryTime: number;
    riderCount: number;
    popularFood: string;
    popularFoodAm: string;
    gradient: string;
    bgGradient: string;
    description: string;
    descriptionAm: string;
  }
> = {
  addis_ababa: {
    emoji: '🏙️',
    image: '/images/cities/addis-ababa.jpg',
    restaurantCount: 350,
    avgDeliveryTime: 25,
    riderCount: 600,
    popularFood: 'Injera & Tibs',
    popularFoodAm: 'እንጀራ እና ጥብስ',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/20 to-amber-500/10',
    description: 'Our largest coverage area with hundreds of restaurants across all sub-cities.',
    descriptionAm: 'ሁሉም ክፍለ ከተሞችን የሚሸፍን ትልቅ አካባቢ።',
  },
  adama: {
    emoji: '🌿',
    image: '/images/cities/adama.jpg',
    restaurantCount: 85,
    avgDeliveryTime: 28,
    riderCount: 120,
    popularFood: 'Shiro & Firfir',
    popularFoodAm: 'ሽሮ እና ፍርፍር',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 to-emerald-500/10',
    description: 'Fast growing coverage in the heart of Oromia with diverse cuisine options.',
    descriptionAm: 'የኦሮሚያ ማእከል ውስጥ ፈጣን እድገት ያለው ሽፋን።',
  },
  hawassa: {
    emoji: '🌊',
    image: '/images/cities/hawassa.jpg',
    restaurantCount: 70,
    avgDeliveryTime: 30,
    riderCount: 95,
    popularFood: 'Fish & Injera',
    popularFoodAm: 'ዓሣ እና እንጀራ',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
    description: 'Lake city delivery with fresh local seafood and traditional Ethiopian meals.',
    descriptionAm: 'የሀይቅ ከተማ ዴሊቨሪ። ትኩስ ዓሣ እና ኢትዮጵያዊ ምግቦች።',
  },
  dire_dawa: {
    emoji: '🌵',
    image: '/images/cities/dire-dawa.jpg',
    restaurantCount: 60,
    avgDeliveryTime: 28,
    riderCount: 80,
    popularFood: 'Maraq & Coffee',
    popularFoodAm: 'ማርቅ እና ቡና',
    gradient: 'from-red-500 to-rose-500',
    bgGradient: 'from-red-500/20 to-rose-500/10',
    description: 'Eastern Ethiopian cuisine with unique Harari and Somali food influences.',
    descriptionAm: 'የምሥራቅ ኢትዮጵያ ምግቦች። ሐረሪ እና ሶማሌ ተፅዕኖ።',
  },
  bahir_dar: {
    emoji: '🦅',
    image: '/images/cities/bahir-dar.jpg',
    restaurantCount: 55,
    avgDeliveryTime: 32,
    riderCount: 75,
    popularFood: 'Tihlo & Tej',
    popularFoodAm: 'ጥህሎ እና ጠጅ',
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-500/20 to-violet-500/10',
    description: 'Beautiful lakeside city with Amhara traditional cuisine and scenic views.',
    descriptionAm: 'ቆንጆ የሀይቅ ዳርቻ ከተማ። የአማራ ምግቦች።',
  },
  jimma: {
    emoji: '☕',
    image: '/images/cities/jimma.jpg',
    restaurantCount: 45,
    avgDeliveryTime: 30,
    riderCount: 60,
    popularFood: 'Coffee & Kitfo',
    popularFoodAm: 'ቡና እና ክትፎ',
    gradient: 'from-amber-500 to-yellow-500',
    bgGradient: 'from-amber-500/20 to-yellow-500/10',
    description: 'Coffee capital of the world with rich Oromo culinary traditions.',
    descriptionAm: 'የዓለም የቡና ዋና ከተማ። የኦሮሞ ምግብ ባህል።',
  },
};

// ─── City Card Component ──────────────────────────────────────────────────────
interface CityCardProps {
  city: typeof ETHIOPIAN_CITIES[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const CityCard = ({
  city,
  index,
  isSelected,
  onClick,
}: CityCardProps): React.JSX.Element => {
  const extra = cityExtraData[city.id];
  if (!extra) return <div />;

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative group cursor-pointer',
        'rounded-2xl overflow-hidden',
        'border-2 transition-all duration-300',
        isSelected
          ? 'border-primary shadow-xl shadow-primary/20'
          : 'border-border shadow-card hover:border-primary/40 hover:shadow-lg',
      )}
    >
      {/* Card Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-50',
          extra.bgGradient,
        )}
        aria-hidden="true"
      />

      {/* Top Section */}
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-4">
          {/* City Icon & Name */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl',
                'bg-card shadow-md',
                'transition-transform duration-300 group-hover:scale-110',
              )}
            >
              {extra.emoji}
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base leading-tight">
                {city.name}
              </h3>
              <p className="text-muted-foreground text-xs font-amharic">
                {city.nameAm}
              </p>
            </div>
          </div>

          {/* Active Badge */}
          {city.isActive && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/10 border border-success/20">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-semibold text-success">Active</span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-card/60 backdrop-blur-sm">
            <Store className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-sm font-black text-foreground">{extra.restaurantCount}+</span>
            <span className="text-[9px] text-muted-foreground leading-tight text-center">Restaurants</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-card/60 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span className="text-sm font-black text-foreground">{extra.avgDeliveryTime}m</span>
            <span className="text-[9px] text-muted-foreground leading-tight text-center">Avg Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-card/60 backdrop-blur-sm">
            <Bike className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
            <span className="text-sm font-black text-foreground">{extra.riderCount}+</span>
            <span className="text-[9px] text-muted-foreground leading-tight text-center">Riders</span>
          </div>
        </div>

        {/* Popular Food */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-card/60 backdrop-blur-sm mb-3">
          <span className="text-base" aria-hidden="true">🍽️</span>
          <div>
            <p className="text-[10px] text-muted-foreground">Popular</p>
            <p className="text-xs font-semibold text-foreground">{extra.popularFood}</p>
          </div>
          <div className="ml-auto">
            <p className="text-[10px] font-amharic text-muted-foreground text-right">{extra.popularFoodAm}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          {extra.description}
        </p>

        {/* CTA Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/restaurants?city=${city.id}`;
          }}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'py-2.5 rounded-xl',
            'text-sm font-semibold',
            'transition-all duration-300',
            isSelected
              ? `bg-gradient-to-r ${extra.gradient} text-white shadow-md`
              : 'bg-card border border-border text-foreground hover:border-primary/30',
          )}
        >
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          Order in {city.name}
          <ChevronRight className="w-3.5 h-3.5 ml-auto" aria-hidden="true" />
        </motion.button>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          layoutId="selected-city"
          className={cn(
            'absolute bottom-0 left-0 right-0 h-1',
            `bg-gradient-to-r ${extra.gradient}`,
          )}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

// ─── Cities Section Component ─────────────────────────────────────────────────
export const CitiesSection = (): React.JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [selectedCity, setSelectedCity] = React.useState('addis_ababa');

  React.useEffect(() => {
    if (isInView) {
      void controls.start('visible');
    }
  }, [isInView, controls]);

  const selectedCityData = ETHIOPIAN_CITIES.find((c) => c.id === selectedCity);
  const selectedExtra = cityExtraData[selectedCity];

  const totalStats = React.useMemo(() => {
    return Object.values(cityExtraData).reduce(
      (acc, city) => ({
        restaurants: acc.restaurants + city.restaurantCount,
        riders: acc.riders + city.riderCount,
      }),
      { restaurants: 0, riders: 0 },
    );
  }, []);

  return (
    <section
      ref={ref}
      className="section bg-background relative overflow-hidden"
      aria-labelledby="cities-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(232,93,4,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,4,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
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
              transition: { duration: 0.6 },
            },
          }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              We Deliver Across Ethiopia
            </span>
          </div>
          <div className="space-y-2">
            <h2
              id="cities-heading"
              className="font-heading font-black text-foreground"
            >
              Now Serving{' '}
              <span className="gradient-text">6 Ethiopian Cities</span>
            </h2>
            <p className="font-amharic text-muted-foreground text-lg">
              6 የኢትዮጵያ ከተሞችን እናገለግላለን
            </p>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From the capital Addis Ababa to the coffee city Jimma — Yene
            Delivery brings your favorite food to your door across Ethiopia.
          </p>

          {/* Overall Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {[
              { value: '6', label: 'Cities', emoji: '🏙️' },
              { value: `${totalStats.restaurants}+`, label: 'Restaurants', emoji: '🍽️' },
              { value: `${totalStats.riders}+`, label: 'Riders', emoji: '🛵' },
              { value: '200K+', label: 'Orders', emoji: '📦' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border"
              >
                <span aria-hidden="true">{stat.emoji}</span>
                <span className="font-black text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ETHIOPIAN_CITIES.map((city, index) => (
            <CityCard
              key={city.id}
              city={city}
              index={index}
              isSelected={selectedCity === city.id}
              onClick={() => setSelectedCity(city.id)}
            />
          ))}
        </motion.div>

        {/* Selected City Detail Banner */}
        {selectedCityData && selectedExtra && (
          <motion.div
            key={selectedCity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              'mt-8 p-6 rounded-2xl',
              'bg-card border border-border',
              'shadow-lg',
              'flex flex-col sm:flex-row items-start sm:items-center gap-4',
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl',
                  'shadow-md shrink-0',
                  `bg-gradient-to-br ${selectedExtra.gradient}`,
                )}
              >
                {selectedExtra.emoji}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">
                  {selectedCityData.name}
                  <span className="font-amharic text-muted-foreground text-sm ml-2">
                    {selectedCityData.nameAm}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedExtra.description}
                </p>
                <p className="text-xs font-amharic text-muted-foreground mt-0.5">
                  {selectedExtra.descriptionAm}
                </p>
              </div>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.location.href = `/restaurants?city=${selectedCity}`;
              }}
              className={cn(
                'sm:ml-auto shrink-0',
                'flex items-center gap-2 px-6 py-3 rounded-xl',
                'text-sm font-semibold text-white',
                `bg-gradient-to-r ${selectedExtra.gradient}`,
                'shadow-md hover:shadow-lg transition-shadow duration-300',
              )}
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Explore {selectedCityData.name}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          </motion.div>
        )}

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.8 },
            },
          }}
          className={cn(
            'mt-6 p-4 rounded-xl',
            'bg-muted/50 border border-border border-dashed',
            'flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left',
          )}
        >
          <span className="text-2xl" aria-hidden="true">🚀</span>
          <div>
            <p className="font-semibold text-foreground text-sm">
              More cities coming soon!
            </p>
            <p className="text-xs text-muted-foreground">
              We are expanding to Mekelle, Gondar, Dessie, Nekemte and more
              Ethiopian cities in 2025.
            </p>
          </div>
          <button
            type="button"
            className="sm:ml-auto text-xs font-semibold text-primary hover:underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Get notified →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CitiesSection;