import React from 'react';
import {tokenIdentifier} from "../../../utils/utils"
import "./NFTcar.css"
import wrapped from "./wrapped.png";
import swords from "../NFT/swords.png";

export const NFTcar = ({nft, task, selectedWNFTs, setSelectedWNFTs}) => {
    return (
        <>
            {nft.metadata.state === 'wrapped' ?
                <div className={"rootNFT"}>
                    {task !== 2 ?
                        <div className={JSON.parse(selectedWNFTs)[nft.collection == 'weapons' ? 'equipment' : 'character'] && JSON.parse(selectedWNFTs)[nft.collection == 'weapons' ? 'equipment' : 'character']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index) ? "borderNFT ActiveNFT" : "borderNFT"} onClick={() => {
                            const selW = JSON.parse(selectedWNFTs);
                            if (JSON.parse(selectedWNFTs)[nft.collection == 'weapons' ? 'equipment' : 'character'] && JSON.parse(selectedWNFTs)[nft.collection == 'weapons' ? 'equipment' : 'character']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                                selW[nft.type] = null
                            } else {
                                selW[nft.type] = {
                                    "tid": tokenIdentifier(nft.metadata.ledgerCanister, nft.index),
                                    "canister": nft.metadata.ledgerCanister,
                                    "index": nft.index
                                }
                            }
                            setSelectedWNFTs(JSON.stringify(selW));
                        }
                        }>
                            <div className={"lock stake"}>
                                <h4>{nft.metadata.state == 'wrapped' ? "Wrapped" : "Staked"}</h4>
                            </div>
                            <div className={JSON.parse(selectedWNFTs)[nft.type] && JSON.parse(selectedWNFTs)[nft.type]['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index) ? "activeDesc" : "indexDesc"} onClick={() => {}}> #{nft.index+1}
                                {nft.type == "character" ?
                                    <span className={"rarityRate"}>{nft.metadata.rarityRate}%</span>
                                    :
                                    <span className={"rarityRate swords"}>{nft.rare == 'standart' ?
                                        <img src={swords} alt="swords"/> :
                                        nft.rare == 'rare' ?
                                            <>
                                                <img src={swords} alt="swords"/>
                                                <img src={swords} alt="swords"/>
                                            </> :
                                            <>
                                                <img src={swords} alt="swords"/>
                                                <img src={swords} alt="swords"/>
                                                <img src={swords} alt="swords"/>
                                            </>
                                    }</span>
                                }
                            </div>
                            <div className={JSON.parse(selectedWNFTs)[nft.type] && JSON.parse(selectedWNFTs)[nft.type]['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index) ? "bgCircleNFT selNFT" : "bgCircleNFT"}>
                                <img src={"https://" + nft.metadata.ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + tokenIdentifier(nft.metadata.ledgerCanister, nft.index)} alt={nft.collection}/>
                            </div>
                        </div>
                        :
                        <div className={
                            (JSON.parse(selectedWNFTs)['equipment_1'] && JSON.parse(selectedWNFTs)['equipment_1']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ||
                            (JSON.parse(selectedWNFTs)['equipment_2'] && JSON.parse(selectedWNFTs)['equipment_2']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ? "borderNFT ActiveNFT" : "borderNFT"} onClick={() => {
                            const selW = JSON.parse(selectedWNFTs);
                            if (selW['equipment_1'] && selW['equipment_2']) {
                                for (let eq in selW) {
                                    if (selW[eq]['tid'] == tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                                        selW[eq] = null
                                    }
                                }
                            } else {
                                if (selW['equipment_1']) {
                                    if (selW['equipment_1']['tid'] == tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                                        selW['equipment_1'] = null
                                    } else {
                                        selW['equipment_2'] = {
                                            "tid": tokenIdentifier(nft.metadata.ledgerCanister, nft.index),
                                            "canister": nft.metadata.ledgerCanister,
                                            "index": nft.index
                                        }
                                    }
                                } else {
                                    if (selW['equipment_2'] && selW['equipment_2']['tid'] == tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                                        selW['equipment_2'] = null
                                    } else {
                                        selW['equipment_1'] = {
                                            "tid": tokenIdentifier(nft.metadata.ledgerCanister, nft.index),
                                            "canister": nft.metadata.ledgerCanister,
                                            "index": nft.index
                                        }
                                    }
                                }
                            }
                            setSelectedWNFTs(JSON.stringify(selW));
                        }
                        }>
                            <div className={"lock stake"}>
                                <h4>{nft.metadata.state == 'wrapped' ? "Wrapped" : "Staked"}</h4>
                            </div>
                            <div className={(JSON.parse(selectedWNFTs)['equipment_1'] && JSON.parse(selectedWNFTs)['equipment_1']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ||
                            (JSON.parse(selectedWNFTs)['equipment_2'] && JSON.parse(selectedWNFTs)['equipment_2']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ? "activeDesc" : "indexDesc"} onClick={() => {}}>#{nft.index+1}
                                {nft.type == "character" ?
                                    <span className={"rarityRate"}>{nft.metadata.rarityRate}%</span>
                                    :
                                    <span className={"rarityRate swords"}>{nft.rare == 'standart' ?
                                        <img src={swords} alt="swords"/> :
                                        nft.rare == 'rare' ?
                                            <>
                                                <img src={swords} alt="swords"/>
                                                <img src={swords} alt="swords"/>
                                            </> :
                                            <>
                                                <img src={swords} alt="swords"/>
                                                <img src={swords} alt="swords"/>
                                                <img src={swords} alt="swords"/>
                                            </>
                                    }</span>
                                }
                            </div>
                            <div className={(JSON.parse(selectedWNFTs)['equipment_1'] && JSON.parse(selectedWNFTs)['equipment_1']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ||
                            (JSON.parse(selectedWNFTs)['equipment_2'] && JSON.parse(selectedWNFTs)['equipment_2']['tid'] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ? "bgCircleNFT selNFT" : "bgCircleNFT"}>
                                <img src={"https://" + nft.metadata.ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + tokenIdentifier(nft.metadata.ledgerCanister, nft.index)} alt={nft.collection}/>
                            </div>
                        </div>
                    }
                </div>
                : null}
        </>
    );
};