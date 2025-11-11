import Button from '@/components/buttons/Button';
import ArrowLeftLight from '@/svg/arrow-left-light';

export default function CaseCard({
  id,
  brand,
  pre,
  title,
  description,
  metric,
  metricDescription,
  image,
  ctaLabel = 'Conocer más',
  link,
  premetric,
  postmetric,
}) {
  const metricWidthDesktop = id === 3 ? 'xl:w-[32%]' : 'xl:w-[25%]';

  return (
    <article className="relative flex h-[700px] flex-col overflow-hidden rounded-[40px] bg-grey-30 text-grey-00">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
      <img
        src={image}
        alt={`Imagen del caso ${brand}`}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <img
            src={brand}
            alt={`Imagen del caso ${brand}`}
            className="w-[100px] md:w-auto"
          />
          <a
            href={link}
            className="text-xs uppercase tracking-[0.35em] glass w-14 h-14 rounded-full flex items-center justify-center text-orange rotate-[-45deg]"
          >
            <ArrowLeftLight />
          </a>
        </div>

        <div className="flex flex-col">
          <div className="md:flex md:gap-6 relative">
            <div className="md:w-[65%] xl:w-[65%]">
              <p className="mb-3 uppercase text-white">
                <span className="w-3 h-3 rounded-full relative top-[1px] inline-block mr-2"></span>
                {pre}
              </p>
              <h3 className="md:text-2xl font-semibold leading-tight text-3xl mb-3 ">
                {title}
              </h3>
              <p className="mb-4 leading-relaxed text-grey-00/85 text-base md:text-sm md:mb-8">
                {description}
              </p>
              <Button
                copy={ctaLabel}
                variant="white"
                className="hidden xl:flex xl:justify-start"
                url={link}
              />
            </div>

            <div
              className={`w-full justify-end gap-0 md:w-[35%] md:flex md:flex-col ${metricWidthDesktop} xl:absolute xl:bottom-0 xl:right-0`}
            >
              <p className="flex items-center gap-1 md:mb-2">
                <span className="text-xl font-sora xl:text-7xl">
                  {premetric}
                </span>
                <span className="font-sora text-4xl xl:text-9xl">{metric}</span>
                <span className="text-[18px] font-inter xl:text-[40px]">
                  {postmetric}
                </span>
              </p>
              <p className="!text-sm mb-8 md:mb-8 xl:!text-2xl xl:pl-12">
                {metricDescription}
              </p>
            </div>
          </div>

          <Button
            copy={ctaLabel}
            variant="white"
            className="self-start xl:hidden"
            url={link}
          />
        </div>
      </div>
    </article>
  );
}
