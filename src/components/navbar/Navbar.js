"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import Logo from "@/svg/logo.js";
import Hamburger from "@/svg/hamburger.js";
import Menu from "./Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-grey-10 overflow-hidden absolute top-0 left-0 w-full z-20">
        <div className="flex justify-between items-center px-[16px] md:px-[64px] py-[16px]">
          <Logo
            color="black"
            className="w-[92px] h-[32px] md:w-[138px] md:h-[48px]"
          />
          <button 
            onClick={openMenu}
            className="flex items-center gap-[8px] cursor-pointer"
          >
            <p className="text-[12px] leading-[120%] tracking-[-0.24px]  uppercase">
              Menú
            </p>
            <div className="w-[52px] h-[24px] rounded-[900px] bg-grey-40 relative">
              <Hamburger
                color="white"
                className="w-[18px] h-[7.5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </button>
        </div>
      </nav>
      
      <AnimatePresence mode="wait">
        {isMenuOpen && <Menu onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
