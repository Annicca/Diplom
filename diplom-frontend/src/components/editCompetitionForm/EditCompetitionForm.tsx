import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TCompetition, TCompetitionUpdate } from "src/types/TCompetition";
import { ImagePreview } from "../image/ImagePreview";
import { Image } from "../image/Image";
import { FileUpload } from "src/uikit/fileUpload/FileUpload";
import { ACCEPTED_FORMATS } from "src/Constants";
import { TextareaControl } from "src/uikit/textarea/TextareaControl";
import { InputControl } from "src/uikit/input/InputControl";
import { Button } from "src/uikit/button/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/utils/queryClient";
import { editCompetition } from "src/utils/api";
import classNames from "classnames";

import style from "../../pages/CreateStatement/CreateStatement.module.scss";

interface EditCompetitionFormProps {
  competition: TCompetition;
}

export type EditCompetitionForm = Omit<
  TCompetitionUpdate,
  "statusModeration" | "id" | "competition"
>;

export const EditCompetitionForm: FC<EditCompetitionFormProps> = ({
  competition,
}) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File>();
  const [mainError, setMainError] = useState<string | string[] | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeImage = (event: any) => {
    if (!event.target.files[0]) return;
    setImage(event.target.files[0]);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<EditCompetitionForm>({
    mode: "onChange",
    defaultValues: {
      descriptionCompetition: competition.descriptionCompetition,
      dateStart: competition.dateStart,
      dateFinish: competition.dateFinish,
    },
  });

  const updateCompetition = useMutation(editCompetition, {
    onSuccess: (data) => {
      setMainError(null);
      queryClient.setQueryData(
        ["competition", { id: competition.idCompetition.toString() }],
        data
      );
      queryClient.refetchQueries(["mycompetitionы"]);
      navigate(`/mycompetitions/${competition.organizer.idUser}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setMainError(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (image) {
      const fileExtension = image.name?.split(".").pop()?.toLowerCase();
      if (!ACCEPTED_FORMATS.includes(`.${fileExtension}`)) {
        setError("img", {
          message:
            "Неверный формат файла. \n Формат файла может быть: .jpg, .jpeg, .png, .webp",
        });
        return;
      }

      if (image?.size > 10 * 1024 * 1024) {
        setError("img", { message: "Превышен допустимый размер файла в 10МБ" });
        return;
      }
    }

    const formData = new FormData();
    formData.append("idCompetition", competition.idCompetition.toString());
    formData.append("dateStart", data.dateStart);
    formData.append("dateFinish", data.dateFinish);
    data.descriptionCompetition &&
      formData.append("descriptionCompetition", data.descriptionCompetition);
    image && formData.append("img", image);

    await updateCompetition.mutateAsync(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(style.form, style.formContent)}
    >
      {image ? (
        <ImagePreview file={image} classNameContainer={style.image} />
      ) : (
        <Image
          src={competition.img}
          alt={competition.nameCompetition}
          className={style.image}
        />
      )}
      <div className={style.radioContainer}>
        <FileUpload
          id="img"
          label="Загрузите изображения"
          file={image}
          accept={ACCEPTED_FORMATS.join(",")}
          {...register("img", {
            onChange: changeImage,
          })}
          error={errors?.img && errors?.img?.message}
        />
      </div>
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
      <TextareaControl
        {...register("descriptionCompetition")}
        placeholder=" "
        label="Описание"
      />
      {mainError && Array.isArray(mainError)
        ? mainError.map((error) => <div className="error-text">{error}</div>)
        : mainError && <div className="error-text">{mainError}</div>}
      <div className={style.buttonContainer}>
        <Button type="submit" disabled={!isValid} className={style.stage_btn}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
