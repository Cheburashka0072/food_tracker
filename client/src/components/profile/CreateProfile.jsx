import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import "./createProfile.css";

export const CreateProfile = ({ changeHandler, confirmProfile }) => {
    const [form, setForm] = useState({
        name: "",
        gender: "",
        height: "",
        weight: "",
        age: "",
        activity: "",
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";

        if (!value) {
            error = "Це поле є обов'язковим.";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        validateField(name, value);
        changeHandler(e);
    };

    const isFormValid =
        Object.values(errors).every((error) => error === "") &&
        Object.values(form).every((value) => value);

    return (
        <div className="createProfile">
            <div className="createProfile__form">
                <h2 className="createProfile__header">Створення профілю</h2>
                <div className="createProfile__field">
                    <label htmlFor="name">Ім'я</label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                border: errors.name
                                    ? "1px solid red"
                                    : "1px solid #d9d9d9",
                                margin: "10px",
                            }}
                            type="text"
                            value={form.name}
                            placeholder="Введіть ім'я"
                        />
                        {errors.name && (
                            <span className="error">{errors.name}</span>
                        )}
                    </div>
                </div>
                <div className="createProfile__field">
                    <label htmlFor="gender">Пол</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={form.gender}
                        style={{
                            border: errors.gender
                                ? "1px solid red"
                                : "1px solid #d9d9d9",
                            margin: "10px",
                        }}
                    >
                        <option value="" disabled>
                            Виберіть стать
                        </option>
                        <option value="male">чоловік</option>
                        <option value="female">жінка</option>
                    </select>
                    {errors.gender && (
                        <span className="error">{errors.gender}</span>
                    )}
                </div>
                <div className="createProfile__field">
                    <label htmlFor="height">Зріст</label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="height"
                            name="height"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                border: errors.height
                                    ? "1px solid red"
                                    : "1px solid #d9d9d9",
                                margin: "10px",
                            }}
                            type="number"
                            min="1"
                            value={form.height}
                            placeholder="Введіть зріст"
                        />
                        {errors.height && (
                            <span className="error">{errors.height}</span>
                        )}
                    </div>
                </div>
                <div className="createProfile__field">
                    <label htmlFor="weight">Вага</label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="weight"
                            name="weight"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                border: errors.weight
                                    ? "1px solid red"
                                    : "1px solid #d9d9d9",
                                margin: "10px",
                            }}
                            type="number"
                            min="1"
                            value={form.weight}
                            placeholder="Введіть вагу"
                        />
                        {errors.weight && (
                            <span className="error">{errors.weight}</span>
                        )}
                    </div>
                </div>
                <div className="createProfile__field">
                    <label htmlFor="age">Вік</label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="age"
                            name="age"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                border: errors.age
                                    ? "1px solid red"
                                    : "1px solid #d9d9d9",
                                margin: "10px",
                            }}
                            type="number"
                            min="1"
                            value={form.age}
                            placeholder="Введіть вік"
                        />
                        {errors.age && (
                            <span className="error">{errors.age}</span>
                        )}
                    </div>
                </div>
                <div className="createProfile__field">
                    <label htmlFor="activity">Активність</label>
                    <select
                        id="activity"
                        name="activity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={form.activity}
                        style={{
                            border: errors.activity
                                ? "1px solid red"
                                : "1px solid #d9d9d9",
                            margin: "10px",
                        }}
                    >
                        <option value="" disabled>
                            Виберіть активність
                        </option>
                        <option value={1.2}>Малорухлива</option>
                        <option value={1.375}>Невелика</option>
                        <option value={1.55}>Помірна</option>
                        <option value={1.725}>Висока</option>
                        <option value={1.9}>Дуже висока</option>
                    </select>
                    {errors.activity && (
                        <span className="error">{errors.activity}</span>
                    )}
                </div>
                <div className="createProfile__buttons">
                    <MyButton disabled={!isFormValid} onClick={confirmProfile}>
                        Створити
                    </MyButton>
                </div>
            </div>
        </div>
    );
};
