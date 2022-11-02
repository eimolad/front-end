import React, {useState} from 'react';
import {NFTcar} from "../../UI/NFTcar/NFTcar";
import classes from "./Carousel.module.css";
import decor from "../NFTs/decor.png";
import loader from "../../../media/loader.gif";
import leftArr from "./leftArrow.png";
import rightArr from "./rightArrow.png";

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

export const Carousel = ({nfts, collect, task, selectedWNTFs, setSelectedWNFTs}) => {
    let NFTs = []
    const [pos, setPos] = useState(0)
    let collectInfo = getCollectInfo(collect, nfts)


    for (let nft in nfts) {
        if (nfts[nft].collection === collect) {
            NFTs.push(
                <NFTcar key={nft} nft={nfts[nft]} task={task} selectedWNFTs={selectedWNTFs}
                        setSelectedWNFTs={setSelectedWNFTs}/>)
        }
    }
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.collectName}>{collect}</div>
                <div className={classes.count}><span>{collectInfo.wrappedCount}</span></div>
            </div>
            <div className={classes.decor}><img src={decor} alt="decor"/></div>
            <div className={classes.carousel}>
                {NFTs.length > 0 ?
                    <>
                        <div className={classes.leftArr} onClick={() => {
                            let sw = 200;
                            if ((window.screen.width >= 768) && (window.screen.width < 1110)) {sw = 170}
                            if ((window.screen.width >= 540) && (window.screen.width < 768)) {sw = 180}
                            if (window.screen.width < 540) {sw = 170}
                            if (-pos < ((nfts.length-3) * sw)) setPos(pos - sw)
                        }}><img src={leftArr} alt=""/></div>

                        <div className={classes.carouselWrapper}>
                            <div className={classes.items} style={{marginLeft: `${pos}px`}}>
                                {NFTs.length > 0 ? NFTs : <div className={classes.loader}>{loader}</div> }
                            </div>
                        </div>
                        <div className={classes.rightArr} onClick={() => {
                            let sw = 200;
                            if ((window.screen.width >= 768) && (window.screen.width < 1110)) {sw = 170}
                            if ((window.screen.width >= 540) && (window.screen.width < 768)) {sw = 180}
                            if (window.screen.width < 540) {sw = 170}
                            if (pos < 0) setPos(pos + sw)
                        }}><img src={rightArr} alt=""/></div>
                    </>
                    : <div className={classes.nothing}>Nothing</div>}
            </div>
        </div>
    );
};
