'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/buttons/Button';
import Image from 'next/image';
import Logo from '@/svg/logo.js';
import Hamburger from '@/svg/hamburger.js';
import Menu from './Menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const changeLanguage = (newLocale) => {
    if (newLocale === locale) return;

    // Remover el locale actual del pathname y agregar el nuevo
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = `/${newLocale}${
      pathWithoutLocale ? `/${pathWithoutLocale}` : ''
    }`;

    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Obtener la posición del navbar
      const navbarHeight = 100; // Altura aproximada del navbar
      const scrollPosition = window.scrollY + navbarHeight;

      // Obtener todas las secciones con fondo oscuro
      const darkSections = document.querySelectorAll(
        '[data-dark-section="true"]'
      );

      let isOverDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Verificar si el navbar está sobre esta sección
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          isOverDark = true;
        }
      });

      setIsDarkBackground(isOverDark);
    };

    // Ejecutar al montar y en cada scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="bg-transparent overflow-hidden fixed top-0 left-0 w-full z-50 transition-colors duration-300">
        <div className="flex justify-between items-center px-[16px] md:px-[64px] py-[16px] md:py-[32px] xxl:px-[128px]">
          <a href="/">
            <Logo
              color={isDarkBackground ? 'white' : 'black'}
              className="w-[92px] h-[32px] md:w-[138px] md:h-[48px] transition-colors duration-300"
            />
          </a>
          <div>
            <div className="md:flex md:items-center md:justify-between md:w-[228px]">
              <div className="hidden md:flex items-center relative w-[82px] h-[26px] ">
                <button
                  onClick={() => changeLanguage('es')}
                  className={`${
                    locale === 'es'
                      ? isDarkBackground
                        ? 'bg-grey-00 text-grey-40 z-10'
                        : 'bg-grey-40 text-grey-00 z-10'
                      : `bg-transparent border z-0 ${
                          isDarkBackground
                            ? 'border-grey-20 text-grey-20'
                            : 'border-grey-30 text-grey-30'
                        }`
                  } absolute left-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px] transition-colors duration-300 cursor-pointer`}
                >
                  ES
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`${
                    locale === 'en'
                      ? isDarkBackground
                        ? 'bg-grey-00 text-grey-40 z-10'
                        : 'bg-grey-40 text-grey-00 z-10'
                      : `bg-transparent border z-0 ${
                          isDarkBackground
                            ? 'border-grey-20 text-grey-20'
                            : 'border-grey-30 text-grey-30'
                        }`
                  } absolute right-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px] transition-colors duration-300 cursor-pointer`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={openMenu}
                className="flex items-center gap-[8px] cursor-pointer"
              >
                <p
                  className={`text-[12px] leading-[120%] tracking-[-0.24px] uppercase transition-colors duration-300 ${
                    isDarkBackground ? 'text-grey-00' : 'text-grey-40'
                  }`}
                >
                  {locale === 'es' ? 'Menú' : 'Menu'}
                </p>
                <div
                  className={`w-[52px] h-[24px] rounded-[900px] relative transition-colors duration-300 ${
                    isDarkBackground ? 'bg-grey-00' : 'bg-grey-40'
                  }`}
                >
                  <Hamburger
                    color={isDarkBackground ? 'black' : 'white'}
                    className="w-[18px] h-[7.5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isMenuOpen && <Menu onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
