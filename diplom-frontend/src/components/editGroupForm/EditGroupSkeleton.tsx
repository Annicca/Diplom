import { CustomSkeleton } from "src/uikit/skeleton/Skeleton"
import classNames from "classnames"
import style from '../../pages/CreateStatement/CreateStatement.module.scss'

export const EditGroupSkeleton = () => {
    return(
        <section className={classNames(style.form, style.formContent)}>
            <CustomSkeleton skeletonClassName={style.skeleton_field}/>
            <CustomSkeleton skeletonClassName={style.skeleton_field}/>
            <CustomSkeleton skeletonClassName={style.skeleton_field}/>
            <CustomSkeleton skeletonClassName={style.skeleton_field}/>
            <CustomSkeleton skeletonClassName={style.skeleton_field}/>
        </section>
    )
}