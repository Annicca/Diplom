import { FC, ReactNode } from "react"
import style from './Contact.module.scss';
import classNames from "classnames";

interface ContactProps {
    contact: string, 
    icon: ReactNode,
    classnames?: string
}

export const Contact:FC<ContactProps> = ({contact, icon, classnames}) =>{
    return(
        <div className={classNames(style.contact, classnames)}>
            {icon}
            <span>{contact}</span>
        </div>
    )
}