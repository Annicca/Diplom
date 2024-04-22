import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TFiterCompetition } from "src/types/TFilterCompetition";
import { toggleModal } from "src/utils/toggleModal";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import { IS_MOBILE } from "src/Constants";
import FilterIcon from 'assets/icons/filter.svg?react'
import CloseIcon from 'assets/icons/cancel.svg?react'
import style from './FilterCompetition.module.scss'


type TFilterInputs = {
    dateStart: string,
    dateFinish: string,
    isStatusCompetition: boolean,
}

interface FilterCompetitionProps {
    filter: TFiterCompetition,
    handleFilter: (filter: TFiterCompetition) => void
}

export const FilterCompetition:FC<FilterCompetitionProps> = ({filter, handleFilter}) => {
    
    const {register, handleSubmit, formState: { errors }} = useForm<TFilterInputs>()

    const [isOpen, setIsOpen] = useState(IS_MOBILE ? false : true)

    const onSubmit: SubmitHandler<TFilterInputs> = (data) => {
        handleFilter({
            ...filter,
            ...data
        })

        handleOpen()
    }

    const onReset = () => {
        handleFilter({})
        handleOpen()
    }

    const handleOpen = () => {
        if(IS_MOBILE) {
            setIsOpen(!isOpen)
            toggleModal()
        } 
    }

    return(
        <div className={style.filter}>
            <div className={style.filter__title}>
                <button onClick={handleOpen} className={style.filter__open} >
                    <FilterIcon/> 
                </button>
                <span>Фильтры</span>
            </div>
            {isOpen && 
            <form className={style.filter__form} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
                {IS_MOBILE && <button onClick={handleOpen} className={style.filter__close}>
                    <CloseIcon width={20} height={20} />
                </button>}
                <InputControl 
                register={register}
                type = "date" 
                name="dateStart"
                label="Дата начала:"
                error = {errors?.dateStart?.message}
                />

                <InputControl 
                register={register}
                type = "date" 
                name="dateFinish"
                label="Дата окончания:"
                error = {errors?.dateFinish?.message}
                />

                <InputControl 
                register={register}
                type = "checkbox" 
                id="isStatusCompetition"
                name="isStatusCompetition"
                label="Набор участников"
                error = {errors?.isStatusCompetition?.message}
                classNameContainer={style.filter__checkbox}
                />
                <div className={style.filter__buttons}>
                    <Button type="submit" className={style.filter__submit}>Применить</Button>
                    <Button type="reset" className={style.filter__reset}>Очистить</Button>
                </div>
            </form>}
            
        </div>
    )
}