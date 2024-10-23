"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Package2, Menu, CircleUser } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Link from "next/link";
import { Filter } from "./Dropdowns";
import { ModeToggle } from "./Buttons";
import { categories, generos, languages } from "@/app/lib/utils";
import { Search } from "./Search";
import { deleteCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const logout = () => {
    deleteCookie("token");
    router.replace("/");
  };

  return (
    <header className="sticky w-full  top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={`/movies?${searchParams.toString()}`}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Filter source={categories} label={"Category"} paramName={"adult"} />
        <Filter source={generos} label={"Genre"} paramName={"genre"} />
        <Filter source={languages} label={"Language"} paramName={"language"} />
        <ModeToggle />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <div
              className={`flex gap-5 w-full shrink  md:justify-start justify-center items-center flex-wrap`}
            >
              <Filter
                source={categories}
                label={"Category"}
                paramName={"adult"}
              />
              <Filter source={generos} label={"Genre"} paramName={"genre"} />
              <Filter
                source={languages}
                label={"Language"}
                paramName={"language"}
              />
              <ModeToggle />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Search />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-50 bg-zinc-900 p-4 rounded-md flex flex-col items-center"
          >
            <DropdownMenuLabel className="p-2">
              <Button variant={"secondary"} className="bg-blue-700">
                My Account
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="h-px bg-zinc-700" />
            <DropdownMenuItem className="p-1">
              <Button variant={"destructive"} onClick={() => logout()}>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;
