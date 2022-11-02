/* global BigInt */
import React, {useEffect, useState} from 'react';
import {Pair} from "../../UI/Pair/Pair";
import classes from "./ActivePairs.module.css";
import decor from "./decor.png";
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";


const getStakeFromAID = async (callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
    });

    await actor.getStakeFromAID().then((data) => {
        callback(data)
    });

}

export const ActivePairs = ({address, setWait, stakedPairs, setRefresh}) => {

    return (
        <div className={classes.root}>
            <div className={classes.pairs}>
                {stakedPairs ?
                    JSON.parse(stakedPairs).map(pair => {
                        return (
                            <Pair pair={pair} key={JSON.stringify(pair)} setWait={setWait} setRefresh={setRefresh}/>
                            )
                    })
                    : null
                }
            </div>
            <div className={classes.decor}><img src={decor} alt="Decor"/></div>
        </div>
    );
};