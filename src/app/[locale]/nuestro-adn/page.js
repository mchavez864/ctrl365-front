import Navbar from '@/components/navbar/Navbar';
import NuestroDiferencial from '@/components/nuestroADN/NuestroDiferencial';
import Frameworks from '@/components/nuestroADN/Frameworks';
import HeroNuestroAdn from '@/components/nuestroADN/HeroNuestroAdn';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        <HeroNuestroAdn />
        <Frameworks />
        <NuestroDiferencial />
      </main>
    </>
  );
}
