import { useUserContext } from "src/context/user-context/useUserContext";
import UserIcon from "assets/icons/user.svg?react";
import EmailIcon from "assets/icons/mail.svg?react";
import PhoneIcon from "assets/icons/phone.svg?react";
import { TextIcon } from "../textIcon/TextIcon";

import style from './UserInfo.module.scss'

export const UserInfo = () => {
    const {user} = useUserContext()
    return(
        <section className={style.wrapper}>
            <div  className={style.user}>
                <UserIcon width={50} height={50} />
                <div className={style.name}>
                    <div>{user?.surnameUser} {user?.nameUser}</div>
                    <div>{user?.patronimycUser}</div>
                </div>
            </div>
            <div className={style.info}>
                {user?.mailUser && <TextIcon icon={<EmailIcon width={20} height={20}/>} text={user?.mailUser}/>}
                {user?.phoneUser && <TextIcon icon={<PhoneIcon width={20} height={20}/>} text= {user.phoneUser}/>}
            </div>
        </section>
    )
}