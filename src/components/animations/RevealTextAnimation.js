"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function RevealTextAnimation({
  children,
  className,
  delay = 0.025,
  duration = 0.8,
  inView = false,
}) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={`animation ${className || ""}`}
    >
      <motion.div
        initial="initial"
        whileInView="inView"
        variants={{
          initial: {
            y: "100%",
          },
          inView: {
            y: 0,
          },
        }}
        viewport={
          !inView
            ? { margin: "-150px", once: true }
            : {
                margin: "-200px",
                once: true,
              }
        }
        transition={{
          duration: duration,
          ease: "easeInOut",
          delay: delay,
        }}
        className="animation__inside"
      >
        {children}
      </motion.div>
    </div>
  );
}

