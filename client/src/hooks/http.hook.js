import { useState, useCallback } from "react";
import axios from "../axios";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            setError(null);

            try {
                if (body) {
                    headers["Content-Type"] = "application/json";
                }

                const response = await axios({
                    method,
                    url,
                    data: body,
                    headers,
                });

                const data = response.data;

                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                const errorMessage =
                    e.response?.data?.message || "Something went wrong";
                setError(errorMessage);
                if (e.response?.status === 401) {
                    localStorage.removeItem("userData");
                }
                throw e;
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
