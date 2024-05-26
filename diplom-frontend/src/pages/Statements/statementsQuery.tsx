import { TPage } from "src/types/TPage"
import { TStatement } from "src/types/TStatement"
import { fetchData, getRequestConfig } from "src/utils/fetch"

export const statementsQuery = (number?: string | number) => ({
    queryKey: ['statements', number],
    queryFn: ({pageParam = 0}): Promise<TPage<TStatement[]>> => fetchData(number ? `statements/search/${number}` : 'statements', {page: pageParam}, getRequestConfig()),
    getNextPageParam: (lastPage: TPage<TStatement[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})