import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "src/components/image/Image";
import { TextIcon } from "src/components/textIcon/TextIcon";
import { TGroup } from "src/types/TGroup";
import HouseIcon from "assets/icons/city.svg?react";
import PlaceIcon from "assets/icons/place.svg?react";

import style from "./Group.module.scss";
import classNames from "classnames";

interface GroupProps {
  group: TGroup;
  isSmal?: boolean;
}

export const Group: FC<GroupProps> = ({ group, isSmal = false }) => {
  return (
    <Link
      to={`${group.idGroup}`}
      className={classNames(style.group, { [style.group_smal]: isSmal })}
    >
      <div className={style.group__imgContainer}>
        <Image
          key={group.img}
          src={group.img}
          alt={group.nameGroup}
          className={style.group__image}
        />
      </div>
      <div className={style.group__info}>
        <div className={style.group__infoSection}>
          <div className={style.group__title}>{group.nameGroup}</div>
          <div className="text-orange">Категория: {group.category || "-"}</div>
        </div>
        <div className={style.group__infoSection}>
          <TextIcon
            icon={<HouseIcon width={20} height={20} />}
            text={group.cityGroup.city}
          />
          <TextIcon
            icon={<PlaceIcon width={20} height={20} />}
            text={group.addressGroup}
          />
        </div>
      </div>
    </Link>
  );
};
