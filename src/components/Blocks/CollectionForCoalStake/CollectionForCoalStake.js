import React, {useEffect, useState, useRef} from 'react';
import classes from "./CollectionForCoalStake.module.css";
import loader from "../../../media/loader.gif";
import {NFTcar} from "../../UI/NFTcar/NFTcar";
import decor from "../NFTs/decor.png";
import loaderGif from "../../../media/loader.gif";


const getCollectInfo = (collect, nfts) => {
    let nftsCount = 0;
    let wrappedCount = 0;
    for (let nft in nfts) {
        if (nfts[nft]['collection'] === collect) {
            nftsCount++
            if (nfts[nft].metadata.state === 'wrapped') wrappedCount++
        }
    }
    return {nftsCount: nftsCount, wrappedCount: wrappedCount}
}

export const CollectionForCoalStake = ({collect, nfts, selectedWNTFs, task, setSelectedWNFTs}) => {
    let loader = true
    let NFTs = []
    let collectInfo = getCollectInfo(collect, nfts ? JSON.parse(nfts) : {})

    if (nfts && (nfts != "{}") && loader) {
        for (let tid in JSON.parse(nfts)) {
            if (JSON.parse(nfts)[tid].collection == collect) {
                NFTs.push(<NFTcar nft={JSON.parse(nfts)[tid]} key={tid} task={task} selectedWNFTs={selectedWNTFs} setSelectedWNFTs={setSelectedWNFTs}/>) }
        }
        loader = false
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.collectName}>{collect}</div>
                <div className={classes.count}><span>{collectInfo.wrappedCount}</span></div>
            </div>
            <div className={classes.decor}><img src={decor} alt="decor"/></div>
            {!loader && NFTs.length>0 ? <div className={classes.grid}>{NFTs}</div> :
                !loader && NFTs.length == 0 ? null :
                    <div className={classes.loader}><img src={loaderGif} alt="loader"/></div> }
        </div>
    );
};
