import React, { useState, useEffect } from "react";
import classes from "./MarketItem.module.css";
import icon from "./../axeIcon.png";

export const MarketItem = ({}) => {
  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <img src={icon}/>
      </div>
      <div className={classes.titleDescription}>
        <p>Dwarf 1</p>
      </div>
      <div className={classes.quantity}>
        <p>1</p>
      </div>
      <div className={classes.price}>
        <p>1220</p>
      </div>
      <div className={classes.button}>
        <div>
        <p>Buy</p>
        </div>
      </div>
    </div>
  );
};
