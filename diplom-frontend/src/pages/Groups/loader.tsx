import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TGroup } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { groupsQuery } from "./groupsQuery";

export const groupsLoader = (queryClient: QueryClient) => async(): Promise<InfiniteData<TPage<TGroup[]>>> => {
    
    const query = groupsQuery("");

    return queryClient.fetchInfiniteQuery(query);
}