"use client";
import { Skeleton } from "@/app/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className={`max-w-36 max-h-48 flex flex-col gap-3`}>
      <Skeleton className="h-36 w-36 max-h-36 max-w-36" />
      <div className={`flex flex-col gap-1 w-full items-start`}>
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}

export function GradleSkeleton() {
  return (
    <div className={`h-auto flex gap-6 flex-wrap w-full`}>
      {Array.from({ length: 40 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
