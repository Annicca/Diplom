import { FC, useState } from "react";
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

import style from "../../components/list/List.module.scss";

interface TMyStatementsParticipantProps {
  url: string;
}

export const MyStatementsParticipant: FC<TMyStatementsParticipantProps> = ({
  url,
}) => {
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

  const onReject = async (id: number) => {
    await changeStatusStatementParticipant("reject", id)
      .then(() => {
        queryClient.refetchQueries({ queryKey: [url, id] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  const onAccept = async (id: number) => {
    await changeStatusStatementParticipant("accept", id)
      .then(() => {
        queryClient.refetchQueries({ queryKey: [url, id] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  const onPayment = async (id: number) => {
    console.log(id);
    await checkPayment(id)
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
      <MainTite>Заявки на участие</MainTite>
      <PaginationList
        classNameList={style.list}
        classNameInnerList={style.list_statements}
        skeletonClassName="skeleton-competition"
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
