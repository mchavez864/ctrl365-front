import Navbar from '@/components/navbar/Navbar';
import SectionCasosDeExito from './components/SectionCasosDeExito';
import SectionResultadosCasosdeExito from './components/SectionResultadosCasosdeExito';

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
