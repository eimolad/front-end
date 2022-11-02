import React, {useEffect, useState, useRef} from 'react';
import classes from "./CollectionsForStake.module.css";
import loader from "../../../media/loader.gif";
import {Carousel} from "../Carousel/Carousel";


export const CollectionsForStake = ({nfts, task, selectedWNFTs, setSelectedWNFTs, filt}) => {

    let content = []

    if (nfts && (nfts != "{}")) {
        for (let collect in JSON.parse(filt)) {
            if (JSON.parse(filt)[collect]) {
                content.push(
                    <div className={classes.carousel} key={collect}>
                        <Carousel collect={collect} nfts={JSON.parse(nfts)} task={task} selectedWNTFs={selectedWNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                    </div>
                )
            }
        }
    }

    return (
        <div className={classes.root}>
            {content.length>0 ? content : null}
        </div>
    );
};
