import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { queryClient } from "src/utils/queryClient";
import { useLogout } from "src/hooks/useLogout";
import classNames from "classnames";
import UserIcon from "assets/icons/user.svg?react";
import EmailIcon from "assets/icons/mail.svg?react";
import PhoneIcon from "assets/icons/phone.svg?react";
import LogoutIcon from "assets/icons/exit.svg?react";
import KeyIcon from "assets/icons/key.svg?react";
import { TextIcon } from "../textIcon/TextIcon";
import { changeRoleUser } from "src/utils/api";
import { Button } from "src/uikit/button/Button";
import { chooseRoleUser } from "../../utils/helpers";
import { ERole } from "src/types/ERole";
import { TUser } from "src/types/TUser";
import { DropDown } from "src/uikit/dropDown/DropDown";
import { ButtonSave } from "src/uikit/button/ButtonSave";
import { ErrorModal } from "../errorModal/ErrorModal";

import style from './UserInfo.module.scss'
import { ETypeUser } from "src/types/ETypeUser";

type UserInfoProps = {
    user: TUser;
    classNameContainer?:string;
    isAccount?: boolean
}

export const UserInfo:FC<UserInfoProps> = ({user, classNameContainer, isAccount = false}) => {

    const logout = useLogout()

    const [isOpenErrorModal, setOpenErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const {control , handleSubmit, formState: {errors}} = useForm({mode: "onChange"})

    const toggleErrorModal = () => {
        setOpenErrorModal(!isOpenErrorModal)
    }

    const onChangeRole = handleSubmit(async (data) => {
        changeRoleUser({...user, role: data.role.value})
            .then(() => {
                queryClient.refetchQueries({queryKey: ['users']});
            })
            .catch((error) => {
                setErrorMessage(error.message)
                toggleErrorModal()
            })
    })

    const roleItems = useMemo(() => [
        {label: 'Администратор', value: ERole.ADMIN},
        {label: 'Организатор конкурсов', value: ERole.ORGANIZER},
        {label: 'Руководитель коллектива', value: ERole.DIRECTOR},
        {label: 'Клиент', value: ERole.CLIENT}
    ], [])

    const selectedRole = useMemo(() => {
        return roleItems.find((item) => item.value === user?.role)
    },[roleItems, user?.role])

    return(
        <section className={classNames(style.wrapper, classNameContainer)}>
            <div className={style.topContainer}>
                <div  className={style.user}>
                    <UserIcon width={50} height={50} />
                    <div className={style.name}>
                        { user.typeUser === ETypeUser.PHISICAL ?
                        <>
                            <div>{user?.surnameUser} {user?.nameUser}</div>
                            <div>{user?.patronimycUser}</div> 
                        </>:
                        <div>{user.organizationName}</div>}
                    </div>
                </div>
                {isAccount && <Button 
                    onClick={logout} 
                    isYellow = {false} 
                    isClear = {true}
                >
                    <LogoutIcon width={30} height={30}/>
                </Button>}
            </div>
            <div className={style.info}>
                {isAccount ? 
                    <TextIcon icon = {<KeyIcon width={20} height={20} fill = "#FF6B00" />} text ={chooseRoleUser(user?.role)} classNameContainer="text-orange" /> :
                    <>
                        <div className={style.role}>
                            <DropDown
                                options = {roleItems}
                                placeholder='Выберите роль'
                                control={control}
                                name = 'role'
                                rules = {{
                                    required : 'Поле обязательно',
                                }}
                                // containerWidth={'70%'}
                                selectedOption={selectedRole}
                                // onValueChange={() => {}}
                                classNameContainer={style.dropdown}
                                error = {errors.role && errors.role.message?.toString()}
                            />
                            <ButtonSave onClick={onChangeRole} />
                        </div>
                        <div>Логин: {user.loginUser}</div>
                        <TextIcon icon = {<KeyIcon width={20} height={20} fill = "#FF6B00" />} text ={chooseRoleUser(user?.role)} classNameContainer="text-orange" />
                    </>
                }
                
                {user?.mailUser && <TextIcon icon={<EmailIcon width={20} height={20}/>} text={user?.mailUser}/>}
                {user?.phoneUser && <TextIcon icon={<PhoneIcon width={20} height={20}/>} text= {user.phoneUser}/>}
                {
                    user.typeUser === ETypeUser.LEGAL &&
                    <>
                        <div className={style.info__item}>
                            <div>Система налогооблажения:</div>
                            <div>{user.withNds ? 'С НДС' : 'Без НДС'}</div>
                        </div>
                        <div className={style.info__item}>
                            <div>ИНН:</div>
                            <div>{user.inn}</div>
                        </div>
                        <div className={style.info__item}>
                            <div>КПП:</div>
                            <div>{user.kpp}</div>
                        </div>
                        <div className={style.info__item}>
                            <div>Р/С:</div>
                            <div>{user.settlementAccount}</div>
                        </div>
                        <div className={style.info__item}>
                            <div>БИК:</div>
                            <div>{user.bikBank}</div>
                        </div>
                        <div className={style.info__item}>
                            <div>Юридический адрес:</div>
                            <div>{user.legalAddress}</div>
                        </div>
                    </>
                }
                
            </div>
            <ErrorModal 
                isOpen = {isOpenErrorModal}
                text = {errorMessage}
                toggleModal={toggleErrorModal}
            />
        </section>
    )
}