import React from "react";
import "./mainCalories.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Scalebar from "../UI/bars/Scalebar";

const MainСalories = ({
  personCalories,
  personCarbohydrates,
  personProteins,
  personFats,
}) => {
  console.log(personCalories);
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
              <div className="item_stats">
                <Scalebar
                  totalValue={239}
                  currentValue={personCarbohydrates}
                  barColor={"#f07575"}
                />
                <span>{personCarbohydrates}/239г</span>
              </div>
            </div>
            <div className="item_calories">
              <span className="label">Білки</span>
              <div className="item_stats">
                <Scalebar
                  totalValue={100}
                  currentValue={personProteins}
                  barColor={"#939674"}
                />
                <span>{personProteins}/100г</span>
              </div>
            </div>
            <div className="item_calories">
              <span className="label">Жири</span>
              <div className="item_stats">
                <Scalebar
                  totalValue={27}
                  currentValue={personFats}
                  barColor={"#457FA0"}
                />
                <span>{personFats}/27г</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block_data">
        <button>
          <ChevronLeftIcon className="arrow" />
        </button>
        <button className="btn_data">10 КВІТНЯ</button>
        <button>
          <ChevronRightIcon className="arrow" />
        </button>
      </div>
    </div>
  );
};

export default MainСalories;
