import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement";
import { CitySelect } from "src/uikit/citySelect/CitySelect";
import { InputControl } from "src/uikit/input/InputControl";
import { TextareaControl } from "src/uikit/textarea/TextareaControl";

interface CreateGroupProps {
    register: UseFormRegister<CreateStatementForm>,
    errors: FieldErrors<CreateStatementForm>,
    control?: Control<CreateStatementForm>
}

export const CreateGroup:FC<CreateGroupProps> = ({register, errors, control})=> {
    return(
        <>
            <InputControl 
                type = "text" 
                {...register('name',{
                    required : 'Поле обязательно',
                })}
                placeholder = " "
                label='Название'
                error={errors?.name && errors?.name?.message}
            />
            <CitySelect 
                name = 'city'
                control={control}
            />
            <InputControl 
                type = "text" 
                {...register('address', {
                    required : 'Поле обязательно',
                })}
                placeholder = " "
                label='Адрес'
                error={errors?.address && errors?.address?.message}
            />
            <TextareaControl 
                {...register('description')}
                placeholder = " "
                label='Описание'
            />
        </>
    )
}