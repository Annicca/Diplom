import { EStatusCompetition } from "./EStatusCompetition";
import { EStatusModeration } from "./EStatusModeration";
import { TAgeCategory } from "./TAgeCategory";
import { TCIty } from "./TCity";
import { TGroupCategory } from "./TGroupCategory";
import { TNomination } from "./TNomination";
import { TUser } from "./TUser";

export interface TCompetition {
  idCompetition: number;
  organizer: TUser;
  nameCompetition: string;
  descriptionCompetition: string;
  dateStart: string;
  dateFinish: string;
  cityCompetition: TCIty;
  statusCompetition: EStatusCompetition;
  statusModeration: EStatusModeration;
  img: string | null;
  competitionFee: number | null;
  rules: string | null;
  regulation: string | null;
  nominations: TNomination[];
  groupCategories?: TGroupCategory[];
  ageCategories?: TAgeCategory[];
}

export interface TCompetitionUpdate {
  id: number;
  descriptionCompetition: string;
  dateStart: string;
  dateFinish: string;
  competition: TCompetition;
  img: string | null;
  statusModeration: EStatusModeration;
}
