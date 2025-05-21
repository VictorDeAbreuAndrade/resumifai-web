import Image from "next/image";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return (
    <>
      <Header>
        <Image
          src="/ResumifAiLogo.png"
          alt="Resumif AI logo"
          width={450}
          height={38}
          priority
          />
      </Header>
      <Main />
    </>
  );
}
