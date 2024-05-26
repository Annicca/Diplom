import { FC} from "react"
import { TNomination } from "src/types/TNomination"
import { Nomination } from "./Nomination";

import style from './NominationsList.module.scss'

interface NominationsListProps {
    nominationsList: TNomination[] | {
        name: string,
        genres: {
            name: string
        }[]
    }[];
    isShow?: boolean;
}

export const NominationsList:FC<NominationsListProps> = ({nominationsList, isShow = true}) => {

    return(
        <section className={style.nominations}>
            <div className={style.nominations__title}>Номинации:</div>
            <ul className={style.nominations__list}>
                {nominationsList && nominationsList.length > 0 &&
                    nominationsList.map((nomination, index) => (
                        <Nomination 
                            key = {'id' in nomination ? nomination.id : nomination.name + index} 
                            nomination={nomination}
                            nominationIndex={index}
                            isShow = {isShow}
                        />
                    ))
                }
            </ul>
            
        </section>
    )
}