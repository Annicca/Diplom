import { FC } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import CloseIcon from "assets/icons/cancel.svg?react";

import style from "../../pages/CreateStatement/CreateStatement.module.scss";

interface CreateGenresProps {
  register: UseFormRegister<CreateStatementForm>;
  errors: FieldErrors<CreateStatementForm>;
  control?: Control<CreateStatementForm>;
  nominationIndex: number;
}

export const CreateGenres: FC<CreateGenresProps> = ({
  register,
  errors,
  control,
  nominationIndex,
}) => {
  const {
    fields: genresFields,
    append,
    remove,
  } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: `nominations.${nominationIndex}.genres` as any,
  });

  return (
    <>
      {genresFields.map(({ id }, index) => (
        <article key={id} className={style.genres__inner}>
          <div className={style.genres__name}>
            <div>Жанр {index + 1}</div>
            <Button
              onClick={() => remove(index)}
              className={style.genres__button}
            >
              <CloseIcon width={20} height={20} />
            </Button>
          </div>
          <InputControl
            type="text"
            {...register(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              `nominations.${nominationIndex}.genres.${index}.name` as any,
              {
                required: "Поле обязательно",
              }
            )}
            error={errors.nominations && errors.nominations?.[index]?.message}
          />
        </article>
      ))}
      <Button
        type="button"
        className={style.genres__add}
        onClick={() => append({ name: "" })}
      >
        + Жанр
      </Button>
    </>
  );
};
