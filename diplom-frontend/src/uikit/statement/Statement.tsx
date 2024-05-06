import { FC } from "react"
import { StatementTitle } from "src/components/statementTitle/StatementTitle"
import { useUserContext } from "src/context/user-context/useUserContext"
import { ERole } from "src/types/ERole"
import { ETypeStatement } from "src/types/ETypeStatement"
import { TStaement } from "src/types/TStatement"
import { chooseTypeStatement } from "src/utils/helpers"
import { Button } from "../button/Button"
import { DescriptionItem } from "src/components/descriptionItem/DescriptionItem"
import { TextIcon } from "src/components/textIcon/TextIcon"
import LkIcon from "assets/icons/lk.svg?react";
import EmailIcon from 'assets/icons/mail.svg?react'
import PhoneIcon from 'assets/icons/phone.svg?react'

import style from './Statement.module.scss'


interface StatementProps {
    statement: TStaement;
    onReject?: () => void;
    onAccept?: () => void
}
export const Statement:FC<StatementProps> = ({statement, onReject, onAccept}) => {
    const {user} = useUserContext()
    return(
        <article className={style.statement}>
            <StatementTitle number={statement.idStatement} status={statement.statusStatement} />
            <div className={style.statement__data}>
                <div className="text-orange">Тип: {chooseTypeStatement(statement.type)}</div>
                <div>Название: {statement.name}</div>
                {statement.type === ETypeStatement.CMPETITION && 
                    <>
                        <div>Дата начала: {statement.dateStart}</div>
                        <div>Дата оконания: {statement.dateFinish}</div>
                    </>
                }
                {user?.role === ERole.ADMIN && 
                    <div className={style.statement__user}>
                        <div>Информация о пользователе:</div>
                        <TextIcon icon = {<LkIcon width={20} height={20}/>} text ={statement.user.patronimycUser + ' ' + statement.user.nameUser + ' ' + statement.user.surnameUser}/>
                        <TextIcon icon = {<EmailIcon width={20} height={20}/>} text ={statement.user.mailUser} />
                        <TextIcon icon = {<PhoneIcon width={20} height={20}/>} text ={statement.user.phoneUser ? statement.user.phoneUser : '-'} />
                    </div>
                }
                <DescriptionItem description={statement.description} />

                {user?.role === ERole.ADMIN && 
                    <div className={style.buttonContainer}>
                        <Button onClick={onAccept} className={style.buttonContainer_btn}>
                            Принять
                        </Button>

                        <Button onClick={onReject} className={style.buttonContainer_btn}>
                            Отклонить
                        </Button>
                    </div>
                }
            </div>
        </article>
    )
}