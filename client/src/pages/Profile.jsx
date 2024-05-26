import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, ProfileContext } from "../context";
import { useNavigate } from "react-router-dom";
import cat from "../img/profile/cat1.jpg";
import MyButton from "../components/UI/button/MyButton";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import toast, { Toaster } from "react-hot-toast";
import { CreateProfile } from "../components/profile/CreateProfile";

const Profile = () => {
    const { isAuth, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { loading, request } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        name: "",
        gender: "male",
        height: "",
        weight: "",
        age: "",
        activity: "1.2",
    });
    const [profile, setProfile] = useState(false);

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const confirmProfile = async () => {
        let BMR = 10 * form.weight + 6.25 * form.height - 5 * form.age;
        form.gender === "male" ? (BMR += 5) : (BMR -= 161);
        BMR *= form.activity;
        try {
            await request(
                "/api/profile/create",
                "POST",
                {
                    name: form.name,
                    gender: form.gender,
                    height: Number(form.height),
                    weight: Number(form.weight),
                    age: Number(form.age),
                    activity: Number(form.activity),
                    BMR: BMR,
                },
                { Authorization: `Bearer: ${token}` }
            );
            message("Профіль успішно створений", toast.success);
            navigate("/");
        } catch (error) {}
    };

    const loadProfile = useCallback(async () => {
        try {
            const response = await request(
                "/api/profile/",
                "GET",
                {},
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            setProfile(...response);
        } catch (e) {}
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return loading ? (
        <h1>loading</h1>
    ) : (
        <>
            {!profile ? (
                <CreateProfile
                    changeHandler={changeHandler}
                    confirmProfile={confirmProfile}
                />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div style={{ width: "700px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: "32px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <p style={{ marginBottom: "10px" }}>
                                    {"Ім'я: "}
                                    <span style={{ fontWeight: "bold" }}>
                                        {profile.name}
                                    </span>
                                </p>
                                <p
                                    style={{
                                        fontSize: "24px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Норма калорій:{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                        {profile.BMR.toFixed(0)}
                                    </span>
                                </p>
                            </div>
                            <img
                                style={{
                                    width: "250px",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                                src={cat}
                                alt="pfp"
                            />
                        </div>
                        <p
                            style={{
                                fontSize: "24px",
                                marginBottom: "10px",
                            }}
                        >
                            Вік: {profile.age}
                        </p>
                        <p
                            style={{
                                fontSize: "24px",
                                marginBottom: "10px",
                            }}
                        >
                            Зріст: {profile.height}
                        </p>
                        <p
                            style={{
                                fontSize: "24px",
                                marginBottom: "10px",
                            }}
                        >
                            Вага: {profile.weight}
                        </p>
                    </div>
                    <MyButton style={{ fontSize: "18px" }} onClick={logout}>
                        Вийти з облікового запису
                    </MyButton>
                </div>
            )}
            <Toaster richColors />
        </>
    );
};
export default Profile;
