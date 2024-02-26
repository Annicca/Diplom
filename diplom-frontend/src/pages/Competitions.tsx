import { FC } from "react";
import { QueryClient, useQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import { PageLayout } from "src/components/layout/PageLayout";
import { TCompetition } from "src/types/TCompetition";
import { fetchData } from "src/utils/fetch";

const competitionQuery = () => ({
    queryKey: ['competitions'],
    queryFn: (): Promise<TCompetition[]> => fetchData('competitions'),
    staleTime: 5 * 1000
})

export const loader = (queryClient: QueryClient) => async() => {
    const query = competitionQuery();

    return queryClient.fetchQuery(query);
}

export const Competitions: FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const {data: competitions, error, isLoading, isSuccess} = useQuery<TCompetition[]>({...competitionQuery(), initialData: initialData})

    if(error) return <div>error..</div>

    if(isLoading) return <div>Loading...</div>

    if(isSuccess && competitions.length === 0) return <div>Список пуст</div>

    if (isSuccess) return(
        <PageLayout>
            <h1>{competitions[0].nameCompetition}</h1>
        </PageLayout>
    )
}