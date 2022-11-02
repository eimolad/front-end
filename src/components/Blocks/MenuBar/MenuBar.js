import React from 'react';
import {ToggleMenu} from "../../UI/ToggleMenu/ToggleMenu";
import classes from "./MenuBar.module.css";
import menuDecor from "./menuDecor.png"

export const MenuBar = ({address, children, clicked, setClicked, curLink, setTask}) => {
    return (
        <div className={classes.root}>
            <div>
                <img src={menuDecor} className={classes.left} alt=""/>
                <div className={classes.contentBlock}>
                    <div className={classes.actions}>
                        {children}
                    </div>
                    <ToggleMenu address={address} clicked={clicked} setClicked={setClicked} curLink={curLink} setTask={setTask}/>
                </div>
                <img src={menuDecor} className={classes.right} alt=""/>
            </div>
        </div>
    );
};