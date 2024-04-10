import { ReactNode, useEffect } from "react"
import { UseInfiniteQueryResult } from "@tanstack/react-query"
import { TPage } from "src/types/TPage"
import { ETypeLoding } from "src/types/ETypeLoading"
import { AxiosError } from "axios"
import { useInView } from "react-hook-inview"
import { List } from "./List"
import {Loading } from "../loading/Loading"
import { Message } from "../message/Message"
import { ETypeMessage } from "src/types/ETypeMessage"

import style from './List.module.scss'

interface PaginationListProps<T> {
    infiniteData: UseInfiniteQueryResult<TPage<T[]>, AxiosError>,
    renderItem: (item: T, index?: number) => ReactNode,
    classNameList?: string,
    classNameInnerList?:string,
    skeletonClassName?: string
}

export const PaginationList = <T,>(props: PaginationListProps<T>) => {

    const [ref, inView] = useInView({
        threshold: 0.75,
      })

    useEffect(() => {
        if(inView && props.infiniteData.hasNextPage && !props.infiniteData.isFetchingNextPage) props.infiniteData.fetchNextPage()
    },[inView, props.infiniteData])

    if(props.infiniteData.isLoading) return <Loading type = {ETypeLoding.SKELETON} skeletonClassName={props.skeletonClassName} classNameList={props.classNameInnerList} />

    else if(props.infiniteData.isError) return <Message type={ETypeMessage.ERROR}>{props.infiniteData.error.response ? String(props.infiniteData.error.response.data) : props.infiniteData.error.message}</Message>

    else return(
        <div className={style.listContainer}>        
            <List
                className={props.classNameList}
                items={props.infiniteData.data?.pages} 
                renderItem={(page, index) => 
                    <List
                    key = {index}
                    className={props.classNameInnerList}
                    items={page.content}
                    renderItem={props.renderItem} />
                } 
            />
            <div ref={ref}>
                {props.infiniteData.isFetchingNextPage || props.infiniteData.hasNextPage && <Loading type={ETypeLoding.SYNC}/>}
            </div>
        </div>

    )

}