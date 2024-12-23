import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getSimilarMovie } from "../lib/data";
import { searchParams, SingleMovie } from "../lib/definitioins";
import Card from "./Card";

export default async function Recomendeds({
  movieId,
  searchParams,
}: {
  movieId: number;
  searchParams: searchParams;
}) {
  // TODO: Make a language sing with url params
  const recomendeds = await getSimilarMovie(
    movieId,
    process.env.API_KEY || "",
    searchParams?.language || "pt-br"
  );

  return (
    <Carousel className="">
      <CarouselContent className="p-12">
        {recomendeds?.results?.length! > 0 ? (
          recomendeds?.results?.map((movie: SingleMovie, index: number) => (
            <CarouselItem key={index} className="basis-auto">
              <Card
                name={movie.original_title}
                director={movie.vote_average.toString()}
                image={movie.poster_path}
                key={index}
                movieId={movie.id}
              />
            </CarouselItem>
          ))
        ) : (
          <h1>No movies recomendeds</h1>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
