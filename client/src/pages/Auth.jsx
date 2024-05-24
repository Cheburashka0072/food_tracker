import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const responseData = await request("/api/auth/register", "POST", {
                ...form,
            });
            message(responseData.message, toast.success);
        } catch (error) {}
    };

    const loginHandler = async () => {
        try {
            const responseData = await request("/api/auth/login", "POST", {
                ...form,
            });
            auth.login(responseData.token, responseData.userId);
            message(responseData.message, toast.success);
            navigate("/profile");
        } catch (error) {}
    };

    useEffect(() => {
        message(error, toast.error);
        clearError();
    }, [error, message, clearError]);
    return (
        <div>
            <div>
                <input
                    placeholder="Введіть email"
                    id="email"
                    type="text"
                    name="email"
                    onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input
                    placeholder="Введіть пароль"
                    id="password"
                    type="password"
                    name="password"
                    onChange={changeHandler}
                />
                <label htmlFor="password" disabled={loading}>
                    Пароль
                </label>
            </div>
            <div>
                <button onClick={loginHandler} disabled={loading}>
                    Увійти
                </button>
                <button onClick={registerHandler} disabled={loading}>
                    Реєстрація
                </button>
                <Toaster richColors />
            </div>
        </div>
    );
};

export default Auth;
