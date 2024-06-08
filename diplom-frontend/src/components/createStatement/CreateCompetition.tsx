/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement";
import { CitySelect } from "src/uikit/citySelect/CitySelect";
import { FileUpload } from "src/uikit/fileUpload/FileUpload";
import { InputControl } from "src/uikit/input/InputControl";
import { TextareaControl } from "src/uikit/textarea/TextareaControl";

interface CreateCompetitionProps {
  register: UseFormRegister<CreateStatementForm>;
  errors: FieldErrors<CreateStatementForm>;
  rules?: File[];
  regulation?: File[];
  city: { label: string; value: number };
  control: Control<CreateStatementForm>;
}

export const CreateCompetition: FC<CreateCompetitionProps> = ({
  register,
  control,
  errors,
  regulation,
  rules,
  city,
}) => {
  const acceptedFormats = [".doc", ".docx", ".ppt", ".pptx", ".pdf"];
  return (
    <>
      <InputControl
        type="text"
        {...register("name", {
          required: "Поле обязательно",
        })}
        placeholder=" "
        label="Название *"
        error={errors?.name && errors?.name?.message}
      />
      <CitySelect
        name="city"
        control={control}
        defaultValue={city && city.value}
      />
      <InputControl
        type="date"
        {...register("dateStart", {
          required: "Поле обязательно",
        })}
        placeholder=" "
        label="Дата начала *"
        error={errors?.dateStart && errors?.dateStart?.message}
      />
      <InputControl
        type="date"
        {...register("dateFinish", {
          required: "Поле обязательно",
        })}
        placeholder=" "
        label="Дата окончания *"
        error={errors?.dateFinish && errors?.dateFinish?.message}
      />
      <InputControl
        type="number"
        {...register("competitionFee", {
          required: "Поле обязательно",
        })}
        placeholder=" "
        label="Цена конкурсного взноса *"
        error={errors?.dateFinish && errors?.dateFinish?.message}
      />
      <FileUpload
        id="rulesInput"
        label="Загрузите положение конкурса *"
        file={rules && rules[0]}
        accept=".doc, .docx, .ppt, .pptx, .pdf"
        {...register("rules", {
          // required : 'Положение обязательно',
          validate: (value) => {
            if (!value && rules && (rules?.length === 0 || !rules[0])) {
              return "Положение обязательно";
            }
            const fileExtension = value[0]?.name
              ?.split(".")
              .pop()
              ?.toLowerCase();
            if (!acceptedFormats.includes(`.${fileExtension}`)) {
              return "Неверный формат файла. \n Формат файла может быть: .doc, .docx, .ppt, .pptx, .pdf";
            }

            if (value[0]?.size > 10 * 1024 * 1024) {
              return "Превышен допустимый размер файла в 10МБ";
            }
            return true;
          },
        })}
        error={errors?.rules && errors?.rules?.message}
      />
      <FileUpload
        id="regulationInput"
        label="Загрузите правила проведения"
        file={regulation && regulation[0]}
        accept=".doc, .docx, .ppt, .pptx, .pdf"
        {...register("regulation", {
          validate: (value) => {
            if (!value[0]) {
              return;
            }
            const fileExtension = value[0].name
              ?.split(".")
              .pop()
              ?.toLowerCase();
            if (!acceptedFormats.includes(`.${fileExtension}`)) {
              return "Неверный формат файла. \n Формат файла может быть: .doc, .docx, .ppt, .pptx, .pdf";
            }

            if (value[0]?.size > 10 * 1024 * 1024) {
              return "Превышен допустимый размер файла в 10МБ";
            }
            return;
          },
        })}
        error={errors?.regulation && errors?.regulation?.message}
      />

      <TextareaControl
        {...register("description")}
        placeholder=" "
        label="Описание"
      />
    </>
  );
};
