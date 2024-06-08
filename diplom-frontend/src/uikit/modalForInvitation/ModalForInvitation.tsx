import { FC, useState } from "react";
import Modal from "react-responsive-modal";
import { PaginationList } from "src/components/list/PaginationList";
import { Loading } from "src/components/loading/Loading";
import { withConditional } from "src/hoc/withConditionalRender";
import { MyCompetition } from "../myCompetition/MyCompetition";
import { ETypeLoding } from "src/types/ETypeLoading";
import { TCompetition } from "src/types/TCompetition";
import { TGroup } from "src/types/TGroup";
import { TInvitation } from "src/types/TInvitation";
import { addInvitation, useUserCompetitionList } from "src/utils/api";
import { Button } from "../button/Button";

import style from "../../components/list/List.module.scss";
import modalStyle from "./ModalForInvitation.module.scss";

interface ModalForInvitationProps {
  isOpen: boolean;
  toggleModal: () => void;
  group: TGroup;
}

const PaginationListConditional = withConditional(PaginationList<TCompetition>);

export const ModalForInvitation: FC<ModalForInvitationProps> = ({
  isOpen,
  toggleModal,
  group,
}) => {
  const infinitedata = useUserCompetitionList();
  const [chooseCompetition, setChooseCompetition] =
    useState<TCompetition | null>(null);
  const [mainError, setMainError] = useState<string | string[] | null>(null);

  const handleChooseCompetition = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    competition: TCompetition | null
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    setChooseCompetition(competition);
  };

  const sendInvitation = async () => {
    setMainError(null);
    if (chooseCompetition == null) {
      setMainError("Выберите конкурс");
      return;
    }
    const invitation: TInvitation = {
      competition: chooseCompetition,
      group: group,
    };
    await addInvitation(invitation)
      .catch((err) => setMainError(err.message))
      .then(() => toggleModal());
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={toggleModal}
        classNames={{ modal: modalStyle.invitation }}
      >
        {chooseCompetition ? (
          <div className={modalStyle.invitation__chose}>
            <MyCompetition
              key={chooseCompetition.idCompetition}
              competition={chooseCompetition}
              isSmal
            />
            {mainError && <div className="error-text">{mainError}</div>}
            <div className={modalStyle.invitation__buttons}>
              <Button
                onClick={sendInvitation}
                className={modalStyle.invitation__btn}
              >
                Отправить приглашение
              </Button>
              <Button
                isCancel
                isYellow={false}
                onClick={(e) => handleChooseCompetition(e, null)}
                className={modalStyle.invitation__btn}
              >
                Отменить выбор
              </Button>
            </div>
          </div>
        ) : (
          <PaginationListConditional
            isLoading={infinitedata.isLoading || infinitedata.isFetching}
            isError={infinitedata.isError}
            error={infinitedata.error}
            loadingElement={
              <Loading
                type={ETypeLoding.SKELETON}
                skeletonClassName={"skeleton-competition"}
                classNameList={modalStyle.invitation__list}
              />
            }
            classNameList={style.list}
            classNameInnerList={modalStyle.invitation__list}
            infiniteData={infinitedata}
            renderItem={(item: TCompetition) => (
              <div
                key={item.idCompetition}
                onClick={(e) => handleChooseCompetition(e, item)}
                className={modalStyle.competition}
              >
                <MyCompetition competition={item} isSmal />
              </div>
            )}
          />
        )}
      </Modal>
    </>
  );
};
