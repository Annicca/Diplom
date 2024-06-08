import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import classNames from "classnames";

import style from "./Button.module.scss";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isGradient?: boolean;
  isClear?: boolean;
  isYellow?: boolean;
  isCancel?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  isClear = false,
  isGradient = false,
  isYellow = true,
  isCancel = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        {
          [style.gradient]: isGradient,
          [style.clear]: isClear,
          [style.yellow]: isYellow,
          [style.cancel]: isCancel,
        },
        [className]
      )}
    >
      {children}
    </button>
  );
};
