import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputControl } from "src/uikit/input/InputControl";
import { IRegisterRequest } from "src/utils/api";

import style from './Auth.module.scss'

interface LegalFormProps {
    register: UseFormRegister<IRegisterRequest>,
    errors: FieldErrors<IRegisterRequest>
}

export const LegalForm:FC<LegalFormProps> = ({register, errors}) => {
    return (
        <>
            <InputControl 
                type = "text" 
                {...register('organizationName',{
                    required : 'Поле обязательно',
                })}
                placeholder = " "
                label='Наименование организации'
                error={errors?.organizationName && errors?.organizationName?.message}
            />
            <InputControl 
                type = "text" 
                {...register('inn',{
                    required : 'Поле обязательно',
                    pattern: {value: /^([0-9]+$)/, message: "ИНН должно содержать только цифры"},
                    maxLength: {value: 12, message: "ИНН должно содержать 12 цифр"},
                    minLength: {value: 12, message: "ИНН должно содержать 12 цифр"}
                })}
                placeholder = " "
                label='ИНН'
                error={errors?.inn && errors?.inn?.message}
            />
            <InputControl 
                type = "text" 
                {...register('kpp',{
                    required : 'Поле обязательно',
                    pattern: {value: /^([0-9]+$)/, message: "КПП должен содержать только цифры"},
                    maxLength: {value: 9, message: "КПП должен содержать 9 цифр"},
                    minLength: {value: 9, message: "КПП должен содержать 9 цифр"}
                })}
                placeholder = " "
                label='КПП'
                error={errors?.kpp && errors?.kpp?.message}
            />
            <InputControl 
                type = "text" 
                {...register('settlementAccount',{
                    pattern: {value: /^([0-9]+$)/, message: "Расчетный счет должен содержать только цифры"},
                    maxLength: {value: 20, message: "Расчетный сче должен содержать 20 цифр"},
                    minLength: {value: 20, message: "Расчетный сче должен содержать 20 цифр"}
                })}
                placeholder = " "
                label='Р/С'
                error={errors?.settlementAccount && errors?.settlementAccount?.message}
            />
            <InputControl 
                type = "text" 
                {...register('bikBank',{
                    pattern: {value: /^([0-9]+$)/, message: "БИК должен содержать только цифры"},
                    maxLength: {value: 9, message: "БИК должен содержать 9 цифр"},
                    minLength: {value: 9, message: "БИК должен содержать 9 цифр"}
                })}
                placeholder = " "
                label='БИК'
                error={errors?.bikBank && errors?.bikBank?.message}
            />
            <InputControl 
                type = "text" 
                {...register('legalAddress')}
                placeholder = " "
                label='Юридический адрес'
                error={errors?.legalAddress && errors?.legalAddress?.message}
            />
            <div className={style.radioContainer}>
                <p>Система налогооблажения:</p>
                <InputControl 
                    type = "checkbox"  
                    {...register('withNds')}
                    placeholder = " "
                    label='с НДС'
                    id="withNds"
                    error={errors?.withNds && errors?.withNds?.message}
                />
            </div>
        </>
    )
}