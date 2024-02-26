import { TCIty } from "./TCity";
import { TUser } from "./TUser";

export interface TGroup {
    idGroup: number,
    director: TUser,
    nameGroup: string,
    descriptionGroup: string,
    cityGroup: TCIty,
    addressGroup:string,
    category: string,
    img: string
}