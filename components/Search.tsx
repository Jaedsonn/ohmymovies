"use client";

import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { handleSelected as select } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const path = usePathname();
  const searchparams = useSearchParams();

  const handleChange = useDebouncedCallback((term: string) => {
    select(term, searchparams, router, path, "query");
  }, 400);

  return (
    <Input
      placeholder="Search for Movies"
      type="search"
      onChange={(e) => handleChange(e.target.value)}
      className={`max-w-96`}
      disabled
    ></Input>
  );
}
