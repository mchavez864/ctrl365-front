import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "@/svg/logo.js";
import Cross from "@/svg/cross.js";
import Instagram from "@/svg/instagram.js";
import Linkedin from "@/svg/linkedin.js";
import Youtube from "@/svg/youtube.js";

const menuItems = [
  { name: "Home", href: "#" },
  { name: "Quienes somos", href: "#" },
  { name: "Casos de éxito", href: "#" },
  { name: "Contacto", href: "#" },
];

const Menu = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
      className="bg-grey-40 fixed inset-0 z-50"
    >
      <div className="relative w-full h-full overflow-hidden flex items-center">
        <div className="absolute top-0 left-0 w-full z-30">
          <div className="flex justify-between items-center px-[16px] md:px-[64px] py-[16px] md:py-[32px]">
            <Logo
              color="white"
              className="w-[92px] h-[32px] md:w-[138px] md:h-[48px]"
            />
            <button 
              onClick={onClose}
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <p className="text-[12px] leading-[120%] tracking-[-0.24px] uppercase text-grey-00">
                Cerrar
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

        <div className="relative w-full h-[80%] flex flex-col items-start justify-between z-30 px-[16px] md:px-[64px] xxl:px-[128px]">
          <Image
            src="/images/orb.webp"
            alt=""
            width={544}
            height={544}
            className="w-[186px] h-[186px] mx-auto md:w-[312px] md:h-[312px] md:mt-[138px]"
          />
          <div className="flex flex-col items-start gap-[32px] md:gap-[64px]">
            <div className="flex items-center relative w-[82px] h-[26px] md:hidden">
              <button className="bg-grey-00 text-grey-40 absolute left-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px]">
                ES
              </button>
              <button className="bg-transparent absolute right-0 rounded-[900px] border border-grey-20 text-grey-20 text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px]">
                EN
              </button>
            </div>
            <ul className="flex flex-col gap-[8px] relative px-[8px]">
              {menuItems.map((item) => (
                <li 
                  key={item.name}
                  className="relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100 cursor-pointer"
                >
                  <a
                    href={item.href}
                    className="block hover:translate-x-[20px] duration-300 text-grey-20 hover:text-grey-00"
                  >
                    <h3>{item.name}</h3>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center w-[128px]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
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
          className="absolute -bottom-[400px] w-full h-full object-cover opacity-10 z-20 md:h-[677px] md:bottom-[50%] md:translate-y-1/2"
        />
        <div className="absolute bottom-0 right-0 w-[187px] h-[252px] bg-orange rounded-full blur-[150px] z-20" />
      </div>
    </motion.div>
  );
};

export default Menu;
