import { FC, ReactNode } from "react"
import style from './TextIcon.module.scss'
import classNames from "classnames"

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
            {/* {isTransition && <Image source={ArrowIcon} style = {textIconStyle.arrow} />} */}
            {isTransition}
        </div>
    )
}