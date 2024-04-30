import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/uikit/button/Button";
import ArrowLeft from 'assets/icons/arrow-left.svg?react'

import style from './MainTitle.module.scss'

export const MainTite:FC<PropsWithChildren> = ({children}) => {
    const navigate = useNavigate();
    return(
        <div className={style.mainTitle}>
            <h1>{children}</h1>
            <Button onClick={() => navigate(-1)} className={style.mainTitle__btn} isClear = {true} isYellow = {false}>
                <span className={style.mainTitle__back}>
                    <ArrowLeft width={16} height={16} fill = "#FF6B00"/> Назад
                </span>
            </Button>
        </div>
    )
}