export type DropdownType = {
  label: string;
  value: string | boolean;
};

export type CardMovie = {
  backdrop_path: string;
  original_title: string;
  vote_average: string;
};

export type searchParams = {
  page?: string;
  genre?: string;
  adult?: string;
  language?: string;
};
