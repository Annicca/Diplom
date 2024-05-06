import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "src/utils/queryClient";
import { useLoaderData } from "react-router-dom"
import { PageLayout } from "src/components/layout/PageLayout"
import { useSearchContext } from "src/context/search-context/useSearchContext";
import { groupsLoader as loader } from "./loader"
import { groupsQuery } from "./groupsQuery"
import { AxiosError } from "axios"
import { TGroup } from "src/types/TGroup"
import { TPage } from "src/types/TPage"
import { PaginationList } from "src/components/list/PaginationList"
import { Group } from "src/uikit/group/Group"
import { Search } from "src/uikit/search/Search";
import { useEffect, useState } from "react";
import { IS_MOBILE } from "src/Constants";

import style from '../../components/list/List.module.scss'
import pageStyle from './Groups.module.scss'

export const Groups = () => {
    const {value: serachValue} = useSearchContext()
    const [city, setCity] = useState('')
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const infinitedata = useInfiniteQuery<TPage<TGroup[]>, AxiosError>({...groupsQuery(city), initialData: initialData})
    
    const handleCity = (city: string) => {
        setCity(city)
    }

    useEffect(() => {
        queryClient.invalidateQueries(['groups'])
    }, [city])

    useEffect(() => {
        if(IS_MOBILE) {
            handleCity(serachValue)
        }
    }, [serachValue])

    return(
        <PageLayout>
            {!IS_MOBILE && 
                <Search 
                    handleSearch={handleCity} 
                    placeholder="Введите город"
                     classNameContainer={pageStyle.search}
            />}
            <PaginationList 
                classNameList={style.list}
                classNameInnerList={style.list_competitions}
                skeletonClassName="skeleton-competition"
                infiniteData={infinitedata}
                renderItem={(item: TGroup) => <Group key={item.idGroup} group={item} />}
            />
        </PageLayout>
    )
}