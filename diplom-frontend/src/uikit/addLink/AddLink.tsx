import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

import style from "./AddLink.module.scss";

interface AddLinkProps {
  url: string;
}

export const AddLink: FC<AddLinkProps> = ({ url }) => {
  const navigate = useNavigate();
  return (
    <Button
      isYellow={false}
      isGradient
      onClick={() => navigate(url)}
      className={style.add}
    >
      +
    </Button>
  );
};
