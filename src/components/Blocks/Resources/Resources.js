import React, {useEffect, useState} from 'react';
import {ResourceCard} from "../../UI/ResourceCard/ResourceCard";
import classes from "./Resources.module.css";
import eGold from './eGold.png';
import eCoal from './eCoal.png';
import eBrilliant from './adit.png';
import eWood from './eWood.png';
import lgs from './lgs.png'

export const Resources = ({balances}) => {
    return (
        <div className={classes.root}>
            <ResourceCard imgSrc={eGold} resource="eGold" position="first">{JSON.parse(balances) ? JSON.parse(balances).gold : "0"}</ResourceCard>
            <ResourceCard imgSrc={eCoal} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).coal : "0"}</ResourceCard>
            <ResourceCard imgSrc={eWood} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).ore : "0"}</ResourceCard>
            <ResourceCard imgSrc={eBrilliant} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).adit : "0"}</ResourceCard>
            <ResourceCard imgSrc={lgs} resource="LGS" position="last">{JSON.parse(balances) ? JSON.parse(balances).lgs : "0"}</ResourceCard>
        </div>
    );
};