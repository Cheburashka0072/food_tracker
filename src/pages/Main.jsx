import React, { useEffect, useState } from "react";
import MainСalories from "../components/main/MainСalories";
import Dishes from "../components/dishes/Dishes";
import Water from "../components/water/Water";
import DishesIcon1 from "../img/icon1.png";
import DishesIcon2 from "../img/icon2.png";
import DishesIcon3 from "../img/icon3.png";
import DishesIcon4 from "../img/icon4.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Calendar from "react-calendar";
import MyButton from "../components/UI/button/MyButton";
import "react-calendar/dist/Calendar.css";
const Main = () => {
  const currDate = new Date();
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);
  const localStorageStats = localStorage.getItem("recordedStats");
  const [dishes, setDishes] = useState([
    {
      name: "Колбаса",
      calories: 300,
      carbohydrates: 27,
      proteins: 30,
      fats: 15,
    },
    {
      name: "Пюре",
      calories: 400,
      carbohydrates: 27,
      proteins: 30,
      fats: 15,
    },
    {
      name: "Булка",
      calories: 600,
      carbohydrates: 27,
      proteins: 30,
      fats: 15,
    },
    {
      name: "Сыр",
      calories: 700,
      carbohydrates: 27,
      proteins: 30,
      fats: 15,
    },
    {
      name: "Сосиска",
      calories: 800,
      carbohydrates: 27,
      proteins: 30,
      fats: 15,
    },
  ]);

  const [date, setDate] = useState(currDate);
  const [personStats, setPersonStats] = useState(
    JSON.parse(localStorageStats) || [
      {
        timestamp: Date.parse(date),
        personMeals: [],
        meals: [],
        water: 0,
      },
    ]
  );
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
  const [calendar, setCalendar] = useState(false);
  const [water, setWater] = useState(0);

  const addMeal = (dish, mealType) => {
    setPersonMeals([...personMeals, { id: Date.now(), ...dish }]);
    const editedMeals = [...meals]; // Создаем копию массива meals
    const mealIndex = editedMeals.findIndex((meal) => meal.text === mealType);
    if (mealIndex !== -1) {
      editedMeals[mealIndex] = {
        ...editedMeals[mealIndex],
        dishes: [...editedMeals[mealIndex].dishes, { id: Date.now(), ...dish }],
      };
      setMeals(editedMeals);
    }
  };

  const deleteMeal = (dish, mealType) => {
    const editedPersonMeals = personMeals.filter((meal) => meal.id !== dish.id);
    setPersonMeals(editedPersonMeals);
    const editedMeals = meals.map((meal) => {
      if (meal.text === mealType) {
        return {
          ...meal,
          dishes: meal.dishes.filter((dishToDel) => dishToDel.id !== dish.id),
        };
      }
      return meal;
    });
    setMeals(editedMeals);
  };

  const checkPersonStats = (timestamp) => {
    const currPerson = personStats.filter(
      (stats) => stats.timestamp === timestamp
    );
    if (currPerson.length > 0) {
      if (currPerson[0].personMeals.length === 0 && !currPerson[0].water) {
        setPersonMeals([]);
        setMeals([
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
        setWater(0);
      } else {
        setPersonMeals(currPerson[0].personMeals);
        setMeals(currPerson[0].meals);
        setWater(currPerson[0].water);
      }
    } else {
      setPersonStats([
        ...personStats,
        { timestamp: timestamp, personMeals: [], meals: [] },
      ]);
      setPersonMeals([]);
      setMeals([
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
      setWater(0);
    }
  };

  const confirmStats = (timestamp) => {
    let indexOfStats = 0;
    personStats.map((stat, index) => {
      if (stat.timestamp === timestamp) indexOfStats = index;
    });
    const newPersonStats = personStats;
    newPersonStats[indexOfStats].personMeals = personMeals;
    newPersonStats[indexOfStats].meals = meals;
    newPersonStats[indexOfStats].water = water;
    setPersonStats(newPersonStats);
    const statsToRecord = personStats.filter(
      (stat) => stat.meals.length > 0 || stat.water > 0
    );
    localStorage.setItem("recordedStats", JSON.stringify(statsToRecord));
  };

  useEffect(() => {
    checkPersonStats(Date.parse(date));
  }, [date]);

  return (
    <div>
      <MainСalories
        personCalories={
          personMeals && personMeals.length > 0
            ? personMeals
                .map((meal) => meal.calories)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
        personCarbohydrates={
          personMeals && personMeals.length > 0
            ? personMeals
                .map((meal) => meal.carbohydrates)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
        personProteins={
          personMeals && personMeals.length > 0
            ? personMeals
                .map((meal) => meal.proteins)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
        personFats={
          personMeals && personMeals.length > 0
            ? personMeals
                .map((meal) => meal.fats)
                .reduce((prev, curr) => prev + curr)
            : 0
        }
      />
      <div className="block_data">
        <button
          onClick={() => {
            setDate(new Date(Date.parse(date) - 86400000));
          }}
        >
          <ChevronLeftIcon className="arrow" />
        </button>
        <button className="btn_data" onClick={() => setCalendar(!calendar)}>
          {date.toLocaleDateString("uk-UA", {
            month: "long",
            day: "numeric",
          })}
        </button>
        <button
          onClick={() => {
            setDate(new Date(Date.parse(date) + 86400000));
          }}
        >
          <ChevronRightIcon className="arrow" />
        </button>
      </div>
      {calendar && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Calendar
            value={Date.parse(date)}
            onChange={setDate}
            locale="uk-UA"
          />
        </div>
      )}
      <Dishes
        dishes={dishes}
        setDishes={setDishes}
        meals={meals}
        addMeal={addMeal}
        deleteMeal={deleteMeal}
      />
      <Water cups={water} setCups={setWater} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <MyButton
          style={{ fontSize: "20px" }}
          onClick={() => confirmStats(Date.parse(date))}
        >
          Confirm
        </MyButton>
      </div>
    </div>
  );
};

export default Main;
