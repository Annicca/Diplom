import { FC } from "react"
import classNames from "classnames"
import style from './Input.module.scss'

interface InputProps{
    type: string,
    placeholder?: string, 
    defaultValue?: string, 
    onChange?: () => void,
    className?: string
}

export const Input: FC<InputProps> =({type, placeholder, defaultValue, onChange, className}) => {
    return(
        <input type = {type} placeholder={placeholder} defaultValue = {defaultValue} onChange={onChange} className={classNames(style.input, className)} />
    )
}