import Image from "next/image";
import { Suspense } from "react";
import { CardSkeleton } from "./Skelletons";
import { Star} from "lucide-react";

export default function Card({
  name,
  director,
  image,
}: {
  name: string;
  director: string;
  image: string;
}) {
  return (
    <div className={`max-w-36 h-fit flex flex-col gap-3 justify-between`}>
      <Image
        src={`https://image.tmdb.org/t/p/w400${image}`}
        alt="Movie poster"
        width={150}
        height={150}
        className="rounded-lg object-cover max-h-36 min-h-36"
        placeholder="blur"
        blurDataURL="/image.svg"
      />

      <div className={`flex flex-col gap-1 w-full items-start`}>
        <h1 className={`font-black text-sm `}>{name}</h1>
        <h2 className={`font-normal text-sm flex items-center gap-2`}>
          <Star />
          {director}
        </h2>
      </div>
    </div>
  );
}
