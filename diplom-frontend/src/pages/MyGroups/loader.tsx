import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TGroup } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { myGroupsQuery } from "./myGroupsQuery";

export const myGroupsLoader = (queryClient: QueryClient, url:string, id?: string | number) => async(): Promise<InfiniteData<TPage<TGroup[]>>> => {
    
    const query = myGroupsQuery(url, id);

    return queryClient.fetchInfiniteQuery(query);
}