import React, { useState } from "react";
import "./dishes.css";

import { PlusIcon } from "@heroicons/react/20/solid";
import DishesModal from "../UI/DishesModal/DishesModal";

const Dishes = ({ dishes, meals, addMeal }) => {
  const [modal, setModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState();

  console.log(dishes);
  return (
    <div className="block_dishes">
      {meals.map((meal) => (
        <div className="item__content">
          <div key={meal.text} className="item">
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
            meal.dishes.map((dish) => (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <p>{dish.name}</p>
                <p>{dish.calories}</p>
              </div>
            ))}
        </div>
      ))}
      <DishesModal visible={modal} setVisible={setModal}>
        {dishes.map((dish) => (
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "5px" }}>{dish.name}</p>
            <p style={{ marginRight: "5px" }}>{dish.calories}</p>
            <p style={{ marginRight: "5px" }}>{dish.carbohydrates}</p>
            <p style={{ marginRight: "5px" }}>{dish.protein}</p>
            <p style={{ marginRight: "5px" }}>{dish.fats}</p>
            <button onClick={() => addMeal(dish, selectedMeal)}>+</button>
          </div>
        ))}
      </DishesModal>
    </div>
  );
};

export default Dishes;
