'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Percent, Gift, Zap } from 'lucide-react';
import { useFeaturedRestaurants } from '@/features/restaurant/restaurant.hooks';
import { RestaurantGrid } from '@/features/restaurant/RestaurantGrid';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Deal Card ────────────────────────────────────────────────────────────────
const DealCard = ({
  icon,
  title,
  description,
  code,
  discount,
  color,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  code: string;
  discount: string;
  color: string;
  index: number;
}): React.JSX.Element => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-2xl p-6 border ${color} space-y-4`}
    >
      {/* Background decoration */}
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 bg-current"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-2xl font-black">{discount}</p>
          <p className="text-xs opacity-70">OFF</p>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm opacity-70 leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 px-3 py-2 rounded-lg bg-white/10 font-mono text-sm font-bold tracking-wider">
          {code}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-semibold transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </motion.div>
  );
};

// ─── Deals Page ───────────────────────────────────────────────────────────────
export default function DealsPage(): React.JSX.Element {
  const { data, isLoading, isError } = useFeaturedRestaurants(undefined, 6);
  const restaurants = data?.data ?? [];

  const deals = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" aria-hidden="true" />,
      title: 'Flash Deal',
      description: 'Get 20% off your first order today only. Valid for new customers.',
      code: 'FIRST20',
      discount: '20%',
      color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    },
    {
      icon: <Gift className="w-6 h-6 text-primary" aria-hidden="true" />,
      title: 'Welcome Offer',
      description: 'New to Yene Delivery? Get 50 ETB off your first order over 200 ETB.',
      code: 'WELCOME50',
      discount: '50 ETB',
      color: 'border-primary/30 bg-primary/10 text-primary',
    },
    {
      icon: <Percent className="w-6 h-6 text-green-400" aria-hidden="true" />,
      title: 'Weekend Special',
      description: 'Enjoy 15% off all orders every Friday, Saturday and Sunday.',
      code: 'WEEKEND15',
      discount: '15%',
      color: 'border-green-500/30 bg-green-500/10 text-green-400',
    },
    {
      icon: <Tag className="w-6 h-6 text-purple-400" aria-hidden="true" />,
      title: 'Free Delivery',
      description: 'Free delivery on all orders above 300 ETB. No minimum order required.',
      code: 'FREEDEL',
      discount: 'FREE',
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-400" aria-hidden="true" />,
      title: 'Lunch Special',
      description: '10% off all orders placed between 11 AM and 2 PM on weekdays.',
      code: 'LUNCH10',
      discount: '10%',
      color: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
    },
    {
      icon: <Gift className="w-6 h-6 text-pink-400" aria-hidden="true" />,
      title: 'Refer a Friend',
      description: 'Refer a friend and both get 30 ETB off your next order.',
      code: 'REFER30',
      discount: '30 ETB',
      color: 'border-pink-500/30 bg-pink-500/10 text-pink-400',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <motion.h1 variants={itemVariants} className="heading-xl text-white">
          Deals & Offers 🎉
        </motion.h1>
        <motion.p variants={itemVariants} className="text-white/50 text-sm">
          Save more with our exclusive deals and promo codes
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="font-amharic text-white/30 text-xs"
        >
          ልዩ ቅናሾች እና ፕሮሞ ኮዶች
        </motion.p>
      </motion.div>

      {/* Promo Codes Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.h2 variants={itemVariants} className="text-lg font-bold text-white">
          Active Promo Codes
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, index) => (
            <DealCard key={deal.code} {...deal} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Featured Restaurants */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">
          Featured Restaurants
        </h2>
        <RestaurantGrid
          restaurants={restaurants}
          isLoading={isLoading}
          isError={isError}
          columns={3}
          skeletonCount={6}
        />
      </section>
    </div>
  );
}