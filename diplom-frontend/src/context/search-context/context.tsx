import { createContext } from "react";
import { TSearchContext } from "src/types/TSearchContext";


export const SearchContext = createContext<TSearchContext>({
    value: '',
    handleChangeValue: () => { }
})