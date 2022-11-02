/* global BigInt */
import React, { useState, useEffect } from "react";
import classes from './ModalWindow.module.css'
import cornerDecorRight from "./cornerDecorRight.png";
import cornerDecorLeft from "./cornerDecorLeft.png";

export const ModalWindow = ({ active, setActive,children}) => {
  
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
          {children}
        </div>
      </div>
    </div>
  );
};
