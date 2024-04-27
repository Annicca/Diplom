import { FC } from "react"
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useSearchContext } from "src/context/search-context/useSearchContext";
import classNames from "classnames";
import { List } from "../list/List";
import { LinkItem } from "../link/LinkItem";
import { Search } from "../../uikit/search/Search";
import { IS_MOBILE, header } from "../../Constants";
import Logo from "assets/icons/logo.svg?react";
import { Button } from "src/uikit/button/Button";
import ArrowLeft from 'assets/icons/arrow-left.svg?react'

import styles from './Header.module.scss';

export const Header: FC = () => {
    const isGroups = useMatch('/groups');
    const isCompetitions = useMatch('/');
    const navigate = useNavigate()

    const {handleChangeValue} = useSearchContext()

    if (!IS_MOBILE) return (
        <header className={classNames('container',styles.header)}>
            <Link to = "/"><Logo /></Link>
            <List 
            items={header} 
            renderItem={(item) => <LinkItem key = {item.title} item={item} className={styles.header__link} />} className={styles.header__list} />
        </header>
    )
    else return (
        <header className={classNames('container',styles.header_mobile)}>
            {isGroups || isCompetitions ?
                <Search handleSearch={handleChangeValue} placeholder="Введите город"/> 
                :
                <div>
                    <Button isYellow={false} onClick={() => navigate(-1)} className={styles.header__back}>
                        <ArrowLeft width={30} height={30}/>
                    </Button>
                </div>
            }
        </header>
    )
}