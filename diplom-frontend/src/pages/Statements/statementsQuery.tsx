import { TPage } from "src/types/TPage"
import { TStaement } from "src/types/TStatement"
import { fetchData, getRequestConfig } from "src/utils/fetch"

export const statementsQuery = (number?: string | number) => ({
    queryKey: ['statements', number],
    queryFn: ({pageParam = 0}): Promise<TPage<TStaement[]>> => fetchData(number ? `statements/search/${number}` : 'statements', {page: pageParam}, getRequestConfig()),
    getNextPageParam: (lastPage: TPage<TStaement[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})