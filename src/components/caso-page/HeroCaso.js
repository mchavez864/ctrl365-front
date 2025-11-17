import Image from 'next/image';
import SmallCard from '../cards/SmallCard';

export default function HeroCaso({ slug, title, data }) {
  return (
    <>
      <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 overflow-hidden relative">
        <div className="mb-8 md:mb-16 md:flex md:items-start lg:mb-24 lg:justify-between">
          <div className="flex flex-col md:w-1/2 lg:w-2/3">
            <h1 className="mb-16 md:mb-8 order-2 md:order-1 lg:max-w-[648px] xxl:max-w-[1000px]">
              {title}
            </h1>
            <img
              src="/images/pages/casos-de-uso/caso/logo.svg"
              alt=""
              width={149}
              height={26}
              className="max-w-[98px] mb-4 md:max-w-full md:mb-0 order-1 md:order-2"
            />
          </div>
          <div className="md:w-1/2 lg:w-1/3">
            <p className="mb-8 lg:mb-16 lg:!text-[18px]">
              La demanda de préstamos prendarios crecía con fuerza en Argentina.
              Santander necesitaba escalar la originación y aprobación sin
              sacrificar experiencia del cliente ni control operativo.
            </p>
            <div className="border-l-4 border-orange pl-4 py-2 mb-8 lg:py-1 lg:mb-16">
              <p className="!font-sora mb-2 text-xl flex items-center gap-2 lg:!text-2xl">
                + <span className="text-[32px] lg:!text-[48px]">1.5</span> M USD
              </p>
              <small className="block text-sm text-grey-30 max-w-[186px] leading-[120%] font-inter lg:text-base">
                Decisiones en el punto de venta
              </small>
            </div>
            <SmallCard
              copy="SCROLL"
              colorCircle="bg-grey-30"
              colorCopy="text-grey-30"
            />
          </div>
        </div>
        <figure className="h-[218px] rounded-4xl overflow-hidden mb-8 md:mb-16 md:h-[462px] lg:h-[786px] lg:mb-24">
          <Image
            src="/images/pages/casos-de-uso/caso/santander.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="mb-8 md:mb-16 lg:mb-24 lg:flex">
          <div className="lg:w-1/6">
            <SmallCard
              copy="CHALLENGE"
              className="mb-4  lg:mb-0"
            />
          </div>
          <div className="lg:w-5/6">
            <h2 className="mb-8 xxl:max-w-[1050px]">
              El reto era absorber un pico de demanda manteniendo tiempos de
              respuesta de minutos, no de días.
            </h2>
            <p className="!text-[18px] text-grey-30 lg:max-w-[544px]">
              Además había que aumentar throughput, mejorar la experiencia en
              concesionarias y asegurar cumplimiento normativo de punta a punta.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
