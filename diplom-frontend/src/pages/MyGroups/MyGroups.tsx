import { FC, useState } from "react";
import { AxiosError } from "axios";
import { useUserContext } from "src/context/user-context/useUserContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { myGroupsLoader as loader } from "./loader";
import { myGroupsQuery as query } from "./myGroupsQuery";
import { TGroup } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { ERole } from "src/types/ERole";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { PaginationList } from "src/components/list/PaginationList";
import { MyGroup } from "src/uikit/myGroup/MyGroup";
import { DeleteModal } from "src/components/deleteModal/DeleteModal";
import { deleteGroup } from "src/utils/api";
import { queryClient } from "src/utils/queryClient";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import { ETypeLoding } from "src/types/ETypeLoading";

import style from "../../components/list/List.module.scss";

interface MyGroupsProps {
  url: string;
}

const PaginationListConditional = withConditional(PaginationList<TGroup>);

export const MyGroups: FC<MyGroupsProps> = ({ url }) => {
  const { user } = useUserContext();
  const { id } = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TGroup[]>, AxiosError>({
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

  const onDeleteGroup = () => {
    deleteGroup(currentId)
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
    navigate("/mygroups/edit/" + id);
  };

  return (
    <PageLayout>
      <MainTite>
        {user?.role === ERole.DIRECTOR ? "Мои коллективы" : "Коллективы"}
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
        renderItem={(item: TGroup) => (
          <MyGroup
            key={item.idGroup}
            group={item}
            onDeleteItem={() => {
              handleCurrentId(item.idGroup);
              toggleDeleteModal();
            }}
            onChangeItem={() => onChange(item.idGroup)}
          />
        )}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        text="Вы действительно хотите удалить коллектив?"
        toggleModal={toggleDeleteModal}
        onConfirm={onDeleteGroup}
      />
      <ErrorModal
        isOpen={isOpenErrorModal}
        text={errorMessage}
        toggleModal={toggleErrorModal}
      />
    </PageLayout>
  );
};
