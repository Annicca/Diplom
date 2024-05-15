/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement";
import { CitySelect } from "src/uikit/citySelect/CitySelect";
import { FileUpload } from "src/uikit/fileUpload/FileUpload";
import { InputControl } from "src/uikit/input/InputControl";
import { TextareaControl } from "src/uikit/textarea/TextareaControl";

interface CreateCompetitionProps {
    register: UseFormRegister<CreateStatementForm>,
    errors: FieldErrors<CreateStatementForm>,
    changeRules: (event: any) => void,
    changeRegulation: (event: any) => void,
    rules?: File,
    regulation?: File,
    control: Control<CreateStatementForm>
}

export const CreateCompetition:FC<CreateCompetitionProps> = ({register, control, errors, changeRegulation, changeRules, regulation, rules})=> {

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
                type = "date" 
                {...register('dateStart', {
                    required : 'Поле обязательно',
                })}
                placeholder = " "
                label='Дата начала'
                error={errors?.dateStart && errors?.dateStart?.message}
            />
            <InputControl 
                type = "date" 
                {...register('dateFinish', {
                    required : 'Поле обязательно',
                })}
                placeholder = " "
                label='Дата окончания'
                error={errors?.dateFinish && errors?.dateFinish?.message}
            />
            <InputControl 
                type = "number" 
                {...register('competitionFee', {
                    required : 'Поле обязательно',
                })}
                placeholder = " "
                label='Стоимость конкурсного взноса на 1 участника'
                error={errors?.dateFinish && errors?.dateFinish?.message}
            />
            <FileUpload 
                id = "rulesInput"
                label="Загрузите положение конкурса"
                file={rules}
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                {...register('rules', {
                    onChange: changeRules,
                    required : 'Положение обязательно',
                })}
                error={errors?.rules && errors?.rules?.message}
            />
            <FileUpload 
                id = "regulationInput"
                label="Загрузите правила проведения"
                file={regulation}
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                {...register('regulation', {
                    onChange: changeRegulation
                })}
                error={errors?.regulation && errors?.regulation?.message}
            />
            
            <TextareaControl 
                {...register('description')}
                placeholder = " "
                label='Описание'
            />
        </>
    )
}