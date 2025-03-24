import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/global.scss';
import Navbar from '@/components/Navbar/Navbar';
import RQProvider from '../providers/RQProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './global-error';
import { FilterStoreProvider } from '@/providers/FilterStoreProvider';
import { FavoritesStoreProvider } from '@/providers/FavoritesStoreProvider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Jackpot.bet | Casino',
  description: 'Jackpot.bet Frontend Coding Assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        <ErrorBoundary>
          <FavoritesStoreProvider>
            <FilterStoreProvider>
              <RQProvider>
                <Navbar />
                {children}
                <ReactQueryDevtools />
              </RQProvider>
            </FilterStoreProvider>
          </FavoritesStoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
