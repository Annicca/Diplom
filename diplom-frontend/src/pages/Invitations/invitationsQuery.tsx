import { TInvitation } from "src/types/TInvitation";
import { TPage } from "src/types/TPage";
import { fetchData, getRequestConfig } from "src/utils/fetch";

export const invitationsQuery = (url: string, id?: string) => ({
  queryKey: [url, id],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TInvitation[]>> =>
    fetchData(`${url}/${id}`, { page: pageParam }, getRequestConfig()),
  getNextPageParam: (lastPage: TPage<TInvitation[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});
