import Image from "next/image";
import Button from "@/components/buttons/Button";


export default function Home() {
  return (
      <main className="bg-grey-40">
        <Button copy="Click me" variant="white" />
      </main>
  );
}
