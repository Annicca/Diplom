import { FC } from "react";
import { ERole } from "src/types/ERole";
import { useCheckRole } from "src/hooks/useCheckRole";
import { useQuery } from "@tanstack/react-query";
import { groupLoader as loader } from "../GroupDetail/loader";
import { groupQuery as query } from "../GroupDetail/groupQuery";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { TGroup } from "src/types/TGroup";
import { useLoaderData, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { withConditional } from "src/hoc/withConditionalRender";
import { EditGroupForm } from "src/components/editGroupForm/EditGroupForm";
import { EditGroupSkeleton } from "src/components/editGroupForm/EditGroupSkeleton";

const EditGroupCondiitonal = withConditional(EditGroupForm);

export const EditGroup: FC = () => {
  const { id } = useParams();
  useCheckRole([ERole.DIRECTOR]);
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const {
    data: group,
    isError,
    isLoading,
    isFetching,
    error,
  } = useQuery<TGroup, AxiosError>({ ...query(id), initialData: initialData });

  useCheckRole([ERole.DIRECTOR], group.director.idUser);

  return (
    <PageLayout>
      <MainTite>Изменить коллектив</MainTite>
      <EditGroupCondiitonal
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        group={group}
        loadingElement={<EditGroupSkeleton />}
      />
    </PageLayout>
  );
};
