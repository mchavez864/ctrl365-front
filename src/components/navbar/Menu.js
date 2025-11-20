import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/svg/logo.js';
import Cross from '@/svg/cross.js';
import Instagram from '@/svg/instagram.js';
import Linkedin from '@/svg/linkedin.js';
import Youtube from '@/svg/youtube.js';

const menuItems = [
  { nameEs: 'Home', nameEn: 'Home', href: '/' },
  { nameEs: 'Nuestro ADN', nameEn: 'Our DNA', href: '/nuestro-adn' },
  { nameEs: 'Casos de éxito', nameEn: 'Case Studies', href: '/casos-de-exito' },
  { nameEs: 'Contacto', nameEn: 'Contact Us', href: '/contacto' },
];

const Menu = ({ onClose }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <motion.div
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="bg-grey-40 fixed inset-0 z-50"
    >
      <div className="relative w-full h-full overflow-hidden flex items-center">
        <div className="absolute top-0 left-0 w-full z-40 bg-transparent">
          <div className="bg-transparent flex justify-between items-center px-[16px] md:px-[64px] py-[16px] md:py-[32px] xxl:px-[128px]">
          <a href="/">
            <Logo
              color="white"
              className="w-[92px] h-[32px] md:w-[138px] md:h-[48px]"
            />
            </a>
            <div className="md:flex md:items-center md:justify-between md:w-[228px]">
              <div className="hidden md:flex items-center relative w-[82px] h-[26px] ">
                <button
                  onClick={() => changeLanguage('es')}
                  className={`${
                    locale === 'es'
                      ? 'bg-grey-00 text-grey-40 z-10'
                      : 'bg-transparent border border-grey-20 text-grey-20 z-0'
                  } absolute left-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px] transition-colors duration-300 cursor-pointer`}
                >
                  ES
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`${
                    locale === 'en'
                      ? 'bg-grey-00 text-grey-40 z-10'
                      : 'bg-transparent border border-grey-20 text-grey-20 z-0'
                  } absolute right-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px] transition-colors duration-300 cursor-pointer`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-[8px] cursor-pointer"
              >
                <p className="text-[12px] leading-[120%] tracking-[-0.24px] uppercase text-grey-00">
                  {locale === 'es' ? 'Cerrar' : 'Close'}
                </p>
                <div className="w-[52px] h-[24px] rounded-[900px] bg-grey-00 relative">
                  <Cross
                    color="black"
                    className="w-[12px] h-[12px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[80%] flex flex-col lg:flex-row items-start justify-between z-30 px-[16px] md:px-[64px] xxl:px-[128px] lg:h-full lg:items-center">
          <div className="lg:order-2 xxl:w-1/2 self-center	lg:self-auto">
            <Image
              src="/images/orb.webp"
              alt=""
              width={544}
              height={544}
              className="w-[186px] h-[186px] mx-auto md:w-[312px] md:h-[312px] md:mt-[138px]  lg:mx-0 lg:mt-0 lg:w-[426px] lg:h-[426px] xxl:w-[544px] xxl:h-[544px]"
            />
          </div>
          <div className="flex flex-col items-start gap-[32px] md:gap-[64px] lg:h-full lg:justify-between lg:pt-[200px] lg:pb-[90px]">
            <div className="flex items-center relative w-[82px] h-[26px] md:hidden">
              <button
                onClick={() => changeLanguage('es')}
                className={`${
                  locale === 'es'
                    ? 'bg-grey-00 text-grey-40 z-10'
                    : 'bg-transparent border border-grey-20 text-grey-20 z-0'
                } absolute left-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px] transition-colors duration-300 cursor-pointer`}
              >
                ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`${
                  locale === 'en'
                    ? 'bg-grey-00 text-grey-40 z-10'
                    : 'bg-transparent border border-grey-20 text-grey-20 z-0'
                } absolute right-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px] transition-colors duration-300 cursor-pointer`}
              >
                EN
              </button>
            </div>
            <ul className="flex flex-col gap-[8px] relative px-[8px] lg:gap-[24px]">
              {menuItems.map((item) => (
                <li
                  key={item.nameEs}
                  className="relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 
                  before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] 
                  lg:hover:before:w-[16px] lg:hover:before:h-[16px] hover:before:opacity-100 cursor-pointer"
                >
                  <a
                    href={item.href}
                    className="block hover:translate-x-[20px] lg:hover:translate-x-[28px] duration-300 text-grey-20 hover:text-grey-00"
                  >
                    <h3 className="lg:text-[72px]! lg:leading-[120%]! lg:tracking-[-1.44px]!">
                      {locale === 'es' ? item.nameEs : item.nameEn}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center w-[128px]">
              <a
                href="https://www.instagram.com/ctrl365/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <Instagram />
              </a>
              <a
                href="https://www.linkedin.com/company/ctrl365/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <Linkedin />
              </a>
              <a
                href="https://www.youtube.com/user/Ctrl365Media"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-icon"
              >
                <Youtube />
              </a>
            </div>
          </div>
        </div>
        <Image
          src="/images/white-mesh.webp"
          alt=""
          width={1638}
          height={1113}
          className="absolute -bottom-[400px] w-full h-full object-cover opacity-10 z-20  md:bottom-[50%] md:translate-y-1/2 md:h-auto xxl:opacity-5"
        />
        <div className="absolute bottom-0 right-0 lg:top-[-163px] lg:right-[-250px] w-[187px] h-[252px] lg:w-[800px] xxl:h-[800px] xxl:w-[500px] lg:h-[500px] bg-orange rounded-full blur-[150px] lg:blur-[250px] z-20" />
      </div>
    </motion.div>
  );
};

export default Menu;
