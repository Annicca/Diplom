import { ReactNode, useEffect } from "react"
import { UseInfiniteQueryResult } from "react-query"
import { TPage } from "src/types/TPage"
import { AxiosError } from "axios"
import { useInView } from "react-hook-inview"
import { List } from "./List"
import { ETypeLoding, Loading } from "../loading/Loading"

interface PaginationListProps<T> {
    infiniteData: UseInfiniteQueryResult<TPage<T[]>, AxiosError>,
    renderItem: (item: T, index?: number) => ReactNode,
    classNameList?: string,
    classNameInnerList?:string,
    skeletonClassName?: string
}

export const PaginationList = <T,>(props: PaginationListProps<T>) => {

    const [ref, inView] = useInView()

    useEffect(() => {
        if(inView && props.infiniteData.hasNextPage && !props.infiniteData.isFetchingNextPage) props.infiniteData.fetchNextPage()
    },[inView, props.infiniteData])

    console.log(props.infiniteData.isLoading)

    if(props.infiniteData.isLoading) return <Loading type = {ETypeLoding.SKELETON} skeletonClassName={props.skeletonClassName} classNameList={props.classNameInnerList} />

    else if(props.infiniteData.isError) return <div>{props.infiniteData.error.response ? String(props.infiniteData.error.response.data) : props.infiniteData.error.message}</div>

    else return(
        <>        
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
        </>

    )

}