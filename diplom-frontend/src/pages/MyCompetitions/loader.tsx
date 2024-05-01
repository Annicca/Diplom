import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TCompetition } from "src/types/TCompetition";
import { TPage } from "src/types/TPage";
import { myCompetitionsQuery } from "./myCompetitionsQuery";

export const myCompetitionsLoader = (queryClient: QueryClient, url:string, idUser?: string | number) => async(): Promise<InfiniteData<TPage<TCompetition[]>>> => {
    
    const query = myCompetitionsQuery(url, idUser);

    return queryClient.fetchInfiniteQuery(query);
}