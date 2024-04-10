import { FC } from "react"
import SyncLoader from 'react-spinners/SyncLoader'
import Skeleton from "react-loading-skeleton"
import { ETypeLoding } from "src/types/ETypeLoading"

import style from './Loading.module.scss'
import 'react-loading-skeleton/dist/skeleton.css';


interface LoadingProps {
    type?: ETypeLoding,
    message?: string,
    skeletonClassName?: string,
    classNameList?: string
}

export const Loading: FC<LoadingProps> = ({type, message, skeletonClassName, classNameList}) => {
    if (type === ETypeLoding.SKELETON){
        return <ul className={classNameList}>{Array(6).fill(1).map((item, index) => <Skeleton key={item+index} containerClassName="skeleton" className={skeletonClassName} />)}</ul>
    }
    else if(type === ETypeLoding.SYNC) return <div className={style.loadingSync}><SyncLoader color = "#FF6B00" /></div>
    else return(
        <div>{message}</div>
    )
}