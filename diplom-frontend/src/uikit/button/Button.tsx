import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import classNames from "classnames";

import style from "./Button.module.scss";

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    isGradient: boolean;
}

export const Button: FC<ButtonProps> = ({children, className, isGradient, ...props}) => {
    return(
        <button 
        {...props} 
        className={classNames(
            {[style.gradient]: isGradient },
            className
        )}>{children}</button>
    )
}