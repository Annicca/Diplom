import { TGroup, TGroupUpdate } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { fetchData, getRequestConfig } from "src/utils/fetch";

export const adminGroupsQuery = () => ({
  queryKey: ["groups/all"],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TGroup[]>> =>
    fetchData("groups/all", { page: pageParam }, getRequestConfig()),
  getNextPageParam: (lastPage: TPage<TGroup[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});

export const moderationGroupsQuery = () => ({
  queryKey: ["moderation/group"],
  queryFn: ({ pageParam = 0 }): Promise<TPage<TGroupUpdate[]>> =>
    fetchData(
      "groups/moderations/all",
      { page: pageParam },
      getRequestConfig()
    ),
  getNextPageParam: (lastPage: TPage<TGroupUpdate[]>) => {
    return !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined;
  },
  staleTime: 5000,
});
