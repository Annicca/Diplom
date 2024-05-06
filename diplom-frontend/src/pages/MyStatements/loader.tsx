import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { statementsQuery } from "./statementsQuery";
import { TPage } from "src/types/TPage";
import { TStaement } from "src/types/TStatement";

export const myStatementsLoader = (queryClient: QueryClient, idUser?: string) => async(): Promise<InfiniteData<TPage<TStaement[]>>> => {
    const query = statementsQuery(idUser);

    return queryClient.fetchInfiniteQuery(query);
}