import React from "react";
import MyButton from "../UI/button/MyButton";
import "./createProfile.css";

export const CreateProfile = ({ changeHandler, confirmProfile }) => {
    return (
        <div className="createProfile">
            <div className="createProfile__form">
                <h2 className="createProfile__header">Створення профілю</h2>
                <div className="createProfile__field">
                    <label htmlFor="name">Ім'я</label>
                    <input
                        id="name"
                        name="name"
                        onChange={(e) => changeHandler(e)}
                        style={{
                            border: "1px solid #d9d9d9",
                            margin: "10px",
                        }}
                        type="text"
                        placeholder="Введіть ім'я"
                    />
                </div>
                <div className="createProfile__field">
                    <label htmlFor="gender">Пол</label>

                    <select
                        id="gender"
                        name="gender"
                        onChange={(e) => changeHandler(e)}
                    >
                        <option value="male">чоловік</option>
                        <option value="female">жінка</option>
                    </select>
                </div>
                <div className="createProfile__field">
                    <label htmlFor="height">Зріст</label>
                    <input
                        id="height"
                        name="height"
                        onChange={(e) => changeHandler(e)}
                        style={{
                            border: "1px solid #d9d9d9",
                            margin: "10px",
                        }}
                        type="text"
                        placeholder="Введіть зріст"
                    />
                </div>
                <div className="createProfile__field">
                    <label htmlFor="weight">Вага</label>
                    <input
                        id="weight"
                        name="weight"
                        onChange={(e) => changeHandler(e)}
                        style={{
                            border: "1px solid #d9d9d9",
                            margin: "10px",
                        }}
                        type="text"
                        placeholder="Введіть вагу"
                    />
                </div>
                <div className="createProfile__field">
                    <label htmlFor="age"> Вік</label>
                    <input
                        id="age"
                        name="age"
                        onChange={(e) => changeHandler(e)}
                        style={{
                            border: "1px solid #d9d9d9",
                            margin: "10px",
                        }}
                        type="text"
                        placeholder="Введіть вік"
                    />
                </div>
                <div className="createProfile__field">
                    <label htmlFor="activity">Активність</label>
                    <select
                        id="activity"
                        name="activity"
                        onChange={(e) => changeHandler(e)}
                    >
                        <option value={1.2}>Невелика</option>
                        <option value={1.375}>Помірна</option>
                        <option value={1.55}>Висока</option>
                        <option value={1.725}>Дуже висока</option>
                    </select>
                </div>
                <div className="createProfile__buttons">
                    <MyButton onClick={() => confirmProfile()}>
                        Створити
                    </MyButton>
                </div>
            </div>
        </div>
    );
};
