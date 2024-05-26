import { FC, useState } from "react";
import { List } from "src/components/list/List";
import { TAct } from "src/types/TAct";
import { Button } from "../button/Button";
import classNames from "classnames";
import { TextIcon } from "src/components/textIcon/TextIcon";
import ArrowIcon from "assets/icons/arrowRight.svg?react";
import GenreIcon from "assets/icons/genre.svg?react";
import AwardIcon from "assets/icons/award.svg?react";
import AgeIcon from "assets/icons/age.svg?react";
import PeopleIcon from "assets/icons/people.svg?react";
import GroupCategoryIcon from "assets/icons/groupCategory.svg?react";

import style from "./Acts.module.scss";

interface TActsProps {
  acts: TAct[];
}

export const Acts: FC<TActsProps> = ({ acts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible((isVisible) => !isVisible);
  };
  return (
    <div className={style.acts}>
      <div className={style.acts__title}>
        <span className="text-orange">Номера</span>
        <Button
          type="button"
          className={classNames(style.acts__show, {
            [style.acts__show_open]: isVisible,
          })}
          isClear={true}
          isYellow={false}
          onClick={toggleVisible}
        >
          <ArrowIcon width={15} height={15} />
        </Button>
      </div>
      {isVisible && (
        <List
          items={acts}
          renderItem={(act) => (
            <div key={act.id} className={style.act}>
              <div className={style.act__title}>Номер: {act.name}</div>
              <TextIcon
                icon={<PeopleIcon width={30} height={30} />}
                text={act.countPeople.toString()}
              />
              <TextIcon
                icon={<AwardIcon width={30} height={30} />}
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
            </div>
          )}
        />
      )}
    </div>
  );
};
