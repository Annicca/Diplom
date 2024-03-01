import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export const PageLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className = {classNames("container", 'main-container')} >
            {children}
        </main>
    )
}