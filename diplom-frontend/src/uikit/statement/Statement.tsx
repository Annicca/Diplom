import { FC, useState } from "react"
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
import { FileDownload } from "../fileUpload/FileDownload"
import { NominationsList } from "src/components/nominationsList/NominationsList"
import { NestedList } from "src/components/nominationsList/NestedList"
import ArrowIcon from "assets/icons/arrowRight.svg?react"
import classNames from "classnames"

import style from './Statement.module.scss'

interface StatementProps {
    statement: TStatement;
    onReject?: () => void;
    onAccept?: () => void
}
export const Statement:FC<StatementProps> = ({statement, onReject, onAccept}) => {
    const {user} = useUserContext()
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisible = () => {
        setIsVisible(isVisible => !isVisible)
    }

    return(
        <article className={style.statement}>
            <StatementTitle number={statement.idStatement} status={statement.statusStatement} />
            <div className={style.statement__data}>
                <div className="text-orange">Тип: {chooseTypeStatement(statement.type)}</div>
                <div>Название: {statement.name}</div>
                <div>Город: {statement.city.city}</div>
                {statement.address && <div>Адрес: {statement.address}</div>}
                {statement.type === ETypeStatement.COMPETITION && 
                    <>
                        {statement.dateStart && <div>Дата начала: {transformDate(statement.dateStart)}</div>}
                        {statement.dateFinish && <div>Дата оконания: {transformDate(statement.dateFinish)}</div>}
                    </>
                }
                {statement.competitionFee && <div>Стоимость конкурсного взноса: {statement.competitionFee}</div>}
                {user?.role === ERole.ADMIN && 
                    <div className={style.statement__user}>
                        <div>Информация о пользователе:</div>
                        <TextIcon icon = {<LkIcon width={20} height={20}/>} text ={
                            statement.user.organizationName ||
                            statement.user.surnameUser + ' ' + statement.user.nameUser + ' ' + statement.user.patronimycUser
                            
                        }/>
                        <TextIcon icon = {<EmailIcon width={20} height={20}/>} text ={statement.user.mailUser} />
                        <TextIcon icon = {<PhoneIcon width={20} height={20}/>} text ={statement.user.phoneUser ? statement.user.phoneUser : '-'} />
                    </div>
                }
                <div className={style.statement__data}>
                    {statement.type === ETypeStatement.COMPETITION && <div>
                        <span className={style.statement__infoRules}>Информация по положению:</span>
                        <Button 
                            type = "button"
                            className={classNames(style.statement__show, {[style.statement__show_open]: isVisible})} 
                            isClear={true} 
                            isYellow = {false} 
                            onClick={toggleVisible}
                        >
                            <ArrowIcon width={15} height={15}/>
                        </Button>
                    </div>}
                    {isVisible && <div className={style.statement__data}>
                        {statement.rules &&
                            <FileDownload fileName={statement.rules} newFileName = {`Положение_конкурса_${statement.name}`} text = "Положение конкурса"/>
                        }
                        {statement.regulation &&
                            <FileDownload fileName={statement.regulation} text = "Правила проведения" newFileName = {`Правила_проведения_конкурса_${statement.name}`}/>
                        }
                        {statement.nominations && statement.nominations.length > 0 && 
                            <NominationsList isShow={false} nominationsList={statement.nominations}/>
                        }
                        {statement.ageCategories && statement.ageCategories?.length > 0 &&
                            <NestedList key = "age" list={statement.ageCategories} nameList="Возрастные категории" />
                        }
                        {statement.groupCategories && statement.groupCategories?.length > 0 &&
                            <NestedList key = "groupCategory" list={statement.groupCategories} nameList="Групповые формы" />
                        }
                    </div>}
                </div>
                
                {statement.description && <DescriptionItem description={statement.description} />}

                {user?.role === ERole.ADMIN && 
                    <div className={style.buttonContainer}>
                        <Button onClick={onAccept} disabled = {statement.statusStatement !== null} className={style.buttonContainer_btn}>
                            Принять
                        </Button>

                        <Button onClick={onReject} disabled = {statement.statusStatement !== null} className={style.buttonContainer_btn}>
                            Отклонить
                        </Button>
                    </div>
                }
            </div>
        </article>
    )
}