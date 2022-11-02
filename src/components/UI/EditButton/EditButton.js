import React from "react";
import classes from "./EditButton.module.css"
import editIcon from './editIcon.png'

export const EditButton = ({onClick})=>{

    return(
        <div className={classes.root} onClick={onClick}>
            <img src={editIcon} alt="editIcon"></img>
        </div>
    )

}