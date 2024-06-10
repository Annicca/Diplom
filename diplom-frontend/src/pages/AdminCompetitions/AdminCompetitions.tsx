import { FC, useMemo, useState } from "react";
import { withConditional } from "src/hoc/withConditionalRender";
import { TCompetition, TCompetitionUpdate } from "src/types/TCompetition";
import { moderationCompetition } from "src/utils/api";
import { queryClient } from "src/utils/queryClient";
import { PaginationList } from "src/components/list/PaginationList";
import { useLoaderData } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { adminCompetitionsLoader as loader } from "./loader";
import { adminCompetitionsQuery as query } from "./adminCompetitionsQuery";
import { moderationCompetitionsQuery as moderationQuery } from "./adminCompetitionsQuery";
import { TPage } from "src/types/TPage";
import { AxiosError } from "axios";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { CustomSelect } from "src/uikit/dropDown/Select";
import { MyCompetition } from "src/uikit/myCompetition/MyCompetition";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";
import { SingleValue } from "react-windowed-select";
import { ErrorModal } from "src/components/errorModal/ErrorModal";
import style from "../../components/list/List.module.scss";
import { CompetitionUpdateItem } from "src/uikit/competitionUpdateItem/CompetitionUpdateItem";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";

const PaginationListConditional = withConditional(PaginationList<TCompetition>);

const PaginationListUpdateConditional = withConditional(
  PaginationList<TCompetitionUpdate>
);

export const AdminCompetitions: FC = () => {
  const [mode, setMode] = useState<"moderations" | null>("moderations");
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  useCheckRole([ERole.ADMIN]);

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const moderationdata = useInfiniteQuery<
    TPage<TCompetitionUpdate[]>,
    AxiosError
  >({
    ...moderationQuery(),
    initialData: initialData,
  });

  const competitionsdata = useInfiniteQuery<TPage<TCompetition[]>, AxiosError>({
    ...query(),
  });

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
        label: "Все конкурсы",
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

  const moderation = async (status: string, idCompetitionUpdate: number) => {
    await moderationCompetition(status, idCompetitionUpdate)
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["moderation/competition"] });
        queryClient.refetchQueries({ queryKey: ["competitions/all"] });
      })
      .catch((error) => {
        handleError(error.message);
        toggleErrorModal();
      });
  };

  return (
    <PageLayout>
      <MainTite>Конкурсы</MainTite>
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
          renderItem={(item: TCompetitionUpdate) => (
            <CompetitionUpdateItem
              key={item.id}
              onModeration={moderation}
              competitionUpdate={item}
            />
          )}
        />
      ) : (
        <PaginationListConditional
          isLoading={competitionsdata.isLoading || competitionsdata.isFetching}
          isError={competitionsdata.isError}
          error={competitionsdata.error}
          loadingElement={
            <Loading
              type={ETypeLoding.SKELETON}
              skeletonClassName={"skeleton-competition"}
              classNameList={style.list_statements}
            />
          }
          classNameList={style.list}
          classNameInnerList={style.list_statements}
          infiniteData={competitionsdata}
          renderItem={(item: TCompetition) => (
            <MyCompetition key={item.idCompetition} competition={item} />
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
