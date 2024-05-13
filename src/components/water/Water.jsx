import React, { useState } from "react";
import "./water.css";
import emptyCup from "../../img/water/water1.png";
import filledCup from "../../img/water/water2.png";
const Water = () => {
  const [cups, setCups] = useState(0);
  return (
    <div className="block__water">
      <div className="block__water-title">Вода</div>
      <div style={{ padding: "10px", fontSize: "20px" }}>
        {0.25 * cups}
        {" L"}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[...Array(10).keys()].map((cup) => (
          <button
            key={cup}
            style={{ marginRight: "10px" }}
            onClick={() => {
              cups === cup + 1 ? setCups(0) : setCups(cup + 1);
            }}
          >
            <img src={cups > cup ? filledCup : emptyCup} alt="cup of water" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Water;
