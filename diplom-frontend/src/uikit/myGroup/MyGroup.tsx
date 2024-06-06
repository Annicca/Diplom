import { FC } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { useNavigate } from "react-router-dom";
import { Image } from "src/components/image/Image";
import { TGroup } from "src/types/TGroup";
import { ERole } from "src/types/ERole";
import { Button } from "../button/Button";
import { TextIcon } from "src/components/textIcon/TextIcon";
import { DescriptionItem } from "src/components/descriptionItem/DescriptionItem";
import { TitleContainerItem } from "src/components/titleContainerItem/TitleContainerItem";
import StatementParticipantIcon from "assets/icons/statement-participant.svg?react";
import HouseIcon from "assets/icons/city.svg?react";
import PlaceIcon from "assets/icons/place.svg?react";
import CompetitionIcon from "assets/icons/competitions.svg?react";
import InvitIcon from "assets/icons/invitation.svg?react";

import style from "./MyGroup.module.scss";

interface MyGroupProps {
  group: TGroup;
  onDeleteItem?: () => void;
  onChangeItem?: () => void;
}

export const MyGroup: FC<MyGroupProps> = ({
  group,
  onChangeItem,
  onDeleteItem,
}) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  return (
    <div className={style.myGroup}>
      {user?.role === ERole.DIRECTOR ? (
        <TitleContainerItem
          name={group.nameGroup}
          onTrash={onDeleteItem}
          onChange={onChangeItem}
        />
      ) : (
        <div className={style.myGroup__title}>{group.nameGroup}</div>
      )}
      <div className={style.myGroup__inner}>
        <Image
          src={group.img}
          className={style.myGroup__imgContainer}
          alt={group.nameGroup}
        />
        <div className={style.myGroup__info}>
          <div className="text-orange">Стиль: {group.category || "-"}</div>
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
      <DescriptionItem description={group.descriptionGroup} />
      {user?.role === ERole.DIRECTOR && (
        <>
          <div className={style.myGroup__btnContainer}>
            <Button
              onClick={() =>
                navigate(`/mygroups/competitions/${group.idGroup}`)
              }
              isClear={true}
              isYellow={false}
              className={style.myGroup__competitionsbtn}
            >
              <TextIcon
                icon={
                  <CompetitionIcon width={25} height={25} fill="currentColor" />
                }
                text="Конкурсы"
                isTransition
                arrowFill="currentColor"
              />
            </Button>
            <Button
              onClick={() =>
                navigate(`/mygroups/invitations/${group.idGroup})}`)
              }
              isClear={true}
              isYellow={false}
              className={style.myGroup__invitbtn}
            >
              <TextIcon
                icon={<InvitIcon width={25} height={25} fill="currentColor" />}
                text="Приглашения"
                isTransition
                arrowFill="currentColor"
              />
            </Button>
          </div>
          <Button
            onClick={() =>
              navigate(`/mygroups/statements-participant/${group.idGroup}`)
            }
            isClear={true}
            isYellow={false}
            className={style.myGroup__participantbtn}
          >
            <TextIcon
              icon={
                <StatementParticipantIcon
                  width={25}
                  height={25}
                  fill="currentColor"
                />
              }
              text="Заявка на участие"
              isTransition
              arrowFill="currentColor"
            />
          </Button>
        </>
      )}
    </div>
  );
};
