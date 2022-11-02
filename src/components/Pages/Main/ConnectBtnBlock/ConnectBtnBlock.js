import React from 'react';
import { Button } from "../../../UI/Button/Button";
import classes from "./ConnectBtnBlock.module.css";

export const ConnectBtnBlock = ({init}) => {
    return (
        <div className={classes.root}>
            <div className={classes.standart}>
                <Button onClick={() => init()} style={{}} active={true} buttonType="leftArrDecor">Internet identity</Button>
                <Button onClick={() => init()} style={{}} buttonType="leftArr">Stoic identity</Button>
                <Button onClick={() => init()} style={{}} buttonType="middleRightDecor">Plug identity</Button>
            </div>
            <div className={classes.ipad}>
                <div>
                    <Button onClick={() => init()} style={{}} active={true} buttonType="leftArrDecor">Internet identity</Button>
                    <Button onClick={() => init()} style={{}} buttonType="middleRightDecor">Stoic identity</Button>
                </div>
                    <Button onClick={() => init()} style={{}} buttonType="middleRightDecor">Plug identity</Button>
            </div>
            <div className={classes.phone}>
                <Button onClick={() => init()} style={{}} active={true} buttonType="middleBtn">Internet identity</Button>
                <Button onClick={() => init()} style={{}} buttonType="middleBtn">Stoic identity</Button>
                <Button onClick={() => init()} style={{}} buttonType="middleBtn">Plug identity</Button>
            </div>
        </div>
    );
};