import { IOption } from "./IOption";
import { TAgeCategory } from "./TAgeCategory";
import { TGenre } from "./TGenre";
import { TGroupCategory } from "./TGroupCategory";
import { TNomination } from "./TNomination";

export interface TAct {
  id?: number;
  name: string;
  countPeople: number;
  nomination: TNomination;
  genre?: TGenre;
  ageCategory: TAgeCategory;
  groupCategory: TGroupCategory;
  award?: string | null;
}

export interface TActDto {
  name: string;
  countPeople: number;
  nomination?: IOption<TNomination> | null;
  genre?: IOption<TGenre> | null;
  ageCategory?: IOption<TAgeCategory> | null;
  groupCategory?: IOption<TGroupCategory> | null;
}
