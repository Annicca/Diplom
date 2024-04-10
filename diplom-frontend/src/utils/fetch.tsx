import axios from "axios"

export const URL_BASE:string = "http://localhost:8080/api/"

const instance = axios.create({
    baseURL: URL_BASE,
    headers: {'Content-Type': 'application/json'}
})

export const fetchData = async (url: string, params: object) => {
    
    return await instance.get(URL_BASE + url,
        {
            params: params
        })
        .then((resp) => resp.data)
        .catch((error) => {
            console.log(error)
            if(error.response) throw new Error(error.response.data.error)
            else throw new Error(error.message)
        })
}