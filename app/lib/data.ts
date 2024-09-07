import { CardMovie, GetMovies, PopularMovieCard } from "./definitioins";
import ky from "ky";
import { instance, searchInstance } from "./utils";

export async function getMovie(
  page: string,
  language: string,
  adult: string,
  genre: string,
  query: string
): Promise<GetMovies | null> {
  try {
    let data: CardMovie[] = [];
    let pages: number = 1;

    let currentPage = page;
    
      let request = await instance.get(
        `movie?include_adult=${adult}&language=${language}&page=${
          currentPage
        }&sort_by=popularity.desc&with_genres=${genre}&region=BR&with_original_language=en`
      );
      if (query) {
        request = await searchInstance.get(
          `movie?query=${query}&include_adult=true&language=en-US&page=${
            currentPage
          }`
        );
      }
      const toJson: { results: CardMovie[]; total_pages: number } =
        await request.json();
      const results: CardMovie[] = toJson?.results;
      data = [...data, ...results];
      pages = toJson?.total_pages > 500 ? 500 : toJson?.total_pages;
    

    return { data, pages };
  } catch (error) {
    return null;
  }
}

export async function getPopularMovies(apikey: string, language: string) {
  try {
    const request = await ky.get(
      `https://api.themoviedb.org/3/movie/popular?language=${language}&page=1&api_key=${apikey}`
    );
    const toJson: { results: PopularMovieCard[] } = await request.json();
    return toJson?.results;
  } catch (error) {
    return null;
  }
}
