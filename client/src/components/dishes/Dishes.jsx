import React, { useState } from "react";
import "./dishes.css";

import { PlusIcon } from "@heroicons/react/20/solid";
import DishesModal from "../UI/DishesModal/DishesModal";
import { AddDishBtn } from "./AddDishBtn";
import { Filter } from "../UI/filter/Filter";

const Dishes = ({
    dishes,
    searchedDishes,
    setSearchedDishes,
    meals,
    addMeal,
    deleteMeal,
}) => {
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

                        {meal.dishes.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        fontWeight: "bold",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <p style={{ width: "20%" }}>
                                        Назва продукту
                                    </p>
                                    <p style={{ width: "20%" }}>Вага (г)</p>
                                    <p style={{ width: "20%" }}></p>
                                </div>
                                {dishes.map((dish, index) => (
                                    <div key={index}>
                                        {meal.dishes.filter(
                                            (mealDish) =>
                                                mealDish.name === dish.name
                                        ).length > 0 && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                <p style={{ width: "20%" }}>
                                                    {dish.name}
                                                </p>
                                                <p style={{ width: "20%" }}>
                                                    {meal.dishes
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
                                                        )}
                                                </p>
                                                <button
                                                    style={{ width: "20%" }}
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
                                                    Видалити
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            <DishesModal visible={modal} setVisible={setModal}>
                <div
                    style={{
                        display: "flex",
                        marginBottom: "10px",
                        fontSize: "20px",
                        alignItems: "center",
                    }}
                >
                    <Filter
                        className="dish__name"
                        style={{
                            marginRight: "5px",
                            fontWeight: "700",
                        }}
                        dishes={dishes}
                        setSearchedDishes={setSearchedDishes}
                    />

                    <p
                        className="dish__attribute"
                        style={{ fontWeight: "bold" }}
                    >
                        ккал
                    </p>
                    <p className="dish__attribute">вугл</p>
                    <p className="dish__attribute">білки</p>
                    <p className="dish__attribute">жири</p>
                </div>
                {dishes && searchedDishes.length > 0 ? (
                    searchedDishes.map((dish) => (
                        <div
                            key={dish.name}
                            style={{
                                display: "flex",
                                marginBottom: "10px",
                                fontSize: "20px",
                                alignItems: "center",
                            }}
                        >
                            <p
                                className="dish__name"
                                style={{
                                    marginRight: "5px",
                                    fontWeight: "700",
                                }}
                            >
                                {dish.name}
                            </p>
                            <p className="dish__attribute">{dish.calories}</p>
                            <p className="dish__attribute">
                                {dish.carbohydrates}
                            </p>
                            <p className="dish__attribute">{dish.proteins}</p>
                            <p className="dish__attribute">{dish.fats}</p>
                            <AddDishBtn
                                selectedMeal={selectedMeal}
                                dish={dish}
                                addMeal={addMeal}
                            />
                        </div>
                    ))
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "30px 0",
                        }}
                    >
                        Страву не знайдено
                    </div>
                )}
            </DishesModal>
        </div>
    );
};

export default Dishes;
