import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Rider Dashboard | Yene Delivery',
    default: 'Rider Dashboard | Yene Delivery',
  },
};

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}