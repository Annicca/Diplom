import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { groupLoader as loader } from "./loader";
import { groupQuery as query } from "./groupQuery";
import { TGroup } from "src/types/TGroup";
import { PageLayout } from "src/components/layout/PageLayout";
import Detail from "src/uikit/detail/Detail";
import { DetailSkeleton } from "src/uikit/detail/components/DetailSkeleton";
import { ModalForInvitation } from "src/uikit/modalForInvitation/ModalForInvitation";

export const GroupDetail: FC = () => {
  const { id } = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const {
    data: group,
    isError,
    isLoading,
    error,
  } = useQuery<TGroup, AxiosError>({ ...query(id), initialData: initialData });

  const [isInvitattionOpen, setIsInvitationOpen] = useState(false);

  const toggleInvitattion = () => {
    setIsInvitationOpen((isInvitattionOpen) => !isInvitattionOpen);
  };

  return (
    <PageLayout>
      {group && (
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
          onClick={toggleInvitattion}
          buttonText="Пригласить"
        />
      )}
      <ModalForInvitation
        isOpen={isInvitattionOpen}
        toggleModal={toggleInvitattion}
        group={group}
      />
    </PageLayout>
  );
};
