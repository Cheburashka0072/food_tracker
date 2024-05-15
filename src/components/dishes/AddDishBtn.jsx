import React, { useState } from "react";

export const AddDishBtn = ({ selectedMeal, dish, addMeal }) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <>
            <input
                style={{ border: "1px solid black" }}
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <div
                style={{
                    backgroundColor: "#cdd59c",
                    width: "25px",
                    height: "25px",
                    float: "right",
                    marginLeft: "auto",
                }}
                className="circle"
            >
                <button
                    onClick={() => {
                        {
                            addMeal(
                                {
                                    ...dish,
                                    gram: quantity,
                                    calories: (dish.calories * quantity) / 100,
                                    carbohydrates:
                                        (dish.carbohydrates * quantity) / 100,
                                    proteins: (dish.proteins * quantity) / 100,
                                    fats: (dish.fats * quantity) / 100,
                                },
                                selectedMeal
                            );
                            setQuantity(0);
                        }
                    }}
                >
                    +
                </button>
            </div>
        </>
    );
};
