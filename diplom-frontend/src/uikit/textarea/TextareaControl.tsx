import { FC, TextareaHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import style from '../input/InputControl.module.scss'

interface TextareaControlProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string,
    error?: string,
    classNameContainer?: string;
}

export const TextareaControl:FC<TextareaControlProps> = forwardRef<HTMLTextAreaElement, TextareaControlProps>((props, ref)  => {
    const {label, error, classNameContainer, ...textareaProps} = props

    return(
        <div className={classNames(style.inputContainer, classNameContainer)}>
            <textarea
                className={classNames(
                    
                    style.input,
                    props.className
                )} 
                ref={ref}
                cols={40}
                rows={10}
                {...textareaProps} 
            />
            <label className={style.label} htmlFor={props.id || props.name}> {label}</label>
            <div className='error-text'>{error}</div>
        </div>
    )
})