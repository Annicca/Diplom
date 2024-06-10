import { FC } from "react";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";
import { useLoaderData, useParams } from "react-router-dom";
import { EditCompetitionForm } from "src/components/editCompetitionForm/EditCompetitionForm";
import { withConditional } from "src/hoc/withConditionalRender";
import { competitionDetailLoader as loader } from "../CompetitionDetail/loader";
import { competitionDetailQuery as query } from "../CompetitionDetail/competitionDetailQuery";
import { useQuery } from "@tanstack/react-query";
import { TCompetition } from "src/types/TCompetition";
import { AxiosError } from "axios";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { EditGroupSkeleton } from "src/components/editGroupForm/EditGroupSkeleton";

const EditCompetitionCondiitonal = withConditional(EditCompetitionForm);

export const EditCompetition: FC = () => {
  const { id } = useParams();

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const {
    data: competition,
    isError,
    isLoading,
    isFetching,
    error,
  } = useQuery<TCompetition, AxiosError>({
    ...query(id),
    initialData: initialData,
  });

  useCheckRole([ERole.ORGANIZER], competition.organizer.idUser);

  return (
    <PageLayout>
      <MainTite>Изменить конкурс</MainTite>
      <EditCompetitionCondiitonal
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        competition={competition}
        loadingElement={<EditGroupSkeleton />}
      />
    </PageLayout>
  );
};
