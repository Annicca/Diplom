import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TCompetition } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { competitionsQuery } from "./competitionsQuery";

export const competitionsLoader = (queryClient: QueryClient) => async(): Promise<InfiniteData<TPage<TCompetition[]>>> => {
    
    const query = competitionsQuery({});

    return queryClient.fetchInfiniteQuery(query);
}