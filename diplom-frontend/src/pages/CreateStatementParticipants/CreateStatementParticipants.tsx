import { FC, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useCheckRole } from "src/hooks/useCheckRole";
// import { ERole } from "src/types/ERole";
import { takePart, useCompetition, useUserGroupList } from "src/utils/api";
import {
  IStatementParticipantRequest,
  TStatementParticipantDto,
} from "src/types/TStatementParicipant";
import { TNomination } from "src/types/TNomination";
import { TAgeCategory } from "src/types/TAgeCategory";
import { TGroupCategory } from "src/types/TGroupCategory";
import { TCompetition } from "src/types/TCompetition";
import { useFieldArray, useForm } from "react-hook-form";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import { DropDown } from "src/uikit/dropDown/DropDown";
import { Button } from "src/uikit/button/Button";
import { InputControl } from "src/uikit/input/InputControl";
import { CreateAct } from "src/components/createAct/CreateAct";

import style from "./CreateStatementParticipants.module.scss";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";

export const CreateStatementParticipants: FC = () => {
  const { idGroup } = useParams();
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

  const selectedGroup = useMemo(() => {
    if (idGroup) {
      return groups?.filter(
        (group) => group.value.idGroup === Number(idGroup)
      )[0];
    }
  }, [idGroup, groups]);

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
      group: selectedGroup,
    },
  });

  const {
    fields: actsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "perfomances",
    rules: { minLength: { value: 1, message: "Укажите хотябы один номер" } },
  });

  const navigation = useNavigate();

  useCheckRole(
    [ERole.DIRECTOR],
    selectedGroup ? selectedGroup.value.director.idUser : null
  );

  const onSubmit = handleSubmit(async (data) => {
    setMainError(null);
    if (!data.group) {
      setMainError("Выберете коллектив");
      return;
    }
    if (data.perfomances.length === 0) {
      setMainError("Укажите хотябы один номер");
      return;
    }
    console.log(data.group.value || selectedGroup?.value);
    const statement: IStatementParticipantRequest = {
      group: data.group.value || selectedGroup?.value,
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
        navigation(
          `/mygroups/statements-participant/${data.group.value.idGroup}`
        );
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
          selectedOption={selectedGroup}
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
          label="Общее кол-во участников *"
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
          label="Кол-во сопровождающих *"
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
          <Button type="submit" disabled={!isValid} className={style.submit}>
            Подать заявку на участие
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};
