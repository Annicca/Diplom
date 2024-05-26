import { FC } from "react";
import style from './NominationsList.module.scss'

interface NestedListProps {
    list: {
        id?: number;
        name: string
    }[];
    nameList?: string;
}

export const NestedList:FC<NestedListProps> = ({list, nameList}) => {
    return(
        <article className={style.nested}>
            {nameList && <div className={style.nested__name}>{nameList}</div>}
            <ul typeof="disc" className={style.nested__list}>
                {list && list.length > 0 &&
                    list.map((item, index) =>
                        <li key = {item.id || item.name + index}>{item.name}</li>
                )}
            </ul>
        </article>
        

    )
}