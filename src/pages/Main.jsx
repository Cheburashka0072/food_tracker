import React, { useState } from "react";
import MainСalories from "../components/main/MainСalories";
import Dishes from "../components/dishes/Dishes";
import Water from "../components/water/Water";
import { dishes } from "../data";
import DishesIcon1 from "../img/icon1.png";
import DishesIcon2 from "../img/icon2.png";
import DishesIcon3 from "../img/icon3.png";
import DishesIcon4 from "../img/icon4.png";

const Main = () => {
  const [personMeals, setPersonMeals] = useState([]);
  const [meals, setMeals] = useState([
    {
      text: "Сніданок",
      image: DishesIcon1,
      dishes: [],
    },
    {
      text: "Обід",
      image: DishesIcon2,
      dishes: [],
    },
    {
      text: "Вечеря",
      image: DishesIcon3,
      dishes: [],
    },
    {
      text: "Снек",
      image: DishesIcon4,
      dishes: [],
    },
  ]);
  const addMeal = (dish, mealType) => {
    setPersonMeals([...personMeals, dish]);
    const editedMeals = meals;
    editedMeals
      .filter((meal) => meal.text === mealType)
      .map((meal) => (meal.dishes = [...meal.dishes, dish]));
    setMeals(editedMeals);
  };

  return (
    <div>
      <MainСalories
        personCalories={
          personMeals.length > 0
            ? personMeals
                .map((meal) => meal.calories)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
        personCarbohydrates={
          personMeals.length > 0
            ? personMeals
                .map((meal) => meal.carbohydrates)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
        personProteins={
          personMeals.length > 0
            ? personMeals
                .map((meal) => meal.proteins)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
        personFats={
          personMeals.length > 0
            ? personMeals
                .map((meal) => meal.fats)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
      />
      <Dishes dishes={dishes} meals={meals} addMeal={addMeal} />
      <Water />
    </div>
  );
};

export default Main;
