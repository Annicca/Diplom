import { FC, InputHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import clearStyle from './Input.module.scss'
import style from './InputControl.module.scss'

interface InputControlProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    error?: string,
    mode? : 'clear' | 'default' | 'none',
    classNameContainer?: string;
}

export const InputControl:FC<InputControlProps> = forwardRef<HTMLInputElement, InputControlProps>((props, ref)  => {
    
    const {label, error, classNameContainer, mode = 'default', ...inputProps} = props
    
    return(
        <div className={classNames(
            classNameContainer,
            {
                [style.inputContainer]: mode === 'default' && props.type !== 'checkbox' && props.type !== 'radio',
                [clearStyle.inputContainer]: mode === 'clear' && props.type !== 'checkbox' && props.type !== 'radio',
                [clearStyle.checkboxContainer]: props.type === 'checkbox',
                [clearStyle.radioContainer]: props.type === 'radio'
            }
        )}>
            <input
                className={classNames(
                    props.className,
                    {
                        [style.input]: mode === 'default' && props.type !== 'checkbox' && props.type !== 'radio',
                        [clearStyle.input]: mode === 'clear' && props.type !== 'checkbox' && props.type !== 'radio',
                        [clearStyle.checkbox]: props.type === 'checkbox' ,
                        [clearStyle.radio]: props.type === 'radio',
                        ['error']: !!error
                    }
                )} 
                ref={ref}
                {...inputProps} 
            />
            <label className={classNames('', {[style.label]: mode === 'default' && props.type !== 'checkbox' && props.type !== 'radio'}) } htmlFor={props.id || props.name}> {label}</label>
            <div className='error-text'>{error}</div>
        </div>
    )
})
