// CircularProgress.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ value }) => {
  return (
    <CircularProgressbar
      value={value}
      text={`${value.toFixed(2)}%`}
      styles={buildStyles({
        textColor: "#4A5568",
        pathColor: "#3182ce",
        trailColor: "#e2e8f0",
      })}
    />
  );
};

export default CircularProgress;
