import React, { useState } from "react";
import "../components/stats/stats.css";
import { StatsTable } from "../components/stats/StatsTable";
import { StatsChart } from "../components/stats/StatsChart";

const Statistics = () => {
    const localStats = localStorage.getItem("recordedStats");
    const [stats, setStats] = useState(JSON.parse(localStats) || []);
    stats.sort((a, b) => {
        var keyA = a.timestamp,
            keyB = b.timestamp;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    return (
        <div>
            {stats.length > 0 ? (
                <>
                    {stats.length > 1 ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "30px",
                            }}
                        >
                            <p style={{ marginRight: "10px" }}>Калорії</p>
                            <div style={{ width: "75%" }}>
                                <StatsChart stats={stats} />
                            </div>
                            <p style={{ marginLeft: "10px" }}>Грами</p>
                        </div>
                    ) : (
                        <h2>Для відображення графіку, додайте ще один запис</h2>
                    )}
                    <StatsTable stats={stats} />
                </>
            ) : (
                <h2>Записів немає</h2>
            )}
        </div>
    );
};

export default Statistics;
