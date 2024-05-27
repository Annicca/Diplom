import { QueryClient } from "@tanstack/react-query";
import { participantsQuery } from "./participantsQuery";
import { TParticipant } from "src/types/TParticipant";
import { TPage } from "src/types/TPage";
import { InfiniteData } from "react-query";

export const participantsLoader =
  (queryClient: QueryClient, id?: string | number) =>
  async (): Promise<InfiniteData<TPage<TParticipant[]>>> => {
    const query = participantsQuery(id);

    return queryClient.fetchInfiniteQuery(query);
  };
