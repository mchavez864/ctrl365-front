"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function Paragraph({ value }) {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = value.split(" ");

  return (
    <span
      ref={element}
      className="text-grey-00"
      style={{ opacity: scrollYProgress }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </span>
  );
}

const Word = ({ children, range, progress }) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <>
      {characters.map((character, i) => {
        const start = range[0] + (i * step);
        const end = range[0] + (step * (i + 1));
        return <Character key={i} range={[start, end]} progress={progress}>{character}</Character>;
      })}
      {/* no quitar porque es necesario para que el texto no quede en una línea */}
      <span className=""> </span>
    </>
  );
};


const Character = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0.6, 1]);
    return(
        <motion.span style={{ opacity }} className="">
            {children}
        </motion.span>
    )
}