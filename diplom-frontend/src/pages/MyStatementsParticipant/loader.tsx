import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { TStatementParticipant } from "src/types/TStatementParicipant";
import { myStatementsParticipantQuery } from "./statementsParticipantQuery";

export const myStatementsParticipantLoader =
  (queryClient: QueryClient, url: string, id?: string | number) =>
  async (): Promise<InfiniteData<TPage<TStatementParticipant[]>>> => {
    const query = myStatementsParticipantQuery(url, id);

    return queryClient.fetchInfiniteQuery(query);
  };
