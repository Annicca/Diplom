import { createContext } from "react";
import { TUserContext } from "src/types/TUserContext";

export const UserContext = createContext<TUserContext>({
    user: null,
    changeUser: () => {}
})