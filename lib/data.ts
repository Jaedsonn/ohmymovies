import { CardMovie, GetMovies, TotalPages } from "./definitioins";
import { instance } from "./utils";

export async function getMovie(
  page: string,
  language: string,
  adult: string,
  genre: string
): Promise<GetMovies | null> {
  try {
    let data: CardMovie[] = [];
    let pages: TotalPages = { total_pages: 1 };

    for (let i = 0; i < 2; i++) {
      const request = await instance.get(
        `?include_adult=${adult}&language=${language}&page=${
          Number(page) + i
        }&sort_by=popularity.desc&with_genres=${genre}&region=BR&with_original_language=en`
      );
      const toJson: { results: CardMovie[]; total_pages: TotalPages } =
        await request.json();

      pages = toJson?.total_pages;
      const results: CardMovie[] = toJson?.results;
      data = [...data, ...results];
    }

    return  { data, pages };
  } catch (error) {
    return null;
  }
}
