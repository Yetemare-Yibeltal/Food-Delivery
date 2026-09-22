import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Yene Delivery',
    default: 'Yene Delivery — Food Delivery Across Ethiopia',
  },
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}