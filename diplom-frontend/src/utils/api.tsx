import { TUser } from "src/types/TUser"
import { instance } from "./fetch"
import { setCookie } from "react-use-cookie"

export interface ILoginRequest {
    login:string,
    password: string
}

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