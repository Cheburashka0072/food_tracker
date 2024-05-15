import React, { useState } from "react";
import "./dishes.css";

import { PlusIcon } from "@heroicons/react/20/solid";
import DishesModal from "../UI/DishesModal/DishesModal";
import { AddDishBtn } from "./AddDishBtn";

const Dishes = ({ dishes, meals, addMeal, deleteMeal }) => {
    const [modal, setModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState();

    return (
        <div className="block_dishes">
            {meals &&
                meals.map((meal) => (
                    <div key={meal.text} className="item__content">
                        <div className="item">
                            <div className="item__dishes">
                                <img className="icon" src={meal.image} alt="" />
                                <span className="text">{meal.text}</span>
                            </div>
                            <div className="circle">
                                <button
                                    onClick={() => {
                                        setModal(true);
                                        setSelectedMeal(meal.text);
                                    }}
                                    className="plus"
                                >
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        {meal.dishes &&
                            dishes.map((dish, index) => (
                                <div key={index}>
                                    {meal.dishes.filter(
                                        (mealDish) =>
                                            mealDish.name === dish.name
                                    ).length > 0 && (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                            }}
                                        >
                                            <p>{dish.name}</p>
                                            <p>{dish.calories}</p>
                                            <p>
                                                {
                                                    meal.dishes
                                                        .filter(
                                                            (mealDish) =>
                                                                mealDish.name ===
                                                                dish.name
                                                        )
                                                        .map(
                                                            (dish) => dish.gram
                                                        )
                                                        .reduce(
                                                            (prev, curr) =>
                                                                prev + curr
                                                        ) //reduce по граммовке
                                                }
                                            </p>
                                            <button
                                                onClick={() =>
                                                    deleteMeal(
                                                        meal.dishes.filter(
                                                            (mealDish) =>
                                                                mealDish.name ===
                                                                dish.name
                                                        )[0],
                                                        meal.text
                                                    )
                                                }
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                ))}
            <DishesModal visible={modal} setVisible={setModal}>
                {dishes &&
                    dishes.map((dish) => (
                        <div
                            key={dish.name}
                            style={{
                                display: "flex",
                                marginBottom: "10px",
                                fontSize: "20px",
                            }}
                        >
                            <p
                                style={{
                                    marginRight: "5px",
                                    fontWeight: "700",
                                }}
                            >
                                {dish.name}
                            </p>
                            <p style={{ marginRight: "5px" }}>
                                {dish.calories}
                            </p>
                            <p style={{ marginRight: "5px" }}>
                                {dish.carbohydrates}
                            </p>
                            <p style={{ marginRight: "5px" }}>{dish.protein}</p>
                            <p style={{ marginRight: "40px" }}>{dish.fats}</p>
                            <AddDishBtn
                                selectedMeal={selectedMeal}
                                dish={dish}
                                addMeal={addMeal}
                            />
                        </div>
                    ))}
            </DishesModal>
        </div>
    );
};

export default Dishes;
