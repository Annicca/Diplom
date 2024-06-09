import { FC } from "react";
import CompareArrow from "assets/icons/compareArrow.svg?react";

import style from "./CompareItem.module.scss";
import classNames from "classnames";

interface CompareItemProps {
  newValue: number | string | null;
  oldValue: number | string | null;
  isVertical?: boolean;
}
export const CompareItem: FC<CompareItemProps> = ({
  newValue,
  oldValue,
  isVertical = false,
}) => {
  return (
    <div
      className={classNames(style.compare, { [style.compare_img]: isVertical })}
    >
      <span className={style.compare__item}>
        {oldValue !== null ? oldValue : "-"}
      </span>
      <CompareArrow width={20} className={style.compare__icon} />
      <span className={style.compare__item}>
        {newValue !== null && newValue !== oldValue ? (
          <span className={style.compare__new}>{newValue}</span>
        ) : (
          "Нет изменений"
        )}
      </span>
    </div>
  );
};
