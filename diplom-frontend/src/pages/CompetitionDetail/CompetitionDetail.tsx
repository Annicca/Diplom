import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { competitionDetailLoader as loader } from "./loader";
import { competitionDetailQuery as query } from "./competitionDetailQuery";
import { chooseStatusCompetition } from "src/utils/choose";
import { TCompetition } from "src/types/TCompetition";
import { PageLayout } from "src/components/layout/PageLayout";
import { DetailSkeleton } from "../../uikit/detail/components/DetailSkeleton";
import { EStatusCompetition } from "src/types/EStatusCompetition";
import Detail from "src/uikit/detail/Detail";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";

export const CompetitionDetail: FC = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const {
    data: competition,
    isError,
    isLoading,
    error,
  } = useQuery<TCompetition, AxiosError>({
    ...query(id),
    initialData: initialData,
  });

  return (
    <PageLayout>
      {competition && (
        <Detail
          isLoading={isLoading}
          isError={isError}
          error={error}
          loadingElement={<DetailSkeleton />}
          img={competition.img}
          name={competition.nameCompetition}
          city={competition.cityCompetition.city}
          status={chooseStatusCompetition(competition.statusCompetition)}
          dateStart={competition.dateStart}
          dateFinish={competition.dateFinish}
          number={competition.organizer.phoneUser}
          mail={competition.organizer.mailUser}
          description={competition.descriptionCompetition}
          nominations={competition.nominations}
          ageCategories={competition.ageCategories}
          groupCategories={competition.groupCategories}
          isDisabled={
            competition.statusCompetition !== EStatusCompetition.CREATED
          }
          onClick={
            user?.role === ERole.DIRECTOR
              ? () => navigate(`/participants/${competition.idCompetition}`)
              : undefined
          }
          rules={competition.rules}
          regulation={competition.regulation}
          buttonText="Принять участие"
        />
      )}
    </PageLayout>
  );
};
