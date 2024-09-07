"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { handleSelected as addParams } from "@/app/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const Pagination = ({ totalPages }: { totalPages: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

   const lastPage = Number(totalPages);
  const currentPage = searchParams.get("page") || "1";

  return (
    <div className={`flex gap-8 items-center self-end flex-wrap `}>
      <p className={`text-base font-semibold`}>
        Page {currentPage} of {totalPages}
      </p>
      <div className={`flex gap-2`}>
        <Button
          variant={`secondary`}
          disabled={currentPage == "1"}
          onClick={() => addParams("1", searchParams, router, pathname, "page")}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant={`secondary`}
          disabled={currentPage == "1"}
          onClick={() =>
            addParams(
              (Number(currentPage) - 1).toString(),
              searchParams,
              router,
              pathname,
              "page"
            )
          }
        >
          <ChevronLeft />
        </Button>
        <Button
          variant={`secondary`}
          disabled={currentPage == lastPage.toString()}
          onClick={() =>
            addParams(
              (Number(currentPage) + 1).toString(),
              searchParams,
              router,
              pathname,
              "page"
            )
          }
        >
          <ChevronRight />
        </Button>
        <Button
          variant={`secondary`}
          disabled={currentPage == lastPage.toString()}
          onClick={() =>
            addParams(
              lastPage.toString(),
              searchParams,
              router,
              pathname,
              "page"
            )
          }
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};
