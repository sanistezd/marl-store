import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const outfit = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Marl Store | Premium Products',
  description: 'Premium curated products from around the world. Support local producers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
