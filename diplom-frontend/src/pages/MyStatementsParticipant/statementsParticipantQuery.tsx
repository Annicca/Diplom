import { TPage } from "src/types/TPage";
import { TStatementParticipant } from "src/types/TStatementParicipant";
import { fetchData, getRequestConfig } from "src/utils/fetch";

export const myStatementsParticipantQuery = (
  url: string,
  id?: string | number
) => ({
  queryKey: [url, id],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TStatementParticipant[]>> =>
    fetchData(
      id ? url + "/" + id : url,
      { page: pageParam },
      getRequestConfig()
    ),
  getNextPageParam: (lastPage: TPage<TStatementParticipant[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});
