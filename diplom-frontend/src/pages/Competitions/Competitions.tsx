import { FC, useEffect, useState } from "react";
import { useSearchContext } from "src/context/context";
import { useLoaderData } from "react-router-dom";
import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "src/utils/queryClient";
import { competitionsLoader as loader } from "./loader";
import { competitionsQuery } from "./competitionsQuery";
import classNames from "classnames";
import { removeEmpty } from "src/utils/removeEnty";
import { TCompetition } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { TFiterCompetition } from "src/types/TFilterCompetition";
import { SortAndSearch } from "src/uikit/sortAndSearch/SortAndSearch";
import { FilterCompetition } from "src/components/filterCompetition/FilterCompetition";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { Competition } from "src/uikit/competition/Competition";
import { IS_MOBILE } from "src/Constants";

import style from 'components/list/List.module.scss'

export const Competitions: FC = () => {
    const {value: serachValue} = useSearchContext()
    const [filter, setFilter] = useState<TFiterCompetition>({})
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const infinitedata = useInfiniteQuery<TPage<TCompetition[]>, AxiosError>({...competitionsQuery(filter), initialData: initialData})

    const handleFilter = (filter:TFiterCompetition) => {
        setFilter(removeEmpty(filter))
    }

    const handleFilterCity = (city:string) => {
        handleFilter({...filter, city})
    }

    useEffect(() => {
        queryClient.invalidateQueries(['competitions'])
    }, [filter])

    useEffect(() => {
        if(IS_MOBILE) {
            handleFilterCity(serachValue)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serachValue])


    return(
        <PageLayout>
            <SortAndSearch filter={filter} handleFilter = {handleFilter} />
            <div className="competitions-container">
                <PaginationList 
                classNameList={style.list}
                classNameInnerList={classNames(style.list, style.list_competitions)}
                skeletonClassName="skeleton-competition"
                infiniteData={infinitedata}
                renderItem={(item: TCompetition) => <Competition key={item.idCompetition} competition={item} />}
                />
                {!IS_MOBILE && <FilterCompetition filter={filter} handleFilter = {handleFilter} />}
            </div>
        </PageLayout>
    )
}