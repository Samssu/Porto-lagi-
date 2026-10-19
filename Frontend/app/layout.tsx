import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Full stack developer. Bold work. No slop.',
  openGraph: {
    title: 'Developer Portfolio',
    description: 'Full stack developer. Bold work. No slop.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
