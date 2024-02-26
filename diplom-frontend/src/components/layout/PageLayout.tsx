import { FC, PropsWithChildren } from "react";

export const PageLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="container">
            {children}
        </main>
    )
}