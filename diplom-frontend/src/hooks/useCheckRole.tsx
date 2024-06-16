import { useEffect } from "react";
import { useUserContext } from "src/context/user-context/useUserContext";
import { ERole } from "src/types/ERole";

export const useCheckRole = (acceptedRole: ERole[], idUser?: number | null) => {
  const { user } = useUserContext();
  useEffect(() => {
    if (user && !acceptedRole.includes(user?.role)) {
      throw new Response("Not Found", { status: 404 });
    }
    if (idUser && user?.idUser !== idUser) {
      throw new Response("Not Found", { status: 404 });
    }
  }, [acceptedRole, idUser, user, user?.role]);
};
