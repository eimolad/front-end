/* global BigInt */
import React, { useState, useEffect } from "react";
import classes from './ConfirmingModal.module.css'
import cornerDecorRight from "./cornerDecorRight.png";
import cornerDecorLeft from "./cornerDecorLeft.png";
import { Button } from "../../Button/Button";

export const ConfirmingModal = ({ active, setActive,setConfirming}) => {
  
  const rootClasses=[classes.modal]
  if (active){
    rootClasses.push(classes.act)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => {setActive(false)}}>
      <div
        className="warning_modal__content warning"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="cornerDecorLeft"
          src={cornerDecorLeft}
          alt="Corner Decor"
        />
        <img
          className="cornerDecorRight"
          src={cornerDecorRight}
          alt="Corner Decor"
        />
        <div className="forBorderMarket">
        <h1>Do you want to unstake?</h1>
        <Button
          buttonType={"middleBtn"}
          style={{}}
          active={true}
          onClick={() => {
            setActive(false);
            setConfirming(true);
          }}
        >
          YES
        </Button>
        </div>
      </div>
    </div>
  );
};
