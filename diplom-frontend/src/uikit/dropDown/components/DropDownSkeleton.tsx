import { CustomSkeleton } from "../../skeleton/Skeleton";
import style from "./DropDownSkeleton.module.scss";

export const DropDownSkeleton = () => (
  <CustomSkeleton skeletonClassName={style.dropdownskeleton} />
);
