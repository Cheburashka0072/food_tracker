import React from "react";
import "./dishes.css";
import DishesIcon1 from "./../../img/icon1.png";
import DishesIcon2 from "./../../img/icon2.png";
import DishesIcon3 from "./../../img/icon3.png";
import DishesIcon4 from "./../../img/icon4.png";
import { PlusIcon } from "@heroicons/react/20/solid";

const Dishes = () => {
  const meals = [
    {
      text: "Сніданок",
      image: DishesIcon1,
    },
    {
      text: "Обід",
      image: DishesIcon2,
    },
    {
      text: "Вечеря",
      image: DishesIcon3,
    },
    {
      text: "Снек",
      image: DishesIcon4,
    },
  ];
  return (
    <div className="block_dishes">
      {meals.map((meal) => (
        <div key={meal.text} className="item">
          <div className="item__dishes">
            <img className="icon" src={meal.image} alt="" />
            <span className="text">{meal.text}</span>
          </div>
          <div className="circle">
            <button className="plus">
              <PlusIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dishes;
