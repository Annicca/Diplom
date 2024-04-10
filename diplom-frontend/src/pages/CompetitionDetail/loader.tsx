import { QueryClient } from "react-query";
import { TCompetition } from "src/types/TCompetition";
import { competitionDetailQuery } from "./competitionDetailQuery";
import { useParams } from "react-router-dom";

export const competitionDetailLoader = (queryClient: QueryClient) => async(): Promise<TCompetition> => {
    
    const {id} = useParams()
    const query = competitionDetailQuery(id);

    return queryClient.fetchQuery(query);
}