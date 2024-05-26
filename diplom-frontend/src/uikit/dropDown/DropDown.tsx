import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface DropDownProps<T extends FieldValues> {
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  control: Control<T>;
  name: Path<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: OptionsOrGroups<any, GroupBase<any>> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedOption?: any;
  placeholder?: string;
  classNameContainer?: string;
}

export const DropDown = <T extends FieldValues>({
  name,
  rules,
  control,
  error,
  selectedOption,
  options,
  placeholder,
  classNameContainer,
}: DropDownProps<T>) => {
  return (
    <div className={classNameContainer}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={selectedOption}
        render={({ field: { value: item, onChange } }) => (
          <Select
            placeholder={placeholder}
            value={item}
            onChange={onChange}
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                border: "2px solid #FFE660",
                borderRadius: "10px",
                boxShadow: "none",
                [":focus"]: {
                  borderColor: "#FFB800",
                },
                [":hover"]: {
                  borderColor: "#FFB800",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "#BFBFBF",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 2,
              }),
              option: (base, props) => ({
                ...base,
                backgroundColor: props.isSelected ? "#FFD700" : "white",
                [":hover"]: {
                  backgroundColor: props.isSelected ? "#FFD700" : "#ffffe0",
                },
              }),
            }}
          />
        )}
      />
      {error && <div>{error.toString()}</div>}
    </div>
  );
};
