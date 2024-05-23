import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

const Auth = () => {
    const { loading, error, request } = useHttp();
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
            console.log("Response Data:", responseData);
        } catch (error) {}
    };

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
                <button>Увійти</button>
                <button onClick={registerHandler} disabled={loading}>
                    Реєстрація
                </button>
            </div>
        </div>
    );
};

export default Auth;
