'use client';

import * as React from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Heart,
  Bike,
  Tag,
  Store,
  Filter,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RestaurantCardSkeleton } from '@/components/ui/Skeleton';
import { containerVariants, itemVariants } from '@/lib/animations/variants';

// ─── Restaurant Data ──────────────────────────────────────────────────────────
const restaurants = [
  {
    id: '1',
    name: 'Yod Abyssinia',
    nameAm: 'ዮድ አቢሲኒያ',
    slug: 'yod-abyssinia',
    cuisine: ['Ethiopian', 'Traditional'],
    cuisineAm: ['ኢትዮጵያዊ', 'ባህላዊ'],
    rating: 4.9,
    totalRatings: 2341,
    deliveryTime: 25,
    deliveryFee: 30,
    minOrder: 150,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: true,
    discount: 20,
    tags: ['Popular', 'Ethiopian'],
    popularItem: 'Special Tibs',
    popularItemAm: 'ልዩ ጥብስ',
    popularItemPrice: 180,
    emoji: '🍲',
    gradient: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    description: 'Authentic Ethiopian cuisine with live cultural shows',
  },
  {
    id: '2',
    name: 'Kategna Restaurant',
    nameAm: 'ካቴኛ ሬስቶራንት',
    slug: 'kategna-restaurant',
    cuisine: ['Ethiopian', 'Vegetarian'],
    cuisineAm: ['ኢትዮጵያዊ', 'አትክልት'],
    rating: 4.8,
    totalRatings: 1876,
    deliveryTime: 20,
    deliveryFee: 25,
    minOrder: 100,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: true,
    discount: 0,
    tags: ['Top Rated', 'Vegetarian'],
    popularItem: 'Beyaynetu',
    popularItemAm: 'በያይነቱ',
    popularItemPrice: 120,
    emoji: '🫓',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    description: 'Best fasting food and traditional Ethiopian platters',
  },
  {
    id: '3',
    name: 'Burger House Ethiopia',
    nameAm: 'በርገር ሃውስ ኢትዮጵያ',
    slug: 'burger-house-ethiopia',
    cuisine: ['Burgers', 'Fast Food'],
    cuisineAm: ['በርገር', 'ፈጣን ምግብ'],
    rating: 4.7,
    totalRatings: 1234,
    deliveryTime: 30,
    deliveryFee: 35,
    minOrder: 80,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: false,
    discount: 15,
    tags: ['Fast Food', 'Popular'],
    popularItem: 'Double Smash Burger',
    popularItemAm: 'ድርብ ስማሽ በርገር',
    popularItemPrice: 220,
    emoji: '🍔',
    gradient: 'from-yellow-500 to-amber-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    description: 'Juicy handcrafted burgers made with fresh local ingredients',
  },
  {
    id: '4',
    name: 'Pizza Roma Addis',
    nameAm: 'ፒዛ ሮማ አዲስ',
    slug: 'pizza-roma-addis',
    cuisine: ['Pizza', 'Italian'],
    cuisineAm: ['ፒዛ', 'ጣሊያናዊ'],
    rating: 4.6,
    totalRatings: 987,
    deliveryTime: 35,
    deliveryFee: 40,
    minOrder: 120,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: false,
    discount: 0,
    tags: ['Italian', 'Pizza'],
    popularItem: 'Margherita Pizza',
    popularItemAm: 'ማርጌሪታ ፒዛ',
    popularItemPrice: 280,
    emoji: '🍕',
    gradient: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    description: 'Authentic Italian pizza baked in a wood-fired oven',
  },
  {
    id: '5',
    name: 'Habesha Cultural',
    nameAm: 'ሐበሻ ባህላዊ',
    slug: 'habesha-cultural',
    cuisine: ['Ethiopian', 'Cultural'],
    cuisineAm: ['ኢትዮጵያዊ', 'ባህላዊ'],
    rating: 4.8,
    totalRatings: 1567,
    deliveryTime: 28,
    deliveryFee: 30,
    minOrder: 130,
    city: 'Addis Ababa',
    isOpen: false,
    isFeatured: true,
    discount: 10,
    tags: ['Ethiopian', 'Cultural'],
    popularItem: 'Kitfo Special',
    popularItemAm: 'ልዩ ክትፎ',
    popularItemPrice: 200,
    emoji: '🥩',
    gradient: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    description: 'Traditional Ethiopian food with authentic cultural experience',
  },
  {
    id: '6',
    name: 'Mekelenya Coffee',
    nameAm: 'መቀለኛ ቡና',
    slug: 'mekelenya-coffee',
    cuisine: ['Coffee', 'Bakery'],
    cuisineAm: ['ቡና', 'ዳቦ ቤት'],
    rating: 4.9,
    totalRatings: 3210,
    deliveryTime: 15,
    deliveryFee: 20,
    minOrder: 50,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: true,
    discount: 0,
    tags: ['Coffee', 'Bakery', 'Fast'],
    popularItem: 'Ethiopian Coffee Ceremony',
    popularItemAm: 'የቡና ሥነ ሥርዓት',
    popularItemPrice: 85,
    emoji: '☕',
    gradient: 'from-amber-600 to-yellow-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    description: 'Premium Ethiopian coffee and fresh baked goods all day',
  },
  {
    id: '7',
    name: 'Sushi Addis',
    nameAm: 'ሱሺ አዲስ',
    slug: 'sushi-addis',
    cuisine: ['Japanese', 'Sushi'],
    cuisineAm: ['ጃፓናዊ', 'ሱሺ'],
    rating: 4.5,
    totalRatings: 654,
    deliveryTime: 40,
    deliveryFee: 50,
    minOrder: 200,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: false,
    discount: 25,
    tags: ['Japanese', 'Sushi'],
    popularItem: 'Salmon Roll',
    popularItemAm: 'ሳልሞን ሮል',
    popularItemPrice: 350,
    emoji: '🍱',
    gradient: 'from-pink-500 to-rose-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    description: 'Fresh Japanese sushi and Asian cuisine in the heart of Addis',
  },
  {
    id: '8',
    name: 'Firfir House',
    nameAm: 'ፍርፍር ቤት',
    slug: 'firfir-house',
    cuisine: ['Ethiopian', 'Breakfast'],
    cuisineAm: ['ኢትዮጵያዊ', 'ቁርስ'],
    rating: 4.7,
    totalRatings: 1123,
    deliveryTime: 22,
    deliveryFee: 25,
    minOrder: 70,
    city: 'Addis Ababa',
    isOpen: true,
    isFeatured: false,
    discount: 0,
    tags: ['Breakfast', 'Ethiopian'],
    popularItem: 'Special Firfir',
    popularItemAm: 'ልዩ ፍርፍር',
    popularItemPrice: 95,
    emoji: '🫓',
    gradient: 'from-teal-500 to-cyan-400',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    description: 'Best breakfast in town — firfir, ful, and Ethiopian favorites',
  },
];

// ─── Category Filters ─────────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All', labelAm: 'ሁሉም', emoji: '🍽️' },
  { id: 'ethiopian', label: 'Ethiopian', labelAm: 'ኢትዮጵያዊ', emoji: '🇪🇹' },
  { id: 'fast-food', label: 'Fast Food', labelAm: 'ፈጣን ምግብ', emoji: '🍔' },
  { id: 'pizza', label: 'Pizza', labelAm: 'ፒዛ', emoji: '🍕' },
  { id: 'coffee', label: 'Coffee', labelAm: 'ቡና', emoji: '☕' },
  { id: 'sushi', label: 'Sushi', labelAm: 'ሱሺ', emoji: '🍱' },
  { id: 'vegetarian', label: 'Vegetarian', labelAm: 'አትክልት', emoji: '🥗' },
];

// ─── Restaurant Card Component ────────────────────────────────────────────────
interface RestaurantCardProps {
  restaurant: typeof restaurants[0];
  index: number;
}

const RestaurantCard = ({
  restaurant,
  index,
}: RestaurantCardProps): React.JSX.Element => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'group relative rounded-2xl overflow-hidden',
        'bg-card border border-border',
        'shadow-card hover:shadow-xl',
        'transition-all duration-300',
        'cursor-pointer',
      )}
    >
      {/* Restaurant Image/Emoji Header */}
      <div
        className={cn(
          'relative h-44 flex items-center justify-center',
          `bg-gradient-to-br ${restaurant.gradient}`,
          'overflow-hidden',
        )}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        {/* Food Emoji */}
        <motion.span
          animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-7xl filter drop-shadow-lg"
          aria-hidden="true"
        >
          {restaurant.emoji}
        </motion.span>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {restaurant.isFeatured && (
            <Badge variant="primary" size="xs" className="shadow-md">
              ⭐ Featured
            </Badge>
          )}
          {restaurant.discount > 0 && (
            <Badge
              variant="destructiveSolid"
              size="xs"
              icon={<Tag className="w-2.5 h-2.5" aria-hidden="true" />}
              className="shadow-md"
            >
              {restaurant.discount}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted((prev) => !prev);
          }}
          className={cn(
            'absolute top-3 right-3',
            'w-8 h-8 rounded-full',
            'flex items-center justify-center',
            'shadow-md transition-all duration-200',
            isWishlisted
              ? 'bg-destructive text-white'
              : 'bg-white/90 text-muted-foreground hover:text-destructive',
          )}
          aria-label={isWishlisted ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={cn('w-4 h-4', isWishlisted && 'fill-current')}
            aria-hidden="true"
          />
        </motion.button>

        {/* Open/Closed Badge */}
        <div className="absolute bottom-3 left-3">
          <div
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
              'shadow-md',
              restaurant.isOpen
                ? 'bg-success text-white'
                : 'bg-muted text-muted-foreground',
            )}
          >
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                restaurant.isOpen ? 'bg-white animate-pulse' : 'bg-muted-foreground',
              )}
              aria-hidden="true"
            />
            {restaurant.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>

        {/* Delivery Time Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {restaurant.deliveryTime} min
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Restaurant Name */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors duration-200">
                {restaurant.name}
              </h3>
              <p className="text-xs font-amharic text-muted-foreground">
                {restaurant.nameAm}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" aria-hidden="true" />
              <span className="text-sm font-bold text-foreground">
                {restaurant.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({restaurant.totalRatings.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-1.5">
          {restaurant.cuisine.map((c) => (
            <Badge key={c} variant="muted" size="xs">
              {c}
            </Badge>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bike className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{restaurant.deliveryFee} ETB delivery</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <div className="flex items-center gap-1">
            <Store className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Min {restaurant.minOrder} ETB</span>
          </div>
        </div>

        {/* Popular Item */}
        <div className={cn(
          'flex items-center gap-2 p-2 rounded-xl',
          'bg-muted/50 border border-border',
        )}>
          <span className="text-base" aria-hidden="true">🔥</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground">Popular item</p>
            <p className="text-xs font-semibold text-foreground truncate">
              {restaurant.popularItem}
            </p>
          </div>
          <span className="text-xs font-bold text-primary shrink-0">
            {restaurant.popularItemPrice} ETB
          </span>
        </div>

        {/* City */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 text-primary" aria-hidden="true" />
          <span>{restaurant.city}</span>
        </div>

        {/* Order Button */}
        <Link href={`/restaurants/${restaurant.slug}`} className="block">
          <Button
            variant={restaurant.isOpen ? 'primary' : 'outlineSecondary'}
            fullWidth
            size="sm"
            animate={false}
            disabled={!restaurant.isOpen}
            rightIcon={
              restaurant.isOpen ? (
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              ) : undefined
            }
          >
            {restaurant.isOpen ? 'Order Now' : 'Currently Closed'}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

// ─── Popular Restaurants Section ──────────────────────────────────────────────
export const PopularRestaurantsSection = (): React.JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(6);

  React.useEffect(() => {
    if (isInView) {
      void controls.start('visible');
    }
  }, [isInView, controls]);

  const filteredRestaurants = React.useMemo(() => {
    if (activeCategory === 'all') return restaurants;
    return restaurants.filter((r) =>
      r.cuisine.some((c) =>
        c.toLowerCase().includes(activeCategory.toLowerCase()),
      ) ||
      r.tags.some((t) =>
        t.toLowerCase().includes(activeCategory.toLowerCase()),
      ),
    );
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string): void => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    setVisibleCount(6);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleLoadMore = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);
    }, 600);
  };

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRestaurants.length;

  return (
    <section
      ref={ref}
      className="section bg-muted/20 relative overflow-hidden"
      aria-labelledby="restaurants-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
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
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                Popular Near You
              </span>
            </div>
            <div>
              <h2
                id="restaurants-heading"
                className="font-heading font-black text-foreground"
              >
                Top{' '}
                <span className="gradient-text">Ethiopian Restaurants</span>
              </h2>
              <p className="font-amharic text-muted-foreground mt-1">
                ምርጥ የኢትዮጵያ ምግብ ቤቶች
              </p>
            </div>
            <p className="text-muted-foreground max-w-lg">
              Handpicked restaurants loved by thousands of customers across
              Ethiopia. Order now and taste the difference.
            </p>
          </div>

          <Link href="/restaurants">
            <Button
              variant="outline"
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" aria-hidden="true" />}
              animate={false}
            >
              View All Restaurants
            </Button>
          </Link>
        </motion.div>

        {/* Category Filter Tabs */}
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
          className="mb-8"
        >
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
            {categories.map((category) => (
              <motion.button
                key={category.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full',
                  'text-sm font-medium whitespace-nowrap',
                  'transition-all duration-200 shrink-0',
                  'border',
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground',
                )}
                aria-pressed={activeCategory === category.id}
              >
                <span aria-hidden="true">{category.emoji}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Restaurants Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <RestaurantCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : filteredRestaurants.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <span className="text-6xl" aria-hidden="true">🍽️</span>
              <h3 className="text-xl font-bold text-foreground">
                No restaurants found
              </h3>
              <p className="text-muted-foreground text-center max-w-sm">
                We could not find restaurants in this category. Try a different
                filter or browse all restaurants.
              </p>
              <Button
                variant="primary"
                onClick={() => handleCategoryChange('all')}
                animate={false}
              >
                View All Restaurants
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {hasMore && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              isLoading={isLoading}
              loadingText="Loading more..."
              animate={false}
              rightIcon={
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              }
            >
              Load More Restaurants
            </Button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.6 },
            },
          }}
          className={cn(
            'mt-12 p-6 rounded-2xl text-center',
            'bg-gradient-primary',
            'shadow-xl shadow-primary/20',
          )}
        >
          <h3 className="text-white font-bold text-xl mb-2">
            Are you a restaurant owner?
          </h3>
          <p className="text-white/80 text-sm mb-4 max-w-md mx-auto">
            Join Yene Delivery and reach thousands of hungry customers across
            Ethiopia. Easy setup, fast payouts.
          </p>
          <Link href="/restaurant/register">
            <Button
              variant="glass"
              size="lg"
              rightIcon={<ChevronRight className="w-4 h-4" aria-hidden="true" />}
              animate={false}
              className="border-white/30 text-white hover:bg-white/20"
            >
              Partner With Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularRestaurantsSection;