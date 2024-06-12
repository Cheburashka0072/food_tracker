import React, { useState } from "react";

export const AddDishBtn = ({ selectedMeal, dish, addMeal }) => {
    const [quantity, setQuantity] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        const regex = /^(?!0\d|.*\..*\.)\d*\.?\d*$/;
        if (regex.test(value)) {
            setQuantity(value);
            setIsValid(value !== "" && parseFloat(value, 10) >= 1);
        }
    };

    return (
        <>
            <input
                style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "15px",
                    padding: "3px 10px",
                    width: "90px",
                    background: "#d9d9d9",
                    marginRight: "15px",
                }}
                type="number"
                value={quantity}
                onChange={handleChange}
            />
            <p style={{ marginRight: "15px", fontWeight: "600" }}>грам</p>
            <div
                style={
                    isValid
                        ? {
                              backgroundColor: "#cdd59c",
                              width: "25px",
                              height: "25px",
                              float: "right",
                              marginLeft: "auto",
                          }
                        : {
                              backgroundColor: "#a4a4a4",
                              width: "25px",
                              height: "25px",
                              float: "right",
                              marginLeft: "auto",
                          }
                }
                className="circle"
            >
                <button
                    disabled={!isValid}
                    onClick={() => {
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
                        setQuantity("");
                        setIsValid(false);
                    }}
                >
                    +
                </button>
            </div>
        </>
    );
};
