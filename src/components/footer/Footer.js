import Logo from "@/svg/logo.js";
import Linkedin from "@/svg/linkedin.js";
import Instagram from "@/svg/instagram.js";
import Youtube from "@/svg/youtube.js";

const Footer = () => {
  return (
    <footer className="relative bg-grey-40 h-full w-full overflow-hidden">
      <div className="relative z-10 pt-[128px] pb-[64px]">
        <div className="px-[16px]">
          <h4 className="text-grey-00 text-center">
            La transformación <br /> no termina,{" "}
            <span className="text-orange">evoluciona.</span>
          </h4>
        </div>
        <div className="h-[300px] w-full relative mt-[32px]">
          <div className="absolute right-[-1px] overflow-hidden rounded-l-[999px] w-[70%] h-full gradient-border-rounded"></div>
          <div className="absolute left-[-1px] overflow-hidden rounded-r-[999px] w-[70%] h-full gradient-border-dark"></div>
        </div>
        <div className="px-[16px] mt-[32px]">
          <Logo color="white" />
          <div className="flex items-center justify-between h-[132px] mt-[32px]">
            <div className="flex flex-col gap-[16px] py-[4px]">
              <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                Home
              </button>
              <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                Quienes somos
              </button>
              <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                Casos de éxito
              </button>
              <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                Contacto
              </button>
            </div>
          </div>
          <hr className="w-full border-grey-20 my-[32px]" />
          <div className="flex flex-col gap-[32px] items-center">
            <div className="flex justify-between items-center w-[128px] mx-auto">
              <Instagram />
              <Linkedin />

              <Youtube />
            </div>
            <p className="text-grey-20 text-center leading-[120%]">
              © Ctrl365 - All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[244px] bg-gradient-to-t from-purple to-transparent pointer-events-none z-0"></div>
    </footer>
  );
};

export default Footer;
