import Image from "next/image";
import Button from "@/components/buttons/Button";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";



export default async function Home() {
  const t = await getTranslations("Home");
  return (
      <main className="bg-grey-40 relative">
        <Navbar />
        <Hero />
      </main>
  );
}
