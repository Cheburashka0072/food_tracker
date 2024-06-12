import React, { useContext } from "react";
import { ProfileContext } from "../../context";
import { Tooltip } from "../UI/Tooltip/Tooltip";

export const StatsTable = ({ stats }) => {
    return (
        <div
            style={{ borderBottom: "1px solid #d9d9d9", marginBottom: "15px" }}
        >
            <p
                style={{
                    textAlign: "right",
                    marginBottom: "10px",
                    fontSize: "12px ",
                }}
            >
                Для детальної інформації про споживання наведіть на бажаний
                рядок таблиці
            </p>
            <div className="table__row">
                <div className="table__row-item">Дата</div>
                <div className="table__row-item">Норма</div>
                <div className="table__row-item">Калорії</div>
                <div className="table__row-item">Вуглеводи (г)</div>
                <div className="table__row-item">Білки (г)</div>
                <div className="table__row-item">Жири (г)</div>
                <div className="table__row-item">Вода (Л)</div>
            </div>

            {stats.map(
                (stat) =>
                    stat.personMeals && (
                        <Tooltip
                            key={stat.timestamp}
                            text={stat.personMeals.map(
                                (meal) => `${meal.name}: ${meal.gram}г`
                            )}
                        >
                            <div
                                className="table__row"
                                style={
                                    stat.personMeals.length > 0 &&
                                    stat.personMeals
                                        .map((meal) => meal.calories)
                                        .reduce((prev, curr) => prev + curr) >
                                        stat.BMR
                                        ? { backgroundColor: "#ff675c" }
                                        : {}
                                }
                            >
                                <div className="table__row-item">
                                    {new Date(
                                        stat.timestamp
                                    ).toLocaleDateString("uk-UA", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    })}
                                </div>

                                <div className="table__row-item">
                                    {stat.BMR.toFixed(0)}
                                </div>
                                <div className="table__row-item">
                                    {stat.personMeals.length > 0
                                        ? stat.personMeals
                                              .map((meal) => meal.calories)
                                              .reduce(
                                                  (prev, curr) => prev + curr
                                              )
                                              .toFixed(0)
                                        : 0}
                                </div>
                                <div className="table__row-item">
                                    {stat.personMeals.length > 0
                                        ? stat.personMeals
                                              .map((meal) => meal.carbohydrates)
                                              .reduce(
                                                  (prev, curr) => prev + curr
                                              )
                                              .toFixed(0)
                                        : 0}
                                </div>
                                <div className="table__row-item">
                                    {stat.personMeals.length > 0
                                        ? stat.personMeals
                                              .map((meal) => meal.proteins)
                                              .reduce(
                                                  (prev, curr) => prev + curr
                                              )
                                              .toFixed(0)
                                        : 0}
                                </div>
                                <div className="table__row-item">
                                    {stat.personMeals.length > 0
                                        ? stat.personMeals
                                              .map((meal) => meal.fats)
                                              .reduce(
                                                  (prev, curr) => prev + curr
                                              )
                                              .toFixed(0)
                                        : 0}
                                </div>

                                <div className="table__row-item">
                                    {stat.water * 0.25}
                                </div>
                            </div>
                        </Tooltip>
                    )
            )}
        </div>
    );
};
