import { EStatusCompetition } from "./EStatusCompetition";
import { TCIty } from "./TCity";
import { TGroup } from "./TGroup";
import { TUser } from "./TUser";

export interface TCompetition {
    idCompetition: number,
    user: TUser,
    nameCompetition: string,
    descriptionCompetition: string,
    dateStart:string,
    dateFinish: string,
    cityCompetition: TCIty,
    statusCompetition: EStatusCompetition,
    img: string,
    groups: TGroup[]
}