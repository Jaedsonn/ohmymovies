import { ModeToggle } from "@/app/components/Buttons";
import { CardSkeleton, GradleSkeleton } from "@/app/components/Skelletons";
import { searchParams as ParamsType } from "@/app/lib/definitioins";
import Gradle from "@/app/components/Gradle";
import { Suspense } from "react";
import { Header } from "@/app/components/Header";
import { Pagination } from "@/app/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: ParamsType;
}) {
  const page = searchParams?.page || "1";
  const genre = searchParams?.genre || "";
  const adult = searchParams?.adult || "";
  const language = searchParams?.language || "";
  const query = searchParams?.query || ""

  return (
    <div
      className={`flex flex-col items-center gap-8 p-6 h-auto`}
    >
      <Header />
      <Suspense fallback={<GradleSkeleton />}>
        <Gradle adult={adult} language={language} page={page} genre={genre} query={query}/>
      </Suspense>
    </div>
  );
}
