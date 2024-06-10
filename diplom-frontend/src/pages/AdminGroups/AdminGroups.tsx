import { FC, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { adminLoader as loader } from "./loader";
import {
  adminGroupsQuery as query,
  moderationGroupsQuery as moderationQuery,
} from "./adminGroupsQuery";
import { queryClient } from "src/utils/queryClient";
import { TGroup, TGroupUpdate } from "src/types/TGroup";
import { TPage } from "src/types/TPage";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { PaginationList } from "src/components/list/PaginationList";
import { MyGroup } from "src/uikit/myGroup/MyGroup";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import { ETypeLoding } from "src/types/ETypeLoading";
import { CustomSelect } from "src/uikit/dropDown/Select";
import { SingleValue } from "react-windowed-select";
import { GroupUpdateItem } from "src/uikit/groupUpdate/GroupUpdateItem";
import { moderationGroup } from "src/utils/api";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";

import style from "../../components/list/List.module.scss";

const PaginationListConditional = withConditional(PaginationList<TGroup>);

const PaginationListUpdateConditional = withConditional(
  PaginationList<TGroupUpdate>
);

export const AdminGroups: FC = () => {
  const [mode, setMode] = useState<"moderations" | null>("moderations");

  useCheckRole([ERole.ADMIN]);

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const moderationdata = useInfiniteQuery<TPage<TGroupUpdate[]>, AxiosError>({
    ...moderationQuery(),
    initialData: initialData,
  });

  const groupsdata = useInfiniteQuery<TPage<TGroup[]>, AxiosError>({
    ...query(),
  });

  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleError = (message: string | string[] | null) => {
    if (Array.isArray(message)) {
      setErrorMessage(message.join(","));
    } else {
      setErrorMessage(message);
    }
  };

  const modeOptions: {
    label: string;
    value: "moderations" | null;
  }[] = useMemo(() => {
    return [
      {
        label: "На модерации",
        value: "moderations",
      },
      {
        label: "Все коллективы",
        value: null,
      },
    ];
  }, []);

  const toggleMode = (
    event: SingleValue<{
      label: string;
      value: "moderations" | null;
    }>
  ) => {
    event && setMode(event.value);
  };

  const toggleErrorModal = () => {
    handleError(null);
    setOpenErrorModal(!isOpenErrorModal);
  };

  const moderation = async (status: string, idGroupUpdate: number) => {
    await moderationGroup(status, idGroupUpdate)
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["moderation/group"] });
        queryClient.refetchQueries({ queryKey: ["groups/all"] });
      })
      .catch((error) => {
        handleError(error.message);
        toggleErrorModal();
      });
  };

  return (
    <PageLayout>
      <MainTite>Коллективы</MainTite>
      <CustomSelect
        options={modeOptions}
        defaultValue={modeOptions[0]}
        onChange={toggleMode}
      />
      {mode === "moderations" ? (
        <PaginationListUpdateConditional
          isLoading={moderationdata.isLoading || moderationdata.isFetching}
          isError={moderationdata.isError}
          error={moderationdata.error}
          loadingElement={
            <Loading
              type={ETypeLoding.SKELETON}
              skeletonClassName={"skeleton-competition"}
              classNameList={style.list_statements}
            />
          }
          classNameList={style.list}
          classNameInnerList={style.list_statements}
          infiniteData={moderationdata}
          renderItem={(item: TGroupUpdate) => (
            <GroupUpdateItem
              key={item.id}
              groupUpdate={item}
              onModeration={moderation}
            />
          )}
        />
      ) : (
        <PaginationListConditional
          isLoading={groupsdata.isLoading || groupsdata.isFetching}
          isError={groupsdata.isError}
          error={groupsdata.error}
          loadingElement={
            <Loading
              type={ETypeLoding.SKELETON}
              skeletonClassName={"skeleton-competition"}
              classNameList={style.list_statements}
            />
          }
          classNameList={style.list}
          classNameInnerList={style.list_statements}
          infiniteData={groupsdata}
          renderItem={(item: TGroup) => (
            <MyGroup key={item.idGroup} group={item} />
          )}
        />
      )}

      <ErrorModal
        isOpen={isOpenErrorModal}
        text={errorMessage}
        toggleModal={toggleErrorModal}
      />
    </PageLayout>
  );
};
