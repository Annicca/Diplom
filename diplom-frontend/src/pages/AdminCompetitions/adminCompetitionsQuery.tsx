import { TCompetition, TCompetitionUpdate } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { fetchData, getRequestConfig } from "src/utils/fetch";

export const adminCompetitionsQuery = () => ({
  queryKey: ["competitions/all"],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TCompetition[]>> =>
    fetchData("competitions/all", { page: pageParam }, getRequestConfig()),
  getNextPageParam: (lastPage: TPage<TCompetition[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});

export const moderationCompetitionsQuery = () => ({
  queryKey: ["moderation/competition"],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TCompetitionUpdate[]>> =>
    fetchData(
      "competitions/moderations/all",
      { page: pageParam },
      getRequestConfig()
    ),
  getNextPageParam: (lastPage: TPage<TCompetitionUpdate[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});
