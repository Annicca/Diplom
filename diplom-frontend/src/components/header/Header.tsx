import { FC } from "react"
import classNames from "classnames";
import { Link } from 'react-router-dom';
import List from "../list/List";
import { LinkItem } from "../link/LinkItem";
import { Search } from "../../uikit/search/Search";
import { IS_MOBILE, header } from "../../Constants";
import Logo from "assets/icons/logo.svg?react";

import styles from './Header.module.scss';

export const Header: FC = () => {

    if (!IS_MOBILE) return (
        <header className={classNames('container',styles.header)}>
            <Link to = "/"><Logo /></Link>
            <List items={header} renderItem={(item) => <LinkItem key = {item.title} item={item} className={styles.header__link} />} className={styles.header__list} />
        </header>
    )
    else return (
        <header className={classNames('container',styles.header_mobile)}>
            <Search placeholder="Введите город"/>
        </header>
    )
}