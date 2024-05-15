import { FC } from "react"
import { StatementTitle } from "src/components/statementTitle/StatementTitle"
import { useUserContext } from "src/context/user-context/useUserContext"
import { ERole } from "src/types/ERole"
import { ETypeStatement } from "src/types/ETypeStatement"
import { TStatement } from "src/types/TStatement"
import { chooseTypeStatement, transformDate } from "src/utils/helpers"
import { Button } from "../button/Button"
import { DescriptionItem } from "src/components/descriptionItem/DescriptionItem"
import { TextIcon } from "src/components/textIcon/TextIcon"
import LkIcon from "assets/icons/lk.svg?react";
import EmailIcon from 'assets/icons/mail.svg?react'
import PhoneIcon from 'assets/icons/phone.svg?react'

import style from './Statement.module.scss'
import { FileDownload } from "../fileUpload/FileDownload"


interface StatementProps {
    statement: TStatement;
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
                {statement.type === ETypeStatement.COMPETITION && 
                    <>
                        {statement.dateStart && <div>Дата начала: {transformDate(statement.dateStart)}</div>}
                        {statement.dateFinish && <div>Дата оконания: {transformDate(statement.dateFinish)}</div>}
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
                {statement.rules &&
                    <FileDownload fileName={statement.rules} newFileName = {`Положение_конкурса_${statement.name}`} text = "Положение конкурса"/>
                }
                {statement.regulation &&
                    <FileDownload fileName={statement.regulation} text = "Правила проведения" newFileName = {`Правила_проведения_конкурса_${statement.name}`}/>
                }
                {statement.description && <DescriptionItem description={statement.description} />}

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