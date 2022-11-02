import React from 'react';
import classes from "./Licenses.module.css";
import decor from "./decor.png";
import {Token} from "../../UI/Token/Token";
import { License } from '../../UI/License/License';

export const Licenses = ({balances, selected, setSelected, setSelectedNFTs, setSelectedWNFTs}) => {
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.collectName}>Licenses</div>
            </div>
            <div className={classes.decor}><img src={decor} alt="decor"/></div>
            <div className={classes.tokens}>
                <License name="lgs" balances={balances} selected={selected} setSelected={setSelected} setSelectedNFTs={setSelectedNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
            </div>
        </div>
    );
};