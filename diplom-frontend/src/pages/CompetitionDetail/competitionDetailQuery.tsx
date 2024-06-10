import { TCompetition } from "src/types/TCompetition";
import { fetchData } from "src/utils/fetch";

export const competitionDetailQuery = (id: string | number | undefined) => ({
  queryKey: ["competitions", { id }],
  queryFn: (): Promise<TCompetition> => fetchData(`competitions/${id}`, {}),
  staleTime: 5000,
});
