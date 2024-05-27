import { FC, useState } from "react";
import { List } from "src/components/list/List";
import { TAct } from "src/types/TAct";
import { Button } from "../button/Button";
import { Act } from "./Act";
import classNames from "classnames";
import ArrowIcon from "assets/icons/arrowRight.svg?react";

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
          renderItem={(act) => <Act key={act.id} act={act} />}
        />
      )}
    </div>
  );
};
