import { useNavigate } from "react-router-dom"
import { setCookie } from "react-use-cookie"
import { useUserContext } from "src/context/user-context/useUserContext"

export const useLogout = () => {
    const {changeUser} = useUserContext()
    const navigate = useNavigate()

    return () => {
        localStorage.removeItem('user')
        setCookie('jwt','',{path:"/"})
        changeUser(null)
        navigate('/')
    }
}