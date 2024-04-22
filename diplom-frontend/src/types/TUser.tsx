import { ERole } from "./ERole";

export interface TUser {
    idUser: number,
    surnameUser: string,
    nameUser: string,
    patronimycUser: string,
    loginUser: string,
    passwordUser: string,
    mailUser: string,
    phoneUser?: string,
    role: ERole
}