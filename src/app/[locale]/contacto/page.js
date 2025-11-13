import Navbar from '@/components/navbar/Navbar';
import HeroPage from '@/components/hero/HeroPage';
import SectionForm from '@/components/sections/SectionForm';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40">
        <HeroPage />
        <SectionForm />
      </main>
    </>
  );
}
