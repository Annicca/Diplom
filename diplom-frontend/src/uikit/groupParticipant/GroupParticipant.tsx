import { FC } from "react";
import { useParams } from "react-router-dom";
import { withConditional } from "src/hoc/withConditionalRender";
import { useParticipant } from "src/utils/api";
import { Participant } from "../particioant/Participant";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";

interface GroupParticipantProps {
  idCompetition: number;
}

const ParticipantConditional = withConditional(Participant);

export const GroupParticipant: FC<GroupParticipantProps> = ({
  idCompetition,
}) => {
  const { id } = useParams();
  const {
    data: participant,
    isError,
    error,
    isLoading,
    isFetching,
  } = useParticipant(idCompetition, Number(id));

  return (
    <ParticipantConditional
      key={participant?.id}
      isLoading={isLoading || isFetching}
      isError={isError}
      error={error}
      loadingElement={<Loading type={ETypeLoding.SYNC} />}
      participant={participant}
    />
  );
};
