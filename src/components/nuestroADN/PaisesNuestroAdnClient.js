'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Lista de países
const paises = [
  { nombre: 'Argentina' },
  { nombre: 'EEUU' },
  { nombre: 'México' },
  { nombre: 'Chile' },
  { nombre: 'Portugal' },
  { nombre: 'Argentina' },
  { nombre: 'EEUU' },
  { nombre: 'México' },
  { nombre: 'Chile' },
  { nombre: 'Portugal' },
  { nombre: 'Argentina' },
  { nombre: 'EEUU' },
  { nombre: 'México' },
  { nombre: 'Chile' },
  { nombre: 'Portugal' },
  { nombre: 'Argentina' },
  { nombre: 'EEUU' },
  { nombre: 'México' },
  { nombre: 'Chile' },
  { nombre: 'Portugal' },
];

// Componente individual de país
function PaisItem({ pais }) {
  return (
    <div className="whitespace-nowrap">
      <span className="text-grey-20 font-sora text-4xl lg:text-7xl lg:leading-[110%]">
        {pais.nombre}
      </span>
    </div>
  );
}

// Client Component - Recibe las traducciones como props
export default function PaisesNuestroAdnClient({ paragraph1, paragraph2 }) {
  // Duplicar la lista para efecto infinito
  const paisesDoble = [...paises, ...paises, ...paises];

  return (
    <section className="pb-32 relative overflow-hidden lg:flex lg:justify-between lg:gap-32 lg:pb-0">
      <div className="px-4 py-16 md:px-16 lg:pt-32 lg:w-1/2">
        <p className="text-grey-40 !text-xl !font-sora mb-6">{paragraph1}</p>
        <p className="text-grey-40 !text-xl !font-sora">{paragraph2}</p>
      </div>

      {/* Marquee Horizontal (Mobile y Tablet) */}
      <div className="lg:hidden overflow-hidden">
        <motion.div
          className="flex gap-9"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {paisesDoble.map((pais, index) => (
            <PaisItem
              key={`${pais.nombre}-${index}`}
              pais={pais}
            />
          ))}
        </motion.div>
      </div>

      {/* Marquee Vertical (Desktop) */}
      <div className="lg:pr-16 lg:w-1/2">
        <div className="hidden lg:flex lg:justify-start overflow-hidden h-[600px] lg:h-[902px]">
          <motion.div
            className="flex flex-col gap-8"
            animate={{
              y: ['0%', '-50%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {paisesDoble.map((pais, index) => (
              <PaisItem
                key={`vertical-${pais.nombre}-${index}`}
                pais={pais}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Esfera decorativa */}
      <div className="z-0 absolute bottom-0 left-0 w-full h-[116px] flex justify-center lg:justify-start">
        <div className="relative translate-y-[100px] opacity-50 lg:translate-y-[-100px] lg:translate-x-[-50px]">
          <Image
            src="/images/animations/orbe-de-particulas.gif"
            alt="Sphere"
            width={672}
            height={672}
            className="w-full h-auto scale-200 lg:scale-160"
          />
        </div>
      </div>
    </section>
  );
}

