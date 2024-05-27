import { AxiosError } from "axios";
import { FC } from "react";
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

import style from "../../components/list/List.module.scss";

export const CompetitiosParticipant: FC = () => {
  const { id } = useParams();
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
      <PaginationList
        classNameList={style.list}
        classNameInnerList={style.list_statements}
        skeletonClassName="skeleton-competition"
        infiniteData={infinitedata}
        renderItem={(item: TParticipant) => (
          <Participant participant={item} key={item.id} />
        )}
      />
    </PageLayout>
  );
};
