import { FC } from "react";
import classNames from "classnames";
import {footerList, socials } from "../../Constants";
import List from "../list/List";
import { LinkItem } from "../link/LinkItem";
import { ImageLinkItem } from "../link/ImageLinkItem";

import styles from './Footer.module.scss'



export const Footer: FC = () =>{

    return(
        <footer className={styles.footer}>
            <div className={classNames('container', styles.footer__container)} >
                <List items = {footerList} renderItem = {(item) => <LinkItem key = {item.title} item = {item} className={styles.footer__link} />}  className = {styles.footer__list} />
                <div>
                    <div className = {styles.footer__title}>Мы в соц сетях:</div>
                    <List items={socials} className = {styles.footer__social} renderItem={(img) => <ImageLinkItem key = {img.link} img={img} />} />
                </div>
            </div>
        </footer>
    )
}