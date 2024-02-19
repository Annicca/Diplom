import {FC, useState, Dispatch, SetStateAction} from "react";
import { Input } from "../input/Input";
import { SearchIcon } from "../../icons/SearchIcon";
import styles from './Search.module.scss'


interface SearchProps {
    // searchText?: string,
    placeholder?: string,
    // setValue?: (s: string) => {}
}

export const Search: FC<SearchProps> = ({placeholder}) =>{

    const [valueSearch, setValueSearch] = useState<string>('');

    const search =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, setValue: Dispatch<SetStateAction<string>>, valueSearch: string ) => {
        e.preventDefault();
        setValue(valueSearch)
    }

    return(
        <form className={styles.search} >
            <Input type = "text" placeholder={valueSearch ? valueSearch : placeholder} defaultValue = {valueSearch} className={styles.search__input} />
            <button type = "submit" className={styles.search__button} onClick={(e) => search(e, setValueSearch, valueSearch )} >
                <SearchIcon />
            </button>
        </form>
    )
}