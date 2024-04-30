import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TCompetition } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { myCompetitionsQuery } from "./myCompetitionsQuery";

export const myCompetitionsLoader = (queryClient: QueryClient, idUser?: string | number) => async(): Promise<InfiniteData<TPage<TCompetition[]>>> => {
    
    const query = myCompetitionsQuery(idUser);

    return queryClient.fetchInfiniteQuery(query);
}