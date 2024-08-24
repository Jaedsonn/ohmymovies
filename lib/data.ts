import { CardMovie } from "./definitioins";
import { instance } from "./utils";

export async function getMovie(page:string, language:string, adult:string) {
  try {
    const request = await instance.get(
      `?include_adult=${adult}&language=${language}&page=${page}&sort_by=popularity.desc`
    );
    const data: CardMovie[] = await request.json();
    return data;
  } catch (error) {
    return error;
  }
}
