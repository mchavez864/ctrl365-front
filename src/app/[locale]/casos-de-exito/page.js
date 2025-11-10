import Navbar from '@/components/navbar/Navbar';
import SliderCasosDeExito from './components/SliderCasosDeExito';
import CasosDeExito from './components/CasosDeExito';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40">
        <CasosDeExito />
      </main>
    </>
  );
}
