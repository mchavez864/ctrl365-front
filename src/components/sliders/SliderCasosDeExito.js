'use client';

import SliderBase from '@/components/sliders/SliderBase';
import CaseCard from '@/components/cards/CaseCard';

export default function SliderCasosDeExito({
  renderSlide,
  variant = 'case',
  isHome = false,
  ...rest
}) {
  const defaultRenderer =
    renderSlide ||
    ((slide) => (
      <CaseCard
        {...slide}
        isHome={isHome}
      />
    ));
  const resolvedVariant = variant === 'case' ? 'custom' : variant;

  return (
    <SliderBase
      {...rest}
      variant={resolvedVariant}
      renderSlide={resolvedVariant === 'list' ? renderSlide : defaultRenderer}
    />
  );
}
