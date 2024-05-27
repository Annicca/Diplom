import { FC } from "react";
import { myStatementsLoader as loader } from "./loader";
import { statementsQuery as query } from "./statementsQuery";
import { useLoaderData, useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { TStatement } from "src/types/TStatement";
import { AxiosError } from "axios";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { Statement } from "src/uikit/statement/Statement";

import style from "../../components/list/List.module.scss";

export const MyStatements: FC = () => {
  const { idUser } = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TStatement[]>, AxiosError>({
    ...query(idUser),
    initialData: initialData,
  });
  return (
    <PageLayout>
      <MainTite>Мои заявки</MainTite>
      <PaginationList
        classNameList={style.list}
        classNameInnerList={style.list_statements}
        skeletonClassName="skeleton-competition"
        infiniteData={infinitedata}
        renderItem={(item: TStatement) => (
          <Statement key={item.idStatement} statement={item} />
        )}
      />
    </PageLayout>
  );
};
