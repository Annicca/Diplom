import { FC } from "react";
import { Button } from "src/uikit/button/Button";
import { TextIcon } from "../textIcon/TextIcon";
import EditIcon from "assets/icons/edit.svg?react";
import TrashIcon from "assets/icons/trash.svg?react";
import CancelIcon from "assets/icons/cancel.svg?react";
import style from "./TitleContainerItem.module.scss";

interface TitleContainerItemProps {
  name: string;
  onTrash?: () => void;
  onChange?: () => void;
  onCancel?: () => void;
}

export const TitleContainerItem: FC<TitleContainerItemProps> = ({
  name,
  onTrash,
  onChange,
  onCancel,
}) => {
  return (
    <div className={style.titleContainer}>
      {onChange ? (
        <Button isClear={true} isYellow={false} onClick={onChange}>
          <TextIcon
            icon={<EditIcon width={25} height={25} fill="#FF6B00" />}
            text={name}
          />
        </Button>
      ) : (
        <div>{name}</div>
      )}
      {onTrash && (
        <Button isClear={true} isYellow={false} onClick={onTrash}>
          <TrashIcon width={25} height={25} fill={"red"} />
        </Button>
      )}
      {onCancel && (
        <Button
          isClear={true}
          isYellow={false}
          className={style.cancel}
          onClick={onCancel}
        >
          <CancelIcon width={25} height={25} fill={"red"} />
        </Button>
      )}
    </div>
  );
};
