import Card from "./Card";
import { Pagination } from "./Pagination";
import { CardSkeleton } from "./Skelletons";
import { getMovie } from "@/app/lib/data";
import { CardMovie } from "@/app/lib/definitioins";

export default async function Gradle({
  adult,
  language,
  page,
  genre,
  query
}: {
  adult: string;
  language: string;
  page: string;
  genre: string;
  query:string
}) {
  const promise = await new Promise((res, rej) => {
    setTimeout(() => {
      res("oi");
    }, 1000);
  });

  const movies = await getMovie(page, language, adult, genre, query);
 
  return (
    <div className={`flex flex-col gap-8 items-center justify-center`}>
      <div className={`h-auto flex gap-6 flex-wrap w-fit items-center justify-center`}>
        {movies?.data?.map((movie: CardMovie, index: number) => (
          <Card
            name={movie.original_title}
            director={movie.vote_average}
            image={movie.poster_path}
            key={index}
          />
        ))}
      </div>
      <Pagination totalPages={`${movies?.pages}`} />
    </div>
  );
}
