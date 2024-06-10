import { FC } from "react";
import Select, { SingleValue } from "react-select";

interface SelectProps {
  options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    label: string;
  }[];
  onChange: (
    event: SingleValue<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any;
      label: string;
    }>
  ) => void;
  defaultValue: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    label: string;
  };
}

export const CustomSelect: FC<SelectProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      styles={{
        container: (baseStyles) => ({
          ...baseStyles,
          width: "fit-content",
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          width: "fit-content",
          borderWidth: 0,
          boxShadow: "none",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "#FF6B00",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "#FF6B00",
          ":hover": {
            color: "#FF6B00",
          },
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          backgroundColor: state.isSelected ? "#FF6B00" : "#fffffc",
        }),
      }}
    />
  );
};
