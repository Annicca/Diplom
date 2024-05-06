import { FC, useState } from "react"
import { Button } from "src/uikit/button/Button"

import style from './DescriptionItem.module.scss'

interface DescriptionItemProps {
    description: string
}

export const DescriptionItem: FC<DescriptionItemProps> = ({description}) => {

    const [isUnwrap, setIsUnWrap] = useState<boolean>(false)

    const handleUnWrap = () => {
        setIsUnWrap(!isUnwrap)
    }

    return(
        <div className={style.description}>
            <div className={style.description__label}>Описание:</div>
            <div className={style.description__text}> {isUnwrap || description.length < 100 ? description : `${description.slice(0,100)}...`}</div>
            {description.length > 100 && 
                <Button onClick={handleUnWrap} isClear = {true} isYellow = {false} className={style.description__btn}>
                    <div className="text-orange">{isUnwrap ? ' Скрыть' :' Развернуть всё'}</div>
                </Button>
            }
        </div>
        
    )
}