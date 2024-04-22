import { FC } from "react"
import { transformDate } from "src/utils/transformDate"
import classNames from "classnames"
import CalenarIcon from 'assets/icons/calendar.svg?react'
import HouseIcon from 'assets/icons/city.svg?react'
import EmailIcon from 'assets/icons/mail.svg?react'
import PhoneIcon from 'assets/icons/phone.svg?react'
import { TextIcon } from "src/components/textIcon/TextIcon"

import style from './Info.module.scss'

interface InfoProps {
    dateStart? : string,
    dateFinish? : string,
    number?: string | null,
    address?: string,
    mail?: string;
    clasNameContainer?: string;
}

export const Info: FC<InfoProps> = ({dateStart, dateFinish, number, address, mail, clasNameContainer}) => {
    return(
        <div className={classNames(style.container, clasNameContainer)}>
            {!!dateStart && !!dateFinish &&
                <div className={style.container__item}>
                    <div>Дата проведения</div>
                    <TextIcon icon={<CalenarIcon width= {20} height = {20}/>} text={`${transformDate(dateStart)} - ${transformDate(dateFinish)}`}   />
                </div>
            }
            <div className={style.container__item}>
                <div>Контакты</div>
                {!!address && <TextIcon icon={<HouseIcon width= {20} height = {20}/>} text={address} />}
                {!!number && <TextIcon icon={<PhoneIcon width= {20} height = {20}/>} text={number} />}
                {!!mail && <TextIcon icon={<EmailIcon width= {20} height = {20}/>} text={mail} />}
            </div>
        </div>
    )
}