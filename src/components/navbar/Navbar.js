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
      <nav className="bg-transparent overflow-hidden absolute top-0 left-0 w-full z-20">
        <div className="flex justify-between items-center px-[16px] md:px-[64px] py-[16px] md:py-[32px] xxl:px-[128px]">
          <Logo
            color="black"
            className="w-[92px] h-[32px] md:w-[138px] md:h-[48px]"
          />
          <div>
            <div className="md:flex md:items-center md:justify-between md:w-[228px]">
              <div className="hidden md:flex items-center relative w-[82px] h-[26px] ">
                <button className="bg-grey-40 text-grey-00 absolute left-0 rounded-[900px] text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px]">
                  ES
                </button>
                <button className="bg-transparent absolute right-0 rounded-[900px] border border-grey-30 text-grey-30 text-[16px] leading-[110%] tracking-[-0.32px] uppercase w-[44px] h-[26px]">
                  EN
                </button>
              </div>
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
