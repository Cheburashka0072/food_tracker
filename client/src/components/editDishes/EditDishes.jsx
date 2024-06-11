import React, { useEffect, useState } from "react";
import "./editDishes.css";
import MyButton from "../UI/button/MyButton";

export const EditDishes = ({ dish, editDish }) => {
    const [form, setForm] = useState({
        ...dish,
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
        setForm({ ...form, [name]: value });
        validateField(name, value);
    };

    const isFormValid = () => {
        return (
            Object.values(errors).every((error) => error === "") &&
            Object.values(form).every((value) => value !== "")
        );
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            editDish(form);
            setErrors({});
        } else {
            Object.keys(form).forEach((field) =>
                validateField(field, form[field])
            );
        }
    };

    useEffect(() => {
        setForm({ ...dish });
        setErrors({});
    }, [dish]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h2 className="add__header">Редагування продукту</h2>
            <input
                id="name"
                name="name"
                className="add__input"
                type="text"
                value={form.name}
                placeholder="Назва продукту"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                    border: errors.name ? "1px solid red" : "1px solid #d9d9d9",
                }}
            />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    id="calories"
                    name="calories"
                    className="add__input"
                    type="number"
                    value={form.calories}
                    placeholder="Кількість калорій"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        border: errors.calories
                            ? "1px solid red"
                            : "1px solid #d9d9d9",
                    }}
                />
                <p style={{ margin: "0 0 5px 5px", color: "grey" }}>/100г</p>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    id="carbohydrates"
                    name="carbohydrates"
                    className="add__input"
                    type="number"
                    value={form.carbohydrates}
                    placeholder="Кількість вуглеводів"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        border: errors.carbohydrates
                            ? "1px solid red"
                            : "1px solid #d9d9d9",
                    }}
                />
                <p style={{ margin: "0 0 5px 5px", color: "grey" }}>/100г</p>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    id="proteins"
                    name="proteins"
                    className="add__input"
                    type="number"
                    value={form.proteins}
                    placeholder="Кількість білків"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        border: errors.proteins
                            ? "1px solid red"
                            : "1px solid #d9d9d9",
                    }}
                />
                <p style={{ margin: "0 0 5px 5px", color: "grey" }}>/100г</p>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    id="fats"
                    name="fats"
                    className="add__input"
                    type="number"
                    value={form.fats}
                    placeholder="Кількість жирів"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        border: errors.fats
                            ? "1px solid red"
                            : "1px solid #d9d9d9",
                    }}
                />
                <p style={{ margin: "0 0 5px 5px", color: "grey" }}>/100г</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <MyButton onClick={handleSubmit} disabled={!isFormValid()}>
                    Змінити дані продукту
                </MyButton>
            </div>
        </div>
    );
};
