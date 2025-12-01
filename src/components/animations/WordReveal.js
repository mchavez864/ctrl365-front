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
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Convertir children a string y dividir en palabras
  const text = typeof children === "string" ? children : String(children);
  const words = text.split(" ");

  return (
    <span ref={ref} className={`paragraph ${className || ""}`}>
      {words.map((word, i) => (
        <Word 
          key={i} 
          isInView={isInView}
          delay={delay + (i * wordDelay)}
          duration={duration}
          wordClassName={wordClassName}
          wordGap={wordGap}
        >
          {word}
        </Word>
      ))}
    </span>
  );
}

const Word = ({ children, isInView, delay, duration, wordClassName, wordGap }) => {
  const gapStyle = wordGap !== null ? { marginLeft: wordGap, marginRight: wordGap } : {};
  
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
        style={{ display: "inline-block" }}
     
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
