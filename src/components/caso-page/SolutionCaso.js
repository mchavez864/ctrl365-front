'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SmallCard from '../cards/SmallCard';

export default function SolutionCaso({ slug, title, data }) {
  return (
    <section
      data-dark-section="true"
      className="bg-grey-40 rounded-2xl mb-16 px-4 py-16 md:px-16 md:py-24 lg:mb-32 lg:rounded-4xl xl:py-32 xxl:p-32 overflow-hidden relative"
    >
      {/* CHIFLO */}
      <div className="absolute right-5 top-6 w-[47px] h-[47px] md:w-[80px] md:h-[80px] lg:top-[160px] lg:right-[70px] lg:w-[150px] lg:h-[150px] xl:top-[160px] xl:right-[100px] xl:w-[250px] xl:h-[250px]">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 w-full h-full bg-orange rounded-full blur-2xl will-change-transform"></div>
          <Image
            src="/images/orb.webp"
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-contain z-30 relative"
            priority
          />
          <div className="absolute inset-0 w-full h-full bg-orange rounded-full opacity-90 mix-blend-soft-light z-40 pointer-events-none"></div>
        </div>
      </div>
      {/* CHIFLO */}
      <motion.div
        className="lg:mb-32"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <SmallCard
          copy="SOLUTION"
          colorCopy="text-white"
          className="mb-4"
        />
        <h2 className="mb-8 text-white lg:max-w-[869px] xxl:max-w-[824px] relative z-10">
         {data.title}
        </h2>
      </motion.div>

      <div className="lg:flex lg:justify-end relative z-10">
        <motion.div
          className="md:flex md:gap-8 lg:w-[58%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.p
            className="text-white md:w-1/2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {data.text1}
          </motion.p>
          <motion.p
            className="text-white md:w-1/2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {data.text2}
          </motion.p>
        </motion.div>
      </div>
      <span className="rounded-full bg-purple filter z-0 blur-[150px] w-[686px] h-[686px] absolute left-[-20%] bottom-[-50%]"></span>
    </section>
  );
}
