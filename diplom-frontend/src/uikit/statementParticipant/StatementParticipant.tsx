import { FC } from "react";
import { StatementTitle } from "src/components/statementTitle/StatementTitle";
import { useUserContext } from "src/context/user-context/useUserContext";
import { chooseStatusCompetition } from "src/utils/choose";
import { transformDate } from "src/utils/transformDate";
import { ERole } from "src/types/ERole";
import { Link } from "react-router-dom";
import { TStatementParticipant } from "src/types/TStatementParicipant";
import { Image } from "src/components/image/Image";
import { TextIcon } from "src/components/textIcon/TextIcon";
import { Contact } from "../contact/Contact";
import HouseIcon from "assets/icons/city.svg?react";
import CalendarIcon from "assets/icons/calendar.svg?react";
import PlaceIcon from "assets/icons/place.svg?react";
import PeopleIcon from "assets/icons/people.svg?react";
import GroupIcon from "assets/icons/scene.svg?react";
import CompetitionIcon from "assets/icons/competitions.svg?react";
import PeopleAccompaning from "assets/icons/accompaning.svg?react";
import CountIcon from "assets/icons/money.svg?react";
import { Button } from "../button/Button";
import { Acts } from "../acts/Acts";

import style from "./StatementParticipant.module.scss";

interface TStatementParticipantProps {
  statement: TStatementParticipant;
  accept?: (id: number) => void;
  reject?: (id: number) => void;
  payment?: (id: number) => void;
}

export const StatementParticipant: FC<TStatementParticipantProps> = ({
  statement,
  accept = () => {},
  reject = () => {},
  payment = () => {},
}) => {
  const { user } = useUserContext();
  return (
    <div className={style.statement}>
      <StatementTitle number={statement.id} status={statement.status} />
      <div className="text-orange" key={Number(statement.payment) || null}>
        Статус оплаты: {statement.payment ? "Оплачено" : "Не оплачено"}
      </div>
      {user?.role === ERole.DIRECTOR && (
        <div className={style.statement__inner}>
          <Image
            key={statement.competition.img}
            src={statement.competition.img}
            className={style.statement__imgContainer}
            alt={statement.competition.nameCompetition}
          />
          <div className={style.statement__innerRight}>
            <Link
              to={`/competitions/${statement.competition.idCompetition}`}
              className="text-orange"
            >
              <TextIcon
                icon={
                  <CompetitionIcon width={20} height={20} fill="currentColor" />
                }
                text={statement.competition.nameCompetition}
                arrowFill="currentColor"
                isTransition
              />
            </Link>
            <div className="text-orange">
              Статус:{" "}
              {statement.competition.statusCompetition
                ? chooseStatusCompetition(
                    statement.competition.statusCompetition
                  )
                : "-"}
            </div>
            <TextIcon
              icon={<HouseIcon width={20} height={20} />}
              text={statement.competition.cityCompetition.city}
            />
            <Contact
              contact={
                transformDate(statement.competition.dateStart) +
                " - " +
                transformDate(statement.competition.dateFinish)
              }
              icon={<CalendarIcon height={25} />}
              classnames={style.competition__date}
            />
          </div>
        </div>
      )}
      {user?.role === ERole.ORGANIZER && (
        <div className={style.statement__inner}>
          <Image
            src={statement.group.img}
            className={style.statement__imgContainer}
            alt={statement.group.nameGroup}
          />
          <div className={style.statement__innerRight}>
            <Link
              to={`/groups/${statement.group.idGroup}`}
              className="text-orange"
            >
              <TextIcon
                icon={<GroupIcon width={20} height={20} fill="currentColor" />}
                text={statement.group.nameGroup}
                isTransition
                arrowFill="currentColor"
              />
            </Link>
            <TextIcon
              icon={<HouseIcon width={20} height={20} />}
              text={statement.group.cityGroup.city}
            />
            <TextIcon
              icon={<PlaceIcon width={20} height={20} />}
              text={statement.group.addressGroup}
            />
          </div>
        </div>
      )}
      <div className={style.statement____innerRight}>
        <TextIcon
          icon={<PeopleIcon width={30} height={30} />}
          text={"Участники: " + statement.countParticipants}
        />
        <TextIcon
          icon={<PeopleAccompaning width={30} height={30} />}
          text={"Сопровождающие: " + statement.countAccompanying}
        />
        <TextIcon
          icon={<CountIcon width={30} height={30} />}
          text={"Стоимость: " + statement.cost}
        />
        <Acts acts={statement.perfomances} />
      </div>
      {user?.role === ERole.ORGANIZER && !statement.status && (
        <div className={style.statement__buttonContainer}>
          <Button
            onClick={() => accept(statement.id)}
            disabled={statement.status !== null}
            className={style.statement__btn}
          >
            Принять
          </Button>

          <Button
            onClick={() => reject(statement.id)}
            disabled={statement.status !== null}
            className={style.statement__btn}
          >
            Отклонить
          </Button>
        </div>
      )}

      {statement.status && !statement.payment && (
        <Button
          onClick={() => payment(statement.id)}
          className={style.statement__btn}
        >
          Оплачено
        </Button>
      )}
    </div>
  );
};
