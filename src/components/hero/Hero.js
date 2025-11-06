import Logo from "@/svg/logo.js";
import Linkedin from "@/svg/linkedin.js";
import Instagram from "@/svg/instagram.js";
import Youtube from "@/svg/youtube.js";
import Button from "@/components/buttons/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-grey-10 ">
      <div className="px-[16px] py-[128px] md:px-[64px] md:pt-[168px] lg:px-[128px] xxl:px-[256px]">
        <div className="absolute bottom-[-100px] md:bottom-[40px] right-0 overflow-hidden"><Image src="/images/hero/dots.webp" alt="" width={999} height={935} className="w-[500px] md:w-[600px] lg:w-[700px] xxl:w-[800px] h-full object-cover rotate-45" /></div>
        <div className="relative z-10">
        <h1>IA para resultados reales de negocio: rápida, medible, humana.</h1>
        <p className="lg my-[16px]">Creado para la IA Pensado para las personas.</p>
        <Button copy="Comenzá hoy" variant="black" className="mb-[64px]"/>
        <Image src="/images/hero/video.webp" alt="video" width={640} height={360} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
