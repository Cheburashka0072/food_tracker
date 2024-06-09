import { createContext } from "react";
function noop() {}

export const ProfileContext = createContext(null);

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuth: false,
});
