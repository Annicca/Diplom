import { TUser } from "src/types/TUser"
import { instance } from "./fetch"
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

export const logout = () => {
    localStorage.removeItem('user')
    setCookie('jwt','',{path:"/"})
}

