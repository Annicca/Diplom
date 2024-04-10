import { FC, PropsWithChildren } from "react";
import { ETypeMessage } from "src/types/ETypeMessage";
import classNames from "classnames";

import style from './Message.module.scss'

interface MessageProps {
    type?: ETypeMessage
}

export const Message:FC<PropsWithChildren<MessageProps>> = ({children, type = ETypeMessage.MESSAGE}) => {
    return(
        <div className={type === ETypeMessage.ERROR ? classNames(style.message, style.message_error) : style.message}>{children}</div>
    )

}