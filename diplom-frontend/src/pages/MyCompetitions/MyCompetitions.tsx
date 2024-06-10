import { FC, useState } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { myCompetitionsLoader as loader } from "./loader";
import { myCompetitionsQuery as query } from "./myCompetitionsQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "src/utils/queryClient";
import { TPage } from "src/types/TPage";
import { TCompetition } from "src/types/TCompetition";
import { AxiosError } from "axios";
import { ERole } from "src/types/ERole";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PaginationList } from "src/components/list/PaginationList";
import { MyCompetition } from "src/uikit/myCompetition/MyCompetition";
import { DeleteModal } from "src/components/deleteModal/DeleteModal";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import { cancelCompetition } from "src/utils/api";
import { ETypeLoding } from "src/types/ETypeLoading";
import { AddLink } from "src/uikit/addLink/AddLink";

import style from "../../components/list/List.module.scss";

interface MyCompetitionsProps {
  url: string;
}

const PaginationListConditional = withConditional(PaginationList<TCompetition>);

export const MyCompetitions: FC<MyCompetitionsProps> = ({ url }) => {
  const { id } = useParams();
  const { user } = useUserContext();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TCompetition[]>, AxiosError>({
    ...query(url, id),
    initialData: initialData,
  });

  const navigate = useNavigate();

  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!isOpenDeleteModal);
  };

  const toggleErrorModal = () => {
    setOpenErrorModal(!isOpenErrorModal);
  };

  const handleCurrentId = (id: number) => {
    setCurrentId(id);
  };

  const onCancelCompetition = () => {
    cancelCompetition(currentId)
      .then(() => {
        toggleDeleteModal();
        queryClient.refetchQueries({ queryKey: [url, id] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toggleDeleteModal();
        toggleErrorModal();
      });
  };

  const onChange = (id: number) => {
    navigate("/mycompetitions/edit/" + id);
  };

  return (
    <PageLayout>
      <MainTite>
        {user?.role === ERole.ORGANIZER ? "Мои конкурсы" : "Конкурсы"}
      </MainTite>
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
        renderItem={(item: TCompetition) => (
          <MyCompetition
            key={item.idCompetition + item.statusCompetition}
            competition={item}
            onCancelItem={() => {
              handleCurrentId(item.idCompetition);
              toggleDeleteModal();
            }}
            onChangeItem={() => onChange(item.idCompetition)}
          />
        )}
      />
      <AddLink url="/create/statement" />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        text="Вы действительно хотите отменить конкурс?"
        toggleModal={toggleDeleteModal}
        onConfirm={onCancelCompetition}
      />
      <ErrorModal
        isOpen={isOpenErrorModal}
        text={errorMessage}
        toggleModal={toggleErrorModal}
      />
    </PageLayout>
  );
};
