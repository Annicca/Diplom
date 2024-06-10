import { FC } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";
import { Image } from "src/components/image/Image";
import { Info } from "src/uikit/info/Info";
import { Button } from "src/uikit/button/Button";
import classNames from "classnames";
import { FileDownload } from "../fileUpload/FileDownload";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { TNomination } from "src/types/TNomination";
import { TAgeCategory } from "src/types/TAgeCategory";
import { TGroupCategory } from "src/types/TGroupCategory";
import { NominationsList } from "src/components/nominationsList/NominationsList";
import { NestedList } from "src/components/nominationsList/NestedList";
import { withConditional } from "src/hoc/withConditionalRender";
import style from "./Detail.module.scss";

interface DetailProps {
  img: string | null;
  name: string;
  city: string;
  status?: string;
  dateStart?: string;
  dateFinish?: string;
  number?: string;
  mail: string;
  address?: string;
  rules?: string | null;
  regulation?: string | null;
  nominations?: TNomination[];
  ageCategories?: TAgeCategory[];
  groupCategories?: TGroupCategory[];
  description: string | null;
  buttonText: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const Detail: FC<DetailProps> = ({
  img,
  name,
  city,
  status,
  dateStart,
  dateFinish,
  rules,
  regulation,
  number,
  mail,
  address,
  nominations,
  ageCategories,
  groupCategories,
  description,
  buttonText,
  onClick,
  isDisabled,
}) => {
  const { user } = useUserContext();
  return (
    <section className={style.detail}>
      <MainTite>Конкурс</MainTite>
      <Image src={img} alt={name} className={style.detail__image} />
      <h1 className={style.detail__title}>{name}</h1>
      <p className={style.detail__city}>{`Город: ${city}`}</p>
      {status && (
        <p
          className={classNames("text-orange", style.detail__status)}
        >{`Статус: ${status}`}</p>
      )}
      <Info
        dateStart={dateStart}
        dateFinish={dateFinish}
        number={number}
        mail={mail}
        address={address}
        clasNameContainer={style.detail__info}
      />
      <div className={style.detail__content}>
        {rules && (
          <FileDownload
            fileName={rules}
            newFileName={`Положение_конкурса_${name}`}
            text="Положение конкурса"
          />
        )}
        {regulation && (
          <FileDownload
            fileName={regulation}
            text="Правила проведения"
            newFileName={`Правила_проведения_конкурса_${name}`}
          />
        )}
        {nominations && nominations.length > 0 && (
          <NominationsList nominationsList={nominations} />
        )}
        {ageCategories && ageCategories?.length > 0 && (
          <NestedList
            key="age"
            list={ageCategories}
            nameList="Возрастные категории"
          />
        )}
        {groupCategories && groupCategories?.length > 0 && (
          <NestedList
            key="groupCategory"
            list={groupCategories}
            nameList="Групповые формы"
          />
        )}
      </div>
      <p className={style.detail__description}>{description}</p>
      {onClick &&
        (user?.role === ERole.ORGANIZER || user?.role === ERole.DIRECTOR) && (
          <Button
            disabled={isDisabled}
            onClick={onClick}
            isGradient
            isYellow={false}
            className={style.detail__button}
          >
            {buttonText}
          </Button>
        )}
    </section>
  );
};

export default withConditional(Detail);
