import { TAct } from "./TAct";
import { TCompetition } from "./TCompetition";
import { TGroup } from "./TGroup";

export interface TParticipant {
  id: number;
  competition: TCompetition;
  group: TGroup;
  countParticipants: number;
  countAccompanying: number;
  perfomances: TAct[];
}
