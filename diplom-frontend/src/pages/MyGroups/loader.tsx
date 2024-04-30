import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TGroup } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { myGroupsQuery } from "./myGroupsQuery";

export const myGroupsLoader = (queryClient: QueryClient, idUser?: string | number) => async(): Promise<InfiniteData<TPage<TGroup[]>>> => {
    
    const query = myGroupsQuery(idUser);

    return queryClient.fetchInfiniteQuery(query);
}