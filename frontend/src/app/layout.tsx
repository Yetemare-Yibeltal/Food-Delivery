import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Dashboard | Yene Delivery',
    default: 'Admin Dashboard | Yene Delivery',
  },
};

export default function AdminLayout({
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