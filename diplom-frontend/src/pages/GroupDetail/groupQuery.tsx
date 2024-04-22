import { TGroup } from "src/types/TGroup";
import { fetchData } from "src/utils/fetch";

export const groupQuery = (id: string | undefined) => ({
    queryKey: ['group', {id}],
    queryFn: (): Promise<TGroup> => fetchData(`groups/${id}`, {}),
    staleTime: 5000
})