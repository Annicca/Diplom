import { FC, useEffect, useState } from "react";
import { queryClient } from "src/utils/queryClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { statementsQuery as query } from "./statementsQuery";
import { statementsLoader as loader } from "./loader";
import { useLoaderData } from "react-router-dom";
import { AxiosError } from "axios";
import { useSearchContext } from "src/context/search-context/useSearchContext";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { TPage } from "src/types/TPage";
import { TStatement } from "src/types/TStatement";
import { IS_MOBILE } from "src/Constants";
import { Search } from "src/uikit/search/Search";
import { Statement } from "src/uikit/statement/Statement";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import { changeStatementStatus } from "src/utils/api";

import style from "../../components/list/List.module.scss";
import pageStyle from "./Statements.module.scss";

export const Statements: FC = () => {
  const { value: serachValue } = useSearchContext();
  const [number, setNumber] = useState("");
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TStatement[]>, AxiosError>({
    ...query(number),
    initialData: initialData,
  });

  const handleNumber = (number: string) => {
    setNumber(number);
  };

  const toggleErrorModal = () => {
    setOpenErrorModal(!isOpenErrorModal);
  };

  const onAccept = (id: number) => {
    changeStatementStatus(id, "accept")
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["statements"] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  const onReject = (id: number) => {
    changeStatementStatus(id, "reject")
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["statements"] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleErrorModal();
      });
  };

  useEffect(() => {
    queryClient.invalidateQueries(["statements"]);
  }, [number]);

  useEffect(() => {
    if (IS_MOBILE) {
      handleNumber(serachValue);
    }
  }, [serachValue]);

  return (
    <PageLayout>
      <MainTite>Заявки</MainTite>
      {!IS_MOBILE && (
        <Search
          handleSearch={handleNumber}
          placeholder="Введите номер заявки"
          classNameContainer={pageStyle.search}
        />
      )}
      <PaginationList
        classNameList={style.list}
        classNameInnerList={style.list_statements}
        skeletonClassName="skeleton-competition"
        infiniteData={infinitedata}
        renderItem={(item: TStatement) => (
          <Statement
            key={item.idStatement + (item?.statusStatement || "")}
            statement={item}
            onAccept={() => onAccept(item.idStatement)}
            onReject={() => onReject(item.idStatement)}
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
