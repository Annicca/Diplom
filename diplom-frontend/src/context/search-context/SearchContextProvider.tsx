import { FC, PropsWithChildren, useCallback, useState } from "react"
import { TSearchContext } from "src/types/TSearchContext"
import { SearchContext } from "./context"

const useCreateSearchContext = ():TSearchContext => {
    const [value, setValue] = useState<string>('')
    
    const handleChangeValue = useCallback((newValue: string) => {
        setValue(newValue)
    },[])

    return {
        value,
        handleChangeValue
    }
}

export const SearchContextProvider:FC<PropsWithChildren> = ({children}) => {
    const context = useCreateSearchContext()
    return <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
}