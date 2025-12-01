import Image from "next/image";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return (
    <>
      <Header>
        <Image
          src="./ResumifAiLogo.png"
          alt="Resumif AI logo"
          width={450}
          height={38}
          priority
        />
      </Header>
      <div className="mt-4 italic text-center text-sm text-blue-300 text-shadow-[3px_4px_3.4px] text-shadow-blue-700">
        Summarize YouTube and TikTok videos in seconds!
      </div>
      <Main />
    </>
  );
}
