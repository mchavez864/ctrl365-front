import Image from "next/image";
import Button from "@/components/buttons/Button";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";



export default async function Home() {
  const t = await getTranslations("Home");
  return (
      <main className="bg-grey-40">
        <h1 className="text-grey-00">{t("title")}</h1>
      </main>
  );
}
