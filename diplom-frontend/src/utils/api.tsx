import { TUser } from "src/types/TUser"
import { getRequestConfig, instance } from "./fetch"
import { setCookie } from "react-use-cookie"

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
    surnameUser: string,
    nameUser: string,
    patronimycUser?: string,
    loginUser: string,
    mailUser: string,
    phoneUser?: string,
    passwordUser: string,
    confirmPassword?: string
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
            if(error.response) throw new Error(error.response.data.message)
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

