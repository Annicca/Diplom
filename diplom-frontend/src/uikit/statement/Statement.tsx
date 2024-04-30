import { FC } from "react"
import { StatementTitle } from "src/components/statementTitle/StatementTitle"
import { useUserContext } from "src/context/user-context/useUserContext"
import { ERole } from "src/types/ERole"
import { ETypeStatement } from "src/types/ETypeStatement"
import { TStaement } from "src/types/TStatement"
import { chooseTypeStatement } from "src/utils/helpers"
import { Button } from "../button/Button"
import { DescriptionItem } from "src/components/descriptionItem/DescriptionItem"

import style from './Statement.module.scss'

interface StatementProps {
    statement: TStaement
}
export const Statement:FC<StatementProps> = ({statement}) => {
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
                    <>
                        <div>Пользователь: {statement.user.patronimycUser + ' ' + statement.user.nameUser + ' ' + statement.user.surnameUser}</div>
                        <div>Почта: {statement.user.mailUser}</div>
                        <div>Телефон: {statement.user.phoneUser ? statement.user.phoneUser : '-'}</div>
                    </>
                }
                <DescriptionItem description={statement.description} />

                {user?.role === ERole.ADMIN && 
                    <div className={style.buttonContainer}>
                        {/* () => changeStatementStatus(statement.idStatement, 'accept') */}
                        <Button onClick={() => {}}>
                            Принять
                        </Button>
                        {/* buttonStyle = {[styleStatementItem.button, styleStatementItem.rejectButton]}
                        activity={() => changeStatementStatus(statement.idStatement, 'accept')} */}
                        <Button >
                            Отклонить
                        </Button>
                    </div>
                }
            </div>
        </article>
    )
}