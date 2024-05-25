import React, { useCallback, useContext, useEffect, useState } from "react";
import "../components/stats/stats.css";
import { StatsTable } from "../components/stats/StatsTable";
import { StatsChart } from "../components/stats/StatsChart";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context";

const Statistics = () => {
    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(false);
    const { request } = useHttp();

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

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const localStats = localStorage.getItem("recordedStats");
    const [stats, setStats] = useState(JSON.parse(localStats) || []);
    stats.sort((a, b) => {
        var keyA = a.timestamp,
            keyB = b.timestamp;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    return !profile ? (
        <h1>loading</h1>
    ) : (
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
                    <StatsTable profile={profile} stats={stats} />
                </>
            ) : (
                <h2>Записів немає</h2>
            )}
        </div>
    );
};

export default Statistics;
