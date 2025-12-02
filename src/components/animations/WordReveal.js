"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WordReveal({ 
  children, 
  className,
  wordClassName,
  delay = 0,
  wordDelay = 0.05,
  duration = 1,
  wordGap = null,
  applyGradient = false,
  centered = false,
  insideClassName,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Convertir children a string y dividir en palabras
  const text = typeof children === "string" ? children : String(children);
  const words = text.split(" ");

  return (
    <span ref={ref} className={`paragraph ${className || ""}`} style={centered ? { justifyContent: 'center' } : undefined}>
      {words.map((word, i) => (
        <Word 
          key={i} 
          isInView={isInView}
          delay={delay + (i * wordDelay)}
          duration={duration}
          wordClassName={wordClassName}
          wordGap={wordGap}
          applyGradient={applyGradient}
          wordIndex={i}
          totalWords={words.length}
          insideClassName={insideClassName}
        >
          {word}
        </Word>
      ))}
    </span>
  );
}

const Word = ({ children, insideClassName, isInView, delay, duration, wordClassName, wordGap, applyGradient, wordIndex, totalWords }) => {
  const gapStyle = wordGap !== null ? { marginLeft: wordGap, marginRight: wordGap } : {};
  
  // Función para calcular el estilo del gradient continuo por palabra
  const getGradientStyle = () => {
    if (!applyGradient) return {};
    
    // Calculamos el porcentaje de posición de esta palabra en el texto total
    const progress = totalWords > 1 ? (wordIndex / (totalWords - 1)) * 100 : 0;
    
    return {
      background: 'linear-gradient(96deg, #fff 0%, #8a8a8a 100%)',
      backgroundSize: `${totalWords * 100}% 100%`,
      backgroundPosition: `${progress}% 0`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    };
  };
  
  return (
    <span 
      className={wordClassName || "paragraph-word"} 
      
      style={{ 
        overflow: "hidden", 
        display: "inline-block",
        verticalAlign: "top",
        ...gapStyle,
      }}
    >
      <motion.span
        style={{ display: "inline-block", ...getGradientStyle() }}
     className={insideClassName}
     
     initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: duration,
          ease: [0.22, 1, 0.36, 1],
          delay: delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};
