import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context";
import { useMessage } from "../hooks/message.hook";
import { Loader } from "../components/UI/loader/Loader";
const Main = () => {
    const { token } = useContext(AuthContext);
    const currDate = new Date();
    currDate.setHours(0);
    currDate.setMinutes(0);
    currDate.setSeconds(0);
    currDate.setMilliseconds(0);
    const message = useMessage();

    const [date, setDate] = useState(currDate);
    const [personStats, setPersonStats] = useState([
        {
            timestamp: Date.parse(date),
            personMeals: [],
            meals: [],
            water: 0,
        },
    ]);
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
    const [isLoading, setIsLoading] = useState(true);

    const addMeal = (dish, mealType) => {
        const timestamp = Date.now();
        setPersonMeals([...personMeals, { id: timestamp, ...dish }]);
        const editedMeals = [...meals];
        const mealIndex = editedMeals.findIndex(
            (meal) => meal.text === mealType
        );
        if (mealIndex !== -1) {
            editedMeals[mealIndex] = {
                ...editedMeals[mealIndex],
                dishes: [
                    ...editedMeals[mealIndex].dishes,
                    { id: timestamp, ...dish },
                ],
            };
            setMeals(editedMeals);
        }
    };

    const deleteMeal = (dish, mealType) => {
        const editedPersonMeals = personMeals.filter(
            (meal) => meal.id !== dish.id
        );
        setPersonMeals(editedPersonMeals);
        const editedMeals = meals.map((meal) => {
            if (meal.text === mealType) {
                return {
                    ...meal,
                    dishes: meal.dishes.filter(
                        (dishToDel) => dishToDel.id !== dish.id
                    ),
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
            if (
                currPerson[0].personMeals.length === 0 &&
                !currPerson[0].water
            ) {
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
        addStat(newPersonStats, indexOfStats);
        setPersonStats(newPersonStats);
    };
    const addStat = async (newPersonStats, indexOfStats) => {
        try {
            console.log(newPersonStats[indexOfStats]);
            const response = await request(
                "/api/stat/manipulate",
                "POST",
                {
                    ...newPersonStats[indexOfStats],
                    BMR: profile.BMR,
                },
                { Authorization: `Bearer: ${token}` }
            );
            message(response.message, toast.success);
        } catch (e) {}
    };

    const [profile, setProfile] = useState(false);
    const { loading, request, error, clearError } = useHttp();
    const loadProfile = useCallback(async () => {
        try {
            const response = await request(
                "/api/profile/",
                "GET",
                {},
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            setProfile(...response);
        } catch (e) {}
    }, []);
    const loadStats = useCallback(async () => {
        try {
            const response = await request(
                "/api/stat/",
                "GET",
                {},
                {
                    Authorization: `Bearer: ${token}`,
                }
            );
            if (response.length > 0) setPersonStats(response);
        } catch (e) {}
    }, []);

    useEffect(() => {
        checkPersonStats(Date.parse(date));
    }, [date, personStats]);
    useEffect(() => {
        (async () => {
            await loadProfile();
            await loadStats();
            setIsLoading(false);
        })();
    }, [loadProfile, loadStats]);
    useEffect(() => {
        clearError();
    }, [clearError]);

    if (loading || isLoading)
        return (
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
        );

    if (error) return <h1>{error}</h1>;

    if (!profile) return <h1>Спочатку створіть профіль!</h1>;
    else
        return (
            <div>
                <MainСalories
                    profile={profile}
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
                    <button
                        className="btn_data"
                        onClick={() => setCalendar(!calendar)}
                    >
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
                        onClick={() => {
                            confirmStats(Date.parse(date));
                        }}
                    >
                        Зберегти
                    </MyButton>
                </div>
            </div>
        );
};
export default Main;
