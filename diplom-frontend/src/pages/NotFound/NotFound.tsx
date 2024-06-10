import NotFoundIcon from "assets/icons/notFound.svg?react";
import style from "components/auth/Auth.module.scss";
import { LinkToMain } from "src/uikit/linkToMain/LinkToMain";

export const NotFound = () => {
  return (
    <div className={style.container}>
      <LinkToMain />
      <NotFoundIcon />
    </div>
  );
};
