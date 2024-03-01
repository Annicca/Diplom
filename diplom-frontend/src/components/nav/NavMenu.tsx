import { FC } from "react";
import { NavLink} from "react-router-dom";
import classNames from "classnames";
import { IS_MOBILE } from "../../Constants";
import GroupIcon from "assets/icons/scene.svg?react";
import CompetitionIcon from "assets/icons/competitions.svg?react";
import LkIcon from "assets/icons/lk.svg?react";
import UserIcon from "assets/icons/user.svg?react";
import styles from './NavMenu.module.scss'


export const NavMenu: FC = () => {

    return(
        <nav className={styles.nav}>
            <div className={classNames(!IS_MOBILE && 'container',styles.nav__container)}>
                <div className={styles.nav__list}>
                    <NavLink 
                        to = "/" 
                        end 
                        className = {({ isActive }) => !isActive ? styles.nav__link : classNames(styles.nav__link, styles.nav__link_select) }
                    >
                        {IS_MOBILE && <CompetitionIcon key = {'competition'} className={styles.nav__icon} width={30} height={30} fill="#4F4F4F" />}
                        <span>Конкурсы</span>
                    </NavLink>
                    <NavLink 
                        to = "groups" 
                        className = {({ isActive })=> !isActive ? styles.nav__link : classNames(styles.nav__link, styles.nav__link_select)} 
                    >
                        {IS_MOBILE && <GroupIcon key = {"group"} className={styles.nav__icon} width={30} height={30} fill="#4F4F4F" />}
                        <span>Коллективы</span>
                    </NavLink>
                    {IS_MOBILE && <NavLink 
                        to = "account" 
                        className = {({ isActive })=> !isActive ? styles.nav__link : classNames(styles.nav__link, styles.nav__link_select)} >
                        <LkIcon className={styles.nav__icon} width={30} height={30} fill="#4F4F4F" />
                        <span>кабинет</span>
                    </NavLink>}
                </div>
                
                { !IS_MOBILE && 
                    <NavLink to = "account" >
                        <UserIcon width={50} height={50} />
                    </NavLink>}
            </div>
        </nav>
    )
}