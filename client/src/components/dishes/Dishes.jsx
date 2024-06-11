import React, { useCallback, useContext, useEffect, useState } from "react";
import "./dishes.css";

import { PlusIcon } from "@heroicons/react/20/solid";
import DishesModal from "../UI/DishesModal/DishesModal";
import { AddDishBtn } from "./AddDishBtn";
import { Filter } from "../UI/filter/Filter";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context";
import { getPageCount } from "../../hooks/usePagination";
import Pagination from "../UI/pagination/Pagination";
import { Loader } from "../UI/loader/Loader";

const Dishes = ({ meals, addMeal, deleteMeal }) => {
    const { token } = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();

    const [modal, setModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState();
    const [dishes, setDishes] = useState([]);
    const [searchedDishes, setSearchedDishes] = useState(dishes);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUserDishes, setUserDishes] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const loadDishes = useCallback(async () => {
        try {
            const response = await request(
                "/api/dish/",
                "GET",
                {},
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            if (response.length > 0) setDishes(response);
            else setDishes([]);
        } catch (e) {}
    }, []);
    const loadDefaultDishes = useCallback(async () => {
        try {
            const response = await request(
                "/api/dish/defaultDishes",
                "GET",
                {},
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            if (response.length > 0) setDishes(response);
        } catch (e) {}
    }, []);
    const changePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        (async () => {
            await loadDishes();
            setIsLoading(false);
        })();
    }, [loadDishes]);

    useEffect(() => {
        setTotalPages(getPageCount(searchedDishes.length, 10));
        setCurrentPage(1);
    }, [searchedDishes]);

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
                                    <p style={{ width: "30%" }}>
                                        Назва продукту
                                    </p>
                                    <p style={{ width: "20%" }}>Вага (г)</p>
                                    <p style={{ width: "20%" }}></p>
                                </div>
                                {meal.dishes.map((dish, index) => (
                                    <div key={index}>
                                        {meal.dishes.length > 0 && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                <p style={{ width: "30%" }}>
                                                    {dish.name}
                                                </p>
                                                <p style={{ width: "20%" }}>
                                                    {dish.gram}
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
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                    }}
                >
                    <p style={{ marginRight: "10px" }}>Набір продуктів:</p>
                    <button
                        disabled={isUserDishes === true}
                        style={
                            isUserDishes === true ? { fontWeight: "bold" } : {}
                        }
                        onClick={() => {
                            loadDishes();
                            setUserDishes(true);
                        }}
                    >
                        Користувача
                    </button>
                    <span style={{ fontWeight: "bold" }}>/</span>
                    <button
                        disabled={isUserDishes === false}
                        style={
                            isUserDishes === false ? { fontWeight: "bold" } : {}
                        }
                        onClick={() => {
                            loadDefaultDishes();
                            setUserDishes(false);
                        }}
                    >
                        Базовий
                    </button>
                </div>
                {loading || isLoading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50vh",
                            width: "50vh",
                            margin: "0 auto",
                        }}
                    >
                        <Loader />
                    </div>
                ) : (
                    <>
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
                            searchedDishes
                                .slice(currentPage * 10 - 10, currentPage * 10)
                                .map((dish) => (
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
                                        <p className="dish__attribute">
                                            {dish.calories}
                                        </p>
                                        <p className="dish__attribute">
                                            {dish.carbohydrates}
                                        </p>
                                        <p className="dish__attribute">
                                            {dish.proteins}
                                        </p>
                                        <p className="dish__attribute">
                                            {dish.fats}
                                        </p>
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
                                Продуктів не знайдено
                            </div>
                        )}
                        {searchedDishes.length > 10 && (
                            <Pagination
                                totalPages={totalPages}
                                page={currentPage}
                                changePage={changePage}
                            />
                        )}
                    </>
                )}
            </DishesModal>
        </div>
    );
};

export default Dishes;
