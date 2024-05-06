import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TPage } from "src/types/TPage";
import { statementsQuery } from "./statementsQuery";
import { TStaement } from "src/types/TStatement";

export const statementsLoader = (queryClient: QueryClient, id?: string | number) => async(): Promise<InfiniteData<TPage<TStaement[]>>> => {
    
    const query = statementsQuery(id);

    return queryClient.fetchInfiniteQuery(query);
}