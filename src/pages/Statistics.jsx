import React, { useState } from "react";

const Statistics = () => {
    const localStats = localStorage.getItem("recordedStats");
    const [stats, setStats] = useState(JSON.parse(localStats) || []);
    return (
        <div>
            <div style={{ display: "flex" }}>
                <div>Дата</div>
                <div>Калорії</div>
                <div>Вуглеводи</div>
                <div>Білки</div>
                <div>Жири</div>
                <div>Вода</div>
            </div>
            {stats.map((stat) => (
                <div style={{ display: "flex" }}>
                    <div>
                        {new Date(stat.timestamp).toLocaleDateString("uk-UA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        })}
                    </div>
                    <div>
                        {stat.personMeals
                            .map((meal) => meal.calories)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div>
                        {stat.personMeals
                            .map((meal) => meal.carbohydrates)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div>
                        {stat.personMeals
                            .map((meal) => meal.proteins)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div>
                        {stat.personMeals
                            .map((meal) => meal.fats)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div>{stat.water}</div>
                </div>
            ))}
        </div>
    );
};

export default Statistics;
