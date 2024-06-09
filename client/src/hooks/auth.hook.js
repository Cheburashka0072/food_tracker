import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);
    const location = useLocation();

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId);
        } else {
            logout();
        }
        setReady(true);
    }, [login, logout, location]);
    return { login, logout, token, userId, ready };
};
