import Image from 'next/image';
import SmallCard from '../cards/SmallCard';

export default function SolutionCaso({ slug, title, data }) {
  return (
    <>
      <section className="bg-grey-40 rounded-2xl mb-16 px-4 py-16 md:px-16 md:py-24 lg:rounded-4xl xl:py-32 xxl:p-32 overflow-hidden relative">
        {/* CHIFLO */}
        <div className="absolute right-0 top-0">
          <div className="relative w-[156px] h-[156px] lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-[316px] lg:h-[316px]">
            <div className="absolute top-0 left-0 w-[156px] h-[156px] lg:w-[316px] lg:h-[316px] bg-orange rounded-full blur-2xl will-change-transform"></div>
            <Image
              src="/images/orb.webp"
              alt=""
              width={405}
              height={405}
              className="w-[156px] h-auto z-30 relative lg:w-[316px]"
              priority
            />
            <div className="absolute top-0 left-0 w-[156px] h-[156px] lg:w-[316px] lg:h-[316px] bg-orange rounded-full opacity-90 mix-blend-soft-light z-40 pointer-events-none"></div>
          </div>
        </div>
        {/* CHIFLO */}
        <div className="lg:mb-32">
          <SmallCard
            copy="SOLUTION"
            colorCopy="text-white"
            className="mb-4"
          />
          <h2 className="mb-8 text-white lg:max-w-[869px] xxl:max-w-[824px] relative z-10">
            Transformamos la originación en una experiencia de mostrador:
            decisión en 20 minutos y fondos listos en 48–72 horas.
          </h2>
        </div>

        <div className="bg-red-500 lg:flex lg:justify-end relative z-10">
          <div className="bg-green-600 md:flex md:gap-8 lg:w-[58%]">
            <p className="text-white md:w-1/2">
              Agentes comerciales capturan la solicitud en el punto de venta;
              los datos se validan al instante y se disparan verificaciones,
              scoring y políticas de crédito. En menos de 20 minutos el cliente
              obtiene una decisión y el préstamo queda listo para desembolso en
              48-72 horas.
            </p>
            <p className="text-white md:w-1/2">
              El modelo es escalable a motos, camiones y otros productos de
              financiación.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-purple filter z-0 blur-[150px] w-[686px] h-[686px] absolute left-[-20%] bottom-[-50%]"></span>
      </section>
    </>
  );
}
