import React from "react";
import classes from "./AccountSelect.module.css"
import vector from './vector.png';

export const AccountSelect = ()=>{

    return(
        <div className={classes.root}>
            <div className={classes.left}><p>Setting default 1</p></div>
            <div className={classes.right}>
            <img src={vector} alt='down'></img>
            </div>
        </div>
    )

}