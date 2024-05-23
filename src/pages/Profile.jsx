import React, { useContext, useState } from "react";
import { ProfileContext } from "../context";
import { useNavigate } from "react-router-dom";
import cat from "../img/profile/cat1.jpg";
import MyButton from "../components/UI/button/MyButton";

const Profile = () => {
    const { profile, setProfile } = useContext(ProfileContext);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [activity, setActivity] = useState(1.2);
    const navigate = useNavigate();
    const confirmProfile = () => {
        let BMR = 10 * weight + 6.25 * height - 5 * age;
        gender === "male" ? (BMR += 5) : (BMR -= 161);
        BMR *= activity;
        setProfile({
            name: name,
            gender: gender,
            height: Number(height),
            weight: Number(weight),
            age: Number(age),
            activity: Number(activity),
            BMR: BMR,
        });
        localStorage.setItem(
            "profile",
            JSON.stringify({
                name: name,
                gender: gender,
                height: Number(height),
                weight: Number(weight),
                age: Number(age),
                activity: Number(activity),
                BMR: BMR,
            })
        );
        return navigate("/");
    };
    const deleteProfile = () => {
        localStorage.removeItem("profile");
        setProfile(false);
    };
    return !profile ? (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h2
                style={{
                    fontSize: "28px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                }}
            >
                Створення профілю
            </h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "500px",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    ім'я
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                        type="text"
                        placeholder=""
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    пол
                    <select onChange={(e) => setGender(e.target.value)}>
                        <option value="male">чоловік</option>
                        <option value="female">жінка</option>
                    </select>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    зріст
                    <input
                        value={height}
                        onChange={(e) =>
                            setHeight(e.target.value.replace(/\D/g, ""))
                        }
                        style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                        type="text"
                        placeholder="..."
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    вага
                    <input
                        value={weight}
                        onChange={(e) =>
                            setWeight(e.target.value.replace(/\D/g, ""))
                        }
                        style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                        type="text"
                        placeholder="..."
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    вік
                    <input
                        value={age}
                        onChange={(e) =>
                            setAge(e.target.value.replace(/\D/g, ""))
                        }
                        style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                        type="text"
                        placeholder="..."
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    активність
                    <select onChange={(e) => setActivity(e.target.value)}>
                        <option value={1.2}>Невелика</option>
                        <option value={1.375}>Помірна</option>
                        <option value={1.55}>Висока</option>
                        <option value={1.725}>Дуже висока</option>
                    </select>
                </div>
            </div>
            <MyButton onClick={() => confirmProfile()}>Створити</MyButton>
        </div>
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ marginBottom: "10px" }}>
                            {"Ім'я: "}
                            <span style={{ fontWeight: "bold" }}>
                                {profile.name}
                            </span>
                        </p>
                        <p style={{ fontSize: "24px", marginBottom: "10px" }}>
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
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Вік: {profile.age}
                </p>
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Зріст: {profile.height}
                </p>
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Вага: {profile.weight}
                </p>
            </div>
            <MyButton style={{ fontSize: "18px" }} onClick={deleteProfile}>
                Видалити профіль
            </MyButton>
        </div>
    );
};
export default Profile;