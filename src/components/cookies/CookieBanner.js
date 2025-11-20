'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Button from '../buttons/Button';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations('CookieBanner');
  const locale = useLocale();

  useEffect(() => {
    // Verificar si el usuario ya aceptó/rechazó las cookies
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
      // Si no hay decisión, mostrar el banner después de un pequeño delay
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);

    // Aquí puedes agregar la lógica para activar las cookies/analytics
    // Por ejemplo: inicializar Google Analytics, etc.
    console.log('Cookies aceptadas');
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);

    // Aquí puedes agregar la lógica para desactivar cookies
    console.log('Cookies rechazadas');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:right-auto md:left-16 md:bottom-8 md:max-w-[476px] z-50 lg:max-w-[537px] lg:bottom-16 xxl:max-w-[544px] xxl:left-32"
        >
          <div className="bg-grey-40 text-center rounded-2xl p-4 shadow-2xl border border-grey-30/20 relative overflow-hidden md:text-left">
            <h3 className="text-white !font-soratext-lg font-semibold mb-4 relative z-10">
              {t('title')}
            </h3>
            <p className="text-white text-sm mb-8 leading-relaxed relative z-10">
              {t('description')}{' '}
              <a
                href={`/docs/politicas_de_privacidad_${locale}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange underline hover:text-orange/80 transition-colors"
              >
                {t('privacyPolicy')}
              </a>
              .
            </p>
            <div className="flex flex-col gap-3 md:flex-row relative z-10">
              <Button
                copy={t('accept')}
                onClick={handleAccept}
                variant="white"
                className="!w-full md:!w-auto md:order-2"
              />
              <Button
                copy={t('decline')}
                onClick={handleDecline}
                variant="glassWithoutIcon"
                className="!w-full md:!w-auto md:order-1"
              />
              {/* <button
                onClick={handleAccept}
                className="bg-white text-grey-40 px-6 py-3 rounded-full font-medium hover:bg-grey-10 transition-colors text-sm flex items-center justify-center gap-2 md:order-2"
              >
                <span className="w-2 h-2 bg-grey-40 rounded-full"></span>
                {t('accept')}
              </button> */}
              {/* <button
                onClick={handleDecline}
                className="bg-transparent text-grey-20 px-6 py-3 rounded-full font-medium hover:text-white transition-colors text-sm border border-grey-30/40 hover:border-grey-20 md:order-1"
              >
                {t('decline')}
              </button> */}
            </div>
            <span className="absolute z-0 top-[-50%] right-[-30%] w-[259px] h-[259px] filter rounded-full opacity-80 bg-orange blur-[150px]"></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
