import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { moderationCompetitionsQuery } from "./adminCompetitionsQuery";
import { TCompetitionUpdate } from "src/types/TCompetition";

export const adminCompetitionsLoader =
  (queryClient: QueryClient) =>
  async (): Promise<InfiniteData<TPage<TCompetitionUpdate[]>>> => {
    const query = moderationCompetitionsQuery();

    return queryClient.fetchInfiniteQuery(query);
  };
