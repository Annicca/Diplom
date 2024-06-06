import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { groupLoader as loader } from "./loader";
import { groupQuery as query } from "./groupQuery";
import { TGroup } from "src/types/TGroup";
import { PageLayout } from "src/components/layout/PageLayout";
import Detail from "src/uikit/detail/Detail";
import { DetailSkeleton } from "src/uikit/detail/components/DetailSkeleton";

export const GroupDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const {
    data: group,
    isError,
    isLoading,
    error,
  } = useQuery<TGroup, AxiosError>({ ...query(id), initialData: initialData });

  return (
    <PageLayout>
      <Detail
        isLoading={isLoading}
        isError={isError}
        error={error}
        loadingElement={<DetailSkeleton />}
        img={group.img}
        name={group.nameGroup}
        city={group.cityGroup.city}
        number={group.director.phoneUser}
        mail={group.director.mailUser}
        description={group.descriptionGroup}
        onClick={() => navigate("")}
        buttonText="Пригласить"
      />
    </PageLayout>
  );
};
