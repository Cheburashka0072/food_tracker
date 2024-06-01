import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, ProfileContext } from "../context";
import { useNavigate } from "react-router-dom";
import cat1 from "../img/profile/cat1.jpg";
import cat2 from "../img/profile/cat2.jpg";
import cat3 from "../img/profile/cat3.jpg";
import cat4 from "../img/profile/cat4.jpg";
import cat5 from "../img/profile/cat5.jpg";
import cat6 from "../img/profile/cat6.jpg";
import cat7 from "../img/profile/cat7.jpg";
import cat8 from "../img/profile/cat8.jpg";
import cat9 from "../img/profile/cat9.jpg";
import cat10 from "../img/profile/cat10.jpg";
import MyButton from "../components/UI/button/MyButton";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import toast, { Toaster } from "react-hot-toast";
import { CreateProfile } from "../components/profile/CreateProfile";
import DishesModal from "../components/UI/DishesModal/DishesModal";
import { EditProfile } from "../components/profile/EditProfile";

const Profile = () => {
    const { isAuth, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();
    const cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];
    const [form, setForm] = useState({
        name: "",
        gender: "male",
        height: "",
        weight: "",
        age: "",
        activity: "1.2",
    });
    const [profile, setProfile] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [pfp, setPfp] = useState(0);
    const [ready, setReady] = useState(false);

    const getRandomCat = (max) => {
        return cats[Math.floor(Math.random() * max)];
    };

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

    const editProfile = async () => {
        let BMR = 10 * form.weight + 6.25 * form.height - 5 * form.age;
        form.gender === "male" ? (BMR += 5) : (BMR -= 161);
        BMR *= form.activity;
        try {
            await request(
                "/api/profile/edit",
                "PUT",
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
            message("Профіль успішно відредаговано", toast.success);
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
            setForm({
                name: response[0].name,
                gender: response[0].gender,
                height: response[0].height,
                weight: response[0].weight,
                age: response[0].age,
                activity: response[0].activity,
            });
        } catch (e) {}
    }, []);

    useEffect(() => {
        loadProfile();
        setPfp(getRandomCat(10));
        setReady(true);
    }, [loadProfile]);
    useEffect(() => {
        clearError();
    }, [clearError]);

    if (loading) return <h1>loading</h1>;
    if (error) return <h1>{error}</h1>;
    if (!ready) return <h1>Loading profile...</h1>;
    else
        return (
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
                                    src={pfp}
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
                        <MyButton
                            style={{ fontSize: "18px" }}
                            onClick={() =>
                                setEditProfileModal(!editProfileModal)
                            }
                        >
                            Редагувати профіль
                        </MyButton>
                        <DishesModal
                            visible={editProfileModal}
                            setVisible={setEditProfileModal}
                        >
                            <EditProfile
                                profile={profile}
                                form={form}
                                changeHandler={changeHandler}
                                editProfile={editProfile}
                            />
                        </DishesModal>
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
