import { TUser } from "src/types/TUser";
import { fetchData, getFileConfig, getRequestConfig, instance } from "./fetch";
import { setCookie } from "react-use-cookie";
import { ETypeUser } from "src/types/ETypeUser";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { TCIty } from "src/types/TCity";
import { TStatement } from "src/types/TStatement";
import { IStatementParticipantRequest } from "src/types/TStatementParicipant";
import { competitionDetailQuery } from "src/pages/CompetitionDetail/competitionDetailQuery";
import { AxiosError } from "axios";
import { TCompetition } from "src/types/TCompetition";
import { TGroup } from "src/types/TGroup";
import { useParams } from "react-router-dom";
import { useUserContext } from "src/context/user-context/useUserContext";
import { TAct } from "src/types/TAct";
import { TPage } from "src/types/TPage";
import { TInvitation } from "src/types/TInvitation";
import { TParticipant } from "src/types/TParticipant";

export interface ILoginRequest {
  login: string;
  password: string;
}

/**
 * Авторизация пользователя
 * @param loginData - должно содержать логин и пароль
 * @returns пользователя
 */
export const login = async (loginData: ILoginRequest): Promise<TUser> => {
  return instance
    .post("login", loginData)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setCookie("jwt", response.data.token, {
        path: "/",
      });
      return response.data.user;
    })
    .catch((error) => {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    });
};

export interface IRegisterRequest {
  typeUser: ETypeUser;
  organizationName?: string;
  surnameUser: string;
  nameUser: string;
  patronimycUser?: string;
  loginUser: string;
  mailUser: string;
  phoneUser?: string;
  passwordUser: string;
  confirmPassword?: string;
  bikBank?: string;
  inn?: string;
  kpp?: string;
  legalAddress?: string;
  settlementAccount?: string;
  withNds?: boolean;
}

/**
 * Регистрация пользователя
 * @param registerData - данные пользователя
 * @returns пользователя
 */

export const registerUser = async (
  registerData: IRegisterRequest
): Promise<TUser> => {
  delete registerData.confirmPassword;
  return instance
    .post("register", registerData)
    .then((response) => {
      setCookie("jwt", response.data.token, { path: "/" });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Выход из аккаунта
 */
export const logout = () => {
  localStorage.removeItem("user");
  setCookie("jwt", "", { path: "/" });
};

/**
 * Редактирование коллектива
 */

export const editGroup = async (groupData: FormData) => {
  return instance.put("groups", groupData, getFileConfig()).catch((error) => {
    if (error.response) throw new Error(error.response.data.message);
    else throw new Error(error.message);
  });
};

/**
 * Редактирование конкурса
 * @param competitionData - данные для редактирования
 * @returns
 */
export const editCompetition = async (competitionData: FormData) => {
  return instance
    .put("competitions", competitionData, getFileConfig())
    .catch((error) => {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    });
};

/**
 * Удаление коллектива
 * @param idGroup - идентификатор группы
 * @returns ничего
 */

export const deleteGroup = async (idGroup: number) => {
  return instance
    .delete(`groups/${idGroup}`, getRequestConfig())
    .catch((error) => {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    });
};

/**
 * Отмена конкурса
 * @param idCompetition - идентификатор конкурса
 * @returns ничего
 */

export const cancelCompetition = async (idCompetition: number) => {
  return instance
    .put(`competitions/cancel/${idCompetition}`, {}, getRequestConfig())
    .catch((error) => {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    });
};

/**
 * Изменить статус заявки на размещение
 * @param idStatement - идентификатор заявки
 * @param status - статус заявки
 * @returns ничего
 */

export const changeStatementStatus = async (
  idStatement: number,
  status: string
) => {
  return instance
    .put(`statements/${status}/${idStatement}`, {}, getRequestConfig())
    .catch((error) => {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error(error.message);
    });
};

/**
 * Смена роли пользователя
 * @param user измененный пользователь
 */

export const changeRoleUser = async (user: TUser) => {
  return instance.put("users", user, getRequestConfig()).catch((error) => {
    if (error.response) throw new Error(error.response.data.message);
    else throw new Error(error.message);
  });
};

/**
 * Получить города
 */

export const getCities = async (): Promise<TCIty[]> =>
  fetchData("cities", {}, getRequestConfig());

export const useCities = () => useQuery(["cities"], getCities);

/**
 * Подать заявку на размещение
 * @param statement - данные заявки на размещение коллектива или конкурса
 */
export const sendStatement = async (
  statement: FormData,
  idUser: number
): Promise<TStatement> => {
  return instance
    .post(`statements/${idUser}`, statement, getFileConfig())
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Получить пользователя
 * @param id - идентификатор пользователя
 */
export const getUser = async (id: number): Promise<TUser> =>
  fetchData(`users/${id}`, {}, getRequestConfig());

/**
 * Хук для получения коллективов пользователя
 */
export const useUserGroupList = () => {
  const { user } = useUserContext();
  return useQuery<TGroup[], AxiosError>(["mygroups/list", user?.idUser], () =>
    fetchData(`mygroups/list/${user?.idUser}`, {}, getRequestConfig())
  );
};

/**
 * Хук для получения конкурсов пользователя
 */
export const useUserCompetitionList = () => {
  const { user } = useUserContext();
  return useInfiniteQuery<TPage<TCompetition[]>, AxiosError>(
    ["mycompetitions/started", user?.idUser],
    () =>
      fetchData(
        `mycompetitions/started/${user?.idUser}`,
        {},
        getRequestConfig()
      )
  );
};

/**
 * Хук для получения конкурса
 */
export const useCompetition = () => {
  const { id } = useParams();
  return useQuery<TCompetition, AxiosError>({ ...competitionDetailQuery(id) });
};

/**
 * Подать заявку на участие
 * @param statement - данные заявки на участие
 */
export const takePart = async (statement: IStatementParticipantRequest) => {
  return instance
    .post("statementsparticipant", statement, getRequestConfig())
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Изменить статус заявки на участие
 * @param status - статус заявки
 * @param id - id заявки
 */
export const changeStatusStatementParticipant = async (
  status: string,
  id: number
) => {
  return instance
    .put(`statementsparticipant/${status}/${id}`, {}, getRequestConfig())
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Отметить оплату заявки
 * @param id - номер заявки
 */

export const checkPayment = async (id: number) => {
  return instance
    .put(`statementsparticipant/payment/${id}`, {}, getRequestConfig())
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Функция изменения номера
 * @param act - номер
 * @returns измененный номер или ошибка
 */

export const changeAct = async (act: TAct) => {
  return instance.put("perfomance", act, getRequestConfig()).catch((error) => {
    if (error.response) {
      if (error.response.data.errors)
        throw new Error(error.response.data.errors);
      throw new Error(error.response.data.message);
    } else throw new Error(error.message);
  });
};

/**
 * Функция создания приглашения
 * @param invitation - приглашение
 * @returns созданное пришлашение или ошибка
 */

export const addInvitation = async (invitation: TInvitation) => {
  return instance
    .post("invitations", invitation, getRequestConfig())
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Изменить статус приглашения
 * @param status - статус приглашения
 * @param id - id приглашения
 */
export const changeStatusInvitation = async (status: string, id: number) => {
  return instance
    .put(`invitations/${status}/${id}`, {}, getRequestConfig())
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Получить участника
 * @param idCompetition - id конкурса
 * @param idGroup - id коллектива
 */
const getParticipant = async (idCompetition: number, idGroup?: number) => {
  if (!idGroup) throw new Error("Произошла ошибка");
  return instance
    .get(`participant/${idCompetition}/${idGroup}`, getRequestConfig())
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Хук для получения участника
 * @param idCompetition - id конкурса
 * @param idGroup - id коллектива
 */
export const useParticipant = (idCompetition: number, idGroup?: number) =>
  useQuery<TParticipant, AxiosError>({
    queryKey: ["participant", idCompetition, idGroup],
    queryFn: () => getParticipant(idCompetition, idGroup),
  });

/**
 * Изменить статус запроса на изменения коллектива
 * @param status - статус
 * @param idGroupUpdate - id запроса на изменение
 */
export const moderationGroup = async (
  status: string,
  idGroupUpdate: number
) => {
  return instance
    .put(`/groups/moderations/${status}/${idGroupUpdate}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};

/**
 * Изменить статус запроса на изменения конкурса
 * @param status - статус
 * @param idCompetitionUpdate - id запроса на изменение
 */
export const moderationCompetition = async (
  status: string,
  idCompetitionUpdate: number
) => {
  return instance
    .put(
      `/competitions/moderations/${status}/${idCompetitionUpdate}`,
      {},
      getRequestConfig()
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.errors)
          throw new Error(error.response.data.errors);
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    });
};
