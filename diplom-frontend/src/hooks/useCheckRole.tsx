import { useEffect } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";

export const useCheckRole = (acceptedRole: ERole[], idUser?: number) => {
  const { user } = useUserContext();
  console.log(user);
  useEffect(() => {
    if (user && !acceptedRole.includes(user?.role)) {
      console.log(2);
      throw new Response("Not Found", { status: 404 });
    }
    if (idUser && user?.idUser !== idUser) {
      console.log(3);
      throw new Response("Not Found", { status: 404 });
    }
  }, [acceptedRole, idUser, user, user?.role]);
};
