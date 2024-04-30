import { TGroup } from "src/types/TGroup"
import { TPage } from "src/types/TPage"
import { fetchData, getRequestConfig } from "src/utils/fetch"

export const myGroupsQuery = (idUser?: string | number) => ({
    queryKey: ['mygroups', idUser],
    queryFn: ({pageParam = 0}): Promise<TPage<TGroup[]>> => fetchData(`mygroups/${idUser}`,{page: pageParam}, getRequestConfig()),
    getNextPageParam: (lastPage: TPage<TGroup[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})