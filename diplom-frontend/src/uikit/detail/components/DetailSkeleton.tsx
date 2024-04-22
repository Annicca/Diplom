import { CustomSkeleton } from "src/uikit/skeleton/Skeleton"

import style from '../Detail.module.scss'

export const DetailSkeleton = () => {
    return(
        <section className={style.detail}>
            <CustomSkeleton width={900} height={400} skeletonClassName={style.detailSkeleton}/>
            <CustomSkeleton width={300} height={50} skeletonClassName={style.detailSkeleton}/>
            <CustomSkeleton width={180} height={50} skeletonClassName={style.detailSkeleton}/>
            <CustomSkeleton width={380} height={120} skeletonClassName={style.detailSkeleton}/>
            <CustomSkeleton width={900} height={200} skeletonClassName={style.detailSkeleton}/>
        </section>
    )
}