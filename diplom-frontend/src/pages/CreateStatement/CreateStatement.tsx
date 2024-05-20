import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { queryClient } from "src/utils/queryClient";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ETypeStatement } from "src/types/ETypeStatement";
import { InputControl } from "src/uikit/input/InputControl";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import classNames from "classnames";
import { addObjectToFormData } from "src/utils/helpers";
import { TStatement } from "src/types/TStatement";
import ArrowRight from 'assets/icons/arrowRight.svg?react';
import { Button } from "src/uikit/button/Button";
import { ERole } from "src/types/ERole";
import ArrowLeft from 'assets/icons/arrow-left.svg?react';
import { CreateGroup } from "src/components/createStatement/CreateGroup";
import { CreateCompetition } from "src/components/createStatement/CreateCompetition";
import { sendStatement } from "src/utils/api";
import { TCIty } from "src/types/TCity";
import { CreateNominations } from "src/components/createStatement/CreateNominations";
import { CreateAgeCategories } from "src/components/createStatement/CreateAgeCategories";
import { CreateGroupCategories } from "src/components/createStatement/CreateGroupCategories";
import { StatementPreview } from "src/components/createStatement/StatementPreview";
import style from './CreateStatement.module.scss'


export type CreateStatementForm = Exclude<TStatement, TCIty> & {
    city: {
        label: string;
        value:number
    },
    rules?: File[], 
    regulation?: File[],
    nominations?: {
        name: string;
        genres?: {
            name: string
        }
    }[],
    ageCategories?: {
        name: string
    }[],
    groupCategories?: {
        name: string
    }[]
};

export const CreateStatement:FC = () => {
    const {user} = useUserContext()
    const navigate = useNavigate()

    const [stage, setStage] = useState<number>(1)
    const [mainError, setMainError] = useState<string | string[] | null>(null)

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        reset,
        getValues,
    } = useForm<CreateStatementForm>({
        mode: 'onChange',
        defaultValues: {
            type: user?.role === ERole.DIRECTOR ? ETypeStatement.GROUP : ETypeStatement.COMPETITION,
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        setMainError(null)
        const formData = new FormData();
        formData.append('type', data.type)
        formData.append('name', data.name)
        data.address && formData.append('address', data.address)
        formData.append('idCity', data.city.value.toString())
        data.dateStart && formData.append('dateStart', data.dateStart)
        data.dateFinish && formData.append('dateFinish', data.dateFinish)
        data.description && formData.append('description', data.description)
        data.rules && data.rules.length > 0 && formData.append('rules', data.rules[0])
        data.regulation && data.regulation.length > 0 && formData.append('regulation', data.regulation[0])
        data.nominations && data.nominations.length > 0 && addObjectToFormData(formData, data.nominations, "nominations")
        data.ageCategories && data.ageCategories.length > 0 && addObjectToFormData(formData, data.ageCategories, "ageCategories")
        data.groupCategories && data.groupCategories.length > 0 && addObjectToFormData(formData, data.groupCategories, "groupCategories")

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        if(user) {
            await sendStatement(formData, user?.idUser)
                .then(() => {
                    setMainError(null)
                    queryClient.refetchQueries(['mystatements', user.idUser])
                    navigate(`/mystatements/${user.idUser}`)
                })
                .catch((error) => {
                    console.log(error)
                    setMainError(error.message)
                })
        } else {
            setMainError('Вы не авторизованы')
        }
    })

    const toggleStage = (stage:number) => {
        if(stage === 1) reset();
        setStage(stage)
    }

    useEffect(()=> {
        if(user?.role === ERole.DIRECTOR || user?.role === ERole.ORGANIZER) {
            toggleStage(2)
        }
        getValues().type
    })

    return(
        <PageLayout>
            <MainTite>Содать заявку</MainTite>
            <form onSubmit={onSubmit} className={style.form}>
                {stage === 1 && 
                    <>
                        <div className={style.title}>
                            1. Выберете, что хотите разместить
                        </div>
                        <div className={classNames(style.radioContainer, style.formContent)}>
                            
                            <InputControl 
                                id = 'competition'
                                type = "radio" 
                                {...register('type',{
                                    required : 'Поле обязательно',
                                })}
                                value={ETypeStatement.COMPETITION}
                                placeholder = " "
                                label='Конкурс'
                                
                            />
                            <InputControl 
                                id = 'group'
                                type = "radio" 
                                {...register('type',{
                                    required : 'Поле обязательно',
                                })}
                                value={ETypeStatement.GROUP}
                                placeholder = " "
                                label='Коллектив'
                                error={errors?.type && errors?.type?.message}
                            />
                            <div className={style.buttonContainer}>
                                <Button onClick={() => toggleStage(2)} className={style.stage_btn}>
                                    <ArrowRight width={16} height={16} />
                                </Button>
                            </div>
                            
                        </div>
                    </>
                }
                {stage === 2 && getValues().type === ETypeStatement.GROUP &&
                    <>
                        <div className={style.title}>
                            2. Заполните данные о коллективе
                        </div>
                        <div className={style.formContent}>
                            <CreateGroup register={register} errors={errors} control={control}/>
                        </div>
                    </>
                    
                }
                {stage === 2 && getValues().type === ETypeStatement.COMPETITION &&
                    <>
                        <div className={style.title}>
                            2. Заполните данные о конкурсе
                        </div>
                        <div className={style.formContent}>
                            <CreateCompetition 
                                control={control}
                                register={register} 
                                errors={errors}
                                city = {getValues().city}
                                regulation={getValues("regulation")}
                                rules={getValues("rules")}
                            />
                        </div>
                    </>
                }
                {stage === 3 && getValues().type === ETypeStatement.COMPETITION &&
                    <>
                        <div className={style.title}>
                            3. Добавьте номинации
                        </div>
                        <div className={style.formContent}>
                            <CreateNominations 
                                register={register} 
                                errors={errors} 
                                control={control}
                            />
                        </div>
                        <div className={classNames(style.buttonContainer, style.buttonContainer__two)}>
                            <Button onClick={() => toggleStage(2)} className={style.stage_btn}>
                                <ArrowLeft width={16} height={16} />
                            </Button>
                            <Button disabled = {!isValid} onClick={() => toggleStage(4)}>
                                Добавить возрастные группы
                            </Button>
                        </div>
                    </>
                }
                {stage === 4 && getValues().type === ETypeStatement.COMPETITION &&
                    <>
                        <div className={style.title}>
                            4. Добавьте возрастные группы
                        </div>
                        <div className={style.formContent}>
                            <CreateAgeCategories 
                                register={register} 
                                errors={errors} 
                                control={control}
                            />
                        </div>
                        <div className={classNames(style.buttonContainer, style.buttonContainer__two)}>
                            <Button onClick={() => toggleStage(3)} className={style.stage_btn}>
                                <ArrowLeft width={16} height={16} />
                            </Button>
                            <Button disabled = {!isValid} onClick={() => toggleStage(5)}>
                                Добавить групповые формы
                            </Button>
                        </div>
                    </>
                }
                {stage === 5 && getValues().type === ETypeStatement.COMPETITION &&
                    <>
                        <div className={style.title}>
                            5. Добавьте групповые формы
                        </div>
                        <div className={style.formContent}>
                            <CreateGroupCategories 
                                register={register} 
                                errors={errors} 
                                control={control}
                            />
                        </div>
                        <div className={classNames(style.buttonContainer, style.buttonContainer__two)}>
                            <Button onClick={() => toggleStage(4)} className={style.stage_btn}>
                                <ArrowLeft width={16} height={16} />
                            </Button>
                            <Button disabled = {!isValid} onClick={() => toggleStage(6)}>
                                Далее
                            </Button>
                        </div>
                    </>
                }
                {stage === 6 && getValues().type === ETypeStatement.COMPETITION &&
                    <>
                        <div className={style.title}>
                            6. Проверьте введенную информацию
                        </div>
                        <div className={style.formContent}>
                            <StatementPreview statementPreview={getValues()} />
                        </div>
                    </>
                }
                {((stage === 2 && getValues().type === ETypeStatement.GROUP) || 
                    (stage === 6 && getValues().type === ETypeStatement.COMPETITION)) &&
                <>
                    {mainError && Array.isArray(mainError) ? 
                        mainError.map((error) => <div className = 'error-text'>{error}</div>)
                        :
                        mainError && <div className = 'error-text'>{mainError}</div>
                    }
                    <div className={classNames(style.buttonContainer, style.buttonContainer__two)}>
                        <Button onClick={getValues().type === ETypeStatement.COMPETITION ? () => toggleStage(5) : () => toggleStage(1)} className={style.stage_btn}>
                            <ArrowLeft width={16} height={16} />
                        </Button>
                        <Button disabled = {!isValid} type = {"submit"}>
                            Создать
                        </Button>
                    </div>
                </>}
                {stage === 2 && getValues().type === ETypeStatement.COMPETITION &&
                <>
                    {mainError && Array.isArray(mainError) ? 
                        mainError.map((error) => <div className = 'error-text'>{error}</div>)
                        :
                        mainError && <div className = 'error-text'>{mainError}</div>
                    }
                    <div className={classNames(style.buttonContainer, style.buttonContainer__two)}>
                        <Button onClick={() => toggleStage(1)} className={style.stage_btn}>
                            <ArrowLeft width={16} height={16} />
                        </Button>
                        <Button disabled = {!isValid} onClick={() => toggleStage(3)}>
                            Добавить номинации
                        </Button>
                    </div>
                </>}
            </form>
        </PageLayout>
    )
}