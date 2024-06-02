import { useState, useCallback } from "react";
import axios from "../axios";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            try {
                if (body) {
                    headers["Content-Type"] = "application/json";
                }

                const response = await axios({
                    method,
                    url,
                    data: body,
                    headers,
                }).catch((e) => {
                    if (e.response.status === 401)
                        localStorage.removeItem("userData");
                });

                const data = response.data;
                if (!response.status.toString().startsWith("2")) {
                    throw new Error(data.message || "Something went wrong");
                }

                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                setError(e.response.data.message);
                throw e;
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
