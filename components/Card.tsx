import Image from "next/image";

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
    <div className={`max-w-36 max-h-48 flex flex-col gap-3`}>
      <Image
        src={`/image.svg`}
        alt="Movie poster"
        width={150}
        height={150}
        className="rounded-lg"
      />
      <div className={`flex flex-col gap-1 w-full items-start`}>
        <h1 className={`font-black text-sm `}>Movie</h1>
        <h2 className={`font-normal text-sm `}>Director</h2>
      </div>
    </div>
  );
}
