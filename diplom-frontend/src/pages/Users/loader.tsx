import { InfiniteData, QueryClient } from "@tanstack/react-query"
import { TPage } from "src/types/TPage";
import { TUser } from "src/types/TUser";
import { usersQuery } from "./usersQuery";

export const usersLoader = (queryClient: QueryClient) => async(): Promise<InfiniteData<TPage<TUser[]>>> => {
    
    const query = usersQuery("");

    return queryClient.fetchInfiniteQuery(query);
}