import { ModeToggle } from "@/components/Buttons";
import { CardSkeleton, GradleSkeleton } from "@/components/Skelletons";
import { searchParams as ParamsType } from "@/lib/definitioins";
import Gradle from "@/components/Gradle";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: ParamsType;
}) {
  const page = searchParams?.page || "1";
  const genre = searchParams?.genre || "";
  const adult = searchParams?.adult || "";
  const language = searchParams?.language || "";

  return (
    <div
      className={`flex flex-col items-center gap-8 p-6 h-auto max-w-[1500px] ml-24`}
    >
      <Header />
      <Suspense fallback={<GradleSkeleton />}>
        <Gradle adult={adult} language={language} page={page} genre={genre} />
      </Suspense>
     
    </div>
  );
}
