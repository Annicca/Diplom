import { FC, useState } from "react"
import classNames from "classnames";
import ArrowIcon from "assets/icons/arrowRight.svg?react"
import { Button } from "src/uikit/button/Button";
import { NestedList } from "./NestedList";
import { TNomination } from "src/types/TNomination";

import style from './NominationsList.module.scss'


interface NominationProps {
    nomination: TNomination | {
        name: string,
        genres: {
            name: string
        }[]
    };
    isShow?: boolean;
    nominationIndex?: number
}

export const Nomination:FC<NominationProps> = ({nomination, isShow, nominationIndex}) => {
    const [isVisible, setIsVisible] = useState(isShow)
    const toggleVisible = () => {
        setIsVisible(isVisible => !isVisible)
    }
    return(
        <li> 
            <div>
                <span className={style.nominations__name}>{nomination.name}</span>
                {nomination.genres && nomination.genres?.length > 0 && 
                    <Button 
                        type = "button"
                        className={classNames(style.nominations__show, {[style.nominations__show_open]: isVisible})} 
                        isClear={true} 
                        isYellow = {false} 
                        onClick={toggleVisible}
                    >
                        <ArrowIcon width={15} height={15}/>
                    </Button>
                }
            </div>
            <div className={style.nominations__inner}>
                {isVisible && nomination.genres && nomination.genres?.length > 0 &&
                    <NestedList key = {nomination.name + nominationIndex + 'genres'} list={nomination.genres} nameList="Жанры:"/>
                }
            </div>
        </li>
    )
}