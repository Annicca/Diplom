import { FC, useRef } from "react";
import { queryClient } from "src/utils/queryClient";
import { TAct } from "src/types/TAct";
import { ButtonSave } from "../button/ButtonSave";
import { TextIcon } from "src/components/textIcon/TextIcon";
import { changeAct } from "src/utils/api";
import GenreIcon from "assets/icons/genre.svg?react";
import AwardIcon from "assets/icons/award.svg?react";
import AgeIcon from "assets/icons/age.svg?react";
import PeopleIcon from "assets/icons/people.svg?react";
import GroupCategoryIcon from "assets/icons/groupCategory.svg?react";
import MedalIcon from "assets/icons/medal.svg?react";

import style from "./Acts.module.scss";
import { Input } from "../input/Input";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";

interface TACtProps {
  act: TAct;
  isParticipant?: boolean;
  isEndCompetition?: boolean;
}

export const Act: FC<TACtProps> = ({
  act,
  isParticipant = false,
  isEndCompetition = false,
}) => {
  const { user } = useUserContext();
  const awardRef = useRef<HTMLInputElement>(null);

  const onSetAward = async () => {
    await changeAct({ ...act, award: awardRef.current?.value });
    queryClient.refetchQueries(["participants"]);
  };

  return (
    <div className={style.act}>
      <div className={style.act__title}>Номер: {act.name}</div>
      <TextIcon
        icon={<PeopleIcon width={30} height={30} />}
        text={act.countPeople.toString()}
      />
      <TextIcon
        icon={<MedalIcon width={30} height={30} />}
        text={act.nomination.name}
      />
      {act.genre && (
        <TextIcon
          icon={<GenreIcon width={40} height={40} />}
          text={act.genre?.name}
        />
      )}
      <TextIcon
        icon={<AgeIcon width={30} height={30} />}
        text={act.ageCategory.name}
      />
      <TextIcon
        icon={<GroupCategoryIcon width={30} height={30} />}
        text={act.groupCategory.name}
      />
      {act.award !== undefined && act.award !== null && isParticipant && (
        <TextIcon
          icon={<AwardIcon width={30} height={30} />}
          text={act.award}
        />
      )}
      {!act.award && isParticipant && !isEndCompetition && (
        <TextIcon icon={<AwardIcon width={30} height={30} />} text="-" />
      )}
      {!act.award &&
        user?.role === ERole.ORGANIZER &&
        isParticipant &&
        isEndCompetition && (
          <div className={style.act__award}>
            <Input
              inputRef={awardRef}
              type="text"
              placeholder="Укажите награду"
              className={style.act__input}
            />
            <ButtonSave onClick={onSetAward} />
          </div>
        )}
    </div>
  );
};
