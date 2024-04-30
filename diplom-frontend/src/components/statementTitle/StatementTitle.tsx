import { FC } from "react"
import StatementIcon from 'assets/icons/statement1.svg?react'
import { chooseStatusStatement } from "src/utils/helpers";

import style from './StatementTitle.module.scss'

interface StatementTitleProps {
    number: number;
    status: string | null
}

export const StatementTitle:FC<StatementTitleProps> = ({number, status}) => {
    return(
        <div className={style.info}>
            <StatementIcon width = {40} height = {40} />
            <div className={style.nameContainer}>
                <div>Заявка № {number}</div>
                <div className='text-orange'>Статус: {status ? chooseStatusStatement(status) : '-'}</div>
            </div>
        </div>
    )
}