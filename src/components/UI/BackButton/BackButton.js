import React from "react";
import classes from "./BackButton.module.css";
import backIcon from "./back.png";

export const BackButton = ({ url }) => {
  return (
    <div
      className={classes.root}
      onClick={() => {
        if (url !== "play") {
          localStorage.clear();
          window.location.replace(url);
        } else {
          window.history.go(-1);
        }
      }}
    >
      <img src={backIcon} alt="back" />
    </div>
  );
};
