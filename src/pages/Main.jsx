import React from "react";
import MainСalories from "../components/main/MainСalories";
import Dishes from "../components/dishes/Dishes";
import Water from "../components/water/Water";

const Main = () => {
  return (
    <div>
      <MainСalories />,
      <Dishes />,
      <Water/>
    </div>
  );
};

export default Main;
