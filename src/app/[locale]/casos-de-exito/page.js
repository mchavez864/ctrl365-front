import Navbar from '@/components/navbar/Navbar';
import SectionCasosDeExito from '@/components/casos-de-exito/SectionCasosDeExito';
import SectionResultadosCasosdeExito from '@/components/casos-de-exito/SectionResultadosCasosdeExito';
import Resultados from '@/components/casos-de-exito/Resultados';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        <Resultados/>
        <SectionCasosDeExito />
        <SectionResultadosCasosdeExito />
      </main>
    </>
  );
}
