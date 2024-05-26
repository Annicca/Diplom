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
import { withConditionalRender } from "src/hoc/withConditionalRender";
import { Detail } from "src/uikit/detail/Detail";

export const CompetitionDetail:FC = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const {data: competition, isError, isLoading, error} = useQuery<TCompetition, AxiosError>({...query(id), initialData: initialData})

    return(
        <PageLayout>
            {withConditionalRender({
                isLoading,
                isError,
                error,
                loadingElement: <DetailSkeleton />,
                data: competition,
                children: (
                    <>
                        {competition && 
                            <Detail 
                                img={competition.img}
                                name={competition.nameCompetition}
                                city= {competition.cityCompetition.city}
                                status={chooseStatusCompetition(competition.statusCompetition)}
                                dateStart={competition.dateStart}
                                dateFinish={competition.dateFinish}
                                number={competition.organizer.phoneUser}
                                mail={competition.organizer.mailUser}
                                description={competition.descriptionCompetition}
                                nominations={competition.nominations}
                                ageCategories={competition.ageCategories}
                                groupCategories={competition.groupCategories}
                                isDisabled={competition.statusCompetition !== EStatusCompetition.CREATED}
                                onClick={() => navigate(`/participants/${competition.idCompetition}`)}
                                rules={competition.rules}
                                regulation={competition.regulation}
                                buttonText="Принять участие"
                            />
                        }
                    </>
                )      
            })}
        </PageLayout>
    )
}