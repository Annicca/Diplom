import { FC } from "react";
import { TGroupUpdate } from "src/types/TGroup";
import { CompareItem } from "../compareItem/CompareItem";
import { Button } from "../button/Button";

import style from "./GroupUpdateItem.module.scss";
import { CompareImg } from "../compareImg/CompareImg";
import { EStatusModeration } from "src/types/EStatusModeration";

interface GroupUpdateItemProps {
  groupUpdate: TGroupUpdate;
  onModeration: (status: string, idGroupUpdate: number) => void;
}

enum StatusUpdate {
  PASSED = "passed",
  NOTPASSED = "notpassed",
}

export const GroupUpdateItem: FC<GroupUpdateItemProps> = ({
  groupUpdate,
  onModeration,
}) => {
  return (
    <div className={style.groupUpdate}>
      <CompareImg newImg={groupUpdate.img} oldImg={groupUpdate.artGroup.img} />
      <CompareItem
        newValue={groupUpdate.nameGroup}
        oldValue={groupUpdate.artGroup.nameGroup}
      />
      <CompareItem
        newValue={groupUpdate.category}
        oldValue={groupUpdate.artGroup.category}
      />
      <CompareItem
        newValue={groupUpdate.cityGroup.city}
        oldValue={groupUpdate.artGroup.cityGroup.city}
      />
      <CompareItem
        newValue={groupUpdate.addressGroup}
        oldValue={groupUpdate.artGroup.addressGroup}
      />
      <CompareItem
        newValue={groupUpdate.descriptionGroup}
        oldValue={groupUpdate.artGroup.descriptionGroup}
        isVertical
      />
      <div className={style.buttons}>
        <Button
          disabled={
            groupUpdate.statusModeration !== EStatusModeration.ON_MODERATION
          }
          className={style.buttons__btn}
          onClick={() => onModeration(StatusUpdate.PASSED, groupUpdate.id)}
        >
          Принять
        </Button>
        <Button
          disabled={
            groupUpdate.statusModeration !== EStatusModeration.ON_MODERATION
          }
          isYellow={false}
          isCancel
          className={style.buttons__btn}
          onClick={() => onModeration(StatusUpdate.NOTPASSED, groupUpdate.id)}
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};
