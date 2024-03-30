import { FC } from "react";
import { AxiosError } from "axios";
import { QueryClient, useQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import { PageLayout } from "src/components/layout/PageLayout";
import { DataList } from "src/components/list/List";
import { TCompetition } from "src/types/TCompetition";
import { Competition } from "src/uikit/competition/Competition";
import { fetchData } from "src/utils/fetch";

const competitionQuery = () => ({
    queryKey: ['competitions'],
    queryFn: (): Promise<TCompetition[]> => fetchData('competitions'),
    staleTime: 5 * 1000
})

export const loader = (queryClient: QueryClient) => async(): Promise<TCompetition[]> => {
    const query = competitionQuery();

    return queryClient.fetchQuery(query);
}

export const Competitions: FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const {data: competitions, error, isLoading, isSuccess} = useQuery<TCompetition[], AxiosError>({...competitionQuery(), initialData: initialData})

    return(
        <PageLayout>
            <DataList 
            error = {error}
            isSuccess = {isSuccess}
            isLoading = {isLoading}
            items={competitions} 
            className="list" 
            renderItem={(item: TCompetition) => <Competition key = {item.idCompetition} competition={item}/>} />
        </PageLayout>
    )
}