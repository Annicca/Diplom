import { EStatus } from "src/types/EStatus";

export const chooseStatusCompetition = (status: string): string => {
  switch (status) {
    case "CREATED":
      return "Набор участников";
    case "STARTED":
      return "Проводится";
    case "CANCELLED":
      return "Отменен";
    case "FINISHED":
      return "Окончен";
    default:
      return "-";
  }
};

export const chooseStatus = (status?: EStatus | null): string => {
  switch (status) {
    case "ACCEPTED":
      return "Принято";
    case "REJECTED":
      return "Отлконено";
    default:
      return "-";
  }
};
