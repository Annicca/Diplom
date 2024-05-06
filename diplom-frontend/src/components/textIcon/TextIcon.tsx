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
    arrowFill?: string;
}

export const TextIcon: FC<TextIconProps> = ({text, icon, isTransition = false, isBorder = false, classNameContainer, arrowFill}) => {
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
                <div>{icon}</div>
                <div className={style.textIcon__text}>{text}</div>
            </div>
            {isTransition && <ArrowRightIcon fill = {arrowFill || '#BFBFBF'} width = {15} height={15}/>}
            {isTransition}
        </div>
    )
}