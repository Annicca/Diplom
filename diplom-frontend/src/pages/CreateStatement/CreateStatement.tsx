import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ETypeStatement } from "src/types/ETypeStatement";
import { InputControl } from "src/uikit/input/InputControl";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import classNames from "classnames";
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
import style from './CreateStatement.module.scss'

export type CreateStatementForm = Exclude<TStatement, TCIty> & {
    city: {
        label: string;
        value:number
    }
};

export const CreateStatement:FC = () => {
    const {user} = useUserContext()
    const navigate = useNavigate()

    const [stage, setStage] = useState<number>(1)
    const [rules, setRules] = useState<File>()
    const [regulation, setRegulation] = useState<File>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [mainError, setMainError] = useState<string | string[] | null>(null)

    const acceptedFormats = [".doc", ".docx", ".ppt", ".pptx", ".pdf"]

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        reset,
        getValues,
        setError
    } = useForm<CreateStatementForm>({
        mode: 'onChange',
        defaultValues: {
            type: user?.role === ERole.DIRECTOR ? ETypeStatement.GROUP : ETypeStatement.COMPETITION
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        setMainError(null)
        if(regulation) {
            const fileExtension = regulation.name?.split('.').pop()?.toLowerCase();
            if(!acceptedFormats.includes(`.${fileExtension}`)) {
                setError('regulation', {message: 'Неверный формат файла. \n Формат файла может быть: .doc, .docx, .ppt, .pptx, .pdf'})
                return;
            }
            
            if(regulation?.size > 10*1024*1024) {
                setError('regulation', {message: 'Превышен допустимый размер файла в 10МБ'})
                return;
            }
        }
        if(rules) {
            const fileExtension = rules.name?.split('.').pop()?.toLowerCase();
            if(!acceptedFormats.includes(`.${fileExtension}`)) {
                console.log(!acceptedFormats.includes(`.${fileExtension}`))
                setError('rules', {message: 'Неверный формат файла \n Формат файла может быть: .doc, .docx, .ppt, .pptx, .txt, .pdf'})
                return;
            }
            if(rules?.size > 10*1024*1024) {
                setError('rules', {message: 'Превышен допустимый размер файла в 10МБ'})
                return;
            }
        }

        const formData = new FormData();
        formData.append('type', data.type)
        formData.append('name', data.name)
        data.address && formData.append('address', data.address)
        formData.append('idCity', data.city.value.toString())
        data.dateStart && formData.append('dateStart', data.dateStart)
        data.dateFinish && formData.append('dateFinish', data.dateFinish)
        data.description && formData.append('description', data.description)
        rules && formData.append('rules', rules)
        regulation && formData.append('regulation', regulation)

        if(user) {
            await sendStatement(formData, user?.idUser)
                .then((response) => {
                    setMainError(null)
                    if(data.type === ETypeStatement.GROUP) navigate(`/mystatements/${user.idUser}`)
                    else navigate(`/create/nominations/${response.idStatement}`)
                })
                .catch((error) => setMainError(error.message))
        } else {
            setMainError('Вы не авторизованы')
        }
    })

    const toggleStage = (stage:number) => {
        if(stage === 1) reset();
        setStage(stage)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeRules = (event: any) => {
        // changeFile(event.target.files[0]);
        if (!event.target.files[0]) return;
        setRules(event.target.files[0]);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeRegulation = (event: any) => {
        if (!event.target.files[0]) return;
        setRegulation(event.target.files[0]);
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
                                changeRegulation={changeRegulation}
                                changeRules={changeRules}
                                regulation={regulation}
                                rules={rules}
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
                    </>
                }
                {stage === 2 && getValues().type === ETypeStatement.GROUP &&
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