import { FC, useMemo, useState } from "react"
import { useUserContext } from "src/context/user-context/useUserContext"
import { useCompetition, useUserGroupList } from "src/utils/api";
import { useParams } from "react-router-dom";
import { TStatementParticipantDto } from "src/types/TStatementParicipant";
import { useFieldArray, useForm } from "react-hook-form";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import { DropDown } from "src/uikit/dropDown/DropDown";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import CloseIcon from 'assets/icons/cancel.svg?react'

import style from './CreateStatementParticipants.module.scss'

export const CreateStatementParticipants:FC = () => {
    const {id} = useParams()
    const {user} = useUserContext();
    const {data: myGroups} = useUserGroupList(user?.idUser as number)
    const {data: competition, isLoading} = useCompetition(id as string)

    const [mainError, setMainError] = useState<string | string[] | null>(null)

    const groups = useMemo(() => {
        return myGroups?.map((group) => {
            return {
                value: group,
                label: group.nameGroup
            }
        })
    }, [myGroups])

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        // reset,
    } = useForm<TStatementParticipantDto>({
        mode: 'onChange',
        defaultValues: {
            competition: competition
        }
    });

    const {fields: actsFields, append, remove} = useFieldArray({control, name: 'acts', rules: {minLength: 1}})

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        setMainError(null)
    })

    if(isLoading) return;
    return(
        <PageLayout>
            <MainTite>Подать заявку на участие</MainTite>
            <form onSubmit={onSubmit} className={style.form}>
                <DropDown 
                    options = {groups}
                    placeholder='Выберите коллектив *'
                    control={control}
                    name = 'group'
                    rules = {{
                        required : 'Поле обязательно',
                    }}
                    classNameContainer={style.dropdown}
                    error = {errors.group && errors.group.message?.toString()}
                />
                <InputControl 
                    type = "number" 
                    {...register('countParticipants', {
                        required : 'Поле обязательно',
                    })}
                    placeholder = " "
                    label='Общее количество участников *'
                    error={errors?.countParticipants && errors?.countParticipants?.message}
                />
                <InputControl 
                    type = "number" 
                    {...register('countAccompanying', {
                        required : 'Поле обязательно',
                    })}
                    placeholder = " "
                    label='Количество сопровождающих *'
                    error={errors?.countAccompanying && errors?.countAccompanying?.message}
                />
                <div>
                    {actsFields.map(({id},index) => (
                        <article key = {id} className={style.act}>
                            <div className={style.act__name}>
                                <div>Номер {index + 1}</div>
                                <Button onClick={() => remove(index)} className={style.nomination__button}>
                                    <CloseIcon width={20} height={20} />
                                </Button>
                            </div>

                            <div className="error-text">{errors.acts?.message}</div>
                        </article>
                    ))
                    }
                    <Button type="button" className={style.nomination__add} onClick={() => append({})}>Добавить номр</Button>
                </div>
                {mainError && Array.isArray(mainError) ? 
                    mainError.map((error) => <div className = 'error-text'>{error}</div>)
                    :
                    mainError && <div className = 'error-text'>{mainError}</div>
                }
                <div className={style.buttonContainer}>
                    <Button type="submit" disabled={!isValid} className={style.stage_btn}>
                        Подать заявку на участие
                    </Button>
                </div>
            </form>
        </PageLayout>
    )
}