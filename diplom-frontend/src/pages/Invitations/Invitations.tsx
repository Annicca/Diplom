import { FC, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { invitationsQuery as query } from "./invitationsQuery";
import { invitationsLoader as loader } from "./loader";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { withConditional } from "src/hoc/withConditionalRender";
import { TInvitation } from "src/types/TInvitation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { AxiosError } from "axios";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";
import { Invitation } from "src/uikit/invitation/Invitation";
import { changeStatusInvitation } from "src/utils/api";
import { queryClient } from "src/utils/queryClient";
import { ErrorModal } from "src/components/errorModal/ErrorModal";

import style from "../../components/list/List.module.scss";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";

const PaginationListConditional = withConditional(PaginationList<TInvitation>);

interface InvitationsProps {
  url: string;
}

export const Invitations: FC<InvitationsProps> = ({ url }) => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TInvitation[]>, AxiosError>({
    ...query(url, id),
    initialData: initialData,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);

  const toggleErrorModal = () => {
    setOpenErrorModal(!isOpenErrorModal);
  };

  const onAccept = (id: number, idCompetition: number, idGroup: number) => {
    changeStatusInvitation("accept", id)
      .then(() => {
        queryClient.refetchQueries({ queryKey: [url, id] });
        navigate(`/participants/${idCompetition}/${idGroup}`, {
          state: { idGroup: idGroup },
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  const onReject = (id: number) => {
    changeStatusInvitation("reject", id)
      .then(() => {
        queryClient.refetchQueries({ queryKey: [url, id] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  return (
    <PageLayout>
      <MainTite>Приглашения</MainTite>
      <PaginationListConditional
        isLoading={infinitedata.isLoading || infinitedata.isFetching}
        isError={infinitedata.isError}
        error={infinitedata.error}
        loadingElement={
          <Loading
            type={ETypeLoding.SKELETON}
            skeletonClassName={"skeleton-competition"}
            classNameList={style.list_statements}
          />
        }
        classNameList={style.list}
        classNameInnerList={style.list_statements}
        infiniteData={infinitedata}
        renderItem={(item: TInvitation) => (
          <Invitation
            invitation={item}
            key={item.id}
            onAccept={onAccept}
            onReject={onReject}
            isDirector={user?.role === ERole.DIRECTOR}
          />
        )}
      />
      <ErrorModal
        isOpen={isOpenErrorModal}
        text={errorMessage}
        toggleModal={toggleErrorModal}
      />
    </PageLayout>
  );
};
