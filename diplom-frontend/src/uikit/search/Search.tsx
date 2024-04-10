import {FC, useRef} from "react";
import { Input } from "../input/Input";
import SearchIcon from 'assets/icons/search.svg?react';
import CancelIcon from 'assets/icons/cancel.svg?react';
import classNames from "classnames";

import styles from './Search.module.scss'

interface SearchProps {
    placeholder?: string,
    classNameContainer?: string
    handleSearch: (s: string) => void
}

export const Search: FC<SearchProps> = ({handleSearch, placeholder, classNameContainer}) =>{

    const cityRef = useRef<HTMLInputElement>(null)
    
    const search =(event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        cityRef.current && handleSearch(cityRef.current.value)
    }

    const onReset = () => {
        handleSearch('')
    }

    return(
        <form className={classNames(styles.search, classNameContainer)} onSubmit={(e) => search(e)} onReset={onReset} >
            <Input name = "city" type = "text" placeholder={placeholder} inputRef={cityRef} className={styles.search__input} />
            <button type = "submit" className={styles.search__button} >
                <SearchIcon />
            </button>
            <button type="reset" className={styles.search__reset}><CancelIcon width={20} height={20} /></button>
        </form>
    )
}