import { TGenre } from "./TGenre";

export interface TNomination {
  id: number;
  name: string;
  genres?: TGenre[];
}

export interface TNominationDTO {
  name: string;
  genres?: TGenre[];
}
