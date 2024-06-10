import { Link } from "react-router-dom";
import ArrowLeft from "assets/icons/arrow-left.svg?react";

import style from "./LinkToMain.module.scss";

export const LinkToMain = () => {
  return (
    <Link to="/" className={style.toMain}>
      <ArrowLeft width={16} height={16} fill="#FF6B00" /> Главная
    </Link>
  );
};
