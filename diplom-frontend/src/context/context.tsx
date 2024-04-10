import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from "react"

interface TSearchContext {
    value: string,
    handleChangeValue: (value: string) => void
}

export const SerchContext = createContext<TSearchContext>({value: '', handleChangeValue: () => {}})

export const useSearchContext = () => useContext(SerchContext)

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
    return <SerchContext.Provider value={context}>{children}</SerchContext.Provider>
}