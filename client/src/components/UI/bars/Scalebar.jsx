import React from "react";
import classes from "./Scalebar.module.css";

const Scalebar = ({ totalValue, currentValue, barColor }) => {
  return (
    <div className={classes.statsBar}>
      <div
        className={classes.statsFillBar}
        style={
          currentValue / totalValue > 1
            ? { width: "100%", backgroundColor: "red" }
            : {
                width: `${(currentValue / totalValue) * 100}%`,
                backgroundColor: barColor,
              }
        }
      ></div>
    </div>
  );
};

export default Scalebar;
