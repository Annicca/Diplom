import { FC, useState } from 'react'
import { AuthTitle } from 'src/uikit/authTitle/AuthTitle'
import { useForm } from 'react-hook-form';
import { ILoginRequest, login } from 'src/utils/api';
import { InputControl } from 'src/uikit/input/InputControl';
import { Button } from 'src/uikit/button/Button';
import { useUserContext } from 'src/context/user-context/useUserContext';
import style from './Auth.module.scss'
import { useNavigate } from 'react-router-dom';

export const Login:FC = () => {
    const {changeUser} = useUserContext()
    const navigate = useNavigate()
    const [mainError, setMainError] = useState<string | null>(null);
    
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<ILoginRequest>({
        mode: "onBlur",
    });

    const onSubmit = handleSubmit(async (data: ILoginRequest) => {
        login(data)
            .then((response) => {
                changeUser(response)
                setMainError(null)
                navigate(-1)
            })
            .catch((error) => {
                setMainError(error.message);
            })
    });

    return(
        <div className={style.container}>
            <form className = {style.form} onSubmit={onSubmit}>
                <AuthTitle title = {'Вход'} linkText = {'Ещё не зарегистрировались?'} path = {'/signin'} />
                <InputControl
                    error={errors.login && errors.login.message}
                    label = 'Логин'
                    placeholder='Логин'
                    type = 'text'
                    {...register("login", { 
                        required: 'Поле обязательно' ,
                        minLength: {value: 5, message: 'Длина не менее 5 символов'},
                        pattern: {value: /^[A-Za-z0-9]+$/, message: "Логин должен содержать только буквы латинского алфавита и цифры"}
                    })}
                />
                <InputControl
                    type ="password"
                    placeholder='Пароль'
                    label='Пароль'
                    {...register('password', {
                        required : 'Поле обязательно',
                        minLength: {value: 8, message: 'Длина не менее 8 символов'},
                        validate: {
                            hasNumber: value => /[0-9]/.test(value) || "Пароль должен содержать цифры",
                            hasLetter: value => /[A-Za-z]/.test(value) || "Пароль должен содержать буквы латинского алфавита",
                            hasSpecial: value => /[!@#$%^&*]/.test(value) || "Пароль должен содержать хотя бы 1 спецсимвол"
                        }
                    })}
                    error={errors.password && errors.password.message}
                />
                {mainError && <div className = 'error-text'>{mainError}</div>}
                <Button className = {style.button} type = "submit">Войти</Button>
            </form>
        </div>
    )
}