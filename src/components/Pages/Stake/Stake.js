/* global BigInt */
import React, {useEffect, useState} from 'react'
import {clipboardCopy, getAddress} from "../../../utils/utils";
import {MenuBar} from "../../Blocks/MenuBar/MenuBar";
import {Switch} from "../../UI/Switch/Switch";
import {Tasks} from "../../Blocks/Tasks/Tasks";
import {Filter} from "../../Blocks/Filter/Filter";
import {Footer} from "../../Blocks/Footer/Footer";
import {CollectionsForStake} from "../../Blocks/CollectionsForStake/CollectionsForStake";
import {CollectionForCoalStake} from "../../Blocks/CollectionForCoalStake/CollectionForCoalStake";
import {Button} from "../../UI/Button/Button";
import {ResourceCard} from "../../UI/ResourceCard/ResourceCard";
import {Resources} from "../../Blocks/Resources/Resources";
import {ActivePairs} from "../../Blocks/ActivePairs/ActivePairs";
import classes from "./Stake.module.css"
import bgStake from "../../../media/bg.png"
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import copy from "../Wallet/copy.png";
import loader from "../../../media/loader.gif";


const setStaked = async (selectedWNFTs, task, address, callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "dwyty-piaaa-aaaan-qagma-cai",
    });

    // callback(args)
    if (task == 1) {
        const args = {
            "character": JSON.parse(selectedWNFTs)['character'],
            "weapon": JSON.parse(selectedWNFTs)['equipment'],
            "aid": address,
            'rank' : Number(10),
            'rarityRate' : Number(10),
            "startStaketime": Number(Date.now()*1000000),
            "lastClaimTime": Number(Date.now()*1000000),
            "eGold_amount": 100
        }
        await actor.setStake(args).then((data) => {
            callback(data)
        });
    } else if (task == 2) {
        const args = {
            "weapon_1": JSON.parse(selectedWNFTs)['equipment_1'],
            "weapon_2": JSON.parse(selectedWNFTs)['equipment_2'],
            "aid": address,
            'rank' : Number(10),
            "startStaketime": Number(Date.now()*1000000),
            "lastClaimTime": Number(Date.now()*1000000),
            "eCoal_amount": 10
        }
        await actor.setStakeCoal(args).then((data) => {
            callback(data)
        });
    }

}

export const Stake = ({address, setAddress, nfts, stakedPairs, setRefresh, task, setTask, balances, setBalances}) => {
    if (!address) { if (localStorage.getItem("ic-delegation")) { getAddress(addr => setAddress(addr))
    } else { window.location.assign("/") } }

    const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({"character": null, "equipment": null}));
    const [selectedWWNFTs, setSelectedWWNFTs] = useState(JSON.stringify({"equipment_1": null, "equipment_2": null}));
    const [wait, setWait] = useState(false);
    const [curPos, setCurPos] = useState(0)
    const [filt, setFilt] = useState(JSON.stringify({dwarves: true, weapons: true}))
    const [clickedMenu, setClickedMenu] = useState(false)
    const [copied, setCopied] = useState(false)

    console.log(JSON.parse(selectedWNFTs));


    return (
        <div className={classes.root} style={{backgroundImage: `url(${bgStake})`, backgroundPosition: "top center", backgroundSize: "cover"}} onClick={() =>
        { if (clickedMenu) { setClickedMenu(false); } }}>
            {wait ? <div className={classes.wait}><img src={loader} alt="Wait"/></div> : null}
            {address ? <>
                {!task ?
                    <>
                        <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="stake" setTask={setTask}>
                            <div className={classes.actions}>
                                <Button active={true} buttonType={"middleBtn"} style={{margin: "auto 0"}} onClick={() => {
                                    setTask(1)
                                    setCurPos(1)
                                }}>My staked pairs</Button>
                                <div className={classes.address} onClick={() => {
                                    clipboardCopy(address);
                                    setCopied(true)
                                    setTimeout(() => setCopied(false), 1000)
                                }}>
                                    {copied ? <div>Copied</div> : null}
                                    <img src={copy} alt="Copy address"/>
                                    {address.substr(0,6)+"..." + address.substr(58,64)}
                                </div>
                            </div>
                        </MenuBar>
                        <h2 className={classes.tasksHeader} style={{margin: ""}}>Tasks</h2>
                        <Tasks setTask={setTask}/>
                    </> : curPos === 0 ? <div>
                        <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="stake" setTask={setTask}>
                            <div className={classes.switcher}>
                                <Switch page='Stake' curPos={0} setCurPos={setCurPos} val1="Go on" val2="Active" count={stakedPairs ? JSON.parse(stakedPairs).length : "0"}/>
                                <div className={classes.address} onClick={() => {
                                    clipboardCopy(address);
                                    setCopied(true)
                                    setTimeout(() => setCopied(false), 1000)
                                }}>
                                    {copied ? <div>Copied</div> : null}
                                    <img src={copy} alt="Copy address"/>
                                    {address.substr(0,6)+"..." + address.substr(58,64)}
                                </div>
                            </div>
                        </MenuBar>
                        {/*<Filter filt={filt} setFilt={setFilt}/>*/}
                        {task == 2 ?
                            <>
                                <h2>COAL</h2>
                                <CollectionForCoalStake  collect='weapons' nfts={nfts} task={task} selectedWNTFs={selectedWWNFTs} setSelectedWNFTs={setSelectedWWNFTs}/>
                                <div className={classes.stakeBtn}>
                                    <Button style={{}} active={(JSON.parse(selectedWWNFTs)['equipment_1'] && JSON.parse(selectedWWNFTs)['equipment_2']) ? true : false} buttonType="middleBtn" onClick={() => {
                                        setWait(true)
                                        setStaked(selectedWWNFTs, task, address, (res) => {
                                            setWait(false)
                                            setSelectedWWNFTs(JSON.stringify({'equipment_1': null, 'equipment_2': null}))
                                        })
                                    }
                                    }>Stake</Button>
                                </div>
                            </> :
                            <>
                                <h2>{task == 1 ? "GOLD" : task == 3 ? "ORE" : "ADIT"}</h2>
                                <CollectionsForStake nfts={nfts} address={address} filt={filt} task={task} selectedWNFTs={selectedWNFTs} setSelectedWNFTs={setSelectedWNFTs}/>
                                <div className={classes.stakeBtn}>
                                    <Button style={{}} active={(JSON.parse(selectedWNFTs)['character'] && JSON.parse(selectedWNFTs)['equipment']) ? true : false} buttonType="middleBtn" onClick={() => {
                                        setWait(true)
                                        setStaked(selectedWNFTs, task, address, (res) => {
                                            setWait(false)
                                            setSelectedWNFTs(JSON.stringify({'character': null, 'equipment': null}))
                                        })
                                    }
                                    }>Stake</Button>
                                </div>
                            </>
                        }
                    </div> : <div>
                        <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="stake" setTask={setTask}>
                            <div className={classes.switcher}>
                                <Switch page='Stake' curPos={1} setCurPos={setCurPos} val1="Go on" val2="Active" count={stakedPairs ? JSON.parse(stakedPairs).length : "0"}/>
                                <div className={classes.address} onClick={() => {
                                    clipboardCopy(address);
                                    setCopied(true)
                                    setTimeout(() => setCopied(false), 1000)
                                }}>
                                    {copied ? <div>Copied</div> : null}
                                    <img src={copy} alt="Copy address"/>
                                    {address.substr(0,6)+"..." + address.substr(58,64)}
                                </div>
                            </div>
                        </MenuBar>
                        <Resources page="Stake" balances={balances}/>
                        {/*<Filter filt={filt} setFilt={setFilt}/>*/}
                        <ActivePairs address={address} setWait={setWait} stakedPairs={stakedPairs} setRefresh={setRefresh}/>
                    </div>
                }
            </> : null}
        </div>
    )
}