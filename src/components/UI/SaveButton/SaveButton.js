import React from "react";
import classes from "./SaveButton.module.css";

export const SaveButton = ({ onClick, active }) => {
  if (active) {
    return (
      <div className={classes.rootActive} onClick={onClick}>
        <p>Save</p>
      </div>
    );
  } else {
    return (
      <div className={classes.root} onClick={onClick}>
        <p>Save</p>
      </div>
    );
  }
};
