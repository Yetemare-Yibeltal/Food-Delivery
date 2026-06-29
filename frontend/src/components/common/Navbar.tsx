'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ShoppingCart,
  Sun,
  Moon,
  Monitor,
  Globe,
  ChevronDown,
  MapPin,
  Bell,
  User,
  LogOut,
  Settings,
  Package,
  Heart,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Badge, NotificationBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  fadeDownVariants,
  slideDownVariants,
} from '@/lib/animations/variants';

// ─── Navigation Links ─────────────────────────────────────────────────────────
const navLinks = [
  { href: '/', label: 'Home', labelAm: 'መነሻ' },
  { href: '/restaurants', label: 'Restaurants', labelAm: 'ምግብ ቤቶች' },
  { href: '/deals', label: 'Deals', labelAm: 'ቅናሾች' },
  { href: '/track', label: 'Track Order', labelAm: 'ትዕዛዝ ክትትል' },
];

// ─── Theme Options ────────────────────────────────────────────────────────────
const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

// ─── Language Options ─────────────────────────────────────────────────────────
const languageOptions = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'am', label: 'አማርኛ', flag: '🇪🇹' },
];

// ─── Mock Data (replaced with real store in Phase 4) ─────────────────────────
const mockUser = null;
const mockCartCount = 0;
const mockNotificationCount = 0;
const mockCity = 'Addis Ababa';

// ─── Navbar Component ─────────────────────────────────────────────────────────
export const Navbar = (): React.JSX.Element => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isThemeOpen, setIsThemeOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [isUserOpen, setIsUserOpen] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (): void => {
      setIsThemeOpen(false);
      setIsLangOpen(false);
      setIsUserOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const currentThemeIcon = mounted
    ? themeOptions.find((t) => t.value === theme)?.icon ?? Monitor
    : Monitor;
  const ThemeIcon = currentThemeIcon;
  const currentLang = languageOptions.find((l) => l.value === language);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border'
            : 'bg-transparent',
        )}
      >
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ─── Logo ──────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="Yene Delivery Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
                  <span className="text-xl" aria-hidden="true">🍽️</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg leading-none gradient-text">
                    Yene Delivery
                  </span>
                  <span className="text-[10px] text-muted-foreground font-amharic leading-none">
                    የኔ ዴሊቨሪ
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* ─── Desktop Nav Links ──────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium',
                    'transition-colors duration-200',
                    'hover:bg-muted hover:text-foreground',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground',
                  )}
                >
                  {language === 'am' ? link.labelAm : link.label}
                </Link>
              ))}
            </div>

            {/* ─── Desktop Right Actions ──────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-2">

              {/* City Selector */}
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg',
                  'text-sm text-muted-foreground',
                  'hover:bg-muted hover:text-foreground',
                  'transition-colors duration-200',
                )}
                aria-label="Select city"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span className="hidden lg:block font-medium">{mockCity}</span>
                <ChevronDown className="w-3 h-3" aria-hidden="true" />
              </button>

              {/* Language Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen((prev) => !prev);
                    setIsThemeOpen(false);
                    setIsUserOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg',
                    'text-sm text-muted-foreground',
                    'hover:bg-muted hover:text-foreground',
                    'transition-colors duration-200',
                  )}
                  aria-label="Change language"
                  aria-expanded={isLangOpen}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden lg:block">{currentLang?.flag}</span>
                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      variants={fadeDownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={cn(
                        'absolute right-0 top-full mt-2',
                        'w-40 rounded-xl',
                        'bg-card border border-border',
                        'shadow-lg overflow-hidden z-50',
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.value}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.value);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-3',
                            'text-sm transition-colors duration-200 hover:bg-muted',
                            language === lang.value
                              ? 'text-primary font-medium bg-primary/5'
                              : 'text-foreground',
                          )}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {language === lang.value && (
                            <span className="ml-auto text-primary">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsThemeOpen((prev) => !prev);
                    setIsLangOpen(false);
                    setIsUserOpen(false);
                  }}
                  className={cn(
                    'flex items-center justify-center w-9 h-9 rounded-lg',
                    'text-muted-foreground',
                    'hover:bg-muted hover:text-foreground',
                    'transition-colors duration-200',
                  )}
                  aria-label="Change theme"
                  aria-expanded={isThemeOpen}
                >
                  {mounted && <ThemeIcon className="w-4 h-4" aria-hidden="true" />}
                </button>

                <AnimatePresence>
                  {isThemeOpen && (
                    <motion.div
                      variants={fadeDownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={cn(
                        'absolute right-0 top-full mt-2',
                        'w-40 rounded-xl',
                        'bg-card border border-border',
                        'shadow-lg overflow-hidden z-50',
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {themeOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setTheme(option.value);
                              setIsThemeOpen(false);
                            }}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-3',
                              'text-sm transition-colors duration-200 hover:bg-muted',
                              theme === option.value
                                ? 'text-primary font-medium bg-primary/5'
                                : 'text-foreground',
                            )}
                          >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                            <span>{option.label}</span>
                            {theme === option.value && (
                              <span className="ml-auto text-primary">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <NotificationBadge count={mockCartCount} showZero={false}>
                <Link href="/cart" aria-label={`Cart with ${mockCartCount} items`}>
                  <button
                    type="button"
                    className={cn(
                      'flex items-center justify-center w-9 h-9 rounded-lg',
                      'text-muted-foreground',
                      'hover:bg-muted hover:text-foreground',
                      'transition-colors duration-200',
                    )}
                  >
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  </button>
                </Link>
              </NotificationBadge>

              {/* Auth or User Menu */}
              {mockUser ? (
                <div className="flex items-center gap-2">
                  <NotificationBadge count={mockNotificationCount} showZero={false}>
                    <button
                      type="button"
                      className={cn(
                        'flex items-center justify-center w-9 h-9 rounded-lg',
                        'text-muted-foreground',
                        'hover:bg-muted hover:text-foreground',
                        'transition-colors duration-200',
                      )}
                      aria-label="Notifications"
                    >
                      <Bell className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </NotificationBadge>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserOpen((prev) => !prev);
                        setIsThemeOpen(false);
                        setIsLangOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg p-1 hover:bg-muted transition-colors duration-200"
                      aria-label="User menu"
                      aria-expanded={isUserOpen}
                    >
                      <Avatar
                        name="Selam Yibeltal"
                        size="sm"
                        showStatus
                        status="online"
                      />
                      <ChevronDown className="w-3 h-3 text-muted-foreground hidden lg:block" aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                      {isUserOpen && (
                        <motion.div
                          variants={fadeDownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={cn(
                            'absolute right-0 top-full mt-2',
                            'w-56 rounded-xl',
                            'bg-card border border-border',
                            'shadow-lg overflow-hidden z-50',
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-4 py-3 border-b border-border">
                            <p className="text-sm font-semibold text-foreground">Selam Yibeltal</p>
                            <p className="text-xs text-muted-foreground truncate">selam@email.com</p>
                          </div>
                          <div className="py-1">
                            {[
                              { href: '/profile', icon: User, label: 'Profile' },
                              { href: '/orders', icon: Package, label: 'My Orders' },
                              { href: '/favourites', icon: Heart, label: 'Favourites' },
                              { href: '/settings', icon: Settings, label: 'Settings' },
                            ].map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={cn(
                                    'flex items-center gap-3 px-4 py-2.5',
                                    'text-sm text-foreground',
                                    'hover:bg-muted transition-colors duration-200',
                                  )}
                                >
                                  <Icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                          <div className="border-t border-border py-1">
                            <button
                              type="button"
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-2.5',
                                'text-sm text-destructive',
                                'hover:bg-destructive/10 transition-colors duration-200',
                              )}
                            >
                              <LogOut className="w-4 h-4" aria-hidden="true" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" animate={false}>
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* ─── Mobile Right Actions ───────────────────────────────────── */}
            <div className="flex md:hidden items-center gap-2">
              <NotificationBadge count={mockCartCount} showZero={false}>
                <Link href="/cart" aria-label="Cart">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center justify-center w-9 h-9 rounded-lg',
                      'text-muted-foreground hover:bg-muted',
                      'transition-colors duration-200',
                    )}
                  >
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  </button>
                </Link>
              </NotificationBadge>

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg',
                  'text-muted-foreground hover:bg-muted',
                  'transition-colors duration-200',
                )}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Mobile Menu ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={slideDownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'md:hidden',
                'bg-background/95 backdrop-blur-md',
                'border-t border-border shadow-lg',
              )}
            >
              <div className="container-custom py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg',
                      'text-sm font-medium transition-colors duration-200',
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:bg-muted',
                    )}
                  >
                    {language === 'am' ? link.labelAm : link.label}
                    {pathname === link.href && (
                      <Badge variant="primary" size="xs" className="ml-auto">
                        Active
                      </Badge>
                    )}
                  </Link>
                ))}

                <div className="border-t border-border my-2" />

                <button
                  type="button"
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg',
                    'text-sm text-foreground hover:bg-muted',
                    'transition-colors duration-200',
                  )}
                >
                  <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{mockCity}</span>
                  <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-2 px-4 py-3">
                  <Globe className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-foreground font-medium">Language</span>
                  <div className="ml-auto flex gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => setLanguage(lang.value)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-medium',
                          'transition-colors duration-200',
                          language === lang.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80',
                        )}
                      >
                        {lang.flag} {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3">
                  <ThemeIcon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-foreground font-medium">Theme</span>
                  <div className="ml-auto flex gap-2">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setTheme(option.value)}
                          className={cn(
                            'p-1.5 rounded-lg transition-colors duration-200',
                            theme === option.value
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80',
                          )}
                          aria-label={`${option.label} theme`}
                        >
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-border my-2" />

                {!mockUser && (
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <Link href="/auth/login" className="w-full">
                      <Button variant="outlineSecondary" fullWidth animate={false}>
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="w-full">
                      <Button variant="primary" fullWidth>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
};

export default Navbar;