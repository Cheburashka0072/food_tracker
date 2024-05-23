import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/index";
import { ProfileContext } from "../context";

const AppRouter = () => {
    const { profile } = useContext(ProfileContext);

    return profile ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
            <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    );
};

export default AppRouter;
