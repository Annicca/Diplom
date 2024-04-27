import { FC, InputHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import clearStyle from './Input.module.scss'
import style from './InputControl.module.scss'

interface InputControlProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    error?: string,
    mode? : 'clear' | 'default'
    classNameContainer?: string;
  }

export const InputControl:FC<InputControlProps> = forwardRef<HTMLInputElement, InputControlProps>((props, ref)  => {
    
    const {label, error, classNameContainer, mode = 'default', ...inputProps} = props
    
    return(
        <div className={classNames(
            classNameContainer,
            {
                [style.inputContainer]: mode === 'default' && props.type !== 'checkbox',
                [clearStyle.inputContainer]: mode === 'clear' && props.type !== 'checkbox',
                [clearStyle.checkboxContainer]: props.type === 'checkbox'
            }
        )}>
            <input
                className={classNames(
                    props.className,
                    {
                        [style.input]: mode === 'default' && props.type !== 'checkbox',
                        [clearStyle.input]: mode === 'clear' && props.type !== 'checkbox',
                        [clearStyle.checkbox]: props.type === 'checkbox' ,
                        ['error']: !!error
                    }
                )} 
                ref={ref}
                {...inputProps} 
            />
            <label className={classNames('', {[style.label]: mode === 'default'}) } htmlFor={props.name}> {label}</label>
            <div className='error-text'>{error}</div>
        </div>
    )
})
