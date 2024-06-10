import { FC } from "react";
import { Image } from "src/components/image/Image";
import classNames from "classnames";
import CompareArrow from "assets/icons/compareArrow.svg?react";

import style from "../compareItem/CompareItem.module.scss";

interface CompareImgProps {
  newImg: string | null;
  oldImg: string | null;
}
export const CompareImg: FC<CompareImgProps> = ({ newImg, oldImg }) => {
  return (
    <div className={classNames(style.compare, style.compare_img)}>
      <span className={style.compare__item}>
        <Image src={oldImg} alt="Старое изображение" className={style.img} />
      </span>
      <CompareArrow width={20} className={style.compare__icon} />
      <span className={style.compare__item}>
        {newImg !== null ? (
          <Image
            src={newImg}
            alt="Новое изображение"
            className={classNames(style.img, style.img_new)}
          />
        ) : (
          <span>Нет изменений</span>
        )}
      </span>
    </div>
  );
};
