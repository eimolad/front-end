import React from 'react';
import classes from "./Tokens.module.css";
import decor from "./decor.png";
import {Token} from "../../UI/Token/Token";

export const Tokens = ({balances, selected, setSelected, setSelectedNFTs, setSelectedWNFTs}) => {
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.collectName}>Tokens</div>
            </div>
            <div className={classes.decor}><img src={decor} alt="decor"/></div>
            <div className={classes.tokens}>
                <Token name="icp" balances={balances} selected={selected} setSelected={setSelected} setSelectedNFTs={setSelectedNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                <Token name="gold" balances={balances} selected={selected} setSelected={setSelected} setSelectedNFTs={setSelectedNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                <Token name="coal" balances={balances} selected={selected} setSelected={setSelected} setSelectedNFTs={setSelectedNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                <Token name="ore" balances={balances} selected={selected} setSelected={setSelected} setSelectedNFTs={setSelectedNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                <Token name="adit" balances={balances} selected={selected} setSelected={setSelected} setSelectedNFTs={setSelectedNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
            </div>
        </div>
    );
};