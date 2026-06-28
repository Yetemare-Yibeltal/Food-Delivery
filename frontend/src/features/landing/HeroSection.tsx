'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, ArrowRight, Star, Clock, Shield } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Sphere, Box, Torus } from '@react-three/drei';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import {
  containerVariants,
  itemVariants,
  fadeUpVariants,
  floatVariants,
} from '@/lib/animations/variants';

// ─── 3D Food Scene ────────────────────────────────────────────────────────────
const FoodScene = (): React.JSX.Element => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E85D04" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#F48C06" />

      {/* Main floating plate */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 0, 0]}>
          {/* Plate base */}
          <Torus
            args={[1.2, 0.1, 16, 100]}
            position={[0, -0.1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.2} />
          </Torus>

          {/* Food on plate */}
          <Sphere args={[0.4, 32, 32]} position={[-0.3, 0.2, 0]}>
            <meshStandardMaterial color="#E85D04" metalness={0.1} roughness={0.8} />
          </Sphere>
          <Sphere args={[0.3, 32, 32]} position={[0.4, 0.15, 0.2]}>
            <meshStandardMaterial color="#F48C06" metalness={0.1} roughness={0.8} />
          </Sphere>
          <Sphere args={[0.25, 32, 32]} position={[0, 0.1, -0.4]}>
            <meshStandardMaterial color="#22c55e" metalness={0.1} roughness={0.8} />
          </Sphere>
        </group>
      </Float>

      {/* Floating burger box */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Box args={[0.6, 0.4, 0.6]} position={[2, 0.5, -1]}>
          <meshStandardMaterial color="#E85D04" metalness={0.2} roughness={0.6} />
        </Box>
      </Float>

      {/* Floating drink cup */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={2}>
        <group position={[-2, -0.3, -0.5]}>
          <Box args={[0.3, 0.8, 0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
          </Box>
          <Sphere args={[0.18, 16, 16]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#60a5fa" metalness={0.2} roughness={0.3} />
          </Sphere>
        </group>
      </Float>

      {/* Small floating spheres */}
      <Float speed={3} rotationIntensity={1} floatIntensity={0.8}>
        <Sphere args={[0.15, 16, 16]} position={[1.5, 1.5, 0.5]}>
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.3} emissive="#f59e0b" emissiveIntensity={0.2} />
        </Sphere>
      </Float>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere args={[0.12, 16, 16]} position={[-1.8, 1.2, 0.3]}>
          <meshStandardMaterial color="#22c55e" metalness={0.4} roughness={0.3} emissive="#22c55e" emissiveIntensity={0.2} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.5}>
        <Sphere args={[0.1, 16, 16]} position={[0.8, -1.2, 1]}>
          <meshStandardMaterial color="#E85D04" metalness={0.4} roughness={0.3} emissive="#E85D04" emissiveIntensity={0.3} />
        </Sphere>
      </Float>

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

// ─── Stats Data ───────────────────────────────────────────────────────────────
const stats = [
  { label: 'Restaurants', labelAm: 'ምግብ ቤቶች', value: '500+', icon: '🍽️' },
  { label: 'Happy Customers', labelAm: 'ደስተኛ ደንበኞች', value: '50K+', icon: '😊' },
  { label: 'Cities Covered', labelAm: 'የሚሸፈኑ ከተሞች', value: '6', icon: '🏙️' },
  { label: 'Orders Delivered', labelAm: 'የተላኩ ትዕዛዞች', value: '200K+', icon: '🛵' },
];

// ─── Features Badges ──────────────────────────────────────────────────────────
const features = [
  { icon: Clock, label: '30 min delivery', labelAm: '30 ደቂቃ ዴሊቨሪ', color: 'text-primary' },
  { icon: Star, label: 'Top rated', labelAm: 'ከፍተኛ ደረጃ', color: 'text-accent' },
  { icon: Shield, label: 'Safe & secure', labelAm: 'ደህንነቱ የተጠበቀ', color: 'text-secondary' },
];

// ─── Ethiopian Food Categories ────────────────────────────────────────────────
const foodCategories = [
  { emoji: '🍲', label: 'Injera', labelAm: 'እንጀራ' },
  { emoji: '🥩', label: 'Tibs', labelAm: 'ጥብስ' },
  { emoji: '🫓', label: 'Firfir', labelAm: 'ፍርፍር' },
  { emoji: '🍛', label: 'Shiro', labelAm: 'ሽሮ' },
  { emoji: '🧆', label: 'Falafel', labelAm: 'ፍላፌል' },
  { emoji: '🍕', label: 'Pizza', labelAm: 'ፒዛ' },
  { emoji: '🍔', label: 'Burger', labelAm: 'በርገር' },
  { emoji: '☕', label: 'Coffee', labelAm: 'ቡና' },
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
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* ─── Background Effects ─────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

        {/* Ethiopian pattern overlay */}
        <div className="absolute inset-0 ethiopian-pattern opacity-30" />

        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(232,93,4,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,4,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container-custom relative z-10 py-20 lg:py-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen lg:py-20">
          {/* ─── Left Content ──────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:gap-8"
          >
            {/* Top Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="default"
                size="md"
                dot
                dotColor="bg-success"
                animate
                className="w-fit"
              >
                🚀 Now delivering in 6 Ethiopian cities
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="font-heading font-black leading-tight">
                <motion.span
                  custom={0}
                  variants={itemVariants}
                  className="block text-foreground"
                >
                  Delicious Food
                </motion.span>
                <motion.span
                  custom={1}
                  variants={itemVariants}
                  className="block gradient-text"
                >
                  Delivered Fast
                </motion.span>
                <motion.span
                  custom={2}
                  variants={itemVariants}
                  className="block text-foreground"
                >
                  Across Ethiopia
                </motion.span>
              </h1>
              <p className="font-amharic text-muted-foreground text-lg">
                በኢትዮጵያ ውስጥ ፈጣን ዴሊቨሪ
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              Order from hundreds of restaurants in Addis Ababa, Adama, Hawassa,
              Dire Dawa, Bahir Dar and Jimma. Fresh food delivered to your door
              in 30 minutes or less.
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm font-medium"
                  >
                    <Icon className={cn('w-4 h-4', feature.color)} aria-hidden="true" />
                    <span className="text-foreground">{feature.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants}>
              <form
                onSubmit={handleSearch}
                className={cn(
                  'flex flex-col sm:flex-row gap-3',
                  'p-2 rounded-2xl',
                  'bg-card border border-border',
                  'shadow-lg',
                )}
                role="search"
                aria-label="Search for restaurants"
              >
                {/* City Selector */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted sm:w-48 shrink-0">
                  <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-sm font-medium text-foreground outline-none w-full cursor-pointer"
                    aria-label="Select city"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Input */}
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search restaurants, cuisines..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
                    aria-label="Search restaurants"
                  />
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  className="shrink-0"
                >
                  Search
                </Button>
              </form>
            </motion.div>

            {/* Food Categories */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Popular Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {foodCategories.map((category) => (
                  <motion.button
                    key={category.label}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-xl',
                      'bg-muted hover:bg-primary/10 hover:text-primary',
                      'text-sm font-medium text-foreground',
                      'transition-colors duration-200',
                      'border border-transparent hover:border-primary/20',
                    )}
                    onClick={() => {
                      window.location.href = `/restaurants?category=${category.label.toLowerCase()}`;
                    }}
                  >
                    <span aria-hidden="true">{category.emoji}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden="true">{stat.icon}</span>
                    <span className="text-xl font-black text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right 3D Scene ────────────────────────────────────────── */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="relative h-[400px] lg:h-[600px]"
            aria-hidden="true"
          >
            {/* 3D Canvas */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                <FoodScene />
              </Canvas>
            </div>

            {/* Floating Info Cards */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className={cn(
                'absolute top-8 -left-4 lg:-left-8',
                'bg-card border border-border rounded-2xl',
                'p-3 shadow-lg',
                'flex items-center gap-3',
                'z-10',
              )}
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
              variants={floatVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: '1s' }}
              className={cn(
                'absolute bottom-16 -right-4 lg:-right-8',
                'bg-card border border-border rounded-2xl',
                'p-3 shadow-lg',
                'flex items-center gap-3',
                'z-10',
              )}
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
              variants={floatVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: '0.5s' }}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-8',
                'bg-card border border-border rounded-2xl',
                'p-3 shadow-lg',
                'z-10',
              )}
            >
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3 h-3 fill-accent text-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-foreground">4.9 Rating</p>
              <p className="text-xs text-muted-foreground">2,341 reviews</p>
            </motion.div>

            {/* Glow effect behind canvas */}
            <div
              className="absolute inset-8 bg-primary/5 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Scroll Indicator ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;