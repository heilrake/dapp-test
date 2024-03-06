import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { MetamaskProvider } from './context/metamask-account-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MetamaskProvider>
        <body className={inter.className}>
          {children} <Toaster position="top-center" />
        </body>
      </MetamaskProvider>
    </html>
  );
}
