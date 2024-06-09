import React, { useState } from "react";
import "./addDishes.css";

export const AddDishes = ({ dish, createDish }) => {
    const [form, setForm] = useState({
        name: "",
        calories: "",
        carbohydrates: "",
        proteins: "",
        fats: "",
    });

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h2 className="add__header">Додавання продукту</h2>
            <input
                id="name"
                name="name"
                className="add__input"
                type="text"
                value={form.name}
                placeholder="Назва продукту"
                onChange={(e) => changeHandler(e)}
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
                    type="text"
                    value={form.calories}
                    placeholder="Кількість калорій"
                    onChange={(e) => changeHandler(e)}
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
                    type="text"
                    value={form.carbohydrates}
                    placeholder="Кількість вуглеводів"
                    onChange={(e) => changeHandler(e)}
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
                    type="text"
                    value={form.proteins}
                    placeholder="Кількість білків"
                    onChange={(e) => changeHandler(e)}
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
                    type="text"
                    value={form.fats}
                    placeholder="Кількість жирів"
                    onChange={(e) => changeHandler(e)}
                />
                <p style={{ margin: "0 0 5px 5px", color: "grey" }}>/100г</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    style={{
                        marginTop: "15px",
                        padding: "7px 12px",
                        backgroundColor: "#ffa800",
                        borderRadius: "32px",
                        fontWeight: "500",
                        color: "white",
                    }}
                    onClick={() => {
                        createDish(form);
                        setForm({
                            name: "",
                            calories: "",
                            carbohydrates: "",
                            proteins: "",
                            fats: "",
                        });
                    }}
                >
                    Додати продукт до довідника
                </button>
            </div>
        </div>
    );
};
