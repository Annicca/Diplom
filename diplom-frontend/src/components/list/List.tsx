import { AxiosError } from "axios";
import { ReactNode} from "react";

interface ListProps<T>{
    items: T[] | undefined,
    renderItem: (item: T) => ReactNode;
    className?: string
}

interface DataListProps<T> extends ListProps<T>{
    error: AxiosError | null,
    isSuccess: boolean,
    isLoading: boolean,
    className?: string
}

export const DataList = <T,>(props: DataListProps<T>) => {
    if(props.error) return <div>{props.error.response ? String(props.error.response.data) : props.error.message}</div>

    else if(props.isLoading) return <div>Loading...</div>

    else if(props.isSuccess && props.items && props.items.length === 0) return <div>Список пуст</div>

    else if (props.isSuccess && props.items) return(
        <ul className={props.className}>
            {props.items.map(props.renderItem)}
        </ul>
    )
}

export const List = <T,>(props: ListProps<T>) => {
    return(
        <ul className={props.className}>
            {props.items?.map(props.renderItem)}
        </ul>
    )
}


