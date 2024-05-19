import React from "react";

export const StatsTable = ({ stats }) => {
    return (
        <div>
            <div className="table__row">
                <div className="table__row-item">Дата</div>
                <div className="table__row-item">Калорії</div>
                <div className="table__row-item">Вуглеводи (г)</div>
                <div className="table__row-item">Білки (г)</div>
                <div className="table__row-item">Жири (г)</div>
                <div className="table__row-item">Вода (Л)</div>
            </div>
            {stats.map((stat) => (
                <div className="table__row">
                    <div className="table__row-item">
                        {new Date(stat.timestamp).toLocaleDateString("uk-UA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        })}
                    </div>

                    <div className="table__row-item">
                        {stat.personMeals
                            .map((meal) => meal.calories)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div className="table__row-item">
                        {stat.personMeals
                            .map((meal) => meal.carbohydrates)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div className="table__row-item">
                        {stat.personMeals
                            .map((meal) => meal.proteins)
                            .reduce((prev, curr) => prev + curr)}
                    </div>
                    <div className="table__row-item">
                        {stat.personMeals
                            .map((meal) => meal.fats)
                            .reduce((prev, curr) => prev + curr)}
                    </div>

                    <div className="table__row-item">{stat.water}</div>
                </div>
            ))}
        </div>
    );
};
