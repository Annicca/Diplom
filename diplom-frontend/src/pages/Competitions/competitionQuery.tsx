import { fetchData } from "src/utils/fetch"
import { TCompetition } from "src/types/TCompetition"
import { TFiterCompetition } from "src/types/TFilterCompetition"
import { TPage } from "src/types/TPage"

export const competitionQuery = (filter: TFiterCompetition) => ({
    queryKey: ['competitions', {...filter}],
    queryFn: ({pageParam = 0}): Promise<TPage<TCompetition[]>> => fetchData('competitions', {page: pageParam, ...filter}),
    getNextPageParam: (lastPage: TPage<TCompetition[]>) => {
        return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined
    },
    staleTime: 5000
})