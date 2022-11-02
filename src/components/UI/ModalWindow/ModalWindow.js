/* global BigInt */
import React, { useState, useEffect } from "react";
import "./ModalWindow.css";
import cornerDecorRight from "./cornerDecorRight.png";
import cornerDecorLeft from "./cornerDecorLeft.png";

export const ModalWindow = ({ active, setActive,children}) => {

  return (
    <div className={active ? "modal act" : "modal"} onClick={() => {setActive(false)}}>
      <div
        className="warning_modal__content warning"
        //onClick={(e) => e.stopPropagation()}
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
