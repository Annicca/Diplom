import { TAct, TActDto } from "./TAct";
import { TCompetition } from "./TCompetition";
import { TGroup } from "./TGroup";

export interface TStatementParticipant {
  id: number;
  group: TGroup;
  competition: TCompetition;
  perfomances: TAct[];
  countParticipants: number;
  countAccompanying: number;
  cost?: number;
  status: string | null;
  payment?: boolean;
}

export interface TStatementParticipantDto {
  group: {
    label: string;
    value: TGroup;
  };
  competition: TCompetition;
  perfomances: TActDto[];
  countParticipants: number;
  countAccompanying: number;
}

export interface IStatementParticipantRequest {
  group: TGroup;
  competition: TCompetition;
  perfomances: TAct[];
  countParticipants: number;
  countAccompanying: number;
}
