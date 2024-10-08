import Image from "next/image";
import { Star } from "lucide-react";

export default async function Card({
  name,
  director,
  image,
}: {
  name: string;
  director: string;
  image: string;
}) {
  name = name.length >= 15 ? name.slice(0, 16) + "..." : name;

  return (
    <div className={`max-w-36 h-fit flex flex-col gap-3 justify-between`}>
      <Image
        src={`https://image.tmdb.org/t/p/w400${image}`}
        alt="Movie poster"
        width={300}
        height={450}
        className="rounded-lg object-cover"
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
