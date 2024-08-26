"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, generos, handleSelected as select } from "@/app/lib/utils";
import { DropdownType } from "@/app/lib/definitioins";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function Filter({
  source,
  label,
  paramName,
}: {
  source: DropdownType[];
  label: string;
  paramName: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<DropdownType | null>(null);

  const path = usePathname();
  const searchparams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4 max-w-44 grow">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? <>{selectedStatus.label}</> : <> Set {label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {source.map((status) => (
                  <CommandItem
                    key={status.value.toString()}
                    value={status.value.toString()}
                    onSelect={(value: string) => {
                      select(value, searchparams, router, path, paramName);
                      setSelectedStatus(
                        source.find(
                          (priority) => priority.value.toString() === value
                        ) || null
                      );
                      setOpen(false);
                    }}
                  >
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
