import { TCIty } from "./TCity"
import { TUser } from "./TUser"

export type TStaement = {
    idStatement: number,
    user: TUser,
    type: string,
    name: string,
    description: string,
    city: TCIty,
    address: string | null,
    dateStart: string | null,
    dateFinish: string | null,
    statusStatement: string | null
}