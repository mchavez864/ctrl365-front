'use client';

import ArrowLeftLight from '@/svg/arrow-left-light';
import ArrowLeft from '@/svg/arrow-left';

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
      'leading-[110%] tracking-[-0.32px] font-normal bg-grey-40 text-grey-00 px-[32px] h-12  items-center justify-center rounded-[900px] relative flex gap-[8px]',
    white:
      'leading-[110%] tracking-[-0.32px] bg-grey-00 text-grey-40 px-[32px] h-10 items-center justify-center rounded-[900px] relative flex gap-[8px]',
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
    `cursor-pointer flex items-center justify-center relative font-semibold group gap-[2px] transition-all duration-300 ease-in-out ${
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
          <span
            className={`rounded-full transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden ${
              isDisabled
                ? 'w-[8px] h-[8px] bg-grey-00'
                : 'w-[8px] h-[8px] bg-grey-00 group-hover:w-[26px] group-hover:h-[26px] group-hover:p-1 group-hover:bg-orange'
            }`}
          >
            <span className={`relative inline-block overflow-hidden transition-all duration-300 ease-in-out ${
              isDisabled 
                ? 'w-0 h-0' 
                : 'w-0 h-0 group-hover:w-[18px] group-hover:h-[15px]'
            }`}>
              <ArrowLeft
                color={isDisabled ? '#000000' : '#000000'}
                className={`absolute -translate-x-[200%] opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-75 ${
                  isDisabled ? '' : ''
                }`}
                width="18"
                height="15"
              />
            </span>
          </span>
        )}
        {variant === 'white' && (
          <span
            className={`rounded-full transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden ${
              isDisabled
                ? 'w-[8px] h-[8px] bg-grey-30'
                : 'w-[8px] h-[8px] bg-grey-40 group-hover:w-[26px] group-hover:h-[26px] group-hover:p-1 group-hover:bg-grey-40'
            }`}
          >
            <span className={`relative inline-block overflow-hidden transition-all duration-300 ease-in-out ${
              isDisabled 
                ? 'w-0 h-0' 
                : 'w-0 h-0 group-hover:w-[18px] group-hover:h-[15px]'
            }`}>
              <ArrowLeft
                color={isDisabled ? '#666666' : '#ffffff'}
                className={`absolute -translate-x-[200%] opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-75 ${
                  isDisabled ? '' : ''
                }`}
                width="18"
                height="15"
              />
            </span>
          </span>
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
