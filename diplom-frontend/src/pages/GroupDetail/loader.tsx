import { QueryClient } from "@tanstack/react-query"
import { TGroup } from "src/types/TGroup";
import { groupQuery } from "./groupQuery";

export const groupLoader = (queryClient: QueryClient, id?: string) => async(): Promise<TGroup> => {

    const query = groupQuery(id);

    return queryClient.fetchQuery(query);
}