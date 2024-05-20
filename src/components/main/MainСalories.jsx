import React, { useContext } from "react";
import "./mainCalories.css";
import Scalebar from "../UI/bars/Scalebar";
import { ProfileContext } from "../../context";

const MainСalories = ({
    personCalories,
    personCarbohydrates,
    personProteins,
    personFats,
}) => {
    const { profile } = useContext(ProfileContext);
    return (
        <div className="block">
            <div className="block__calories">
                <div className="text-container">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            marginBottom: "10px",
                        }}
                    >
                        <h2 className="title">Споживання:</h2>
                        <span
                            style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "32px",
                                marginRight: "10px",
                            }}
                        >
                            {personCalories}
                        </span>
                        <span style={{ color: "#fff", fontSize: "28px" }}>
                            ккал
                        </span>
                    </div>
                    <div className="info">
                        <div className="item_calories">
                            <span className="label">Вуглеводи</span>
                            <div
                                style={{ paddingLeft: "10px" }}
                                className="item_stats"
                            >
                                <Scalebar
                                    totalValue={(profile.BMR * 0.4) / 4}
                                    currentValue={personCarbohydrates}
                                    barColor={"#f07575"}
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                    {personCarbohydrates.toFixed(2)}/
                                    {((profile.BMR * 0.4) / 4).toFixed(0)}г
                                </span>
                            </div>
                        </div>
                        <div className="item_calories">
                            <span className="label">Білки</span>
                            <div
                                style={{ paddingLeft: "87px" }}
                                className="item_stats"
                            >
                                <Scalebar
                                    totalValue={(profile.BMR * 0.3) / 4}
                                    currentValue={personProteins}
                                    barColor={"#939674"}
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                    {personProteins.toFixed(2)}/
                                    {((profile.BMR * 0.3) / 4).toFixed(0)}г
                                </span>
                            </div>
                        </div>
                        <div className="item_calories">
                            <span className="label">Жири</span>
                            <div
                                style={{ paddingLeft: "83px" }}
                                className="item_stats"
                            >
                                <Scalebar
                                    totalValue={(profile.BMR * 0.3) / 9}
                                    currentValue={personFats}
                                    barColor={"#457FA0"}
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                    {personFats.toFixed(2)}/
                                    {((profile.BMR * 0.3) / 9).toFixed(0)}г
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block__circleStats">
                <div className="circle__external">
                    <div
                        className="circle__inner"
                        style={
                            personCalories > profile.BMR
                                ? { top: "0%", backgroundColor: "red" }
                                : {
                                      top: `${
                                          (1 - personCalories / profile.BMR) *
                                          100
                                      }%`,
                                  }
                        }
                    ></div>
                </div>
                <div
                    className="circle__innerStats"
                    style={{ color: "white", fontSize: "18px" }}
                >
                    {personCalories > profile.BMR ? (
                        <>
                            <span style={{ fontSize: "32px" }}>
                                {(-(profile.BMR - personCalories)).toFixed(0)}
                            </span>

                            <span>ккал перевищення</span>
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: "32px" }}>
                                {(profile.BMR - personCalories).toFixed(0)}
                            </span>

                            <span>ккал залишилось</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainСalories;
