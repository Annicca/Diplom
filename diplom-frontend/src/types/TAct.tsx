import { TAgeCategory } from "./TAgeCategory";
import { TGenre } from "./TGenre";
import { TGroupCategory } from "./TGroupCategory";

export interface TAct {
    id: number;
    countParticipants: number;
    genre: TGenre;
    ageCategory: TAgeCategory;
    groupCategory: TGroupCategory;
    award?: string | null;
}

export interface TActDto {
    countParticipants: number;
    genre: TGenre;
    ageCategory: TAgeCategory;
    groupCategory: TGroupCategory;
}