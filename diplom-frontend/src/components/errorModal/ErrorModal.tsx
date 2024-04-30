import { FC } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import style from './ErrorModal.module.scss'
import { Button } from "src/uikit/button/Button";

interface ErroModalProps {
    isOpen: boolean,
    text: string,
    toggleModal: () => void,
}

export const ErrorModal:FC<ErroModalProps> = ({isOpen, text, toggleModal}) => {
    return(
        <Modal open={isOpen} onClose={toggleModal} center styles={{
            modal: {
                borderRadius: '10px',
                border: '1px solid red',
            }
        }}>
            <div className={style.errorModal}>
                <div>{text}</div>
                <div className={style.btnContainer}>
                    <Button onClick={toggleModal} className={style.ok}>ОК</Button>
                </div>
            </div>
            
        </Modal>
    )
}