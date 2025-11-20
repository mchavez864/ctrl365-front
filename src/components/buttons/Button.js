'use client';

import ArrowLeftLight from '@/svg/arrow-left-light';

// Componente del botón
const Button = ({
  copy,
  className = '',
  url,
  target = '_self',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  variant = 'black',
}) => {
  const isDisabled = disabled || loading;

  const variantStyles = {
    black:
      'leading-[110%] tracking-[-0.32px] font-normal bg-grey-40 text-grey-00 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px]',
    white:
      'leading-[110%] tracking-[-0.32px] bg-grey-00 text-grey-40 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px]',
    glass:
      'leading-[110%] tracking-[-0.32px] glass font-normal  text-grey-00 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px] border border-solid border-grey-00 duration-300',
    glassArrow:
      'glass text-grey-00 p-[20px] items-center justify-center rounded-[900px] relative flex gap-[8px] border border-solid border-grey-00 duration-300',
    glassWithoutIcon:
      'leading-[110%] tracking-[-0.32px] glass font-normal text-grey-00 px-[32px] py-[15px] items-center justify-center rounded-[900px] relative flex gap-[8px] border border-solid border-grey-00 duration-300',
    onlyText:
      'leading-[110%] font-normal text-grey-20 relative text-[20px] duration-300 hover:text-grey-00',
  };

  // Estilos de color
  const selectedVariant = variantStyles[variant] || variantStyles.black;

  // Clases comunes para el contenedor (button o a), incluyendo disabled
  const containerClasses = [
    `cursor-pointer flex items-center justify-center relative font-semibold group gap-[2px] duration-300 ${
      variant === 'onlyText' ? 'rounded-[4px]' : 'rounded-[900px]'
    } focus:outline-none`,
    isDisabled
      ? 'cursor-not-allowed pointer-events-none'
      : 'focus:ring-2 focus:ring-orange',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleScroll = (e) => {
    if (isDisabled) return;
    if (url && url.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(url.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onClick) onClick(e);
  };

  const Element = url ? 'a' : 'button';

  const elementProps = url
    ? {
        href: url,
        target,
        rel: target === '_blank' ? 'noopener noreferrer' : undefined,
        ...(url.startsWith('#') && !isDisabled
          ? { onClick: handleScroll }
          : {}),
      }
    : {
        type: type === 'submit' ? 'submit' : 'button',
        disabled: isDisabled,
        onClick,
      };

  return (
    <Element
      className={containerClasses}
      {...elementProps}
    >
      <span
        className={[
          selectedVariant,
          'w-full md:!w-auto',
          isDisabled && variant === 'black' ? '!bg-grey-30 !text-grey-00' : '',
          isDisabled && variant === 'white' ? '!bg-grey-10 !text-grey-30' : '',
          isDisabled &&
          (variant === 'glass' ||
            variant === 'glassArrow' ||
            variant === 'glassWithoutIcon')
            ? '!bg-transparent !text-grey-20 !border !border-solid !border-grey-20'
            : '',
          isDisabled && variant === 'onlyText' ? '!text-grey-30' : '',
          !isDisabled && variant === 'black' ? 'active:bg-orange' : '',
          !isDisabled &&
          (variant === 'glass' ||
            variant === 'glassArrow' ||
            variant === 'glassWithoutIcon')
            ? 'active:text-grey-40 active:!bg-grey-00 active:backdrop-blur-none active:border-grey-00 active:shadow-none'
            : '',
          !isDisabled && variant === 'onlyText' ? 'active:text-orange' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {variant === 'black' && (
          <div
            className={`w-[8px] h-[8px] rounded-full duration-300 ${
              isDisabled
                ? 'bg-grey-00'
                : 'bg-grey-00 group-hover:bg-orange group-active:bg-grey-00'
            }`}
          />
        )}
        {variant === 'white' && (
          <div
            className={`w-[8px] h-[8px] rounded-full duration-300 ${
              isDisabled ? 'bg-grey-30' : 'bg-grey-40 group-hover:bg-orange'
            }`}
          />
        )}
        {variant !== 'glassArrow' && copy}
        {loading && (
          <span className="ml-3 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {(variant === 'glass' || variant === 'glassArrow') && !loading && (
          <ArrowLeftLight
            color="currentColor"
            className="duration-300"
          />
        )}
      </span>
    </Element>
  );
};

export default Button;
