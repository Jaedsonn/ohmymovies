import Card from "@/app/components/Card";
import { InputSkeleton } from "@/app/components/Skelletons";
import { Input } from "@/app/components/ui/input";
import { getSingleMovie, getFavorites } from "@/app/lib/data";
import { SingleMovie } from "@/app/lib/definitioins";
import ky from "ky";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function account() {
  const token = cookies().get("token")?.value;
  const getUser = await ky.get(
    "https://ohmymovies-back.onrender.com/user/informations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const userInformations: User = await getUser.json();
  type User = {
    user: {
      username: string;
      email: string;
      password: string;
    };
  };

  const movies: SingleMovie[] = [];

  const favorites = (await getFavorites(token!)) || [];

  const moviePromises = favorites?.favorite?.map(async (movie: number) => {
    const movieData = await getSingleMovie(
      movie,
      process.env.API_HEADER || "",
      "pt-BR"
    );
    if (movieData) {
      movies.push(movieData);
    }
  });

  moviePromises && (await Promise.all(moviePromises));

  return (
    <Suspense fallback={<InputSkeleton />}>
      <section className={`w-full h-max flex flex-col items-start p-6 gap-10`}>
        <div className={`flex flex-col w-full`}>
          <h1 className="text-3xl font-bold mb-6">User informations</h1>
          <div className="flex flex-col gap-4 *:w-full w-full">
            <Input
              type="text"
              placeholder={`${userInformations?.user?.username}`}
              disabled
            />
            <Input
              type="text"
              placeholder={`${userInformations?.user?.email}`}
              disabled
            />
            <Input type="password" placeholder={`************`} disabled />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-6">Favorites movies</h1>
          <div className={`flex flex-col gap-8 items-center justify-center`}>
            <div
              className={`h-auto flex gap-6 flex-wrap w-fit items-center justify-center px-12`}
            >
              {movies.length > 0 ? (
                movies?.map((movie: SingleMovie, index: number) => (
                  <Card
                    name={movie.original_title}
                    director={movie.vote_average.toString()}
                    image={movie.poster_path}
                    key={index}
                    movieId={movie.id}
                  />
                ))
              ) : (
                <p className="text-2xl font-bold text-center">
                  No favorites movies
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
