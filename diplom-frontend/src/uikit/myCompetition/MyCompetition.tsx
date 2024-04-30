import { FC } from "react";
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
import HouseIcon from 'assets/icons/city.svg?react'
import CalendarIcon from 'assets/icons/calendar.svg?react';
import GroupIcon from "assets/icons/scene.svg?react";
import StatementIcon from 'assets/icons/statement-participant.svg?react';
import { DescriptionItem } from "src/components/descriptionItem/DescriptionItem";

import style from '../myGroup/MyGroup.module.scss'

interface MyCompetitionProps {
    competition: TCompetition;
    onCancelItem?: () => void;
    onChangeItem?: () => void;
}

export const MyCompetition:FC<MyCompetitionProps> = ({onCancelItem, onChangeItem, competition}) => {
    const {user} = useUserContext()
    const navigate = useNavigate()
    return(
        <div className={style.myGroup}>
            <TitleContainerItem name={competition.nameCompetition} onCancel={onCancelItem} onChange={onChangeItem} />
            <div className={style.myGroup__inner}>
                <Image src={competition.img} className={style.myGroup__imgContainer} alt={competition.nameCompetition}/>
                <div className={style.myGroup__info}>
                    <div className="text-orange">Статус: {competition.statusCompetition ? chooseStatusCompetition(competition.statusCompetition) : '-'}</div>
                    <TextIcon icon={<HouseIcon width={20} height={20}/>} text={competition.cityCompetition.city} />
                    <Contact contact = {transformDate(competition.dateStart) + " - " + transformDate(competition.dateFinish)} icon ={<CalendarIcon height={25} />} classnames={style.competition__date} />
                </div>
            </div>
            {user?.role === ERole.ORGANIZER &&
                <div className={style.myGroup__btnContainer}>
                    <Button 
                        onClick={() => navigate('participants')} 
                        className={style.myGroup__competitions_btn}
                        isYellow = {false}
                        isClear={true}
                    >
                        <TextIcon 
                            icon={<GroupIcon width = {25} height = {25} fill='#FF6B00'/>} 
                            text='Участники' arrowFill='#FF6B00' 
                            isTransition
                            classNameContainer={style.myGroup__competitions_text} 
                        />
                    </Button>
                    <Button 
                        onClick={() => navigate('statement-participant')} 
                        className={style.myGroup__competitions_btn}
                        isYellow = {false}
                        isClear={true}
                    >
                        <TextIcon 
                            icon={<StatementIcon width = {25} height = {25} fill='#FF6B00'/>}  
                            text='Заявки' 
                            arrowFill='#FF6B00' 
                            isTransition
                            classNameContainer={style.myGroup__competitions_text}  
                        />
                    </Button>
                </div>
            }
            <DescriptionItem description={competition.descriptionCompetition} />
        </div>
    )
}