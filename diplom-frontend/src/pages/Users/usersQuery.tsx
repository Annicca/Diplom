import { TPage } from "src/types/TPage"
import { TUser } from "src/types/TUser"
import { fetchData, getRequestConfig } from "src/utils/fetch"

export const usersQuery = (login?: string) => ({
    queryKey: ['users', login],
    queryFn: ({pageParam = 0}): Promise<TPage<TUser[]>> => fetchData(login ? `users/search/${login}` : 'users', {page: pageParam}, getRequestConfig()),
    getNextPageParam: (lastPage: TPage<TUser[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})