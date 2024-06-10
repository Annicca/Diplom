import { FC } from "react";
import StatementIcon from "assets/icons/statement1.svg?react";
import GroupIcon from "assets/icons/scene.svg?react";
import CompetitionIcon from "assets/icons/competitions.svg?react";
import LkIcon from "assets/icons/lk.svg?react";
import { NeedAuth } from "src/uikit/needAuth/NeedAuth";
import { PageLayout } from "src/components/layout/PageLayout";
import { ERole } from "src/types/ERole";
import { UserInfo } from "src/components/userInfo/UserInfo";
import { useUserContext } from "src/context/user-context/useUserContext";
import { Link } from "react-router-dom";
import { TextIcon } from "src/components/textIcon/TextIcon";

import style from "./Account.module.scss";

export const Account: FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return <NeedAuth />;
  }
  return (
    <PageLayout>
      <div className={style.account}>
        <UserInfo user={user} isAccount />
        <div className={style.account__inner}>
          {user?.role === ERole.CLIENT && (
            <Link to={`/mystatements/${user.idUser}`}>
              <TextIcon
                classNameContainer={style.account__item}
                isTransition={true}
                icon={<StatementIcon width={25} height={25} />}
                text="Заявки"
              />
            </Link>
          )}
          {user?.role === ERole.ADMIN && (
            <>
              <Link to={`/admin/users`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition={true}
                  isBorder={true}
                  icon={<LkIcon fill={"#000"} width={25} height={25} />}
                  text="Пользователи"
                />
              </Link>
              <Link to={`/admin/statements`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition
                  isBorder
                  icon={<StatementIcon width={25} height={25} />}
                  text="Заявки"
                />
              </Link>
              <Link to={`/admin/competitions`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition
                  isBorder
                  icon={<CompetitionIcon width={25} height={25} />}
                  text="Конкурсы"
                />
              </Link>
              <Link to={`/admin/groups`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition
                  icon={<GroupIcon width={25} height={25} />}
                  text="Коллективы"
                />
              </Link>
            </>
          )}
          {user?.role === ERole.ORGANIZER && (
            <>
              <Link to={`/mystatements/${user.idUser}`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition={true}
                  isBorder={true}
                  icon={<StatementIcon width={25} height={25} />}
                  text="Заявки"
                />
              </Link>
              <Link to={`/mycompetitions/${user.idUser}`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition={true}
                  icon={<CompetitionIcon width={25} height={25} />}
                  text="Конкурсы"
                />
              </Link>
            </>
          )}
          {user?.role === ERole.DIRECTOR && (
            <>
              <Link to={`/mystatements/${user.idUser}`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition={true}
                  isBorder={true}
                  icon={<StatementIcon width={25} height={25} />}
                  text="Заявки"
                />
              </Link>
              {/* <Link to={`/mystatements-participant/${user.idUser}`} >
                                <TextIcon 
                                    classNameContainer={style.account__item}  
                                    isTransition = {true} 
                                    isBorder = {true} 
                                    icon = {<StatementParticipantIcon width={25} height={25}/>} 
                                    text='Заявки на участие' />
                            </Link> */}
              <Link to={`/mygroups/${user.idUser}`}>
                <TextIcon
                  classNameContainer={style.account__item}
                  isTransition={true}
                  icon={<GroupIcon width={25} height={25} />}
                  text="Коллективы"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
