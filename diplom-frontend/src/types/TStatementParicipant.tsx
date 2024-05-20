import { TAct, TActDto } from "./TAct";
import { TCompetition } from "./TCompetition";
import { TGroup } from "./TGroup";

export interface TStatementParticipant {
    id: number;
    group: TGroup;
    competition: TCompetition;
    acts: TAct[];
    countParticipants: number;
    countAccompanying: number;
    cost?: number;
    status?: string | null
}

export interface TStatementParticipantDto {
    group: {
        label: string;
        value: TGroup
    };
    competition: TCompetition;
    acts: TActDto[];
    countParticipants: number;
    countAccompanying: number;
}