import React, { useCallback, useContext, useEffect, useState } from "react";
import "../components/stats/stats.css";
import { StatsTable } from "../components/stats/StatsTable";
import { StatsChart } from "../components/stats/StatsChart";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MyButton from "../components/UI/button/MyButton";

const Statistics = () => {
    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(false);
    const [stats, setStats] = useState([]);
    const [filteredStats, setFilteredStats] = useState(stats);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(new Date());
    const [showSearch, setShowSearch] = useState(false);
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
            if (response.length > 0) {
                setStats(response);
                setFilteredStats(response);
            }
        } catch (e) {}
    }, []);

    useEffect(() => {
        loadProfile();
        loadStats();
    }, [loadProfile, loadStats]);
    useEffect(() => {
        clearError();
    }, [clearError]);

    stats.sort((a, b) => {
        var keyA = a.timestamp,
            keyB = b.timestamp;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    const filterStats = (from, to) => {
        const temp = stats.filter(
            (stat) => stat.timestamp >= from && stat.timestamp <= to
        );
        setFilteredStats(temp);
    };

    if (loading) return <h1>loading</h1>;
    if (error) return <h1>{error}</h1>;
    if (!profile) return <h1>Спочатку створіть профіль!</h1>;
    else
        return (
            <div>
                {stats.length > 1 && (
                    <MyButton
                        style={{ position: "relative" }}
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        Пошук за певними датами
                    </MyButton>
                )}
                {showSearch && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",

                            position: "absolute",
                            background: "#ffffffc7",
                            border: "2px solid #ffa800",
                            padding: "10px",
                            borderRadius: "10px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <div style={{ marginRight: "20px" }}>
                                <h2
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Від
                                </h2>
                                <Calendar
                                    value={from}
                                    onChange={(value) =>
                                        setFrom(Date.parse(value))
                                    }
                                    locale="uk-UA"
                                />
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    До
                                </h2>
                                <Calendar
                                    value={to}
                                    onChange={(value) =>
                                        setTo(Date.parse(value))
                                    }
                                    locale="uk-UA"
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <MyButton
                                style={{ marginRight: "20px" }}
                                onClick={() => filterStats(from, to)}
                            >
                                Пошук
                            </MyButton>
                            <MyButton
                                onClick={() => {
                                    setFrom(0);
                                    setTo(new Date());
                                    filterStats(0, new Date());
                                }}
                            >
                                Скинути
                            </MyButton>
                        </div>
                    </div>
                )}
                {filteredStats.length > 0 ? (
                    <>
                        {filteredStats.length > 1 ? (
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
                                    <StatsChart stats={filteredStats} />
                                </div>
                                <p style={{ marginLeft: "10px" }}>Грами</p>
                            </div>
                        ) : (
                            <h2>
                                Для відображення графіку, додайте ще один запис
                            </h2>
                        )}

                        <StatsTable profile={profile} stats={filteredStats} />
                    </>
                ) : (
                    <h2>Записів немає</h2>
                )}
            </div>
        );
};

export default Statistics;
