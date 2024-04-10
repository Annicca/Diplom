import { InputHTMLAttributes } from "react";
import { FieldValues, Path, PathValue, UseFormRegister, Validate } from "react-hook-form";
import classNames from "classnames";

import style from './Input.module.scss'


interface InputControlProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    register: UseFormRegister<T>,
    required?: boolean,
    name: Path<T>,
    maxLength?: number,
    minLength?: number,
    max?: number,
    min?: number,
    patternInput?: RegExp,
    validate?: Validate<PathValue<T, Path<T>>, T> | Record<string, Validate<PathValue<T, Path<T>>, T>> | undefined,
    error?: string,
    classNameContainer?: string,

  }

export const InputControl = <T extends FieldValues,>( props : InputControlProps<T>)  => {
    
    const {label, register, required, name, maxLength, minLength, max, min, patternInput, validate, error, classNameContainer, ...inputProps} = props
    
    return(
        <div className={classNameContainer}>
            <label> {label} 
            <input
                className={classNames(style.input, props.className)} 
                {...register(name, { 
                    required,
                    maxLength: maxLength,
                    minLength: minLength,
                    max: max,
                    min: min,
                    pattern: patternInput,
                    validate: validate
                })} 
                {...inputProps} 
            />
            </label>
            <div>{error}</div>
        </div>
    )
}
