import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { TGroupUpdate } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { moderationGroupsQuery } from "./adminGroupsQuery";

export const adminLoader =
  (queryClient: QueryClient) =>
  async (): Promise<InfiniteData<TPage<TGroupUpdate[]>>> => {
    const query = moderationGroupsQuery();

    return queryClient.fetchInfiniteQuery(query);
  };
