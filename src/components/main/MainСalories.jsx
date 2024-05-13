import React from "react";
import "./mainCalories.css";
import Scalebar from "../UI/bars/Scalebar";

const MainСalories = ({
  personCalories,
  personCarbohydrates,
  personProteins,
  personFats,
}) => {
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
            <span style={{ color: "#fff", fontSize: "28px" }}>ккал</span>
          </div>
          <div className="info">
            <div className="item_calories">
              <span className="label">Вуглеводи</span>
              <div style={{ paddingLeft: "10px" }} className="item_stats">
                <Scalebar
                  totalValue={239}
                  currentValue={personCarbohydrates}
                  barColor={"#f07575"}
                />
                <span style={{ paddingLeft: "20px" }}>
                  {personCarbohydrates}/239г
                </span>
              </div>
            </div>
            <div className="item_calories">
              <span className="label">Білки</span>
              <div style={{ paddingLeft: "87px" }} className="item_stats">
                <Scalebar
                  totalValue={100}
                  currentValue={personProteins}
                  barColor={"#939674"}
                />
                <span style={{ paddingLeft: "20px" }}>
                  {personProteins}/100г
                </span>
              </div>
            </div>
            <div className="item_calories">
              <span className="label">Жири</span>
              <div style={{ paddingLeft: "83px" }} className="item_stats">
                <Scalebar
                  totalValue={27}
                  currentValue={personFats}
                  barColor={"#457FA0"}
                />
                <span style={{ paddingLeft: "20px" }}>{personFats}/27г</span>
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
              personCalories > 2000
                ? { top: "0%", backgroundColor: "red" }
                : { top: `${(1 - personCalories / 2000) * 100}%` }
            }
          ></div>
        </div>
        <div className="circle__innerStats">
          {personCalories > 2000 ? (
            <>
              <span style={{ fontSize: "32px" }}>
                {-(2000 - personCalories)}
              </span>

              <span>ккал наїв</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: "32px" }}>{2000 - personCalories}</span>

              <span>ккал залишилось</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainСalories;
