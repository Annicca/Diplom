import { FC, useState } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";
import { Button } from "../button/Button";
import { useNavigate } from "react-router-dom";
import { TitleContainerItem } from "src/components/titleContainerItem/TitleContainerItem";
import { Image } from "src/components/image/Image";
import { chooseStatusCompetition } from "src/utils/choose";
import { TCompetition } from "src/types/TCompetition";
import { TextIcon } from "src/components/textIcon/TextIcon";
import { Contact } from "../contact/Contact";
import { transformDate } from "src/utils/transformDate";
import HouseIcon from "assets/icons/city.svg?react";
import CalendarIcon from "assets/icons/calendar.svg?react";
import GroupIcon from "assets/icons/scene.svg?react";
import StatementIcon from "assets/icons/statement-participant.svg?react";
import { DescriptionItem } from "src/components/descriptionItem/DescriptionItem";
import { FileDownload } from "../fileUpload/FileDownload";
import { NominationsList } from "src/components/nominationsList/NominationsList";
import { NestedList } from "src/components/nominationsList/NestedList";
import classNames from "classnames";
import ArrowIcon from "assets/icons/arrowRight.svg?react";
import InvitIcon from "assets/icons/invitation.svg?react";

import style from "../myGroup/MyGroup.module.scss";
import { GroupParticipant } from "../groupParticipant/GroupParticipant";

interface MyCompetitionProps {
  competition: TCompetition;
  onCancelItem?: () => void;
  onChangeItem?: () => void;
  isSmal?: boolean;
}

export const MyCompetition: FC<MyCompetitionProps> = ({
  onCancelItem,
  onChangeItem,
  competition,
  isSmal = false,
}) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isParticipantOpen, setIsParticipantOpen] = useState(false);

  const toggleVisible = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  const toggleParticipant = () => {
    setIsParticipantOpen((isParticipantOpen) => !isParticipantOpen);
  };

  return (
    <div className={style.myGroup}>
      {user?.role === ERole.ORGANIZER ? (
        <TitleContainerItem
          name={competition.nameCompetition}
          onCancel={onCancelItem}
          onChange={onChangeItem}
        />
      ) : (
        <div className={style.myGroup__title}>
          {competition.nameCompetition}
        </div>
      )}
      <div className={style.myGroup__inner}>
        <Image
          key={competition.img}
          src={competition.img}
          className={style.myGroup__imgContainer}
          alt={competition.nameCompetition}
        />
        <div className={style.myGroup__info}>
          <div className="text-orange">
            Статус: {chooseStatusCompetition(competition.statusCompetition)}
          </div>
          <TextIcon
            icon={<HouseIcon width={20} height={20} />}
            text={competition.cityCompetition.city}
          />
          <Contact
            contact={
              transformDate(competition.dateStart) +
              " - " +
              transformDate(competition.dateFinish)
            }
            icon={<CalendarIcon height={25} />}
            classnames={style.competition__date}
          />
          {!isSmal && (
            <div>
              Стоимость конкурсного взноса: {competition.competitionFee}
            </div>
          )}
        </div>
      </div>
      {user?.role === ERole.ORGANIZER && !isSmal && (
        <div>
          <span className={style.myGroup__infoRules}>
            Информация по положению:
          </span>
          <Button
            type="button"
            className={classNames(style.myGroup__show, {
              [style.myGroup__show_open]: isVisible,
            })}
            isClear={true}
            isYellow={false}
            onClick={toggleVisible}
          >
            <ArrowIcon width={15} height={15} />
          </Button>
        </div>
      )}
      {isVisible && !isSmal && (
        <>
          <NominationsList nominationsList={competition.nominations} />
          {competition.ageCategories &&
            competition.ageCategories?.length > 0 && (
              <NestedList
                key="age"
                list={competition.ageCategories}
                nameList="Возрастные категории"
              />
            )}
          {competition.groupCategories &&
            competition.groupCategories?.length > 0 && (
              <NestedList
                key="groupCategory"
                list={competition.groupCategories}
                nameList="Групповые формы"
              />
            )}
          {competition.rules && !isSmal && (
            <FileDownload
              fileName={competition.rules}
              newFileName={`Положение_конкурса_${competition.nameCompetition}`}
              text="Положение конкурса"
            />
          )}
          {competition.regulation && !isSmal && (
            <FileDownload
              fileName={competition.regulation}
              text="Правила проведения"
              newFileName={`Правила_проведения_конкурса_${competition.nameCompetition}`}
            />
          )}
        </>
      )}

      {user?.role === ERole.ORGANIZER && !isSmal && (
        <div
          className={classNames(
            style.myGroup__btnContainer,
            style.myGroup__btnContainer_three
          )}
        >
          <Button
            onClick={() =>
              navigate(
                `/mycompetitions/participants/${competition.idCompetition}`
              )
            }
            className={style.myGroup__competitionsbtn}
            isYellow={false}
            isClear={true}
          >
            <TextIcon
              icon={<GroupIcon width={25} height={25} fill="currentColor" />}
              text="Участники"
              arrowFill="currentColor"
              isTransition
            />
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/mycompetitions/statements-participant/${competition.idCompetition}`
              )
            }
            className={style.myGroup__competitionsbtn}
            isYellow={false}
            isClear={true}
          >
            <TextIcon
              icon={
                <StatementIcon width={25} height={25} fill="currentColor" />
              }
              text="Заявки"
              arrowFill="currentColor"
              isTransition
            />
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/mycompetitions/invitations/${competition.idCompetition}`
              )
            }
            className={classNames(
              style.myGroup__invitbtn,
              style.myGroup__invitbtn_large
            )}
            isYellow={false}
            isClear={true}
          >
            <TextIcon
              icon={<InvitIcon width={25} height={25} fill="currentColor" />}
              text="Приглашения"
              isTransition
              arrowFill="currentColor"
            />
          </Button>
        </div>
      )}
      {!isSmal && (
        <DescriptionItem description={competition.descriptionCompetition} />
      )}
      {user?.role === ERole.DIRECTOR && !isSmal && (
        <>
          <div>
            <span className={style.myGroup__infoRules}>
              Информация об участии:
            </span>
            <Button
              type="button"
              className={classNames(style.myGroup__show, {
                [style.myGroup__show_open]: isParticipantOpen,
              })}
              isClear={true}
              isYellow={false}
              onClick={toggleParticipant}
            >
              <ArrowIcon width={15} height={15} />
            </Button>
          </div>
          {isParticipantOpen && (
            <GroupParticipant
              key={competition.idCompetition}
              idCompetition={competition.idCompetition}
            />
          )}
        </>
      )}
    </div>
  );
};
