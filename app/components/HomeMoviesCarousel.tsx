"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";

import { CardMovie, PopularMovieCard } from "../lib/definitioins";
import HomeCarouselCard from "./HomeCarouselCard";
import Card from "./Card";
import Image from "next/image";
import { Badge } from "@/app/components/ui/badge";
import { Generos } from "../lib/utils";
import { Star } from "lucide-react";

export function HomeMoviesCarousel({
  movies,
}: {
  movies: PopularMovieCard[] | null;
}) {
  const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });

  return (
    <Carousel
      plugins={[plugin]}
      className="w-auto"
    
      onMouseLeave={plugin.reset}
    >
      <CarouselContent className={`w-full`}>
        {movies?.map((movie: PopularMovieCard, index: number) => (
          <CarouselItem key={index}>
            <HomeCarouselCard
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            >
              <div className={`flex gap-5`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  width={300}
                  height={450}
                  alt="Movie poster"
                  className={`rounded-md`}
                />
                <div className={`flex  flex-col justify-between`}>
                  <div>
                    <h1 className={`font-bold text-4xl mb-8`}>
                      {movie.original_title}
                    </h1>
                    <p className={` text-xl font-normal max-w-3xl mb-4`}>
                      {movie.overview}
                    </p>
                    <span
                      className={`font-normal text-xl flex items-center gap-2`}
                    >
                      <Star />
                      {movie.vote_average}
                    </span>
                  </div>
                  <div className={`flex gap-2`}>
                    {movie.genre_ids?.map((genre: number) => (
                      <Badge key={genre} className={`text-base `}>
                        {Generos[genre]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </HomeCarouselCard>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
