'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SmallCard({
  copy = 'TITLE',
  colorCircle = 'bg-orange',
  colorCopy = 'text-grey-40',
  className = '',
  animated = false,
  animationDelay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (animated) {
    return (
      <div
        ref={ref}
        className={`${colorCopy} flex items-center font-inter gap-2 text-grey-30 font-medium ${className}`}
      >
        <motion.span
          className={`${colorCircle} inline-block w-[12px] h-[12px] rounded-full`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: animationDelay }}
        />
        <motion.span
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={
            isInView
              ? { clipPath: 'inset(0 0% 0 0)' }
              : { clipPath: 'inset(0 100% 0 0)' }
          }
          transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay + 0.3 }}
        >
          {copy}
        </motion.span>
      </div>
    );
  }

  return (
    <div
      className={`${colorCopy} flex items-center font-inter gap-2 text-grey-30 font-medium ${className}`}
    >
      <span
        className={`${colorCircle} inline-block w-[12px] h-[12px] rounded-full bg-grey-30`}
      ></span>
      {copy}
    </div>
  );
}
