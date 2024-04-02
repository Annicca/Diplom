import { FC } from "react";
import { AxiosError } from "axios";
import { InfiniteData, QueryClient, useInfiniteQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import { TCompetition } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { Competition } from "src/uikit/competition/Competition";
import { fetchData } from "src/utils/fetch";
import classNames from "classnames";

import style from 'components/list/List.module.scss'


const competitionQuery = () => ({
    queryKey: ['competitions'],
    queryFn: ({pageParam = 0}): Promise<TPage<TCompetition[]>> => fetchData('competitions', pageParam),
    getNextPageParam: (lastPage: TPage<TCompetition[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})

export const loader = (queryClient: QueryClient) => async(): Promise<InfiniteData<TPage<TCompetition[]>>> => {
    
    const query = competitionQuery();

    return queryClient.fetchInfiniteQuery(query);
}

export const Competitions: FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const infinitedata = useInfiniteQuery<TPage<TCompetition[]>, AxiosError>({...competitionQuery(), initialData: initialData})

    return(
        <PageLayout>
            <PaginationList 
            classNameList={style.list}
            classNameInnerList={classNames(style.list, style.list_competitions)}
            infiniteData={infinitedata}
            renderItem={(item: TCompetition) => <Competition key={item.idCompetition} competition={item} />}
            />
        </PageLayout>
    )
}