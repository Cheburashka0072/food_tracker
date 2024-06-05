import React, { useCallback, useContext, useEffect, useState } from "react";
import RecipesForm from "../components/recipes/RecipesForm";
import RecipesList from "../components/recipes/RecipesList";
import MyButton from "../components/UI/button/MyButton";
import DishesModal from "../components/UI/DishesModal/DishesModal";
import { AddDishes } from "../components/addDishes/AddDishes";
import "../components/stats/stats.css";
import { Filter } from "../components/UI/filter/Filter";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context";
import { useMessage } from "../hooks/message.hook";
import toast, { Toaster } from "react-hot-toast";
import { EditDishes } from "../components/editDishes/EditDishes";
import Pagination from "../components/UI/pagination/Pagination";
import { getPageCount } from "../hooks/usePagination";

const DishDirectory = () => {
    const { token } = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();

    const [dishes, setDishes] = useState([]);
    const [searchedDishes, setSearchedDishes] = useState(dishes);
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedDish, setSelectedDish] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [userDishes, setUserDishes] = useState(true);

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

    const createDish = async (form) => {
        try {
            await request(
                "/api/dish/create",
                "POST",
                {
                    name: form.name,
                    calories: Number(form.calories),
                    carbohydrates: Number(form.carbohydrates),
                    proteins: Number(form.proteins),
                    fats: Number(form.fats),
                },
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            message("Страву успішно додано!", toast.success);
            loadDishes();
            setCreateVisible(false);
        } catch (e) {}
    };
    const deleteDish = async (dish) => {
        try {
            await request(
                "/api/dish/delete",
                "POST",
                { ...dish },
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            message("Страву успішно видалено!", toast.success);
            loadDishes();
        } catch (e) {}
    };
    const editDish = async (form) => {
        try {
            await request(
                "/api/dish/edit",
                "PUT",
                {
                    _id: form._id,
                    name: form.name,
                    calories: Number(form.calories),
                    carbohydrates: Number(form.carbohydrates),
                    proteins: Number(form.proteins),
                    fats: Number(form.fats),
                },
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            message("Страву успішно додано!", toast.success);
            loadDishes();
            setEditVisible(false);
        } catch (e) {}
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        loadDishes();
    }, [loadDishes]);
    useEffect(() => {
        setTotalPages(getPageCount(searchedDishes.length, 10));
        setCurrentPage(1);
    }, [searchedDishes]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div style={{ display: "flex" }}>
                    <h2
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginRight: "10px",
                        }}
                    >
                        Продукти
                    </h2>
                    <button
                        disabled={userDishes === true}
                        onClick={() => {
                            loadDishes();
                            setUserDishes(true);
                        }}
                        style={
                            userDishes === true ? { fontWeight: "bold" } : {}
                        }
                    >
                        юзера
                    </button>
                    <p>/</p>
                    <button
                        disabled={userDishes === false}
                        onClick={() => {
                            loadDefaultDishes();
                            setUserDishes(false);
                        }}
                        style={
                            userDishes === false ? { fontWeight: "bold" } : {}
                        }
                    >
                        дефолт
                    </button>
                </div>
                {userDishes && (
                    <MyButton
                        onClick={() => {
                            setSelectedDish(false);
                            setCreateVisible(!createVisible);
                        }}
                    >
                        Додати продукт
                    </MyButton>
                )}
            </div>

            <div className="table__row">
                <div
                    className="table__row-item"
                    style={{ padding: "6px", width: "25%" }}
                >
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
                    style={{ width: "15%", padding: "6px" }}
                >
                    <Filter
                        dishes={dishes}
                        setSearchedDishes={setSearchedDishes}
                    />
                </div>
            </div>
            <div>
                <div>
                    {dishes && searchedDishes.length > 0 ? (
                        searchedDishes
                            .slice(currentPage * 10 - 10, currentPage * 10)
                            .map((dish, index) => (
                                <div key={index} className="table__row">
                                    <div
                                        className="table__row-item"
                                        style={{ width: "25%" }}
                                    >
                                        {dish.name}
                                    </div>
                                    <div className="table__row-item">
                                        {dish.calories}
                                    </div>
                                    <div className="table__row-item">
                                        {dish.carbohydrates}
                                    </div>
                                    <div className="table__row-item">
                                        {dish.proteins}
                                    </div>
                                    <div className="table__row-item">
                                        {dish.fats}
                                    </div>
                                    <button
                                        disabled={userDishes === false}
                                        className="table__row-item"
                                        onClick={() => {
                                            setEditVisible(!editVisible);
                                            setSelectedDish(dish);
                                        }}
                                        style={
                                            userDishes === false
                                                ? {
                                                      color: "#a1a1a1",
                                                      width: "10%",
                                                  }
                                                : {
                                                      background:
                                                          "rgba(255, 168, 0, 1)",
                                                      width: "10%",
                                                  }
                                        }
                                    >
                                        Змінити
                                    </button>
                                    <button
                                        disabled={userDishes === false}
                                        className="table__row-item"
                                        onClick={() => deleteDish(dish)}
                                        style={
                                            userDishes === false
                                                ? {
                                                      color: "#a1a1a1",
                                                      width: "5%",
                                                  }
                                                : {
                                                      background:
                                                          "rgba(255, 103, 92, 1)",
                                                      color: "#fff",
                                                      width: "5%",
                                                  }
                                        }
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
                            Страв не знайдено
                        </div>
                    )}
                </div>
                {searchedDishes.length > 10 && (
                    <Pagination
                        totalPages={totalPages}
                        page={currentPage}
                        changePage={changePage}
                    />
                )}
            </div>
            <DishesModal visible={createVisible} setVisible={setCreateVisible}>
                <AddDishes dish={selectedDish} createDish={createDish} />
            </DishesModal>
            <DishesModal visible={editVisible} setVisible={setEditVisible}>
                <EditDishes dish={selectedDish} editDish={editDish} />
            </DishesModal>
            <Toaster richColors />
        </div>
    );
};

export default DishDirectory;
