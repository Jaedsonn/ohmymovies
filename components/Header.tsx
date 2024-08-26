"use client";

import { Search } from "@/components/Search";
import { Filter } from "@/components/Dropdowns";
import { categories, generos, languages } from "@/lib/utils";
import { ModeToggle } from "./Buttons";

export function Header() {
  return (
    <header className={`flex flex-col gap-4 items-start w-full`}>
      <div>
        <h1 className={`font-semibold text-2xl`}>Welcome to Oh My Movies</h1>
        <h2 className={`text-base font-normal`}>
          All your movies in a simple page
        </h2>
      </div>
      <nav className="flex w-full gap-10">
        <div className={`flex gap-5`}>
          <Search />
          <Filter source={categories} label={"Category"} paramName={"adult"} />
          <Filter source={generos} label={"Genre"} paramName={"genre"} />
          <Filter
            source={languages}
            label={"Language"}
            paramName={"language"}
          />
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}
