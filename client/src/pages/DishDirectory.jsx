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

const DishDirectory = () => {
    const { token } = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();

    const [dishes, setDishes] = useState([]);
    const [searchedDishes, setSearchedDishes] = useState(dishes);
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const [selectedDish, setSelectedDish] = useState(false);

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

    const createDish = useCallback(async (form) => {
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
    }, []);
    const deleteDish = useCallback(async (dish) => {
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
    }, []);
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

    useEffect(() => {
        loadDishes();
    }, [loadDishes]);

    console.log(searchedDishes);

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
                        setCreateVisible(!createVisible);
                    }}
                >
                    Додати продукт
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
                                    setEditVisible(!editVisible);
                                    setSelectedDish(dish);
                                }}
                            >
                                Змінити
                            </button>
                            <button
                                className="table__row-item"
                                onClick={() => deleteDish(dish)}
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
