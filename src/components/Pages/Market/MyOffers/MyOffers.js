import React, { useState, useEffect } from "react";
import classes from "./MyOffers.module.css";

export const MyOffers = ({ }) => {
    return (
      <div className={classes.root}>
        <div className={classes.closeButton}>
          <div className={classes.close}>&#x2716;</div>
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
      </div>
    );
};
