import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { TInvitation } from "src/types/TInvitation";
import { TPage } from "src/types/TPage";
import { invitationsQuery } from "./invitationsQuery";

export const invitationsLoader =
  (queryClient: QueryClient, url: string, id?: string) =>
  async (): Promise<InfiniteData<TPage<TInvitation[]>>> => {
    const query = invitationsQuery(url, id);

    return queryClient.fetchInfiniteQuery(query);
  };
