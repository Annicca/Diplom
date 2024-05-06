import { TGroup } from "src/types/TGroup"
import { TPage } from "src/types/TPage"
import { fetchData } from "src/utils/fetch"
import { removeEmpty } from "src/utils/removeEmpty"

export const groupsQuery = (city: string) => ({
    queryKey: ['groups', city],
    queryFn: ({pageParam = 0}): Promise<TPage<TGroup[]>> => fetchData('groups', removeEmpty({page: pageParam, city: city})),
    getNextPageParam: (lastPage: TPage<TGroup[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})