import React, { useEffect, useState } from "react";
import "./addDishes.css";
import toast, { Toaster } from "react-hot-toast";

export const AddDishes = ({ dish, createDish }) => {
    const [dishName, setDishName] = useState("");
    const [dishCalories, setDishCalories] = useState(0);
    const [dishCarbohydrates, setDishCarbohydrates] = useState(0);
    const [dishProtein, setDishProtein] = useState(0);
    const [dishFats, setDishFats] = useState(0);
    const [dishIndex, setDishIndex] = useState(null);

    useEffect(() => {
        if (dish) {
            setDishName(dish.name);
            setDishCalories(dish.calories);
            setDishCarbohydrates(dish.carbohydrates);
            setDishProtein(dish.proteins);
            setDishFats(dish.fats);
            setDishIndex(dish.index);
        } else {
            setDishName("");
            setDishCalories(0);
            setDishCarbohydrates(0);
            setDishProtein(0);
            setDishFats(0);
            setDishIndex(null);
        }
    }, [dish]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h2 className="add__header">Додавання страви</h2>
            <input
                className="add__input"
                type="text"
                value={dishName}
                placeholder="Назва страви"
                onChange={(e) => {
                    setDishName(e.target.value);
                }}
            />
            <input
                className="add__input"
                type="text"
                value={dishCalories}
                placeholder="Кількість калорій"
                onChange={(e) => {
                    setDishCalories(Number(e.target.value));
                }}
            />
            <input
                className="add__input"
                type="text"
                value={dishCarbohydrates}
                placeholder="Кількість вуглеводів"
                onChange={(e) => {
                    setDishCarbohydrates(Number(e.target.value));
                }}
            />
            <input
                className="add__input"
                type="text"
                value={dishProtein}
                placeholder="Кількість білків"
                onChange={(e) => {
                    setDishProtein(Number(e.target.value));
                }}
            />
            <input
                className="add__input"
                type="text"
                value={dishFats}
                placeholder="Кількість жирів"
                onChange={(e) => {
                    setDishFats(Number(e.target.value));
                }}
            />
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
                        createDish(
                            {
                                name: dishName,
                                calories: dishCalories,
                                carbohydrates: dishCarbohydrates,
                                proteins: dishProtein,
                                fats: dishFats,
                            },
                            dish
                        );
                        toast.success("Страву додано");
                    }}
                >
                    Додати страву до переліку
                    <Toaster richColors />
                </button>
            </div>
        </div>
    );
};
