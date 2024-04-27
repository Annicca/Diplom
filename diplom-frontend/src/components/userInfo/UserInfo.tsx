import UserIcon from "assets/icons/user.svg?react";
import EmailIcon from "assets/icons/mail.svg?react";
import PhoneIcon from "assets/icons/phone.svg?react";
import { TextIcon } from "../textIcon/TextIcon";

import style from './UserInfo.module.scss'

export const UserInfo = () => {
    return(
        <section className={style.wrapper}>
            <div  className={style.user}>
                <UserIcon width={50} height={50} />
                <div className={style.name}>
                    <div>Саулова Анна</div>
                    <div>Михайловна</div>
                </div>
            </div>
            <div className={style.info}>
                <TextIcon icon={<EmailIcon width={20} height={20}/>} text="annutohkaliia@gmail.com"/>
                <TextIcon icon={<PhoneIcon width={20} height={20}/>} text="annutohkaliia@gmail.com"/>
            </div>
        </section>
    )
}