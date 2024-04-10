import { FC, PropsWithChildren } from "react";

interface ModalProps {
    isOpen: boolean;
    classNameContainer?: string
}

export const Modal:FC<PropsWithChildren<ModalProps>> = ({isOpen, children, classNameContainer}) => {


    if (isOpen) return (
        <div className={classNameContainer}>
            {children}
        </div>
    )
}