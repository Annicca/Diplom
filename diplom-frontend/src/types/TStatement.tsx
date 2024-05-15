import { TCIty } from "./TCity"
import { TUser } from "./TUser"

export type TStatement = {
    idStatement: number,
    user: TUser,
    type: string,
    name: string,
    description: string | null,
    city: TCIty,
    address: string | null,
    dateStart: string | null,
    dateFinish: string | null,
    statusStatement: string | null,
    competitionFee: number | null,
    rules: string | null,
    regulation: string | null,
}