"use client";

import ArrowLeftLight from "@/svg/arrow-left-light";

// Componente del botón
const Button = ({
  copy,
  className = "",
  url,
  target = "_self",
  type = "button",
  onClick,
  disabled = false,
  variant = "black",
}) => {
  const variantStyles = {
    black:
      "leading-[110%] tracking-[-0.32px] font-normal bg-grey-40 text-grey-00 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px]",
    white:
      "leading-[110%] tracking-[-0.32px] bg-grey-00 text-grey-40 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px]",
    glass:
      "leading-[110%] tracking-[-0.32px] glass font-normal  text-grey-00 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px] border border-solid border-grey-00 duration-300",
    glassArrow:
      "glass text-grey-00 p-[20px] items-center justify-center rounded-[900px] relative flex gap-[8px] border border-solid border-grey-00 duration-300",
    onlyText:
      "leading-[110%] font-normal text-grey-20 relative text-[20px] duration-300 hover:text-grey-00",
    };

  // Estilos de color
  const selectedVariant = variantStyles[variant] || variantStyles.black;

  // Clases comunes para el contenedor (button o a), incluyendo disabled
  const containerClasses = [
    `cursor-pointer flex items-center justify-center relative font-semibold group gap-[2px] duration-300 ${variant === "onlyText" ? "rounded-[4px]" : "rounded-[900px]"} focus:outline-none`,
    disabled
      ? "cursor-not-allowed pointer-events-none"
      : "focus:ring-2 focus:ring-orange",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Manejador para desplazamiento suave si es un anclaje
  const handleScroll = (e) => {
    if (disabled) return;
    if (url && url.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(url.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (onClick) onClick(e);
  };

  // Renderizar un <a> si hay url, de lo contrario renderizar un <button>
  const Element = url ? "a" : "button";

  // Condicionalmente asignar props para <a> o <button>
  const elementProps = url
    ? {
        href: url,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
        ...(url.startsWith("#") && !disabled ? { onClick: handleScroll } : {}), // Solo añadir onClick para anclajes
      }
    : {
        type: type === "submit" ? "submit" : "button",
        disabled,
        onClick,
      };

  return (
    <Element className={containerClasses} {...elementProps}>
      <span
        className={[
          selectedVariant,
          disabled && variant === "black" ? "!bg-grey-30 !text-grey-00" : "",
          disabled && variant === "white" ? "!bg-grey-10 !text-grey-30" : "",
          disabled && (variant === "glass" || variant === "glassArrow")
            ? "!bg-transparent !text-grey-20 !border !border-solid !border-grey-20"
            : "",
          disabled && variant === "onlyText" ? "!text-grey-30" : "",
          !disabled && variant === "black" ? "active:bg-orange" : "",
          !disabled && (variant === "glass" || variant === "glassArrow")
            ? "active:text-grey-40 active:!bg-grey-00 active:backdrop-blur-none active:border-grey-00 active:shadow-none"
            : "",
          !disabled && variant === "onlyText" ? "active:text-orange" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {variant === "black" && (
          <div
            className={`w-[8px] h-[8px] rounded-full duration-300 ${
              disabled
                ? "bg-grey-00"
                : "bg-grey-00 group-hover:bg-orange group-active:bg-grey-00"
            }`}
          />
        )}
        {variant === "white" && (
          <div
            className={`w-[8px] h-[8px] rounded-full duration-300 ${
              disabled ? "bg-grey-30" : "bg-grey-40 group-hover:bg-orange"
            }`}
          />
        )}
        {variant !== "glassArrow" && copy}
        {(variant === "glass" || variant === "glassArrow") && (
          <ArrowLeftLight color="currentColor" className="duration-300" />
        )}
      </span>
    </Element>
  );
};

export default Button;
