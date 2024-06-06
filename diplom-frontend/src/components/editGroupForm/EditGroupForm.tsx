import { FC, useState } from "react";
import { queryClient } from "src/utils/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TCIty } from "src/types/TCity";
import { TGroup } from "src/types/TGroup";
import { CitySelect } from "src/uikit/citySelect/CitySelect";
import { InputControl } from "src/uikit/input/InputControl";
import { TextareaControl } from "src/uikit/textarea/TextareaControl";
import { Button } from "src/uikit/button/Button";
import { FileUpload } from "src/uikit/fileUpload/FileUpload";
import { Image } from "../image/Image";
import { ImagePreview } from "../image/ImagePreview";
import { editGroup } from "src/utils/api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "../../pages/CreateStatement/CreateStatement.module.scss";

interface EditGroupFormProps {
  group: TGroup;
}

export type EditGroupForm = Exclude<TGroup, TCIty> & {
  cityGroup: {
    label: string;
    value: number;
  };
};

export const EditGroupForm: FC<EditGroupFormProps> = ({ group }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File>();
  const [mainError, setMainError] = useState<string | string[] | null>(null);

  const acceptedFormats = [".jpg", ".jpeg", ".png", ".webp"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeImage = (event: any) => {
    if (!event.target.files[0]) return;
    setImage(event.target.files[0]);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    // reset,
    setError,
  } = useForm<EditGroupForm>({
    mode: "onChange",
    defaultValues: {
      nameGroup: group.nameGroup,
      addressGroup: group.addressGroup,
      descriptionGroup: group.descriptionGroup,
      category: group.category,
      cityGroup: group.cityGroup && {
        label: group.cityGroup.city,
        value: group.cityGroup.idCity,
      },
    },
  });

  const updateGroup = useMutation(editGroup, {
    onSuccess: (data) => {
      setMainError(null);
      queryClient.setQueryData(
        ["group", { id: group.idGroup.toString() }],
        data
      );
      queryClient.invalidateQueries(["mygroups"]);
      navigate(`/mygroups/${group.director.idUser}`);
    },
    onError: (error) => {
      console.log(error);
      // setMainError(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (image) {
      const fileExtension = image.name?.split(".").pop()?.toLowerCase();
      if (!acceptedFormats.includes(`.${fileExtension}`)) {
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
    formData.append("idGroup", group.idGroup.toString());
    formData.append("nameGroup", data.nameGroup);
    data.category && formData.append("category", data.category);
    data.addressGroup && formData.append("addressGroup", data.addressGroup);
    formData.append("idCity", data.cityGroup.value.toString());
    data.descriptionGroup &&
      formData.append("descriptionGroup", data.descriptionGroup);
    image && formData.append("img", image);

    updateGroup.mutate(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(style.form, style.formContent)}
    >
      {image ? (
        <ImagePreview file={image} classNameContainer={style.image} />
      ) : (
        <Image src={group.img} alt={group.nameGroup} className={style.image} />
      )}
      <div className={style.radioContainer}>
        <FileUpload
          id="img"
          label="Загрузите изображения"
          file={image}
          accept=".jpg, .jpeg, .png, .webp"
          {...register("img", {
            onChange: changeImage,
          })}
          error={errors?.img && errors?.img?.message}
        />
      </div>
      <InputControl
        type="text"
        {...register("nameGroup", {
          required: "Поле обязательно",
        })}
        placeholder=" "
        label="Название"
        error={errors?.nameGroup && errors?.nameGroup?.message}
      />
      <InputControl
        type="text"
        {...register("category")}
        placeholder=" "
        label="Категория"
        error={errors?.category && errors?.category?.message}
      />
      {group.cityGroup && (
        <CitySelect
          name="cityGroup"
          control={control}
          defaultValue={group.cityGroup.idCity}
          error={errors?.cityGroup && errors?.cityGroup?.message}
        />
      )}
      <InputControl
        type="text"
        {...register("addressGroup", {
          required: "Поле обязательно",
        })}
        placeholder=" "
        label="Адрес"
        error={errors?.addressGroup && errors?.addressGroup?.message}
      />
      <TextareaControl
        {...register("descriptionGroup")}
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
