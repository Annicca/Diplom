import { FC } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Button } from "src/uikit/button/Button";

import style from './DeleteModal.module.scss'

interface DeleteModalProps {
    isOpen: boolean,
    text: string,
    toggleModal: () => void,
    onConfirm: () => void
}

export const DeleteModal: FC<DeleteModalProps> = ({isOpen, toggleModal, text, onConfirm}) => {
    return(
        <Modal open={isOpen} onClose={toggleModal} center styles={{
            modal: {
                borderRadius: '10px',
            }
        }}>
            <div className={style.deleteModal}>
                <div>{text}</div>
                <div className={style.btnContainer}>
                    <Button onClick={toggleModal} isClear={true} className={style.cancel}>Нет</Button>
                    <Button onClick={onConfirm} className={style.confirm}>Да</Button>
                </div>
            </div>
            
        </Modal>
    )
}