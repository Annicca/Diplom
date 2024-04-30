import { TCompetition } from "src/types/TCompetition"
import { TPage } from "src/types/TPage"
import { fetchData, getRequestConfig } from "src/utils/fetch"

export const myCompetitionsQuery = (idUser?: string | number) => ({
    queryKey: ['mycompetitions', idUser],
    queryFn: ({pageParam = 0}): Promise<TPage<TCompetition[]>> => fetchData(`mycompetitions/${idUser}`,{page: pageParam}, getRequestConfig()),
    getNextPageParam: (lastPage: TPage<TCompetition[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})