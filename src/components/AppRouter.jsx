import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/index";
import { ProfileContext } from "../context";

const AppRouter = () => {
    const { profile } = useContext(ProfileContext);

    return (
        <Routes>
            {profile
                ? privateRoutes.map((route) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                      />
                  ))
                : publicRoutes.map((route) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                      />
                  ))}
            <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
    );
};

export default AppRouter;
