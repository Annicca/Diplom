import StatementIcon from 'assets/icons/statement.svg?react'
import { PageLayout } from "src/components/layout/PageLayout"
import { ERole } from 'src/types/ERole'
import { UserInfo } from "src/components/userInfo/UserInfo"
import { useUserContext } from 'src/context/user-context/useUserContext'
import { TextIcon } from 'src/components/textIcon/TextIcon'

import style from './Account.module.scss'

export const Account = () => {
    const {user} = useUserContext()
    return(
        <PageLayout>
            <div className={style.account}>
                <UserInfo />
                <div className={style.account__inner}>
                    {user?.role === ERole.CLIENT && 
                        <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Заявки' />
                    } 
                    {user?.role === ERole.ADMIN &&
                        <>
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Пользователи' />
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Заявки' />
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Конкурсы' />
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Коллективы' />
                        </>
                    }
                    {user?.role === ERole.ORGANIZER &&
                        <>
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Заявки' />
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Конкурсы' />
                        </>
                    }
                    {user?.role === ERole.DIRECTOR &&
                        <>
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Заявки' />
                            <TextIcon classNameContainer={style.account__item} icon = {<StatementIcon width={50} height={50}/>} text='Коллективы' />
                        </>
                    }
                </div>
            </div>
        </PageLayout>
    )
}