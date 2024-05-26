import { FC, useMemo, useState } from "react";
import { takePart, useCompetition, useUserGroupList } from "src/utils/api";
import {
  IStatementParticipantRequest,
  TStatementParticipantDto,
} from "src/types/TStatementParicipant";
import { TNomination } from "src/types/TNomination";
import { TAgeCategory } from "src/types/TAgeCategory";
import { TGroupCategory } from "src/types/TGroupCategory";
import { useFieldArray, useForm } from "react-hook-form";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import { DropDown } from "src/uikit/dropDown/DropDown";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import { CreateAct } from "src/components/createAct/CreateAct";

import style from "./CreateStatementParticipants.module.scss";
import { TCompetition } from "src/types/TCompetition";

export const CreateStatementParticipants: FC = () => {
  const { data: myGroups, isLoading: isLoadingGroup } = useUserGroupList();
  const { data: competition, isLoading } = useCompetition();

  const [mainError, setMainError] = useState<string | string[] | null>(null);

  const groups = useMemo(() => {
    return myGroups?.map((group) => {
      return {
        value: group,
        label: group.nameGroup,
      };
    });
  }, [myGroups]);

  const nominations = useMemo(() => {
    return competition?.nominations.map((nomination) => {
      return {
        value: nomination,
        label: nomination.name,
      };
    });
  }, [competition]);

  const ageCategories = useMemo(() => {
    return competition?.ageCategories?.map((ageCategory) => {
      return {
        label: ageCategory.name,
        value: ageCategory,
      };
    });
  }, [competition]);

  const groupCategories = useMemo(() => {
    return competition?.groupCategories?.map((groupCategory) => {
      return {
        label: groupCategory.name,
        value: groupCategory,
      };
    });
  }, [competition]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
  } = useForm<TStatementParticipantDto>({
    mode: "onChange",
    defaultValues: {
      competition: competition,
    },
  });

  const {
    fields: actsFields,
    append,
    remove,
  } = useFieldArray({ control, name: "perfomances", rules: { minLength: 1 } });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setMainError(null);
    const statement: IStatementParticipantRequest = {
      group: data.group.value,
      competition: competition as TCompetition,
      countParticipants: data.countParticipants,
      countAccompanying: data.countAccompanying,
      perfomances: data.perfomances.map((act) => {
        return {
          nomination: act.nomination?.value as TNomination,
          ageCategory: act.ageCategory?.value as TAgeCategory,
          groupCategory: act.groupCategory?.value as TGroupCategory,
          genre: act.genre?.value,
          countPeople: act.countPeople,
          name: act.name,
        };
      }),
    };
    await takePart(statement)
      .then(() => {
        console.log("Заявка на участие отправлена");
      })
      .catch((error) => {
        setMainError(error.message);
      });
  });

  if (isLoading || isLoadingGroup) return;
  return (
    <PageLayout>
      <MainTite>Подать заявку на участие</MainTite>
      <form onSubmit={onSubmit} className={style.form}>
        <DropDown
          options={groups}
          placeholder="Выберите коллектив *"
          control={control}
          name="group"
          rules={{
            required: "Поле обязательно",
          }}
          classNameContainer={style.dropdown}
          error={errors.group && errors.group.message?.toString()}
        />
        <InputControl
          type="number"
          {...register("countParticipants", {
            required: "Поле обязательно",
            min: { value: 1, message: "Не может быть меньше 1" },
          })}
          placeholder=" "
          label="Общее количество участников *"
          error={
            errors?.countParticipants && errors?.countParticipants?.message
          }
        />
        <InputControl
          type="number"
          {...register("countAccompanying", {
            required: "Поле обязательно",
            min: { value: 0, message: "Не может быть меньше 0" },
          })}
          placeholder=" "
          label="Количество сопровождающих *"
          error={
            errors?.countAccompanying && errors?.countAccompanying?.message
          }
        />
        <div>
          {actsFields.map(({ id }, index) => (
            <CreateAct
              key={id}
              {...{
                register,
                errors,
                control,
                nominations,
                ageCategories,
                groupCategories,
                index,
                watch,
                remove,
              }}
            />
          ))}
          <Button
            type="button"
            className={style.nomination__add}
            onClick={() =>
              append({
                name: "",
                countPeople: 0,
                nomination: null,
                genre: null,
                ageCategory: null,
                groupCategory: null,
              })
            }
          >
            Добавить номер
          </Button>
        </div>
        {mainError && Array.isArray(mainError)
          ? mainError.map((error) => <div className="error-text">{error}</div>)
          : mainError && <div className="error-text">{mainError}</div>}
        <div className={style.buttonContainer}>
          <Button type="submit" disabled={!isValid} className={style.stage_btn}>
            Подать заявку на участие
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};
