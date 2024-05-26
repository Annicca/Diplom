import { FC, useMemo } from "react";
import {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { TNominationDTO } from "src/types/TNomination";
import { TAgeCategoryDTO } from "src/types/TAgeCategory";
import { TGroupCategoryDTO } from "src/types/TGroupCategory";
import { TStatementParticipantDto } from "src/types/TStatementParicipant";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import { DropDown } from "src/uikit/dropDown/DropDown";
import CloseIcon from "assets/icons/cancel.svg?react";

import style from "../../pages/CreateStatement/CreateStatement.module.scss";

interface CreateActProps {
  register: UseFormRegister<TStatementParticipantDto>;
  errors: FieldErrors<TStatementParticipantDto>;
  control: Control<TStatementParticipantDto>;
  nominations?: {
    label: string;
    value: TNominationDTO;
  }[];
  ageCategories?: {
    label: string;
    value: TAgeCategoryDTO;
  }[];
  groupCategories?: {
    label: string;
    value: TGroupCategoryDTO;
  }[];
  index: number;
  watch: UseFormWatch<TStatementParticipantDto>;
  remove: UseFieldArrayRemove;
}

export const CreateAct: FC<CreateActProps> = ({
  register,
  errors,
  control,
  nominations,
  ageCategories,
  groupCategories,
  index,
  watch,
  remove,
}) => {
  const watchNomination = watch(`perfomances.${index}.nomination`);

  const genres = useMemo(() => {
    return watchNomination?.value?.genres?.map((genre) => {
      return {
        label: genre.name,
        value: genre,
      };
    });
  }, [watchNomination]);

  return (
    <article className={style.act}>
      <div className={style.act__name}>
        <div>Номер {index + 1}</div>
        <Button
          onClick={() => remove(index)}
          className={style.nomination__button}
        >
          <CloseIcon width={20} height={20} />
        </Button>
      </div>
      <InputControl
        type="text"
        label="Название *"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...register(`perfomances.${index}.name` as any, {
          required: "Поле обязательно",
        })}
        error={errors.perfomances && errors.perfomances?.[index]?.message}
      />
      <InputControl
        type="number"
        label="Количество участников *"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...register(`perfomances.${index}.countPeople` as any, {
          required: "Поле обязательно",
          min: { value: 1, message: "Не может быть меньше 1" },
        })}
        error={errors.perfomances && errors.perfomances?.[index]?.message}
      />
      <DropDown
        options={nominations}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={`perfomances.${index}.nomination` as any}
        placeholder="Выберите номинацию *"
        control={control}
        rules={{
          required: "Поле обязательно",
        }}
        classNameContainer={style.dropdown}
      />
      {genres && genres?.length > 0 && (
        <DropDown
          options={genres}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name={`perfomances.${index}.genre` as any}
          placeholder="Выберите жанр *"
          control={control}
          rules={{
            required: "Поле обязательно",
          }}
          classNameContainer={style.dropdown}
        />
      )}
      <DropDown
        options={groupCategories}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={`perfomances.${index}.groupCategory` as any}
        placeholder="Выберите групповую форму *"
        control={control}
        rules={{
          required: "Поле обязательно",
        }}
        classNameContainer={style.dropdown}
      />
      <DropDown
        options={ageCategories}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={`perfomances.${index}.ageCategory` as any}
        placeholder="Выберите возрастную группу *"
        control={control}
        rules={{
          required: "Поле обязательно",
        }}
        classNameContainer={style.dropdown}
      />
      <div className="error-text">{errors.perfomances?.message}</div>
    </article>
  );
};
