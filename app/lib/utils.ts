import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { DropdownType } from "./definitioins";
import ky from "ky";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generos: DropdownType[] = [
  { value: "28", label: "Ação" },
  { value: "12", label: "Aventura" },
  { value: "16", label: "Animação" },
  { value: "35", label: "Comédia" },
  { value: "80", label: "Crime" },
  { value: "99", label: "Documentário" },
  { value: "18", label: "Drama" },
  { value: "10751", label: "Família" },
  { value: "14", label: "Fantasia" },
  { value: "36", label: "História" },
  { value: "27", label: "Terror" },
  { value: "10402", label: "Música" },
  { value: "9648", label: "Mistério" },
  { value: "10749", label: "Romance" },
  { value: "878", label: "Ficção científica" },
  { value: "10770", label: "Cinema TV" },
  { value: "53", label: "Thriller" },
  { value: "10752", label: "Guerra" },
  { value: "37", label: "Faroeste" },
];

export enum Generos {
  Acao = 28,
  Aventura = 12,
  Animacao = 16,
  Comedia = 35,
  Crime = 80,
  Documentario = 99,
  Drama = 18,
  Familia = 10751,
  Fantasia = 14,
  Historia = 36,
  Terror = 27,
  Musica = 10402,
  Misterio = 9648,
  Romance = 10749,
  FiccaoCientifica = 878,
  CinemaTV = 10770,
  Thriller = 53,
  Guerra = 10752,
  Faroeste = 37,
}

export const categories: DropdownType[] = [
  { label: "Adult", value: true },
  { label: "Kids", value: false },
];

export const languages: DropdownType[] = [
  { label: "English", value: "en-US" },
  { label: "Portuguese", value: "pt-BR" },
  { label: "French", value: "fr" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Russian", value: "ru" },
];

export function handleSelected(
  value: string,
  searchparams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  path: string,
  paramName: string
) {
  const params = new URLSearchParams(searchparams);
  if (value) {
    params.set(paramName, value);
  } else {
    params.delete(paramName);
  }
  router.replace(`${path}?${params.toString()}`);
}

export const instance = ky.create({
  prefixUrl: "https://api.themoviedb.org/3/discover",
  headers: {
    Authorization: `Bearer ${process.env.API_HEADER}`,
  },
  method: "get"
});

export const searchInstance = ky.create({
  prefixUrl: "https://api.themoviedb.org/3/search",
  headers: {
    Authorization: `Bearer ${process.env.API_HEADER}`,
  },
  method: "get",
});

