import { ReactNode} from "react";
import { Message } from "../message/Message";

export interface ListProps<T>{
    items: T[] | undefined,
    renderItem: (item: T, index?:number) => ReactNode;
    className?: string
}

export const List = <T,>(props: ListProps<T>) => {
    if(props.items?.length === 0) return <Message>Ничего не найдено</Message>
    return(
        <ul className={props.className}>
            {props.items?.map(props.renderItem)}
        </ul>
    )
}


