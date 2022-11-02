import React from "react";
import classes from "./AccountButton.module.css";

export const AccountButton = ({onClick}) => {
  return (
    <div onClick={onClick} className={classes.root}>
      <div className={classes.text}>
        <p>Set up inventory</p>
      </div>
    </div>
  );
};
