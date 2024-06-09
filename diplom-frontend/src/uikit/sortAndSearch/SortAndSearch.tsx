import { FC } from "react";
import { ETypeSort, TFiterCompetition } from "src/types/TFilterCompetition";
import { Search } from "../search/Search";
import Select, { SingleValue } from "react-select";
import { IS_MOBILE } from "src/Constants";
import { FilterCompetition } from "src/components/filterCompetition/FilterCompetition";

import style from "./SortAndSearch.module.scss";

interface SortAndSearchProps {
  filter: TFiterCompetition;
  handleFilter: (filter: TFiterCompetition) => void;
}

export const SortAndSearch: FC<SortAndSearchProps> = ({
  filter,
  handleFilter,
}) => {
  const selectedType = { value: ETypeSort.DESC, label: "Новые" };

  const optionsTypeSort: {
    value: ETypeSort;
    label: string;
  }[] = [selectedType, { value: ETypeSort.ASC, label: "Старые" }];

  const handleCity = (city: string) => {
    handleFilter({
      ...filter,
      city: city,
    });
  };

  const handleTypeSort = (
    event: SingleValue<{
      value: ETypeSort;
      label: string;
    }>
  ) => {
    handleFilter({
      ...filter,
      [event?.label as string]: event?.value,
    });
  };

  return (
    <div className={style.sortSearch}>
      {!IS_MOBILE && (
        <Search handleSearch={handleCity} placeholder="Введите город" />
      )}
      <Select
        defaultValue={selectedType}
        onChange={handleTypeSort}
        options={optionsTypeSort}
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
      {IS_MOBILE && (
        <FilterCompetition filter={filter} handleFilter={handleFilter} />
      )}
    </div>
  );
};
