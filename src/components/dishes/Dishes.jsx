import React, { useState } from "react";
import "./dishes.css";

import { PlusIcon } from "@heroicons/react/20/solid";
import DishesModal from "../UI/DishesModal/DishesModal";

const Dishes = ({ dishes, setDishes, meals, addMeal, deleteMeal }) => {
  console.log(dishes);
  console.log(meals);
  const [modal, setModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState();
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
                  {meal.dishes.filter((mealDish) => mealDish.name === dish.name)
                    .length > 0 && (
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
                          meal.dishes.filter(
                            (mealDish) => mealDish.name === dish.name
                          ).length //reduce по граммовке
                        }
                      </p>
                      <button
                        onClick={() =>
                          deleteMeal(
                            meal.dishes.filter(
                              (mealDish) => mealDish.name === dish.name
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
              <p style={{ marginRight: "5px" }}>{dish.name}</p>
              <p style={{ marginRight: "5px" }}>{dish.calories}</p>
              <p style={{ marginRight: "5px" }}>{dish.carbohydrates}</p>
              <p style={{ marginRight: "5px" }}>{dish.protein}</p>
              <p style={{ marginRight: "40px" }}>{dish.fats}</p>
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
                  onClick={() => addMeal({ value: 200, ...dish }, selectedMeal)} //штампить вес блюда с инпута
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </DishesModal>
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
        <button onClick={addDish}>Додати страву</button>{" "}
        {/*записать новые блюда в локал*/}
      </div>
    </div>
  );
};

export default Dishes;
