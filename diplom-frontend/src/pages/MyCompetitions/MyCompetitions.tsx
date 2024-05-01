import { FC, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { myCompetitionsLoader as loader } from "./loader";
import { myCompetitionsQuery as query } from "./myCompetitionsQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { TCompetition } from "src/types/TCompetition";
import { AxiosError } from "axios";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PaginationList } from "src/components/list/PaginationList";
import { MyCompetition } from "src/uikit/myCompetition/MyCompetition";
import { DeleteModal } from "src/components/deleteModal/DeleteModal";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import { cancelCompetition } from "src/utils/api";
import { queryClient } from "src/utils/queryClient";

import style from '../../components/list/List.module.scss'
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";

interface MyCompetitionsProps {
    url: string;
}

export const MyCompetitions:FC<MyCompetitionsProps> = ({url}) => {
    const {id} = useParams()
    const {user} = useUserContext()
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const infinitedata = useInfiniteQuery<TPage<TCompetition[]>, AxiosError>({...query(url, id), initialData: initialData})

    const navigate = useNavigate()

    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const [isOpenErrorModal, setOpenErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const toggleDeleteModal = () => {
        setOpenDeleteModal(!isOpenDeleteModal)
    }

    const toggleErrorModal = () => {
        setOpenErrorModal(!isOpenErrorModal)
    }

    const handleCurrentId = (id: number) => {
        setCurrentId(id)
    }
    
    const onCancelCompetition = () => {
        cancelCompetition(currentId)
        .then(() => {
            toggleDeleteModal();
            queryClient.refetchQueries({queryKey: [url, id]});
        })
        .catch((error) =>{
            console.log(error.message);
            setErrorMessage(error.message);
            toggleDeleteModal();
            toggleErrorModal();
        })
    }

    const onChange = (id: number) => {
        navigate('/competitions/change/'+id)
    }

    return(
        <PageLayout>
            <MainTite>{user?.role === ERole.ORGANIZER ? 'Мои конкурсы' : 'Конкурсы'}</MainTite>
            <PaginationList 
                classNameList={style.list}
                classNameInnerList={style.list_statements}
                skeletonClassName="skeleton-competition"
                infiniteData={infinitedata}
                renderItem={(item: TCompetition) => 
                    <MyCompetition 
                        key = {item.idCompetition + item.statusCompetition} 
                        competition={item}
                        onCancelItem={() => {handleCurrentId(item.idCompetition); toggleDeleteModal()}} 
                        onChangeItem={() => onChange(item.idCompetition)}
                    />
                }
            />
            <DeleteModal 
                isOpen = {isOpenDeleteModal}
                text = "Вы действительно хотите отменить конкурс?"
                toggleModal={toggleDeleteModal}
                onConfirm={onCancelCompetition}
            />
            <ErrorModal 
                isOpen = {isOpenErrorModal}
                text = {errorMessage}
                toggleModal={toggleErrorModal}
            />
        </PageLayout>
    )
}