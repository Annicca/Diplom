import { FC } from "react";
import { TParticipant } from "src/types/TParticipant";
import { Image } from "src/components/image/Image";
import { Link } from "react-router-dom";
import { TextIcon } from "src/components/textIcon/TextIcon";
import { Acts } from "../acts/Acts";
import HouseIcon from "assets/icons/city.svg?react";
// import CalendarIcon from "assets/icons/calendar.svg?react";
import PlaceIcon from "assets/icons/place.svg?react";
import PeopleIcon from "assets/icons/people.svg?react";
import GroupIcon from "assets/icons/scene.svg?react";
// import CompetitionIcon from "assets/icons/competitions.svg?react";
import PeopleAccompaning from "assets/icons/accompaning.svg?react";
// import CountIcon from "assets/icons/money.svg?react";
import style from "../statementParticipant/StatementParticipant.module.scss";

interface TParticipantProps {
  participant: TParticipant;
}

export const Participant: FC<TParticipantProps> = ({ participant }) => {
  return (
    <div className={style.statement}>
      <div className={style.statement__inner}>
        <Image
          src={participant.group.img}
          className={style.statement__imgContainer}
          alt={participant.group.nameGroup}
        />
        <div className={style.statement__innerRight}>
          <Link
            to={`/groups/${participant.group.idGroup}`}
            className="text-orange"
          >
            <TextIcon
              icon={<GroupIcon width={20} height={20} fill="currentColor" />}
              text={participant.group.nameGroup}
              isTransition
              arrowFill="currentColor"
            />
          </Link>
          <TextIcon
            icon={<HouseIcon width={20} height={20} />}
            text={participant.group.cityGroup.city}
          />
          <TextIcon
            icon={<PlaceIcon width={20} height={20} />}
            text={participant.group.addressGroup}
          />
        </div>
        <div className={style.statement____innerRight}>
          <TextIcon
            icon={<PeopleIcon width={30} height={30} />}
            text={"Участники: " + participant.countParticipants}
          />
          <TextIcon
            icon={<PeopleAccompaning width={30} height={30} />}
            text={"Сопровождающие: " + participant.countAccompanying}
          />
        </div>
      </div>
      <Acts acts={participant.perfomances} />
    </div>
  );
};
