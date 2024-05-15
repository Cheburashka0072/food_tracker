import React, { useState } from "react";

export const AddDishes = ({ dishes, setDishes }) => {
    const [dishName, setDishName] = useState("");
    const [dishCalories, setDishCalories] = useState();
    const [dishCarbohydrates, setDishCarbohydrates] = useState();
    const [dishProtein, setDishProtein] = useState();
    const [dishFats, setDishFats] = useState();

    const addDish = () => {
        const newDish = {
            name: dishName,
            calories: dishCalories,
            carbohydrates: dishCarbohydrates,
            proteins: dishProtein,
            fats: dishFats,
        };
        const newDishArr = dishes;
        newDishArr.push(newDish);
        setDishes(newDishArr);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <input
                style={{ border: "1px solid #000" }}
                type="text"
                value={dishName}
                onChange={(e) => {
                    setDishName(e.target.value);
                }}
            />
            <input
                style={{ border: "1px solid #000" }}
                type="text"
                value={dishCalories}
                placeholder="0"
                onChange={(e) => {
                    setDishCalories(Number(e.target.value));
                }}
            />
            <input
                style={{ border: "1px solid #000" }}
                type="text"
                value={dishCarbohydrates}
                onChange={(e) => {
                    setDishCarbohydrates(Number(e.target.value));
                }}
            />
            <input
                style={{ border: "1px solid #000" }}
                type="text"
                value={dishProtein}
                onChange={(e) => {
                    setDishProtein(Number(e.target.value));
                }}
            />
            <input
                style={{ border: "1px solid #000" }}
                type="text"
                value={dishFats}
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
                    onClick={addDish}
                >
                    Додати страву до переліку
                </button>
                {/*записать новые блюда в локал*/}
            </div>
        </div>
    );
};
