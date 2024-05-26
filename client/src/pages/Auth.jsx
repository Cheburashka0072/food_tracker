import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import MyButton from "../components/UI/button/MyButton";

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
            setForm({
                email: "",
                password: "",
            });
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
        setForm({
            email: "",
            password: "",
        });
    };

    useEffect(() => {
        message(error, toast.error);
        clearError();
    }, [error, message, clearError]);
    return (
        <div className="auth">
            <div className="auth__form">
                <h1 className="auth__header">Авторизація</h1>
                <div className="auth__field">
                    <label htmlFor="email">Email</label>
                    <input
                        value={form.email}
                        placeholder="Введіть email"
                        id="email"
                        type="text"
                        name="email"
                        onChange={changeHandler}
                    />
                </div>
                <div className="auth__field">
                    <label htmlFor="password" disabled={loading}>
                        Пароль
                    </label>
                    <input
                        value={form.password}
                        placeholder="Введіть пароль"
                        id="password"
                        type="password"
                        name="password"
                        onChange={changeHandler}
                    />
                </div>
                <div className="auth__buttons">
                    <MyButton onClick={loginHandler} disabled={loading}>
                        Увійти
                    </MyButton>
                    <MyButton onClick={registerHandler} disabled={loading}>
                        Реєстрація
                    </MyButton>
                    <Toaster richColors />
                </div>
            </div>
        </div>
    );
};

export default Auth;
