
const URL_BASE = "http://localhost:8080/api/"

export const fetchData = async (url: string) => {
    return await fetch(URL_BASE + url)
        .then((resp) => resp.json())
        .then((data) => data.content)
        .catch((error) => {
            console.log(error)
            throw new Error(error?.message)
        })
}