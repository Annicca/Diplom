import { ButtonHTMLAttributes, FC } from "react"
import { Button } from "./Button"
import OkIcon from 'assets/icons/ok.svg?react'

import style from './Button.module.scss'

export const ButtonSave: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return(
        <Button className={style.save} isClear isYellow={false} onClick={props.onClick}>
            <OkIcon width={20} height={20} />
        </Button>
    )
}