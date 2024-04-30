import { useUserContext } from "src/context/user-context/useUserContext";
import { useNavigate } from "react-router-dom";
import UserIcon from "assets/icons/user.svg?react";
import EmailIcon from "assets/icons/mail.svg?react";
import PhoneIcon from "assets/icons/phone.svg?react";
import LogoutIcon from "assets/icons/exit.svg?react";
import KeyIcon from "assets/icons/key.svg?react";
import { TextIcon } from "../textIcon/TextIcon";
import { logout } from "src/utils/api";
import { Button } from "src/uikit/button/Button";

import style from './UserInfo.module.scss'
import { chooseRoleUser } from "../../utils/helpers";


export const UserInfo = () => {
    const {user} = useUserContext()
    const navigate = useNavigate()
    return(
        <section className={style.wrapper}>
            <div className={style.topContainer}>
                <div  className={style.user}>
                    <UserIcon width={50} height={50} />
                    <div className={style.name}>
                        <div>{user?.surnameUser} {user?.nameUser}</div>
                        <div>{user?.patronimycUser}</div>
                    </div>
                </div>
                <Button 
                    onClick={() => {logout(); navigate('/')}} 
                    isYellow = {false} 
                    isClear = {true}
                >
                    <LogoutIcon width={30} height={30}/>
                </Button>
            </div>
            <div className={style.info}>
                {user?.role && <TextIcon icon = {<KeyIcon width={20} height={20} fill = "#FF6B00" />} text ={chooseRoleUser(user?.role)} classNameContainer="text-orange" />}
                {user?.mailUser && <TextIcon icon={<EmailIcon width={20} height={20}/>} text={user?.mailUser}/>}
                {user?.phoneUser && <TextIcon icon={<PhoneIcon width={20} height={20}/>} text= {user.phoneUser}/>}
                
            </div>
        </section>
    )
}