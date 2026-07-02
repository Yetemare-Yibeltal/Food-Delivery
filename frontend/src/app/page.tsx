import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/features/landing/HeroSection';
import { FeaturesSection } from '@/features/landing/FeaturesSection';
import { HowItWorksSection } from '@/features/landing/HowItWorksSection';
import { CitiesSection } from '@/features/landing/CitiesSection';
import { PopularRestaurantsSection } from '@/features/landing/PopularRestaurantsSection';
import { TestimonialsSection } from '@/features/landing/TestimonialsSection';
import { AppDownloadSection } from '@/features/landing/AppDownloadSection';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Yene Delivery | የኔ ዴሊቨሪ — Food Delivery in Ethiopia',
  description:
    'Order food from your favorite restaurants in Addis Ababa, Adama, Hawassa, Dire Dawa, Bahir Dar and Jimma. Fast, reliable food delivery across Ethiopia.',
};

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CitiesSection />
      <PopularRestaurantsSection />
      <TestimonialsSection />
      <AppDownloadSection />
      <Footer />
    </>
  );
}