import React, { useEffect, useState } from "react";
import RecipesForm from "../components/recipes/RecipesForm";
import RecipesList from "../components/recipes/RecipesList";
import MyButton from "../components/UI/button/MyButton";
import DishesModal from "../components/UI/DishesModal/DishesModal";
import { AddDishes } from "../components/addDishes/AddDishes";
import "../components/stats/stats.css";
import { Filter } from "../components/UI/filter/Filter";

const DishDirectory = () => {
    const [dishes, setDishes] = useState(
        JSON.parse(localStorage.getItem("dishes")) || []
    );
    const [searchedDishes, setSearchedDishes] = useState(dishes);
    const [visible, setVisible] = useState(false);

    const createDish = (dish, currDish) => {
        const newdishes = [...dishes];
        if (selectedDish) {
            const index = dishes
                .map((dish) => dish.name)
                .indexOf(currDish.name);
            newdishes[index] = dish;
            setDishes(newdishes);
        } else setDishes([...dishes, dish]);
        setVisible(false);
    };
    const [selectedDish, setSelectedDish] = useState(false);
    const removeDish = (dish) => {
        setDishes(dishes.filter((d) => d.name !== dish.name));
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
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
                        setSelectedDish(false);
                        setVisible(!visible);
                    }}
                >
                    Додати страву
                </button>
            </div>

            <div className="table__row">
                <div className="table__row-item" style={{ padding: "6px" }}>
                    Назва
                </div>
                <div className="table__row-item" style={{ padding: "6px" }}>
                    Калорії
                </div>
                <div className="table__row-item" style={{ padding: "6px" }}>
                    Вуглеводи (г)
                </div>
                <div className="table__row-item" style={{ padding: "6px" }}>
                    Білки (г)
                </div>
                <div className="table__row-item" style={{ padding: "6px" }}>
                    Жири (г)
                </div>
                <div
                    className="table__row-item"
                    style={{ width: "30%", padding: "6px" }}
                >
                    <Filter
                        dishes={dishes}
                        setSearchedDishes={setSearchedDishes}
                    />
                </div>
            </div>
            <div>
                {dishes && searchedDishes.length > 0 ? (
                    searchedDishes.map((dish, index) => (
                        <div key={index} className="table__row">
                            <div className="table__row-item">{dish.name}</div>
                            <div className="table__row-item">
                                {dish.calories}
                            </div>
                            <div className="table__row-item">
                                {dish.carbohydrates}
                            </div>
                            <div className="table__row-item">
                                {dish.proteins}
                            </div>
                            <div className="table__row-item">{dish.fats}</div>
                            <button
                                className="table__row-item"
                                onClick={() => {
                                    setVisible(!visible);
                                    setSelectedDish({ index: index, ...dish });
                                }}
                            >
                                Змінити
                            </button>
                            <button
                                className="table__row-item"
                                onClick={() => removeDish(dish)}
                            >
                                X
                            </button>
                        </div>
                    ))
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "30px 0",
                            border: "1px solid #d9d9d9",
                        }}
                    >
                        Страву не знайдено
                    </div>
                )}
            </div>
            <DishesModal visible={visible} setVisible={setVisible}>
                <AddDishes dish={selectedDish} createDish={createDish} />
            </DishesModal>
        </div>
    );
};

export default DishDirectory;
