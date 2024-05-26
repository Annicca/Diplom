import { FC } from "react"
import { Control, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form"
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement"
import { Button } from "src/uikit/button/Button"
import { InputControl } from "src/uikit/input/InputControl"
import CloseIcon from 'assets/icons/cancel.svg?react'

import style from "../../pages/CreateStatement/CreateStatement.module.scss"

interface CreateAgeCategoriesProps {
    register: UseFormRegister<CreateStatementForm>,
    errors: FieldErrors<CreateStatementForm>,
    control?: Control<CreateStatementForm>
}

export const CreateAgeCategories:FC<CreateAgeCategoriesProps> = ({register, errors, control}) => {

    const {fields: ageCategoryFields, append, remove} = useFieldArray({control, name: 'ageCategories'})

    return(
        <>
            {ageCategoryFields.map(({id}, index) => (
                <article key = {id} className={style.nomination}>
                    <div className={style.nomination__name}>
                        <div>Возрастная категория {index + 1}</div>
                        <Button onClick={() => remove(index)} className={style.nomination__button}>
                            <CloseIcon width={20} height={20} />
                        </Button>
                    </div>
                    <InputControl 
                        type = "text" 
                        {...register(`ageCategories.${index}.name`, {
                            required: 'Введите возрастную категорию'
                        })}
                        label="Возрастная категория *"
                        error={errors.nominations?.[index]?.message || undefined}
                    />
                    <div className="error-text">{errors.nominations?.message}</div>
                </article>
                
            ))}
            <Button type="button" className={style.nomination__add} onClick={() => append({name: ''})}>Добавить</Button>
        </>
    )
}