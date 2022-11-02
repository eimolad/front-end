import React from 'react';
import classes from "./BackButton.module.css";
import backIcon from "./back.png";

export const BackButton = ({url}) => {

    return (
        <div className={classes.root} onClick={() => {
            localStorage.clear();
            window.location.replace(url)
        }}>
            <img src={backIcon} alt="back"/>
        </div>
    );
};