"use client";

import { Search } from "@/app/components/Search";
import { Filter } from "@/app/components/Dropdowns";
import { categories, generos, languages } from "@/app/lib/utils";
import { ModeToggle } from "./Buttons";

export function Header() {
  return (
    <header
      className={`flex flex-col gap-4 items-start w-full grow-0 shrink-1 sticky top-0 z-50 dark:bg-zinc-950 bg-white pb-4 `}
    >
      <div className={`flex flex-col w-full md:items-start items-center`}>
        <h1 className={`font-semibold text-2xl`}>Welcome to Oh My Movies</h1>
        <h2 className={`text-base font-normal`}>
          All your movies in a simple page
        </h2>
      </div>
      <nav className="flex w-full  justify-center flex-1 flex-wrap">
        <div
          className={`flex gap-5 w-full shrink  md:justify-start justify-center items-center flex-wrap`}
        >
          <Search />
          <Filter source={categories} label={"Category"} paramName={"adult"} />
          <Filter source={generos} label={"Genre"} paramName={"genre"} />
          <Filter
            source={languages}
            label={"Language"}
            paramName={"language"}
          />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
