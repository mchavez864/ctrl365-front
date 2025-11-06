import Logo from "@/svg/logo.js";
import Linkedin from "@/svg/linkedin.js";
import Instagram from "@/svg/instagram.js";
import Youtube from "@/svg/youtube.js";
import Button from "@/components/buttons/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-grey-10 overflow-hidden">
      <div className="relative px-[16px] py-[128px] md:px-[64px] md:pt-[168px] lg:pt-[232px] lg:pb-[64px] overflow-hidden">
        <div className="absolute bottom-[-100px] md:bottom-[40px] right-0 overflow-hidden lg:bg-[url('/images/hero/dots.webp')] lg:w-[700px] lg:h-[1273px] lg:rotate-45 xxl:rotate-[37.5deg] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:top-[-100px] lg:bottom-auto lg:right-[200px] xxl:right-[500px]">
          <Image
            src="/images/hero/dots.webp"
            alt=""
            width={999}
            height={935}
            className="w-[500px] md:w-[600px] lg:w-[700px]  h-full object-cover rotate-45 lg:hidden"
          />
        </div>
        <div className="relative z-10 lg:flex lg:justify-between lg:h-[610px]">
          <div>
            <h1 className="lg:max-w-[800px]">
              IA para resultados reales de negocio:{" "}
              <span className="lg:hidden">rápida, medible, humana.</span>
            </h1>
            <p className="lg my-[16px]">
              Creado para la IA Pensado para las personas.
            </p>
            <Button copy="Comenzá hoy" variant="black" className="mb-[64px]" />
          </div>
          <div className="lg:self-end lg:flex lg:flex-col lg:items-end">
            <p className="display hidden lg:block">rápida</p>
            <Image
              src="/images/hero/video.webp"
              alt="video"
              width={640}
              height={360}
              className="w-full h-full object-cover lg:w-[426px] lg:h-auto"
            />
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-between lg:mt-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-full bg-grey-30"></div>
            <p className="xs text-grey-30 font-medium! text-[16px]! leading-[100%]!">Scroll</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-full bg-grey-30"></div>
            <p className="xs text-grey-30 font-medium! text-[16px]! leading-[100%]!">Ver video</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
