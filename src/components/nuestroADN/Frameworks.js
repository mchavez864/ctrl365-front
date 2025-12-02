'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';

const Frameworks = () => {
  const t = useTranslations('NuestroAdnPage.frameworks');
  const frameworks = t.raw('cards');
  const [currentCard, setCurrentCard] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const lastCardRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const updateCard = useCallback((latest) => {
    const cardIndex = Math.min(
      Math.floor(latest * frameworks.length),
      frameworks.length - 1
    );
    if (cardIndex !== lastCardRef.current) {
      lastCardRef.current = cardIndex;
      setCurrentCard(cardIndex);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', updateCard);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate positions for circular layout (5 points for tablet+)
  // Using 320 radius for a 640px diameter circle
  const radius = 320;
  const centerX = 400;
  const centerY = 400;
  const circlePoints = 5; // Always 5 points forming a complete circle

  const getCircularPosition = (index) => {
    // Start from top (270 degrees = -90 degrees from 0)
    const angle = (270 + (360 / circlePoints) * index) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Create SVG arc path between two points (forms complete circle)
  const createArcPath = (startIndex, endIndex) => {
    const start = getCircularPosition(startIndex);
    const end = getCircularPosition(endIndex);

    // Large arc flag = 0 for short arc
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  };

  // Map framework index to circle segment (6 frameworks -> 5 arcs)
  const getActiveSegment = (cardIndex) => {
    // Card 0: no segments filled
    // Card 1: segment 0 filled
    // Card 2: segment 1 filled
    // Card 3: segment 2 filled
    // Card 4: segment 3 filled
    // Card 5: segment 4 filled (closes the circle)
    return cardIndex - 1;
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-grey-10"
      style={{ height: `${frameworks.length * 80}vh` }}
      data-dark-section="true"
      data-no-blur="true"
    >
      <section className="sticky top-0 overflow-hidden h-screen">
        <div
          className="relative bg-grey-40 md:bg-gradient-to-t  md:from-[#2D1D36]  
        md:from-5% via-grey-40 via-40% md:to-grey-40 to-90% lg:bg-grey-40 rounded-[16px] 
        md:rounded-[32px] px-[16px]  overflow-hidden xxl:px-[128px] h-full 
        flex flex-col justify-center"
        >
          {/* Add lg:from-grey-40 to try circlegradient background blur on desktop */}
          <div
            className="absolute bottom-[-300px] left-[50%] -translate-x-1/2 h-[700px] w-full
            bg-[radial-gradient(circle,rgba(37,27,43,0.7)_0%,rgba(128,0,255,0)_50%)] md:hidden "
          ></div>
          {/* Add class grad-purple and lg:block to try circle background blur on desktop */}
          <div className="relative z-10">
            <div className="h-full">
              <div className="flex items-center gap-2 md:hidden">
                <div className="bg-orange w-[12px] h-[12px] rounded-full"></div>
                <p className="text-grey-00 font-inter text-base! leading-[120%]! font-medium uppercase">
                  {t('label')}
                </p>
              </div>

              {/* Progress indicator - Horizontal (Mobile) */}
              <div className="flex items-center my-[64px] md:hidden">
                {frameworks.map((framework, index) => (
                  <React.Fragment key={framework.id}>
                    <motion.div
                      className={`w-[12px] h-[12px] rounded-full flex-shrink-0`}
                      animate={{
                        backgroundColor:
                          index <= currentCard ? '#FF6B35' : '#565656',
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index === currentCard ? 0.5 : 0,
                        ease: 'easeInOut',
                      }}
                    />
                    {index < frameworks.length - 1 && (
                      <div className="relative h-[2px] w-full bg-grey-30">
                        <motion.div
                          className="absolute inset-0 bg-orange origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: index < currentCard ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Animated content with circular indicator around it (Tablet+) */}
              <div className="flex items-start md:justify-center md:relative md:my-[64px]">
                {/* Circle SVG - positioned behind text on tablet+ */}
                <div className="hidden md:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 pointer-events-none">
                  {isMounted && (
                    <svg
                      viewBox="0 0 800 800"
                      className="overflow-visible w-[800px] h-[800px] lg:w-[900px] lg:h-[900px] xl:w-[1000px] xl:h-[1000px] "
                    >
                      {/* Draw 5 arcs forming a complete circle */}
                      {Array.from({ length: circlePoints }).map((_, index) => {
                        const nextIndex = (index + 1) % circlePoints;
                        const pathD = createArcPath(index, nextIndex);
                        const activeSegment = getActiveSegment(currentCard);

                        return (
                          <g key={`arc-${index}`}>
                            {/* Background arc */}
                            <path
                              d={pathD}
                              fill="none"
                              stroke="#565656"
                              strokeWidth="3"
                            />
                            {/* Animated arc */}
                            <motion.path
                              d={pathD}
                              fill="none"
                              stroke="#FF6B35"
                              strokeWidth="3"
                              initial={{ pathLength: 0 }}
                              animate={{
                                pathLength: index <= activeSegment ? 1 : 0,
                              }}
                              transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                              }}
                            />
                          </g>
                        );
                      })}

                      {/* Draw 5 points */}
                      {Array.from({ length: circlePoints }).map((_, index) => {
                        const pos = getCircularPosition(index);
                        // Points get activated as we progress: point 0 always active, then 1, 2, 3, 4
                        const isActive =
                          index <= Math.min(currentCard, circlePoints - 1);
                        const isCurrentActivating =
                          index === currentCard &&
                          currentCard <= circlePoints - 1;

                        return (
                          <motion.circle
                            key={`point-${index}`}
                            cx={pos.x}
                            cy={pos.y}
                            r="8"
                            animate={{
                              fill: isActive ? '#FF6B35' : '#565656',
                            }}
                            transition={{
                              duration: 0.3,
                              delay: isCurrentActivating ? 0.5 : 0,
                              ease: 'easeInOut',
                            }}
                          />
                        );
                      })}
                    </svg>
                  )}
                </div>

                {/* Text content - centered and on top */}
                <div className="flex flex-col gap-[16px] md:items-center md:text-center md:relative md:z-10">
                  <div className="hidden md:flex items-center gap-2">
                    <div className="bg-orange w-[12px] h-[12px] rounded-full"></div>
                    <p className="text-grey-00 font-inter text-base! leading-[120%]! font-medium uppercase">
                      {t('label')}
                    </p>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCard}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      className="flex flex-col gap-[16px] md:items-center"
                    >
                      {frameworks[currentCard].number && (
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-grey-00 font-inter text-base! leading-[120%]! font-medium">
                            {frameworks[currentCard].number}
                          </p>
                        </div>
                      )}
                      <p className="h1 text-grey-10 gradient-text lg:text-[80px]! xl:text-[90px]! lg:tracking-[-3.6px]!">
                        {frameworks[currentCard].title}
                      </p>
                      <p className="text-grey-10 max-w-[328px] md:max-w-[507px]">
                        {frameworks[currentCard].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frameworks;
