import React, {useEffect, useState} from 'react';
import {Button} from '../Button/Button';
import classes from './Pair.module.css';
import gnome from './gnome.png';
import header from './header.png';
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import {tokenIdentifier} from "../../../utils/utils";

const unStake = async (tid, type,  callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
    });
    let data;
    if (type == 'egold') {
        data = await actor.unStake(tid)
    } else if (type == 'ecoal') {
        data = await actor.unStakeCoal(tid)
    }
    callback(data)
}

const getDeltaTime = (start) => {
    const deltaT = new Date(Date.now() - Math.trunc(start/1000000))
    const days = Math.trunc(deltaT/(24*60*60*1000))
    const hours = Math.trunc((deltaT - (Math.trunc(deltaT/(24*60*60*1000))*24*60*60*1000)) / (60*60*1000))
    return {days: days, hours: hours}
}

export const Pair = ({pair, setWait, setRefresh}) => {
    const rang = {10: "Ordinary", 11: "Lieutenant", 12: "Captain", 13: "Major", 14: "L.Colonel", 15: "Colonel", 17: "General", 20: "Marshal"}
    const [stakedTime, setStakedTime] = useState(null)
    if (!stakedTime) {
        setStakedTime(JSON.stringify(getDeltaTime(parseInt(pair.startStaketime))))
    }
    useEffect(() => {
        setTimeout(() => {JSON.stringify(setStakedTime(getDeltaTime(parseInt(pair.startStaketime))))}, 24*60*60*1000)
    }, [stakedTime])
    return (
        <div className={classes.root}>
            {pair.type == 'egold' ?
                <>
                    <div className={classes.wrapBtn}>
                        <Button buttonType={"middleBtn"} style={{}} active={true} onClick={() => {
                            setWait(true)
                            unStake(pair['character']['tid'], pair.type, (d) => {
                                setWait(false)
                            })
                        }}>Unstake</Button>
                    </div>
                    <div className={classes.header} style={{background: `url(${header})`}}><span>GOLD</span>
                        <span>{stakedTime ? JSON.parse(stakedTime).days : "00"}d
                    : {stakedTime ? (Math.trunc(JSON.parse(stakedTime).hours/10) == 0 ? "0" + JSON.parse(stakedTime).hours : JSON.parse(stakedTime).hours) : "00"}h</span></div>
                    <div className={classes.picture}><img src={gnome} alt="Picture"/></div>
                    <div className={classes.stakeParams}>
                        <div>NRIc = {parseFloat(pair.rarityRate) % 10 == 0 ? parseFloat(pair.rarityRate)/10 + ".0" : parseFloat(pair.rarityRate)/10}x</div>
                        <div>{rang[pair.rank]} = {parseFloat(pair.rank) % 10 == 0 ? parseFloat(pair.rank)/10 + ".0" : parseFloat(pair.rank)/10}x</div>
                        <div>EARN = {pair.eGold_amount}/day</div>
                        <div>D#{pair.character.index+1} + W#{pair.weapon.index+1}</div>
                    </div>
                </> :
                <>
                    <div className={classes.wrapBtn}>
                        <Button buttonType={"middleBtn"} style={{}} active={true} onClick={() => {
                            setWait(true)
                            unStake(pair['weapon_1']['tid'], pair.type, (d) => {
                                setWait(false)
                            })
                        }}>Unstake</Button>
                    </div>
                    <div className={classes.header} style={{background: `url(${header})`}}><span className={classes.coal}>COAL</span>
                        <span>{stakedTime ? JSON.parse(stakedTime).days : "00"}d
                    : {stakedTime ? (Math.trunc(JSON.parse(stakedTime).hours/10) == 0 ? "0" + JSON.parse(stakedTime).hours : JSON.parse(stakedTime).hours) : "00"}h</span></div>
                    <div className={classes.pictureCoal}><img src={gnome} alt="Picture"/></div>
                    <div className={classes.stakeParams}>
                        {/*<div>NRIc = {parseFloat(pair.rarityRate) % 10 == 0 ? parseFloat(pair.rarityRate)/10 + ".0" : parseFloat(pair.rarityRate)/10}x</div>*/}
                        <div>{rang[pair.rank]} = {parseFloat(pair.rank) % 10 == 0 ? parseFloat(pair.rank)/10 + ".0" : parseFloat(pair.rank)/10}x</div>
                        <div>EARN = {pair.eCoal_amount}/week</div>
                        <div>W#{pair.weapon_1.index+1} + W#{pair.weapon_2.index+1}</div>
                    </div>
                </>
                }
                </div>
                );
            };