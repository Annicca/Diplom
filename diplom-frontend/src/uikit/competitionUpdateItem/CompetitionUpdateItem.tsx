import { FC } from "react";
import { TCompetitionUpdate } from "src/types/TCompetition";
import { CompareImg } from "../compareImg/CompareImg";
import { CompareItem } from "../compareItem/CompareItem";
import { Button } from "../button/Button";
import { EStatusModeration, StatusUpdate } from "src/types/EStatusModeration";

import style from "../groupUpdate/GroupUpdateItem.module.scss";

interface CompetitionUpdateItemProps {
  competitionUpdate: TCompetitionUpdate;
  onModeration: (status: string, idCompetitionUpdate: number) => void;
}

export const CompetitionUpdateItem: FC<CompetitionUpdateItemProps> = ({
  competitionUpdate,
  onModeration,
}) => {
  return (
    <div className={style.groupUpdate}>
      <CompareImg
        newImg={competitionUpdate.img}
        oldImg={competitionUpdate.competition.img}
      />
      <CompareItem
        newValue={competitionUpdate.dateStart}
        oldValue={competitionUpdate.competition.dateStart}
      />
      <CompareItem
        newValue={competitionUpdate.dateFinish}
        oldValue={competitionUpdate.competition.dateFinish}
      />
      <CompareItem
        newValue={competitionUpdate.descriptionCompetition}
        oldValue={competitionUpdate.competition.descriptionCompetition}
        isVertical
      />
      <div className={style.buttons}>
        <Button
          disabled={
            competitionUpdate.statusModeration !==
            EStatusModeration.ON_MODERATION
          }
          className={style.buttons__btn}
          onClick={() =>
            onModeration(StatusUpdate.PASSED, competitionUpdate.id)
          }
        >
          Принять
        </Button>
        <Button
          disabled={
            competitionUpdate.statusModeration !==
            EStatusModeration.ON_MODERATION
          }
          isYellow={false}
          isCancel
          className={style.buttons__btn}
          onClick={() =>
            onModeration(StatusUpdate.NOTPASSED, competitionUpdate.id)
          }
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};
