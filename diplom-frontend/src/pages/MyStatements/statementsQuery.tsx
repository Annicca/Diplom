import { TPage } from "src/types/TPage"
import { TStaement } from "src/types/TStatement"
import { fetchData, getRequestConfig } from "src/utils/fetch"

export const statementsQuery = (idUser?: number | string) => ({
    queryKey: ['mystatements', idUser],
    queryFn: ({pageParam = 0}): Promise<TPage<TStaement[]>> => fetchData(`mystatements/${idUser}`, {page: pageParam}, getRequestConfig()),
    getNextPageParam: (lastPage: TPage<TStaement[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})