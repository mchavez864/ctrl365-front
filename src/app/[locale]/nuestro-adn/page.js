import Navbar from '@/components/navbar/Navbar';
import NuestroDiferencial from '@/components/nuestroADN/NuestroDiferencial';
import Frameworks from '@/components/nuestroADN/Frameworks';

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        {/* <Frameworks /> */}
        <NuestroDiferencial />
      </main>
    </>
  );
}
