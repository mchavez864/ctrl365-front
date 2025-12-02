import React from "react";
import { motion } from "framer-motion";
import Logo from "@/svg/logo";
import LottieIcon from "./LottieIcon";

const DNACard = ({ index, id, title, icon, description, isInView }) => {
  return (
    <motion.div
      key={id}
      className="relative w-[328px] md:w-[394px] 2xl:w-[400px] mr-4 xl:mr-5 rounded-2xl  xl:rounded-3xl p-8 overflow-hidden group cursor-pointer shrink-0 bg-grey-40"
      initial={{ opacity: 0, x: 200 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
      transition={{ 
        duration: 1, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1] // easeOut suave
      }}
    >
      {/* Contenido de la tarjeta */}
      {/* Overlay gradient on hover */}
      <div className="absolute w-[234px] h-[259px] rounded-[259px] -top-[98px] -right-[85px] bg-orange blur-[166px] pointer-events-none" />
      <div
        className={`absolute ${
          id !== 4 ? "hidden" : "block"
        } inset-0 pointer-events-none`}
        style={{
          background: "url(/images/pages/home/ourDNA/card4_bg.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex flex-col h-full min-h-[538px] justify-between items-start">
        {/* Header */}
        <h4 className={`h5 mb-6 ${id === 4 ? "text-orange" : "text-grey-00"}`}>
          {title}
        </h4>

        {/* Icono */}
        {id !== 4 && (
          <div className="mb-8 h-[200px]">
            {icon.endsWith(".json") ? (
              <LottieIcon animationPath={icon} className="w-auto h-full" />
            ) : (
              <img src={icon} alt="icon dna card" />
            )}
          </div>
        )}

        {/* Descripción */}
        <p className="p text-grey-00">{description}</p>

        {id === 4 && <Logo />}
      </div>
    </motion.div>
  );
};

export default DNACard;
