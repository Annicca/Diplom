import { FC, ReactNode } from "react"
import classNames from "classnames"
import ArrowRightIcon from 'assets/icons/arrowRight.svg?react'
import style from './TextIcon.module.scss'


interface TextIconProps {
    text: string,
    icon: ReactNode,
    isTransition?: boolean,
    isBorder?: boolean,
    classNameContainer?: string,
}

export const TextIcon: FC<TextIconProps> = ({text, icon, isTransition = false, isBorder = false, classNameContainer}) => {
    return(
        <div 
            className={isBorder ? 
                classNames(
                style.textIcon, 
                style.textIcon_border,
                classNameContainer) 
            : classNames(style.textIcon, classNameContainer)}
        >
            <div className={style.textIcon__imgContainer}>
                {icon}
                <div >{text}</div>
            </div>
            {isTransition && <ArrowRightIcon fill = {'#BFBFBF'} width = {15} height={15}/>}
            {isTransition}
        </div>
    )
}