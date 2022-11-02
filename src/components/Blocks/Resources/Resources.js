import React, {useEffect, useState} from 'react';
import {ResourceCard} from "../../UI/ResourceCard/ResourceCard";
import classes from "./Resources.module.css";
import eGold from './eGold.png';
import eCoal from './eCoal.png';
import eBrilliant from './eBriliant.png';
import eWood from './eWood.png';

export const Resources = ({balances,page}) => {
    // console.log(balances)

    if (page=="Stake"){
    return (
        <div className={classes.root}>
            <ResourceCard imgSrc={eGold} resource="eGold" position="first">{JSON.parse(balances) ? JSON.parse(balances).gold : "0"}</ResourceCard>
            <ResourceCard imgSrc={eCoal} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).coal : "0"}</ResourceCard>
            <ResourceCard imgSrc={eWood} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).ore : "0"}</ResourceCard>
            <ResourceCard imgSrc={eBrilliant} resource="eGold" position="last">{JSON.parse(balances) ? JSON.parse(balances).adit : "0"}</ResourceCard>
        </div>
    );}

    if (page=="Play"){
        return (
            <div className={classes.rootPlay}>
                <ResourceCard imgSrc={eGold} resource="eGold" position="first">{JSON.parse(balances) ? JSON.parse(balances).gold : "0"}</ResourceCard>
                <ResourceCard imgSrc={eCoal} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).coal : "0"}</ResourceCard>
                <ResourceCard imgSrc={eWood} resource="eGold" position="between">{JSON.parse(balances) ? JSON.parse(balances).ore : "0"}</ResourceCard>
                <ResourceCard imgSrc={eBrilliant} resource="eGold" position="last">{JSON.parse(balances) ? JSON.parse(balances).adit : "0"}</ResourceCard>
            </div>
        );}

};