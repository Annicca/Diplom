import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { groupLoader as loader } from "../GroupDetail/loader";
import { groupQuery as query } from "../GroupDetail/groupQuery";
import { PageLayout } from "src/components/layout/PageLayout"
import { MainTite } from "src/components/mainTitle/MainTitle"
import { TGroup } from "src/types/TGroup";
import { useLoaderData, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { withConditionalRender } from "src/hoc/withConditionalRender";
import { EditGroupForm } from "src/components/editGroupForm/EditGroupForm";
import { EditGroupSkeleton } from "src/components/editGroupForm/EditGroupSkeleton";

export const EditGroup:FC = () => {
    const {id} = useParams()
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const {data: group, isError, isLoading, error} = useQuery<TGroup, AxiosError>({...query(id), initialData: initialData})

    return(
        <PageLayout>
            <MainTite>Изменить коллектив</MainTite>
            {withConditionalRender({
                isLoading,
                isError,
                error,
                loadingElement: <EditGroupSkeleton />,
                data: group,
                children: (
                    <EditGroupForm group={group} />
                )
            })}
        </PageLayout>
    )
}