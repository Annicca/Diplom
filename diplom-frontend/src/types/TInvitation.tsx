import { EStatus } from "./EStatus";
import { TCompetition } from "./TCompetition";
import { TGroup } from "./TGroup";

export interface TInvitation {
  id?: number;
  group: TGroup;
  competition: TCompetition;
  status?: EStatus | null;
}
