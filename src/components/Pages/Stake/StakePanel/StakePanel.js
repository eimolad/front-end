import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {NFTStakingCard} from "../NFTStakingCard/NFTStakingCard";
import Pair from "../Pair/Pair";

let dwarves = []
let weapons = []

export const StakePanel = ({nfts, setRefresh}) => {
    const [stakeCharacter, setStakeCharacter] = useState()
    const [stakeWeapon, setStakeWeapon] = useState()

    useEffect(() => {
        // console.log(stakeCharacter)
        // console.log(stakeWeapon)
    }, [stakeCharacter, stakeWeapon])

    useEffect(() => {
        dwarves = []
        for (let i=0; i<nfts.length; i++) {
            dwarves.push(<NFTStakingCard setStake={setStakeCharacter} nft={nfts[i]} stake={stakeCharacter} setRefresh={setRefresh} collect="dwarves" index={i}/>)
        }
        weapons = []
        for (let i=0; i<nfts.length; i++) {
            weapons.push(<NFTStakingCard setStake={setStakeWeapon} nft={nfts[i]} stake={stakeWeapon} setRefresh={setRefresh} collect="weapons" index={i}/>)
        }
    }, [])

    return (
        <>
            <Grid container spacing={2} style={{ width: "50%", padding: "20px 150px 20px 20px" }}> {dwarves} </Grid>
            <Pair stakeCharacter={stakeCharacter} stakeWeapon={stakeWeapon}/>
            <Grid container spacing={2} style={{ width: "50%", padding: "20px 150px 20px 20px" }}> {weapons} </Grid>
        </>
    );
}