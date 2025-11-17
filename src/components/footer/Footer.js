import Logo from "@/svg/logo.js";
import Linkedin from "@/svg/linkedin.js";
import Instagram from "@/svg/instagram.js";
import Youtube from "@/svg/youtube.js";

const Footer = () => {
  return (
    <footer className="relative bg-grey-40 h-full w-full overflow-hidden" data-dark-section="true">
      <div className="relative z-10 pt-[128px] md:pt-[64px] pb-[64px] lg:mt-[160px]">
        <div className="lg:relative ">
          <div className="px-[16px] md:px-[64px] lg:absolute z-10 lg:top-[50%] lg:-translate-y-1/2  xxl:px-[128px]">
            <h4 className="text-grey-00 text-center lg:text-left">
              La transformación <br /> no termina,{" "}
              <span className="text-orange">evoluciona.</span>
            </h4>
          </div>
          <div className="h-[300px] w-full relative mt-[32px] md:mt-[64px] lg:h-[598px] lg:mt-0">
            <div className="absolute right-[-1px] overflow-hidden rounded-l-[999px] w-[70%] md:w-[60%] h-full gradient-border-rounded"></div>
            <div className="absolute left-[-1px] overflow-hidden rounded-r-[999px] w-[70%] md:w-[60%] h-full gradient-border-dark"></div>
          </div>
          <div className="px-[16px] md:px-[64px] mt-[32px] md:mt-[64px] lg:absolute lg:bottom-[75px] lg:left-0 lg:flex lg:justify-between lg:items-center lg:w-full xxl:px-[128px]">
            <Logo
              color="white"
              className="w-[92px] h-[32px] md:w-[138px] md:h-[48px]"
            />
            <div className="flex items-center justify-between h-[132px] mt-[32px] md:h-auto lg:mt-0">
              <div className="flex flex-col gap-[16px] py-[4px] md:flex-row">
                <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                  Home
                </button>
                <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                  Nuestro ADN
                </button>
                <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                  Casos de éxito
                </button>
                <button className="relative hover:pl-[20px] uppercase text-grey-20 font-medium leading-[120%] hover:text-grey-00 cursor-pointer text-left duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:bg-orange before:rounded-full before:duration-300 before:opacity-0 hover:before:w-[12px] hover:before:h-[12px] hover:before:opacity-100">
                  Contacto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-[16px] md:px-[64px] lg:mt-[64px] xxl:px-[128px]">
          <hr className="w-full border-grey-20 my-[32px] lg:hidden" />
          <div className="flex flex-col gap-[32px] items-center md:flex-row md:justify-between">
             <div className="flex justify-between items-center w-[128px] mx-auto md:mx-0 md:order-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Instagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Linkedin />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Youtube />
              </a>
            </div>
            <p className="text-grey-20 text-center leading-[120%] md:order-1">
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
