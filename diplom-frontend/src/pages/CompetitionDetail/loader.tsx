import { QueryClient } from "@tanstack/react-query"
import { TCompetition } from "src/types/TCompetition";
import { competitionDetailQuery } from "./competitionDetailQuery";

export const competitionDetailLoader = (queryClient: QueryClient, id?: string) => async(): Promise<TCompetition> => {

    const query = competitionDetailQuery(id);

    return queryClient.fetchQuery(query);
}