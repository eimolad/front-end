import React from 'react';
import classes from "./SocialButton.module.css";

export const SocialButton = ({imgSrc, lnk}) => {
    return (
        <div className={classes.root}>
            <a href={lnk}><img src={imgSrc} alt=""/></a>
        </div>
    );
};