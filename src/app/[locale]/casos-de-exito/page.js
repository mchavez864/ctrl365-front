import Navbar from '@/components/navbar/Navbar';
import SectionCasosDeExito from '@/components/casos-de-exito/SectionCasosDeExito';
import SectionResultadosCasosdeExito from '@/components/casos-de-exito/SectionResultadosCasosdeExito';
import ResultadosWrapper from '@/components/casos-de-exito/ResultadosWrapper';
import SectionForm from '@/components/sections/SectionForm';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        <ResultadosWrapper />
        <SectionCasosDeExito />
        <SectionResultadosCasosdeExito />
        <SectionForm
          subject="Llega a jaubetete?"
          destination="matias@jaubet.com"
        />
      </main>
    </>
  );
}
