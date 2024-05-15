import { FC } from "react";
import { Image } from "src/components/image/Image";
import { Info } from "src/uikit/info/Info";
import { Button } from "src/uikit/button/Button";
import classNames from "classnames";

import style from './Detail.module.scss'
import { FileDownload } from "../fileUpload/FileDownload";
import { MainTite } from "src/components/mainTitle/MainTitle";

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
    description: string | null;
    buttonText: string;
    onClick?: () => void;
    isDisabled?: boolean;
}

export const Detail:FC<DetailProps>= ({img, name, city, status, dateStart, dateFinish, rules, regulation, number, mail,address, description, buttonText, onClick, isDisabled}) => {
    return(
        <section className={style.detail}>
            <MainTite>Конкурс</MainTite>
            <Image 
                src = {img}
                alt = {name}
                className={style.detail__image}
            />
            <h1 className={style.detail__title}>{name}</h1>
            <p className={style.detail__city}>{`Город: ${city}`}</p>
            {status && <p className={classNames("text-orange", style.detail__status)}>{`Статус: ${status}`}</p>}
            <Info 
                dateStart={dateStart} 
                dateFinish={dateFinish}
                number={number}
                mail={mail}
                address={address}
                clasNameContainer={style.detail__info}
            />
            {rules &&
                <FileDownload fileName={rules} newFileName = {`Положение_конкурса_${name}`} text = "Положение конкурса"/>
            }
            {regulation &&
                <FileDownload fileName={regulation} text = "Правила проведения" newFileName = {`Правила_проведения_конкурса_${name}`}/>
            }
            <p className={style.detail__description}>{description}</p>
            <Button
                disabled={isDisabled} 
                onClick={onClick} 
                isGradient
                isYellow={false}
                className={style.detail__button}  
            >
                {buttonText}
            </Button>
        </section>
    )
}