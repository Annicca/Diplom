import { TGenre } from "./TGenre";

export interface TNomination {
    id: number;
    name: string;
    genres?: TGenre[]
}