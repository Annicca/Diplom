import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputControl } from "src/uikit/input/InputControl";
import { IRegisterRequest } from "src/utils/api";

interface PhisicalFormProps {
    register: UseFormRegister<IRegisterRequest>,
    errors: FieldErrors<IRegisterRequest>
}

export const PhisicalForm:FC<PhisicalFormProps> = ({register, errors}) => {
    return (
        <>
            <InputControl 
                type = "text" 
                {...register('surnameUser',{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                })}
                placeholder = " "
                label='Фамилия'
                error={errors?.surnameUser && errors?.surnameUser?.message}
            />
            <InputControl 
                type = "text" 
                {...register('nameUser',{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                })}
                placeholder = " "
                label='Имя'
                error={errors?.nameUser && errors?.nameUser?.message}
            />
            <InputControl 
                type = "text" 
                {...register('patronimycUser',{
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                })}
                placeholder = " "
                label='Отчество'
                error={errors?.patronimycUser && errors?.patronimycUser?.message}
            />
        </>
    )
}