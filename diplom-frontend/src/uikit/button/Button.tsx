import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import classNames from "classnames";

import style from "./Button.module.scss";

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    isGradient?: boolean;
    isClear?: boolean;
}

export const Button: FC<ButtonProps> = ({children, className, isClear = false, isGradient = false, ...props}) => {
    return(
        <button 
        {...props} 
        className={classNames(
            {
                [style.gradient]: isGradient,
                [style.clear]: isClear 
            },
            [className]
        )}>{children}</button>
    )
}