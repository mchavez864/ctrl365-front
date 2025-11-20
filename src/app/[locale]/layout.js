import { Sora, Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import CookieBanner from '@/components/cookies/CookieBanner';
import '@/app/globals.css';
import { ReactLenis } from '@/utils/lenis';
import { NextIntlClientProvider } from 'next-intl';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${sora.variable} ${inter.variable} antialiased`}>
          <NextIntlClientProvider>
            {children}
            <Footer />
            <CookieBanner />
          </NextIntlClientProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
