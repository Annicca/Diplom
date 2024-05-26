import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TPage } from "src/types/TPage";
import { statementsQuery } from "./statementsQuery";
import { TStatement } from "src/types/TStatement";

export const statementsLoader = (queryClient: QueryClient, id?: string | number) => async(): Promise<InfiniteData<TPage<TStatement[]>>> => {
    
    const query = statementsQuery(id);

    return queryClient.fetchInfiniteQuery(query);
}