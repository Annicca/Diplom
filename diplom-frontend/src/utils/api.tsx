import { TUser } from "src/types/TUser"
import { fetchData, getFileConfig, getRequestConfig, instance } from "./fetch"
import { setCookie } from "react-use-cookie"
import { ETypeUser } from "src/types/ETypeUser"
import { useQuery } from "@tanstack/react-query"
import { TCIty } from "src/types/TCity"
import { TStatement } from "src/types/TStatement"
import { TStatementParticipantDto } from "src/types/TStatementParicipant"
import { competitionDetailQuery } from "src/pages/CompetitionDetail/competitionDetailQuery"
import { AxiosError } from "axios"
import { TCompetition } from "src/types/TCompetition"
import { TGroup } from "src/types/TGroup"


export interface ILoginRequest {
    login:string,
    password: string
}

/**
 * Авторизация пользователя
 * @param loginData - должно содержать логин и пароль
 * @returns пользователя
 */
export const login = async (loginData: ILoginRequest):Promise<TUser> => {
    return instance.post('login', loginData)
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setCookie('jwt', response.data.token, {
                path:"/"
            });
            return response.data.user;
        })
        .catch((error) => {
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

export interface IRegisterRequest {
    typeUser: ETypeUser,
    organizationName?: string;
    surnameUser: string,
    nameUser: string,
    patronimycUser?: string,
    loginUser: string,
    mailUser: string,
    phoneUser?: string,
    passwordUser: string,
    confirmPassword?: string,
    bikBank?: string;
	inn?: string;
	kpp?: string;
	legalAddress?: string;
	settlementAccount?: string;
	withNds?: boolean;
}

/**
 * Регистрация пользователя
 * @param registerData - данные пользователя
 * @returns пользователя
 */

export const registerUser = async(registerData: IRegisterRequest):Promise<TUser> => {
    delete registerData.confirmPassword
    return instance.post('register', registerData)
        .then((response) => {
            setCookie('jwt',response.data.token,{path:"/"});
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data.user;
        })
        .catch((error) =>{
            if(error.response) {
                if(error.response.data.errors) throw new Error(error.response.data.errors)
                throw new Error(error.response.data.message)
            }
                
            else throw new Error(error.message)
        })
}

/**
 * Выход из аккаунта
 */
export const logout = () => {
    localStorage.removeItem('user')
    setCookie('jwt','',{path:"/"})
}

/**
 * Редактирование коллектива
 */

export const editGroup = async (groupData: FormData) => {
    return instance.put('groups', groupData, getFileConfig())
       .catch((error) => {
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

/**
 * Удаление коллектива
 * @param idGroup - идентификатор группы
 * @returns ничего
 */

export const deleteGroup = async (idGroup: number) => {
    return instance.delete(`groups/${idGroup}`, getRequestConfig())
        .catch((error) => {
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

/**
 * Отмена конкурса
 * @param idCompetition - идентификатор конкурса
 * @returns ничего
 */

export const cancelCompetition = async (idCompetition: number) => {
    return instance.put(`competitions/cancel/${idCompetition}`, {}, getRequestConfig())
        .catch((error) => {
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

/**
 * Изменить статус заявки на размещение
 * @param idStatement - идентификатор заявки
 * @param status - статус заявки
 * @returns ничего
 */

export const changeStatementStatus = async (idStatement: number, status: string) => {
    return instance.put(`statements/${status}/${idStatement}`, {},  getRequestConfig() )
        .catch((error) => {
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

/**
 * Смена роли пользователя
 * @param user измененный пользователь
 */

export const changeRoleUser = async (user: TUser) => {
    return instance.put('users', user, getRequestConfig())
        .catch((error) => {
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

/**
 * Получить города
 */

export const getCities = async(): Promise<TCIty[]> => fetchData('cities', {}, getRequestConfig())

export const useCities = () => useQuery(['cities'], getCities)

/**
 * Подать заявку на размещение
 * @param statement - данные заявки на размещение коллектива или конкурса
 */
export const sendStatement = async (statement: FormData, idUser: number): Promise<TStatement> => {
    return instance.post(`statements/${idUser}`, statement, getFileConfig())
        .then((response) => response.data)
        .catch((error) => {
            if(error.response) {
                if(error.response.data.errors) throw new Error(error.response.data.errors)
                throw new Error(error.response.data.message)
            }
                
            else throw new Error(error.message)
        })
}

/**
 * Получить пользователя
 * @param id - идентификатор пользователя
 */
export const getUser = async(id: number): Promise<TUser> => fetchData(`users/${id}`, {}, getRequestConfig())

/**
 * Хук для получения коллективов пользователя
 */
export const useUserGroupList = (id: number) => 
    useQuery<TGroup[], AxiosError>(["mygroups/list", id], 
        () => fetchData(`mygroups/list/${id}`, {}, getRequestConfig()))

/**
 * Хук для получения конкурса
 */
export const useCompetition = (id: number | string) => useQuery<TCompetition, AxiosError>({...competitionDetailQuery(id)})

/**
 * Подать заявку на участие
 * @param statement - данные заявки на участие
 */
export const tajePart = async(statement:TStatementParticipantDto) => {
    return instance.post('statementsparticipant', statement, getRequestConfig())
        .then((response) => response.data)
        .catch((error) => {
            if(error.response) {
                if(error.response.data.errors) throw new Error(error.response.data.errors)
                throw new Error(error.response.data.message)
            }
                
            else throw new Error(error.message)
        })
}
