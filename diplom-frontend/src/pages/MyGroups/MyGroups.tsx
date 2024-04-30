import { AxiosError } from "axios"
import { FC, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { myGroupsLoader as loader } from "./loader";
import { myGroupsQuery as query } from "./myGroupsQuery";
import { TGroup } from "src/types/TGroup"
import { TPage } from "src/types/TPage"
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PaginationList } from "src/components/list/PaginationList";
import { MyGroup } from "src/uikit/myGroup/MyGroup";
import { DeleteModal } from "src/components/deleteModal/DeleteModal";
import { deleteGroup } from "src/utils/api";
import { queryClient } from "src/utils/queryClient";
import { ErrorModal } from "src/components/errorModal/ErrorModal";

import style from '../../components/list/List.module.scss'

export const MyGroups:FC = () => {
    const {idUser} = useParams()
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const infinitedata = useInfiniteQuery<TPage<TGroup[]>, AxiosError>({...query(idUser), initialData: initialData})

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
    
    const onDeleteGroup = () => {
        deleteGroup(currentId)
        .then(() => {
            toggleDeleteModal();
            queryClient.refetchQueries({queryKey: ['mygroups', idUser]});
        })
        .catch((error) =>{
            setErrorMessage(error.message);
            toggleDeleteModal();
            toggleErrorModal();
        })
    }

    const onChange = (id: number) => {
        navigate('/groups/change/'+id)
    }

    return(
        <PageLayout>
            <MainTite>Мои коллективы</MainTite>
            <PaginationList 
                classNameList={style.list}
                classNameInnerList={style.list_statements}
                skeletonClassName="skeleton-competition"
                infiniteData={infinitedata}
                renderItem={(item: TGroup) => 
                    <MyGroup 
                        key = {item.idGroup} 
                        group={item}
                        onDeleteItem={() => {handleCurrentId(item.idGroup); toggleDeleteModal()}} 
                        onChangeItem={() => onChange(item.idGroup)}
                    />
                }
            />
            <DeleteModal 
                isOpen = {isOpenDeleteModal}
                text = "Вы действительно хотите удалить коллектив?"
                toggleModal={toggleDeleteModal}
                onConfirm={onDeleteGroup}
            />
            <ErrorModal 
                isOpen = {isOpenErrorModal}
                text = {errorMessage}
                toggleModal={toggleErrorModal}
            />
        </PageLayout>
    )
}