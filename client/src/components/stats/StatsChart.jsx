import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const StatsChart = ({ stats }) => {
    const labels = stats
        .map((stat) => stat.timestamp)
        .sort()
        .map((timestamp) =>
            new Date(timestamp).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            })
        );
    const calories = stats.map((stat) =>
        stat.personMeals.length > 0
            ? stat.personMeals
                  .map((meal) => meal.calories)
                  .reduce((prev, curr) => prev + curr)
            : 0
    );
    const carbohydrates = stats.map((stat) =>
        stat.personMeals.length > 0
            ? stat.personMeals
                  .map((meal) => meal.carbohydrates)
                  .reduce((prev, curr) => prev + curr)
            : 0
    );
    const proteins = stats.map((stat) =>
        stat.personMeals.length > 0
            ? stat.personMeals
                  .map((meal) => meal.proteins)
                  .reduce((prev, curr) => prev + curr)
            : 0
    );
    const fats = stats.map((stat) =>
        stat.personMeals.length > 0
            ? stat.personMeals
                  .map((meal) => meal.fats)
                  .reduce((prev, curr) => prev + curr)
            : 0
    );
    const options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Графік споживаних калорій",
            },
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left",
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",

                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: "Калорії",
                data: calories,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Вуглеводи",
                data: carbohydrates,
                borderColor: "rgb(240, 117, 117)",
                backgroundColor: "rgba(240, 117, 117, 0.5)",
                yAxisID: "y1",
            },
            {
                label: "Білки",
                data: proteins,
                borderColor: "rgb(147, 150, 116)",
                backgroundColor: "rgba(147, 150, 116, 0.5)",
                yAxisID: "y1",
            },
            {
                label: "Жири",
                data: fats,
                borderColor: "rgb(69, 127, 160)",
                backgroundColor: "rgba(69, 127, 160, 0.5)",
                yAxisID: "y1",
            },
        ],
    };
    return <Line options={options} data={data} />;
};
