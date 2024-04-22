import { FC } from "react";
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';

interface CustomSkeletonProps{
    width?: number,
    height?: number,
    skeletonClassName?: string
}

export const CustomSkeleton:FC<CustomSkeletonProps> = ({width, height, skeletonClassName}) => {
    return(
        <Skeleton containerClassName="skeleton" className={skeletonClassName} width={width} height={height} />
    )
}