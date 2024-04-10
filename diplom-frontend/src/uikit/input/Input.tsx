import { FC, InputHTMLAttributes, LegacyRef } from "react"
import classNames from "classnames"
import style from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputRef?: LegacyRef<HTMLInputElement>
}

export const Input: FC<InputProps> =({className, inputRef, ...props}) => {
    return(
        <input className={classNames(style.input, className)} {...props} ref={inputRef}/>
    )
}