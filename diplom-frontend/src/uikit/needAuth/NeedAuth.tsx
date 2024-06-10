import { Link } from "react-router-dom";
import style from "./NeedAuth.module.scss";

export const NeedAuth = () => {
  return (
    <div className={style.wrapper}>
      <Link to={"/login"} className={style.btn}>
        Войти
      </Link>
      <Link to={"/signin"} className={style.btn}>
        Регистрация
      </Link>
    </div>
  );
};
