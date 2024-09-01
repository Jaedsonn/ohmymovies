"use client";

import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { handleSelected as select } from "@/app/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const path = usePathname();
  const searchparams = useSearchParams();

  const handleChange = useDebouncedCallback((term: string) => {
    select(term, searchparams, router, path, "query");
  }, 300);

  return (
    <Input
      placeholder="Search for Movies"
      type="search"
      onChange={(e) => {
        handleChange(e.target.value);
        select("1", searchparams, router, path, "page");
      }}
      className={`max-w-96 min-w-32`}
    ></Input>
  );
}
