import Navbar from '@/components/navbar/Navbar';
import NuestroDiferencial from '@/components/nuestroADN/NuestroDiferencial';
import Frameworks from '@/components/nuestroADN/Frameworks';
import HeroNuestroAdn from '@/components/nuestroADN/HeroNuestroAdn';
import PaisesNuestroAdn from '@/components/nuestroADN/PaisesNuestroAdn';
import PremiosReconocimientos from '@/components/nuestroADN/PremiosReconocimientos';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        <HeroNuestroAdn />
        <PaisesNuestroAdn />
        <Frameworks />
        <NuestroDiferencial />
        <PremiosReconocimientos />
      </main>
    </>
  );
}
