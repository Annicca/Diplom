import { EStatusCompetition } from "./EStatusCompetition";
import { TCIty } from "./TCity";
import { TUser } from "./TUser";

export interface TCompetition {
    idCompetition: number,
    organizer: TUser,
    nameCompetition: string,
    descriptionCompetition: string,
    dateStart:string,
    dateFinish: string,
    cityCompetition: TCIty,
    statusCompetition: EStatusCompetition,
    img: string | null,
    competitionFee: number | null,
    rules: string | null,
    regulation: string | null,
}