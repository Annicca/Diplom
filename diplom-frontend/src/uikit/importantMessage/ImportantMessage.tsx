import { FC, PropsWithChildren } from 'react'
import WarningIcon from 'assets/icons/warning.svg?react'

import style from './ImportantMessage.module.scss'

export const ImportantMessage: FC<PropsWithChildren> = ({children}) => {
    return(
        <div className={style.warning}>
            <WarningIcon width = {60} height={60}/>
            {children}
        </div>
    )
}