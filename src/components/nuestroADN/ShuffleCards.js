import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';

const ShuffleCards = () => {
  const [order, setOrder] = useState(["front", "middle", "back"]);
  const [exitingCardKey, setExitingCardKey] = useState(null);
  const orderRef = useRef(order);

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

  return (
    <div className="grid place-content-center overflow-hidden bg-slate-900 px-8 py-24 text-slate-50">
      <div className="relative h-[450px] w-[350px]">
        <Card
          key="card-0"
          cardKey="card-0"
          //    imgUrl="/imgs/head-shots/7.jpg"
          testimonial="I feel like I've learned as much from X as I did completing my masters. It's the first thing I read every morning."
          author="Jenn F. - Marketing Director @ Square"
          position={order[0]}
          isExiting={exitingCardKey === "card-0"}
        />
        <Card
          key="card-1"
          cardKey="card-1"
          //    imgUrl="/imgs/head-shots/7.jpg"
          testimonial="My boss thinks I know what I'm doing. Honestly, I just read this newsletter."
          author="Adrian Y. - Product Marketing @ Meta"
          position={order[1]}
          isExiting={exitingCardKey === "card-1"}
        />
        <Card
          key="card-2"
          cardKey="card-2"
          //    imgUrl="/imgs/head-shots/7.jpg"
          testimonial="Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X."
          author="Devin R. - Growth Marketing Lead @ OpenAI"
          position={order[2]}
          isExiting={exitingCardKey === "card-2"}
        />
      </div>
    </div>
  );
};

const Card = ({ testimonial, position, imgUrl, author, isExiting }) => {
  const x = "0%"; // Todas las cards centradas
  const rotateZ = "0deg"; // Sin rotación
  const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";

  // Determinar la posición Y según el estado
  let y;
  let transitionConfig;

  if (isExiting && position === "front") {
    // Card que está saliendo y aún está en "front": sube
    y = "-200px";
    transitionConfig = {
      duration: 0.3,
      ease: "easeIn",
    };
  } else if (isExiting && position === "back") {
    // Card que está saliendo y ya cambió a "back": baja desde arriba
    y = "16px";
    transitionConfig = {
      duration: 0.3,
      ease: "easeOut",
    };
  } else {
    // Posición normal según el estado - animación suave
    y = position === "front" ? "0%" : position === "middle" ? "8px" : "16px";
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
      }}
      transition={transitionConfig}
      className="absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md"
    >
      {/* <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
      /> */}
      <span className="text-center text-lg italic text-slate-400">
        "{testimonial}"
      </span>
      <span className="text-center text-sm font-medium text-indigo-400">
        {author}
      </span>
    </motion.div>
  );
};

export default ShuffleCards;
