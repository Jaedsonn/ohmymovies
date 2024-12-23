import { Star } from "lucide-react";
import { getSingleMovie } from "../../lib/data";
import { Badge } from "../../components/ui/badge";
import Image from "next/image";
import Recomendeds from "../../components/Recomendeds";
import { searchParams as ParamsType } from "@/app/lib/definitioins";
import { FavoriteButton } from "@/app/components/Buttons";
import { cookies } from "next/headers";

const MoviePage = async ({
  params,
  searchParams,
}: {
  params: { movieId: number };
  searchParams: ParamsType;
}) => {
  const movie = await getSingleMovie(
    params.movieId,
    process.env.API_HEADER || "",
    searchParams?.language || "en-US"
  );

  return (
    <section className="h-screen w-full flex flex-col items-center gap-8 overflow-x-hidden">
      <div className="relative w-full max-h-700 ">
        <div
          className="absolute inset-0 w-full flex items-center justify-center bg-carousel-movie"
          style={{ zIndex: 1 }}
        >
          <div className={`flex gap-5  `}>
            <Image
              src={`https://image.tmdb.org/t/p/w400${movie?.poster_path!}`}
              width={300}
              height={450}
              alt="Movie poster"
              className={`rounded-md lg:max-w-80 `}
            />
            <div className={`flex  flex-col justify-between`}>
              <div>
                <h1 className={`font-bold text-4xl lg:mb-8 mb-4 `}>
                  {movie?.original_title}
                </h1>
                <p className={` text-xl font-normal max-w-3xl mb-4 `}>
                  {movie?.overview}
                </p>
                <span className={`font-normal text-xl flex items-center gap-2`}>
                  <Star />
                  {movie?.vote_average}
                </span>
              </div>
              <div className={`flex gap-2 flex-wrap`}>
                {movie?.genres?.map((genre) => (
                  <Badge key={genre.id} className={`text-base `}>
                    {genre.name}
                  </Badge>
                ))}
                <FavoriteButton
                  token={cookies().get("token")?.value!}
                  id={Number(params.movieId)}
                />
              </div>
            </div>
          </div>
        </div>

        <Image
          width={1000}
          height={490}
          alt="movie image"
          src={`https://image.tmdb.org/t/p/w400${movie?.backdrop_path!}`}
          className="w-full h-700 max-h-700 blur-sm lg:flex "
          quality={100}
          style={{ zIndex: 2 }}
        />
      </div>
      <Recomendeds
        movieId={params.movieId}
        searchParams={{
          language: searchParams.language,
        }}
      />
    </section>
  );
};

export default MoviePage;
