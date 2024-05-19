import React, { useContext, useState } from "react";
import { ProfileContext } from "../context";

const Profile = () => {
    const { profile, setProfile } = useContext(ProfileContext);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [activity, setActivity] = useState(1);
    const confirmProfile = () => {
        let BMR = 10 * weight + 6.25 * height - 5 * age;
        gender === "male" ? (BMR += 5) : (BMR -= 161);
        BMR *= activity;
        setProfile({
            name: name,
            gender: gender,
            height: height,
            weight: weight,
            age: age,
            activity: activity,
            BMR: BMR,
        });
        localStorage.setItem(
            "profile",
            JSON.stringify({
                name: name,
                gender: gender,
                height: height,
                weight: weight,
                age: age,
                activity: activity,
                BMR: BMR,
            })
        );
    };
    console.log(profile);
    return (
        <div
            style={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
            ім'я
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                type="text"
            />
            пол
            <select onChange={(e) => setGender(e.target.value)}>
                <option value="male">чоловік</option>
                <option value="female">жінка</option>
            </select>
            зріст
            <input
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                type="number"
            />
            вага
            <input
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                type="number"
            />
            вік
            <input
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                style={{ border: "1px solid #d9d9d9", margin: "10px" }}
                type="number"
            />
            активність
            <select onChange={(e) => setActivity(Number(e.target.value))}>
                <option value={1.2}>Невелика</option>
                <option value={1.375}>Помірна</option>
                <option value={1.55}>Висока</option>
                <option value={1.725}>Дуже висока</option>
            </select>
            <button onClick={() => confirmProfile()}>ENTER</button>
        </div>
    );
};
export default Profile;
