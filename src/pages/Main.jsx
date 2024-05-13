import React, { useEffect, useState } from "react";
import MainСalories from "../components/main/MainСalories";
import Dishes from "../components/dishes/Dishes";
import Water from "../components/water/Water";
import { dishes } from "../data";
import DishesIcon1 from "../img/icon1.png";
import DishesIcon2 from "../img/icon2.png";
import DishesIcon3 from "../img/icon3.png";
import DishesIcon4 from "../img/icon4.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Calendar from "react-calendar";

const Main = () => {
  const currDate = new Date();
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);
  const localStorageStats = localStorage.getItem("recordedStats");

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
    setPersonMeals([...personMeals, dish]);
    const editedMeals = meals;
    editedMeals
      .filter((meal) => meal.text === mealType)
      .map((meal) => (meal.dishes = [...meal.dishes, dish]));
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
  console.log(personStats);

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
        <div>
          <Calendar
            value={Date.parse(date)}
            onChange={setDate}
            locale="uk-UA"
          />
        </div>
      )}
      <Dishes dishes={dishes} meals={meals} addMeal={addMeal} />
      <Water cups={water} setCups={setWater} />
      <button onClick={() => confirmStats(Date.parse(date))}>Confirm</button>
    </div>
  );
};

export default Main;
