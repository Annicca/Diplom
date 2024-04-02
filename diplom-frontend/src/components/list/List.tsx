import { ReactNode} from "react";

export interface ListProps<T>{
    items: T[] | undefined,
    renderItem: (item: T, index?:number) => ReactNode;
    className?: string
}

export const List = <T,>(props: ListProps<T>) => {
    return(
        <ul className={props.className}>
            {props.items?.map(props.renderItem)}
        </ul>
    )
}


