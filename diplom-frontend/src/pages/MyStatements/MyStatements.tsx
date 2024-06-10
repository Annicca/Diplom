import { FC } from "react";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";
import { myStatementsLoader as loader } from "./loader";
import { statementsQuery as query } from "./statementsQuery";
import { useLoaderData, useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TPage } from "src/types/TPage";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";
import { TStatement } from "src/types/TStatement";
import { AxiosError } from "axios";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { Statement } from "src/uikit/statement/Statement";

import style from "../../components/list/List.module.scss";

const PaginationListConditional = withConditional(PaginationList<TStatement>);

export const MyStatements: FC = () => {
  const { idUser } = useParams();
  useCheckRole([ERole.ORGANIZER, ERole.CLIENT, ERole.DIRECTOR], Number(idUser));
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
        renderItem={(item: TStatement) => (
          <Statement key={item.idStatement} statement={item} />
        )}
      />
    </PageLayout>
  );
};
