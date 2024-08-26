export type DropdownType = {
  label: string;
  value: string | boolean;
};

export type CardMovie = {
  poster_path: string;
  original_title: string;
  vote_average: string;
};

export type searchParams = {
  page?: string;
  genre?: string;
  adult?: string;
  language?: string;
};

export type TotalPages = { total_pages: number }

export type GetMovies = {data: CardMovie[], pages:TotalPages}
