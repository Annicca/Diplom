import classNames from "classnames";
import { FC } from "react";
import { Link} from "react-router-dom";

import style from "./AuthTitle.module.scss";

interface AuthTitleProps {
    title: string;
    path: string;
    linkText: string;
    className?: string;
}

export const AuthTitle:FC<AuthTitleProps> = ({className, title, path, linkText}) =>{
    return(
        <div className={classNames(style.wrapper, className)}>
            <h2>{title}</h2>
            <p>
                <Link to = {path} className={style.link}>{linkText}</Link>
            </p>
        </div>
    )
}