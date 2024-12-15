import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';

import ConvexClientProvider from '@/components/providers/convex-client-provider';
import Footer from '@/components/footer';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Code Hive',
  description:
    'An online code editor designed for developers to write, debug, and share code seamlessly. Build, innovate, and connect in the hive of creativity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
