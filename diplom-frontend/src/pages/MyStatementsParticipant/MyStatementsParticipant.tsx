import { FC, useState } from "react";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";
import { useLoaderData, useParams } from "react-router-dom";
import { myStatementsParticipantLoader as loader } from "./loader";
import { myStatementsParticipantQuery as query } from "./statementsParticipantQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { TStatementParticipant } from "src/types/TStatementParicipant";
import { AxiosError } from "axios";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PaginationList } from "src/components/list/PaginationList";
import { StatementParticipant } from "src/uikit/statementParticipant/StatementParticipant";
import { changeStatusStatementParticipant, checkPayment } from "src/utils/api";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import { queryClient } from "src/utils/queryClient";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";

import style from "../../components/list/List.module.scss";

const PaginationListConditional = withConditional(
  PaginationList<TStatementParticipant>
);

interface TMyStatementsParticipantProps {
  url: string;
}

export const MyStatementsParticipant: FC<TMyStatementsParticipantProps> = ({
  url,
}) => {
  useCheckRole([ERole.ORGANIZER, ERole.DIRECTOR]);
  const { id } = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<
    TPage<TStatementParticipant[]>,
    AxiosError
  >({ ...query(url, id), initialData: initialData });

  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleErrorModal = () => {
    setOpenErrorModal(!isOpenErrorModal);
  };

  const onReject = async (idStatement: number) => {
    await changeStatusStatementParticipant("reject", idStatement)
      .then(() => {
        queryClient.refetchQueries({
          queryKey: ["statementsparticipant/competition", id],
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  const onAccept = async (idStatement: number) => {
    await changeStatusStatementParticipant("accept", idStatement)
      .then(() => {
        queryClient.refetchQueries({
          queryKey: ["statementsparticipant/competition", id],
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  const onPayment = async (idStatement: number) => {
    await checkPayment(idStatement)
      .then(() => {
        queryClient.refetchQueries({
          queryKey: ["statementsparticipant/competition", id],
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  return (
    <PageLayout>
      <MainTite>Заявки на участие</MainTite>
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
        renderItem={(item: TStatementParticipant) => (
          <StatementParticipant
            reject={onReject}
            accept={onAccept}
            payment={onPayment}
            key={item.id}
            statement={item}
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
