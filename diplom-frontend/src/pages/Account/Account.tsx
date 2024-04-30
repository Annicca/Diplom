import { FC } from 'react';
import StatementIcon from 'assets/icons/statement1.svg?react'
import GroupIcon from "assets/icons/scene.svg?react";
import CompetitionIcon from "assets/icons/competitions.svg?react";
import StatementParticipantIcon from 'assets/icons/statement-participant.svg?react';
import LkIcon from "assets/icons/lk.svg?react";
import { PageLayout } from "src/components/layout/PageLayout"
import { ERole } from 'src/types/ERole'
import { UserInfo } from "src/components/userInfo/UserInfo"
import { useUserContext } from 'src/context/user-context/useUserContext'
import { Link } from 'react-router-dom'
import { TextIcon } from 'src/components/textIcon/TextIcon'

import style from './Account.module.scss'


export const Account:FC = () => {
    const {user} = useUserContext()

    if(!user) {
        return(
            <div className={style.auth_wrapper}>
                <Link to={'/login'} className={style.auth_btn}>Войти</Link>
                <Link to={'/signin'} className={style.auth_btn}>Регистрация</Link>
            </div>
        )
    }
    return(
        <PageLayout>
            <div className={style.account}>
                <UserInfo />
                <div className={style.account__inner}>
                    {user?.role === ERole.CLIENT && 
                        <Link to={`/mystatements/${user.idUser}`} >
                            <TextIcon 
                                classNameContainer={style.account__item} 
                                isTransition = {true} 
                                icon = {<StatementIcon width={25} height={25}/>} text='Заявки' 
                            />
                        </Link>
                    } 
                    {user?.role === ERole.ADMIN &&
                        <>
                            <TextIcon classNameContainer={style.account__item}  isTransition = {true} isBorder = {true}icon = {<LkIcon fill={'#000'} width={25} height={25}/>} text='Пользователи' />
                            <TextIcon classNameContainer={style.account__item}  isTransition = {true} isBorder = {true} icon = {<StatementIcon width={25} height={25}/>} text='Заявки' />
                            <TextIcon classNameContainer={style.account__item}  isTransition = {true} isBorder = {true} icon = {<CompetitionIcon width={25} height={25}/>} text='Конкурсы' />
                            <TextIcon classNameContainer={style.account__item}  isTransition = {true} icon = {<GroupIcon width={25} height={25}/>} text='Коллективы' />
                        </>
                    }
                    {user?.role === ERole.ORGANIZER &&
                        <>
                            <Link to={`/mystatements/${user.idUser}`} >
                                <TextIcon 
                                    classNameContainer={style.account__item}  
                                    isTransition = {true} 
                                    isBorder = {true} 
                                    icon = {<StatementIcon width={25} height={25}/>} 
                                    text='Заявки' />
                            </Link>
                            <Link to={`/mycompetitions/${user.idUser}`} >
                                <TextIcon 
                                    classNameContainer={style.account__item}  
                                    isTransition = {true} 
                                    icon = {<CompetitionIcon width={25} height={25}/>} 
                                    text='Конкурсы' />
                            </Link>
                        </>
                    }
                    {user?.role === ERole.DIRECTOR &&
                        <>
                            <Link to={`/mystatements/${user.idUser}`} >
                                <TextIcon 
                                    classNameContainer={style.account__item}  
                                    isTransition = {true} 
                                    isBorder = {true} 
                                    icon = {<StatementIcon width={25} height={25}/>} 
                                    text='Заявки' />
                            </Link>
                            <Link to={`/mystatements-participant/${user.idUser}`} >
                                <TextIcon 
                                    classNameContainer={style.account__item}  
                                    isTransition = {true} 
                                    isBorder = {true} 
                                    icon = {<StatementParticipantIcon width={25} height={25}/>} 
                                    text='Заявки на участие' />
                            </Link>
                            <Link to = {`/mygroups/${user.idUser}`} >
                                <TextIcon 
                                    classNameContainer={style.account__item}  
                                    isTransition = {true} 
                                    icon = {<GroupIcon width={25} height={25}/>} 
                                    text='Коллективы' />
                            </Link>
                        </>
                    }
                </div>
            </div>
        </PageLayout>
    )
}