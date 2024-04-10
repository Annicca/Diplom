import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { competitionDetailLoader as loader } from "./loader";
import { competitionDetailQuery as query } from "./competitionDetailQuery";
import { TCompetition } from "src/types/TCompetition";

export const CompetitionDetail:FC = () => {

    const {id} = useParams()
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
    const {data: competition, isError, isLoading, error} = useQuery<TCompetition, AxiosError>({...query(id), initialData: initialData})


    return(
        <div>

        </div>
    )
}