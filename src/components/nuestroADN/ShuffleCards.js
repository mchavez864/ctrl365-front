"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import Logo from '@/svg/logo';

const ShuffleCards = () => {
  const [order, setOrder] = useState(["front", "middle", "back", "back2"]);
  const [exitingCardKey, setExitingCardKey] = useState(null);
  const orderRef = useRef(order);
  const t = useTranslations("Home.OurDNA");

  // Mantener la referencia actualizada
  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  const handleShuffle = () => {
    // Usar la referencia actual para obtener el order más reciente
    const currentOrder = orderRef.current;
    // Encontrar qué card está en "front" (índice donde order[i] === "front")
    const frontIndex = currentOrder.findIndex((pos) => pos === "front");
    const exitingKey = `card-${frontIndex}`;

    setExitingCardKey(exitingKey);
    // Esperar a que la card suba completamente (300ms) antes de cambiar el orden
    setTimeout(() => {
      const orderCopy = [...currentOrder];
      orderCopy.unshift(orderCopy.pop());
      setOrder(orderCopy);
      // Limpiar el estado de salida después de que complete la animación completa (300ms más)
      setTimeout(() => setExitingCardKey(null), 300);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleShuffle();
    }, 2000); // Cambia cada segundo (300ms sube + 300ms baja + 400ms de margen)

    return () => clearInterval(interval);
  }, []);

  const dnaCards = [
    {
      id: 1,
      title: t("Cards.card1.title"),
      icon: "/images/pages/home/ourDNA/ChallengersIcon.svg",
      description: t("Cards.card1.description")
    },
    {
      id: 2,
      title: t("Cards.card2.title"),
      icon: "/images/pages/home/ourDNA/HumanIcon.svg",
      description: t("Cards.card2.description")
    },
    {
      id: 3,
      title: t("Cards.card3.title"),
      icon: "/images/pages/home/ourDNA/IAIcon.svg",
      description: t("Cards.card3.description")
    },
    {
      id: 4,
      title: t("Cards.card4.title"),
      icon: "",
      description: t("Cards.card4.description")
    }
  ];

  // Mostrar todas las 4 cards
  const cardsToShow = dnaCards;

  return (
    <div className="relative flex justify-center items-center overflow-hidden  pt-[64px]">
      <div className="relative h-[700px] w-[328px] md:w-[394px] 2xl:w-[400px]">
        {cardsToShow.map((card, index) => (
          <Card
            key={`card-${index}`}
            cardKey={`card-${index}`}
            id={card.id}
            title={card.title}
            icon={card.icon}
            description={card.description}
            position={order[index]}
            isExiting={exitingCardKey === `card-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ id, title, icon, description, position, isExiting }) => {
  const x = "0%"; // Todas las cards centradas
  const rotateZ = "0deg"; // Sin rotación
  const zIndex = position === "front" ? "3" : position === "middle" ? "2" : position === "back" ? "1" : "0";

  // Determinar la opacidad según la posición
  const opacity = position === "front" ? 1 : position === "middle" ? 0.7 : position === "back" ? 0.5 : 0.3;

  // Determinar la posición Y según el estado
  let y;
  let transitionConfig;

  if (isExiting && position === "front") {
    // Card que está saliendo y aún está en "front": sube
    y = "-50px";
    transitionConfig = {
      duration: 0.3,
      ease: "easeIn",
    };
  } else if (isExiting && (position === "back" || position === "back2")) {
    // Card que está saliendo y ya cambió a "back" o "back2": baja desde arriba
    y = position === "back" ? "16px" : "24px";
    transitionConfig = {
      duration: 0.3,
      ease: "easeOut",
    };
  } else {
    // Posición normal según el estado - animación suave
    y = position === "front" ? "0%" : position === "middle" ? "8px" : position === "back" ? "16px" : "24px";
    transitionConfig = {
      duration: 0.3,
      ease: "easeOut",
    };
  }

  return (
    <motion.div
      layout
      style={{
        zIndex,
      }}
      animate={{
        rotate: rotateZ,
        x,
        y,
        opacity,
      }}
      transition={transitionConfig}
      className="absolute left-0 top-0 w-[328px] md:w-[394px] 2xl:w-[400px] rounded-2xl xl:rounded-3xl p-8 overflow-hidden group cursor-pointer bg-grey-40"
    >
      {/* Overlay gradient */}
      <div
        className="absolute w-[234px] h-[259px] rounded-[259px] -top-[98px] -right-[85px] bg-orange blur-[166px] pointer-events-none"
      />
      <div
        className={`absolute ${id !== 4 ? "hidden" : "block"} inset-0 pointer-events-none`}
        style={{
          background: 'url(/images/pages/home/ourDNA/card4_bg.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <div className="relative z-10 flex flex-col h-full min-h-[538px] justify-between">
        {/* Header */}
        <h4 className={`h5 mb-6 ${id === 4 ? 'text-orange' : 'text-grey-00'} ${id === 4 && position !== 'front' ? 'opacity-0' : ''}`}>
          {title}
        </h4>

        {/* Icono */}
        {id !== 4 &&
          <div className="mb-8 flex items-center h-24">
            <img src={icon} alt="icon dna card" />
          </div>
        }

        {/* Descripción */}
        <p className={`p text-grey-00 ${id === 4 && position !== 'front' ? 'opacity-0' : ''}`}>
          {description}
        </p>

        {id === 4 && position === 'front' &&
          <Logo />
        }
      </div>
    </motion.div>
  );
};

export default ShuffleCards;
