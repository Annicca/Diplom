import { TPage } from "src/types/TPage";
import { TParticipant } from "src/types/TParticipant";
import { fetchData, getRequestConfig } from "src/utils/fetch";

export const participantsQuery = (id?: string | number) => ({
  queryKey: ["participants", id],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TParticipant[]>> =>
    fetchData(
      "participant/competition/" + id,
      { page: pageParam },
      getRequestConfig()
    ),
  getNextPageParam: (lastPage: TPage<TParticipant[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});
