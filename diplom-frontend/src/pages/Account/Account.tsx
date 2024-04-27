import StatementIcon from 'assets/icons/statement.svg?react'
import { PageLayout } from "src/components/layout/PageLayout"
import { UserInfo } from "src/components/userInfo/UserInfo"

import style from './Account.module.scss'

export const Account = () => {
    return(
        <PageLayout>
            <div className={style.account}>
                <UserInfo />
                <div className={style.account__inner}>
                    <div className={style.account__item}>
                        <StatementIcon width={50} height={50}/>
                        <div>Заявки</div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}