import { FC } from "react";
import { AxiosError } from "axios";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { participantsLoader as loader } from "./loader";
import { participantsQuery as query } from "./participantsQuery";
import { TPage } from "src/types/TPage";
import { TParticipant } from "src/types/TParticipant";
import { PageLayout } from "src/components/layout/PageLayout";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PaginationList } from "src/components/list/PaginationList";
import { Participant } from "src/uikit/particioant/Participant";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";

import style from "../../components/list/List.module.scss";

const PaginationListConditional = withConditional(PaginationList<TParticipant>);

export const CompetitiosParticipant: FC = () => {
  const { id } = useParams();
  useCheckRole([ERole.ORGANIZER]);
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TParticipant[]>, AxiosError>({
    ...query(id),
    initialData: initialData,
  });

  return (
    <PageLayout>
      <MainTite>Участники</MainTite>
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
        renderItem={(item: TParticipant) => (
          <Participant participant={item} key={item.id} />
        )}
      />
    </PageLayout>
  );
};
