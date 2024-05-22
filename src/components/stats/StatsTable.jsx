import React, { useContext } from "react";
import { ProfileContext } from "../../context";

export const StatsTable = ({ stats }) => {
    const { profile } = useContext(ProfileContext);
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

            {stats.map(
                (stat) =>
                    stat.personMeals && (
                        <div
                            key={stat.timestamp}
                            className="table__row"
                            style={
                                stat.personMeals.length > 0 &&
                                stat.personMeals
                                    .map((meal) => meal.calories)
                                    .reduce((prev, curr) => prev + curr) >
                                    profile.BMR
                                    ? { backgroundColor: "#ff675c" }
                                    : { backgroundColor: "#6cf56e" }
                            }
                        >
                            <div className="table__row-item">
                                {new Date(stat.timestamp).toLocaleDateString(
                                    "uk-UA",
                                    {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    }
                                )}
                            </div>

                            <div className="table__row-item">
                                {stat.personMeals.length > 0
                                    ? stat.personMeals
                                          .map((meal) => meal.calories)
                                          .reduce((prev, curr) => prev + curr)
                                          .toFixed(0)
                                    : 0}
                            </div>
                            <div className="table__row-item">
                                {stat.personMeals.length > 0
                                    ? stat.personMeals
                                          .map((meal) => meal.carbohydrates)
                                          .reduce((prev, curr) => prev + curr)
                                          .toFixed(0)
                                    : 0}
                            </div>
                            <div className="table__row-item">
                                {stat.personMeals.length > 0
                                    ? stat.personMeals
                                          .map((meal) => meal.proteins)
                                          .reduce((prev, curr) => prev + curr)
                                          .toFixed(0)
                                    : 0}
                            </div>
                            <div className="table__row-item">
                                {stat.personMeals.length > 0
                                    ? stat.personMeals
                                          .map((meal) => meal.fats)
                                          .reduce((prev, curr) => prev + curr)
                                          .toFixed(0)
                                    : 0}
                            </div>

                            <div className="table__row-item">
                                {stat.water * 0.25}
                            </div>
                        </div>
                    )
            )}
        </div>
    );
};
