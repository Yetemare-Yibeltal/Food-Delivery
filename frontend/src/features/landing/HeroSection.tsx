'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, ArrowRight, Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { containerVariants, itemVariants, floatVariants } from '@/lib/animations/variants';

// ─── Floating Food Item ───────────────────────────────────────────────────────
interface FloatingFoodProps {
  emoji: string;
  className: string;
  delay?: number;
  duration?: number;
}

const FloatingFood = ({ emoji, className, delay = 0, duration = 3 }: FloatingFoodProps): React.JSX.Element => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={cn('absolute text-5xl filter drop-shadow-xl select-none pointer-events-none', className)}
    aria-hidden="true"
  >
    {emoji}
  </motion.div>
);

// ─── 3D-Like Hero Visual ──────────────────────────────────────────────────────
const HeroVisual = (): React.JSX.Element => (
  <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
    {/* Main plate */}
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute w-80 h-80 rounded-full border-4 border-dashed border-primary/20"
      aria-hidden="true"
    />
    <motion.div
      animate={{ rotate: [360, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      className="absolute w-56 h-56 rounded-full border-4 border-dashed border-secondary/20"
      aria-hidden="true"
    />

    {/* Center plate */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shadow-2xl shadow-primary/40"
    >
      <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center">
        <span className="text-7xl filter drop-shadow-lg" aria-hidden="true">🍽️</span>
      </div>
    </motion.div>

    {/* Floating food items */}
    <FloatingFood emoji="🍔" className="top-8 left-8 lg:left-16" delay={0} duration={3} />
    <FloatingFood emoji="🍕" className="top-8 right-8 lg:right-16" delay={0.5} duration={3.5} />
    <FloatingFood emoji="🥩" className="top-1/2 -translate-y-1/2 left-0 lg:left-4" delay={1} duration={4} />
    <FloatingFood emoji="☕" className="top-1/2 -translate-y-1/2 right-0 lg:right-4" delay={1.5} duration={3.2} />
    <FloatingFood emoji="🫓" className="bottom-8 left-16 lg:left-24" delay={0.8} duration={3.8} />
    <FloatingFood emoji="🍲" className="bottom-8 right-16 lg:right-24" delay={0.3} duration={4.2} />
    <FloatingFood emoji="🥗" className="top-16 left-1/2 -translate-x-1/2" delay={1.2} duration={3.6} />

    {/* Floating Info Cards */}
    <motion.div
      variants={floatVariants}
      initial="initial"
      animate="animate"
      className="absolute top-12 -left-4 lg:-left-8 bg-card border border-border rounded-2xl p-3 shadow-lg flex items-center gap-3 z-20"
    >
      <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
        <span className="text-xl" aria-hidden="true">✅</span>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">Order Confirmed!</p>
        <p className="text-xs text-muted-foreground">Arriving in 25 min</p>
      </div>
    </motion.div>

    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      className="absolute bottom-16 -right-4 lg:-right-8 bg-card border border-border rounded-2xl p-3 shadow-lg flex items-center gap-3 z-20"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-xl" aria-hidden="true">🛵</span>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">Rider on the way</p>
        <p className="text-xs text-muted-foreground">2.3 km away</p>
      </div>
    </motion.div>

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-8 bg-card border border-border rounded-2xl p-3 shadow-lg z-20"
    >
      <div className="flex items-center gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-3 h-3 fill-accent text-accent" aria-hidden="true" />
        ))}
      </div>
      <p className="text-xs font-semibold text-foreground">4.9 Rating</p>
      <p className="text-xs text-muted-foreground">2,341 reviews</p>
    </motion.div>

    {/* Glow */}
    <div className="absolute inset-16 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
  </div>
);

// ─── Stats Data ───────────────────────────────────────────────────────────────
const stats = [
  { label: 'Restaurants', value: '500+', icon: '🍽️' },
  { label: 'Happy Customers', value: '50K+', icon: '😊' },
  { label: 'Cities Covered', value: '6', icon: '🏙️' },
  { label: 'Orders Delivered', value: '200K+', icon: '🛵' },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: Clock, label: '30 min delivery', color: 'text-primary' },
  { icon: Star, label: 'Top rated', color: 'text-accent' },
  { icon: Shield, label: 'Safe & secure', color: 'text-secondary' },
];

// ─── Food Categories ──────────────────────────────────────────────────────────
const foodCategories = [
  { emoji: '🍲', label: 'Injera' },
  { emoji: '🥩', label: 'Tibs' },
  { emoji: '🫓', label: 'Firfir' },
  { emoji: '🍛', label: 'Shiro' },
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '🍔', label: 'Burger' },
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🥗', label: 'Salad' },
];

// ─── Hero Section Component ───────────────────────────────────────────────────
export const HeroSection = (): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('Addis Ababa');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const cities = ['Addis Ababa', 'Adama', 'Hawassa', 'Dire Dawa', 'Bahir Dar', 'Jimma'];

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/restaurants?search=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedCity)}`;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background" aria-label="Hero section">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 ethiopian-pattern opacity-30" />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(232,93,4,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,4,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <motion.div style={{ y, opacity }} className="container-custom relative z-10 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen lg:py-20">

          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6 lg:gap-8">
            <motion.div variants={itemVariants}>
              <Badge variant="default" size="md" dot dotColor="bg-success" animate className="w-fit">
                🚀 Now delivering in 6 Ethiopian cities
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="font-heading font-black leading-tight">
                <span className="block text-foreground">Delicious Food</span>
                <span className="block gradient-text">Delivered Fast</span>
                <span className="block text-foreground">Across Ethiopia</span>
              </h1>
              <p className="font-amharic text-muted-foreground text-lg">በኢትዮጵያ ውስጥ ፈጣን ዴሊቨሪ</p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Order from hundreds of restaurants in Addis Ababa, Adama, Hawassa, Dire Dawa, Bahir Dar and Jimma. Fresh food delivered to your door in 30 minutes or less.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm font-medium">
                    <Icon className={cn('w-4 h-4', feature.color)} aria-hidden="true" />
                    <span className="text-foreground">{feature.label}</span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants}>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-card border border-border shadow-lg" role="search" aria-label="Search for restaurants">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted sm:w-48 shrink-0">
                  <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-transparent text-sm font-medium text-foreground outline-none w-full cursor-pointer" aria-label="Select city">
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search restaurants, cuisines..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2" aria-label="Search restaurants" />
                </div>
                <Button type="submit" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />} className="shrink-0">
                  Search
                </Button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Popular Categories</p>
              <div className="flex flex-wrap gap-2">
                {foodCategories.map((category) => (
                  <motion.button
                    key={category.label}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary text-sm font-medium text-foreground transition-colors duration-200 border border-transparent hover:border-primary/20"
                    onClick={() => { window.location.href = `/restaurants?category=${category.label.toLowerCase()}`; }}
                  >
                    <span aria-hidden="true">{category.emoji}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden="true">{stat.icon}</span>
                    <span className="text-xl font-black text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;