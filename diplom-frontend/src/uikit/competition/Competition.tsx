import { FC } from "react";
import { TCompetition } from "src/types/TCompetition";

interface CompetitionProps {
    competition: TCompetition
}

export const Competition : FC<CompetitionProps> = ({competition}) => {
    return(
        <>
            {competition.nameCompetition}
        </>
    )
}