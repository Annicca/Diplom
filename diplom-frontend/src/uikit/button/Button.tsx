import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import classNames from "classnames";

import style from "./Button.module.scss";

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    isGradient?: boolean;
    isClear?: boolean;
    isYellow?: boolean;
}

export const Button: FC<ButtonProps> = ({children, className, isClear = false, isGradient = false, isYellow = true, ...props}) => {
    return(
        <button 
        {...props} 
        className={classNames(
            {
                [style.gradient]: isGradient,
                [style.clear]: isClear ,
                [style.yellow]: isYellow
            },
            [className]
        )}>{children}</button>
    )
}