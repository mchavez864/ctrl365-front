import Navbar from '@/components/navbar/Navbar';
import SectionCasosDeExito from '@/components/casos-de-exito/SectionCasosDeExito';
import SectionResultadosCasosdeExito from '@/components/casos-de-exito/SectionResultadosCasosdeExito';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40">
        <SectionCasosDeExito />
        <SectionResultadosCasosdeExito />
      </main>
    </>
  );
}
