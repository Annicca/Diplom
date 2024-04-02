import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export const PageLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className = {classNames("container", 'main-container')} >
            {children}
        </div>
    )
}