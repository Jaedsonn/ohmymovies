import { CardMovie, GetMovies, TotalPages } from "./definitioins";
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
    let pages: TotalPages = { total_pages: 1 };

    for (let i = 0; i < 2; i++) {
      let request = await instance.get(
        `?include_adult=${adult}&language=${language}&page=${
          Number(page) + i
        }&sort_by=popularity.desc&with_genres=${genre}&region=BR&with_original_language=en`
      );
      if (query) {
        request = await searchInstance.get(
          `movie?query=${query}&include_adult=true&language=en-US&page=${
            Number(page) + i
          }`
        );
      }
      const toJson: { results: CardMovie[]; total_pages: TotalPages } =
        await request.json();
      const results: CardMovie[] = toJson?.results;
      data = [...data, ...results];
      pages = toJson?.total_pages;
    }

    return { data, pages };
  } catch (error) {
    return null;
  }
}
