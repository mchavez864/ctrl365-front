import Navbar from '@/components/navbar/Navbar';
import NuestroDiferencial from '@/components/nuestroADN/NuestroDiferencial';
import Frameworks from '@/components/nuestroADN/Frameworks';
import HeroNuestroAdn from '@/components/nuestroADN/HeroNuestroAdn';
import PaisesNuestroAdn from '@/components/nuestroADN/PaisesNuestroAdn';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        <HeroNuestroAdn />
        <PaisesNuestroAdn />
        <Frameworks />
        <NuestroDiferencial />
      </main>
    </>
  );
}
