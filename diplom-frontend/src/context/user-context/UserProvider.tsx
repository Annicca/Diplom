import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { TUser } from "src/types/TUser"
import { TUserContext } from "src/types/TUserContext"
import { UserContext } from "./context"

const useCreateUserContext = ():TUserContext => {
    const [user, setUser] = useState<TUser | null>(null)
    
    const changeUser = useCallback((newUser: TUser) => {
        setUser(newUser)
    },[])

    useEffect(() => {
        const storageUser = localStorage.getItem('user')
        setUser(storageUser? JSON.parse(storageUser) : null)
    },[])

    return {
        user,
        changeUser
    }
}

export const UserProvider:FC<PropsWithChildren> = ({children}) => {
    const context = useCreateUserContext()
    return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}