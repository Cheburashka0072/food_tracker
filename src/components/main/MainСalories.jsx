import React from "react";
import "./mainCalories.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const MainСalories = () => {
  return (
    <div className="block">
      <div className="block__calories">
        <div className="text-container">
          <h2 className="title">Споживання:</h2>
          <div className="info">
            <div className="item_calories">
              <span className="label">Вуглеводи</span>
            </div>
            <div className="item_calories">
              <span className="label">Білки</span>
            </div>
            <div className="item_calories">
              <span className="label">Жири</span>
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
