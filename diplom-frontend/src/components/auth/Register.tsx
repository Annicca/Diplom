import { useState } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthTitle } from "src/uikit/authTitle/AuthTitle";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import { IRegisterRequest, registerUser } from "src/utils/api";
import { ETypeUser } from "src/types/ETypeUser";
import { LegalForm } from "./LegalForm";
import classNames from "classnames";
import { PhisicalForm } from "./PhisicalForm";
import ArrowLeft from "assets/icons/arrow-left.svg?react";
import ArrowRight from "assets/icons/arrowRight.svg?react";
import { ImportantMessage } from "src/uikit/importantMessage/ImportantMessage";
import { LinkToMain } from "src/uikit/linkToMain/LinkToMain";

import style from "./Auth.module.scss";

export const Register = () => {
  const { changeUser } = useUserContext();
  const navigate = useNavigate();
  const [mainError, setMainError] = useState<string | string[] | null>(null);
  const [stage, setStage] = useState<number>(1);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm<IRegisterRequest>({
    mode: "onChange",
    defaultValues: {
      typeUser: ETypeUser.PHISICAL,
    },
  });

  const toggleStage = (stage: number) => {
    if (stage === 1) reset();
    setStage(stage);
  };

  const onSubmit = handleSubmit(async (data: IRegisterRequest) => {
    console.log(data);
    registerUser(data)
      .then((response) => {
        changeUser(response);
        setMainError(null);
        navigate("/");
      })
      .catch((error) => {
        setMainError(error.message);
      });
  });

  return (
    <div className={style.container}>
      <LinkToMain />
      <form className={style.form} onSubmit={onSubmit}>
        <AuthTitle
          title={"Регистрация"}
          linkText={"Уже зарегистрированы?"}
          path={"/login"}
        />
        {stage === 1 && (
          <>
            <div className={style.radioContainer}>
              <ImportantMessage>
                <p>
                  Если вы организатор конкурса, то необходимо зарегистрироваться
                  как Юридическое лицо
                </p>
              </ImportantMessage>
              <InputControl
                id="phisical"
                type="radio"
                {...register("typeUser", {
                  required: "Поле обязательно",
                })}
                value={ETypeUser.PHISICAL}
                placeholder=" "
                label="Физическое лицо"
              />
              <InputControl
                id="legal"
                type="radio"
                {...register("typeUser", {
                  required: "Поле обязательно",
                })}
                value={ETypeUser.LEGAL}
                placeholder=" "
                label="Юридическое лицо"
                error={errors?.typeUser && errors?.typeUser?.message}
              />
              <div className={style.buttonContainer}>
                <Button
                  onClick={() => toggleStage(2)}
                  className={style.stage_btn}
                >
                  <ArrowRight width={16} height={16} />
                </Button>
              </div>
            </div>
          </>
        )}

        {stage === 2 && getValues().typeUser === ETypeUser.PHISICAL && (
          <PhisicalForm register={register} errors={errors} />
        )}

        {stage === 2 && getValues().typeUser === ETypeUser.LEGAL && (
          <LegalForm register={register} errors={errors} />
        )}

        {stage === 2 && (
          <>
            <InputControl
              type="phone"
              {...register("phoneUser", {
                pattern: {
                  value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                  message: "Неккоректно введён номер телефона",
                },
              })}
              placeholder=" "
              label="Телефон"
              error={errors?.phoneUser && errors?.phoneUser?.message}
            />
            <InputControl
              type="email"
              {...register("mailUser", {
                required: "Поле обязательно",
                pattern: {
                  value: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/,
                  message: "Неккоректно введён Email",
                },
              })}
              placeholder=" "
              label="Email"
              error={errors?.mailUser && errors?.mailUser?.message}
            />
            <InputControl
              type="text"
              {...register("loginUser", {
                required: "Поле обязательно",
                minLength: { value: 5, message: "Длина не менее 5 символов" },
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message:
                    "Логин должен содержать только буквы латинского алфавита и цифры",
                },
              })}
              placeholder=" "
              label="Логин"
              error={errors?.loginUser && errors?.loginUser?.message}
            />
            <InputControl
              type="password"
              {...register("passwordUser", {
                required: "Поле обязательно",
                minLength: { value: 8, message: "Длина не менее 8 символов" },
                validate: {
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || "Пароль должен содержать цифры",
                  hasLetter: (value) =>
                    /[A-Za-z]/.test(value) ||
                    "Пароль должен содержать буквы латинского алфавита",
                  hasSpecial: (value) =>
                    /[!@#$%^&*]/.test(value) ||
                    "Пароль должен содержать хотя бы 1 спецсимвол",
                },
              })}
              placeholder=" "
              label="Пароль"
              error={errors?.passwordUser && errors?.passwordUser?.message}
            />
            <InputControl
              type="password"
              {...register("confirmPassword", {
                required: "Поле обязательно",
                minLength: { value: 8, message: "Длина не менее 8 символов" },
                validate: {
                  hasNumber: (value) =>
                    /[0-9]/.test(value as string) ||
                    "Пароль должен содержать цифры",
                  hasLetter: (value) =>
                    /[A-Za-z]/.test(value as string) ||
                    "Пароль должен содержать буквы латинского алфавита",
                  hasSpecial: (value) =>
                    /[!@#$%^&*]/.test(value as string) ||
                    "Пароль должен содержать хотя бы 1 спецсимвол",
                  hasConfirm: (value) => {
                    if (watch("passwordUser") != value) {
                      return "Пароли не совпадают";
                    }
                  },
                },
              })}
              placeholder=" "
              label="Повторите пароль"
              error={
                errors?.confirmPassword && errors?.confirmPassword?.message
              }
            />
            {mainError && Array.isArray(mainError)
              ? mainError.map((error) => (
                  <div className="error-text">{error}</div>
                ))
              : mainError && <div className="error-text">{mainError}</div>}
            <div
              className={classNames(
                style.buttonContainer,
                style.buttonContainer__two
              )}
            >
              <Button
                onClick={() => toggleStage(1)}
                className={style.stage_btn}
              >
                <ArrowLeft width={16} height={16} />
              </Button>
              <Button disabled={!isValid} type={"submit"}>
                Регистрация
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
