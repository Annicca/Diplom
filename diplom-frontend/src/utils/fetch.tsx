import axios from "axios"
import { getCookie } from "react-use-cookie"

export const URL_BASE:string = "http://localhost:8080/api/"

export const instance = axios.create({
    baseURL: URL_BASE,
    headers: {'Content-Type': 'application/json'},
})

export const fetchData = async (url: string, params?: object, options?: object) => {
    
    return await instance.get(URL_BASE + url,
        {
            params: params,
            ...options
        })
        .then((resp) => resp.data)
        .catch((error) => {
            console.log(error)
            if(error.response) throw new Error(error.response.data.message)
            else throw new Error(error.message)
        })
}

export const getRequestConfig = () =>{
    const token = getCookie('jwt');
    return ({headers: {Authorization: `Bearer ${token}`}});
}

export const getFileConfig = () =>{
    const token = getCookie('jwt');
    return ({headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}});
}

export const getDownloadConfig = () => {
    return(
        {
            responseType: 'blob',
        }
    )
}