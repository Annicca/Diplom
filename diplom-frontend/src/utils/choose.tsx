import { EStatus } from "src/types/EStatus";
import { EStatusModeration } from "src/types/EStatusModeration";

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
    case EStatus.ACCEPTED:
      return "Принято";
    case EStatus.REJECTED:
      return "Отлконено";
    default:
      return "-";
  }
};

export const chooseStatusModeration = (
  status?: EStatusModeration | null
): string => {
  switch (status) {
    case EStatusModeration.ON_MODERATION:
      return "На модерации";
    case EStatusModeration.PASSED:
      return "Принято";
    case EStatusModeration.NOT_PASSED:
      return "Отклонено";
    default:
      return "-";
  }
};
