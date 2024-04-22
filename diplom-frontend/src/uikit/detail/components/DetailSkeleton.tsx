import { CustomSkeleton } from "src/uikit/skeleton/Skeleton"
import classNames from "classnames"
import style from '../Detail.module.scss'

export const DetailSkeleton = () => {
    return(
        <section className={style.detail}>
            <CustomSkeleton skeletonClassName={classNames(style.skeleton_detail, style.skeleton_detail__img)}/>
            <CustomSkeleton skeletonClassName={classNames(style.skeleton_detail, style.skeleton_detail__title)}/>
            <CustomSkeleton skeletonClassName={classNames(style.skeleton_detail, style.skeleton_detail__title)}/>
            <CustomSkeleton skeletonClassName={classNames(style.skeleton_detail, style.skeleton_detail__info)}/>
            <CustomSkeleton skeletonClassName={classNames(style.skeleton_detail, style.skeleton_detail__description)}/>
        </section>
    )
}