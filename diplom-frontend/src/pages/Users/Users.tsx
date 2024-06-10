import { FC, useEffect, useState } from "react";
import { useCheckRole } from "src/hooks/useCheckRole";
import { ERole } from "src/types/ERole";
import { useSearchContext } from "src/context/search-context/useSearchContext";
import { useLoaderData } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "src/utils/queryClient";
import { usersQuery as query } from "./usersQuery";
import { usersLoader as loader } from "./loader";
import { TPage } from "src/types/TPage";
import { AxiosError } from "axios";
import { TUser } from "src/types/TUser";
import { IS_MOBILE } from "src/Constants";
import { withConditional } from "src/hoc/withConditionalRender";
import { Loading } from "src/components/loading/Loading";
import { ETypeLoding } from "src/types/ETypeLoading";
import { PageLayout } from "src/components/layout/PageLayout";
import { PaginationList } from "src/components/list/PaginationList";
import { MainTite } from "src/components/mainTitle/MainTitle";
import { UserInfo } from "src/components/userInfo/UserInfo";
import { Search } from "src/uikit/search/Search";

import style from "../../components/list/List.module.scss";
import pageStyle from "./Users.module.scss";

const PaginationListConditional = withConditional(PaginationList<TUser>);

export const Users: FC = () => {
  useCheckRole([ERole.ADMIN]);
  const { value: serachValue } = useSearchContext();
  const [login, setLogin] = useState("");
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const infinitedata = useInfiniteQuery<TPage<TUser[]>, AxiosError>({
    ...query(login),
    initialData: initialData,
  });

  const handleLogin = (login: string) => {
    setLogin(login);
  };

  useEffect(() => {
    queryClient.invalidateQueries(["users"]);
  }, [login]);

  useEffect(() => {
    if (IS_MOBILE) {
      handleLogin(serachValue);
    }
  }, [serachValue]);

  return (
    <PageLayout>
      <MainTite>Пользователи</MainTite>
      {!IS_MOBILE && (
        <Search
          handleSearch={handleLogin}
          placeholder="Введите номер заявки"
          classNameContainer={pageStyle.search}
        />
      )}
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
        renderItem={(item: TUser) => (
          <UserInfo
            key={item.idUser + item.role}
            user={item}
            classNameContainer={pageStyle.user}
          />
        )}
      />
    </PageLayout>
  );
};
