import { FC } from "react";
import { TInvitation } from "src/types/TInvitation";
import { chooseStatus } from "src/utils/choose";
import { Group } from "../group/Group";

import style from "./Invitation.module.scss";
import { Button } from "../button/Button";

interface InvitationProps {
  invitation: TInvitation;
  onAccept?: (id: number, idCompetition: number, idGroup: number) => void;
  onReject?: (id: number) => void;
  isDirector: boolean;
}

export const Invitation: FC<InvitationProps> = ({
  invitation,
  onAccept = () => {},
  onReject = () => {},
  isDirector,
}) => {
  return (
    <div className={style.invitation}>
      <div className="text-orange">
        Статус: {chooseStatus(invitation.status)}
      </div>
      <Group group={invitation.group} isSmal />
      {isDirector && (
        <div className={style.buttonContainer} key={invitation.status}>
          <Button
            className={style.buttonContainer_btn}
            onClick={() =>
              onAccept(
                invitation.id as number,
                invitation.competition.idCompetition,
                invitation.group.idGroup
              )
            }
            disabled={invitation.status !== null}
          >
            Принять
          </Button>
          <Button
            className={style.buttonContainer_btn}
            onClick={() => onReject(invitation.id as number)}
            disabled={invitation.status !== null}
          >
            Отклонить
          </Button>
        </div>
      )}
    </div>
  );
};
