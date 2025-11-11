import SliderCasosDeExito from '../../../../components/sliders/SliderCasosDeExito';

export default function CasosDeExito() {
  return (
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 overflow-hidden">
      <div className="mb-16 text-center lg:text-left xl:flex xl:justify-between xl:items-start">
        <h2 className="mt-3 text-3xl font-semibold text-grey-40 md:text-4xl lg:text-5xl">
          Diseñado para entregar resultados
        </h2>
        <p className="mt-4 max-w-xl text-base text-grey-20 md:text-lg">
          Soluciones reconocidas por su impacto en eficiencia, velocidad y
          crecimiento.
        </p>
      </div>
      <SliderCasosDeExito />
    </section>
  );
}
