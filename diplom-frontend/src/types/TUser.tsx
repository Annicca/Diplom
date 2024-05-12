import { ERole } from "./ERole";
import { ETypeUser } from "./ETypeUser";

export interface TUser {
    idUser: number,
    typeUser: ETypeUser,
    organizationName?: string;
    surnameUser: string,
    nameUser: string,
    patronimycUser: string,
    loginUser: string,
    passwordUser: string,
    mailUser: string,
    phoneUser?: string,
    role: ERole,
    bikBank?: string;
	inn?: string;
	kpp?: string;
	legalAddress?: string;
	settlementAccount?: string;
	withNds?: boolean;
}