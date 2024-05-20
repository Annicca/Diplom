import { FC, useEffect } from "react"
import { Control, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form"
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement"
import { Button } from "src/uikit/button/Button"
import { InputControl } from "src/uikit/input/InputControl"
import CloseIcon from 'assets/icons/cancel.svg?react'
import { CreateGenres } from "./CreateGenres"

import style from "../../pages/CreateStatement/CreateStatement.module.scss"

interface CreateNominationsProps {
    register: UseFormRegister<CreateStatementForm>,
    errors: FieldErrors<CreateStatementForm>,
    control?: Control<CreateStatementForm>
}

export const CreateNominations:FC<CreateNominationsProps> = ({register, errors, control}) => {

    const {fields: nominationFields, append, remove} = useFieldArray({control, name: 'nominations', rules: {minLength: 1}})

    useEffect(() => {
        if (nominationFields.length === 0) {
            append({name: ''})
        }
    },[])

    return(
        <>
            {nominationFields.map(({id}, index) => (
                <article key = {id} className={style.nomination}>
                    <div className={style.nomination__name}>
                        <div>Номинация {index + 1}</div>
                        <Button onClick={() => remove(index)} className={style.nomination__button}>
                            <CloseIcon width={20} height={20} />
                        </Button>
                    </div>
                    <InputControl 
                        type = "text" 
                        {...register(`nominations.${index}.name`, {
                            required : 'Поле обязательно',
                        })}
                        label="Название номинации *"
                        error={errors.nominations?.[index]?.message || undefined}
                    />
                    <div className="error-text">{errors.nominations?.message}</div>
                    <div className={style.genres}>
                        <CreateGenres nominationIndex={index} {...{register, errors, control}}/>
                    </div>
                </article>
                
            ))}
            <Button type="button" className={style.nomination__add} onClick={() => append({name: ''})}>Добавить номинацию</Button>
        </>
    )
}