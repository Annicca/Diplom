import { EStatusModeration } from "./EStatusModeration";
import { TCIty } from "./TCity";
import { TUser } from "./TUser";

export interface TGroup {
  idGroup: number;
  director: TUser;
  nameGroup: string;
  descriptionGroup: string;
  cityGroup: TCIty;
  addressGroup: string;
  category: string | null;
  img: string | null;
  statusModeration: EStatusModeration | null;
}

export interface TGroupUpdate {
  id: number;
  nameGroup: string;
  descriptionGroup: string;
  cityGroup: TCIty;
  addressGroup: string;
  category: string | null;
  img: string | null;
  statusModeration: EStatusModeration | null;
  artGroup: TGroup;
}
