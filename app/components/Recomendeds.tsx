import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getSimilarMovie } from "../lib/data";
import { CardMovie, SingleMovie } from "../lib/definitioins";
import Card from "./Card";

export default async function Recomendeds({ movieId }: { movieId: number }) {
  const recomendeds = await getSimilarMovie(movieId, process.env.API_KEY || "");
  
  return (
    <Carousel className="">
      <CarouselContent className="p-12">
        {recomendeds?.results?.map((movie: SingleMovie, index: number) => (
          <CarouselItem key={index} className="basis-auto">
            <Card
              name={movie.original_title}
              director={movie.vote_average.toString()}
              image={movie.poster_path}
              key={index}
              movieId={movie.id}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
