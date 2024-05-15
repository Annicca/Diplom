import { TUser } from "./TUser";

export interface TUserContext {
    user: TUser | null,
    changeUser: (user: TUser) => void
}