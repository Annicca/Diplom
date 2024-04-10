import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TCompetition } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { competitionQuery } from "./competitionQuery";

export const competitionLoader = (queryClient: QueryClient) => async(): Promise<InfiniteData<TPage<TCompetition[]>>> => {
    
    const query = competitionQuery({});

    return queryClient.fetchInfiniteQuery(query);
}