import { useState } from 'react';
import { useUserContext } from 'src/context/user-context/useUserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthTitle } from 'src/uikit/authTitle/AuthTitle';
import { Button } from 'src/uikit/button/Button';
import { InputControl } from 'src/uikit/input/InputControl';
import { IRegisterRequest, registerUser } from 'src/utils/api';
import ArrowLeft from 'assets/icons/arrow-left.svg?react';

import style from './Auth.module.scss'

export const Register = () => {
    const {changeUser} = useUserContext()
    const navigate = useNavigate()
    const [mainError, setMainError] = useState<string | null>(null);
    
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch
    } = useForm<IRegisterRequest>({
        mode: 'onChange',
    });
    const onSubmit = handleSubmit(async (data: IRegisterRequest) => {
        console.log(data)
        registerUser(data)
        .then((response) => {
            changeUser(response)
            setMainError(null)
            navigate('/')
        })
        .catch((error) => {
            setMainError(error.message)
        })
    })

    return(
        <div className={style.container}>
            <Link to = '/' className={style.toMain}>
                <ArrowLeft width={16} height={16} fill = "#FF6B00"/> Главная
            </Link>
            <form className = {style.form} onSubmit = {onSubmit} >
                    <AuthTitle title = {'Регистрация'} linkText = {'Уже зарегистрированы?'} path = {'/login'} />
                    <InputControl 
                        type = "text" 
                        {...register('surnameUser',{
                            required : 'Поле обязательно',
                            pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                        })}
                        placeholder = " "
                        autoFocus
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
                    <InputControl 
                        type = "phone" 
                        {...register('phoneUser',{
                            pattern: {value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, message: "Неккоректно введён номер телефона"}
                        })}
                        placeholder = " "
                        label='Телефон'
                        error={errors?.phoneUser && errors?.phoneUser?.message}
                    />
                    <InputControl 
                        type = "email"
                        {...register('mailUser',{
                            required : 'Поле обязательно',
                            pattern: {value: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/, message: "Неккоректно введён Email"}
                        })}
                        placeholder = " "
                        label='Email'
                        error={errors?.mailUser && errors?.mailUser?.message}
                    />
                    <InputControl 
                        type = "text"
                        {...register('loginUser',{
                            required : 'Поле обязательно',
                            minLength: {value: 5, message: 'Длина не менее 5 символов'},
                            pattern: {value: /^[A-Za-z0-9]+$/, message: "Логин должен содержать только буквы латинского алфавита и цифры"},
                        })}
                        placeholder = " "
                        label='Логин'
                        error={errors?.loginUser && errors?.loginUser?.message}
                    />
                    <InputControl 
                        type ="password"
                        {...register('passwordUser', {
                            required : 'Поле обязательно',
                            minLength: {value: 8, message: 'Длина не менее 8 символов'},
                            validate: {
                                hasNumber: value => /[0-9]/.test(value) || "Пароль должен содержать цифры",
                                hasLetter: value => /[A-Za-z]/.test(value) || "Пароль должен содержать буквы латинского алфавита",
                                hasSpecial: value => /[!@#$%^&*]/.test(value) || "Пароль должен содержать хотя бы 1 спецсимвол"
                            }
                        })}
                        placeholder = " "
                        label='Пароль'
                        error={errors?.passwordUser && errors?.passwordUser?.message}
                    />
                    <InputControl 
                        type ="password"
                        {...register('confirmPassword', {
                            required : 'Поле обязательно',
                            minLength: {value: 8, message: 'Длина не менее 8 символов'},
                            validate : {
                                hasNumber: value => /[0-9]/.test(value as string) || "Пароль должен содержать цифры",
                                hasLetter: value => /[A-Za-z]/.test(value as string) || "Пароль должен содержать буквы латинского алфавита",
                                hasSpecial: value => /[!@#$%^&*]/.test(value as string) || "Пароль должен содержать хотя бы 1 спецсимвол",
                                hasConfirm: value => {
                                    if (watch('passwordUser') != value) {
                                        return "Пароли не совпадают";
                                    }
                                }
                            }
                        })}
                        placeholder = " "
                        label='Повторите пароль'
                        error={errors?.confirmPassword && errors?.confirmPassword?.message}
                    />
                    {mainError && <div className = 'error-text'>{mainError}</div>}
                    <Button disabled = {!isValid} type = {"submit"}>
                        Регистрация
                    </Button>
                </form>
        </div> 
    )
}