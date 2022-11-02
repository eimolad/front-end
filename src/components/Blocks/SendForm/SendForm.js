/* global BigInt */
import React, {useState} from 'react';
import { TextField} from '@mui/material';
import {Button} from "../../UI/Button/Button";
import "./SendForm.css"
import { validatePrincipal, validateAddress, principalToAccountIdentifier } from '../../../utils/utils';
import { tokenIdentifier, getSubAccountArray, fromHexString } from '../../../utils/utils';
import { AuthClient } from '@dfinity/auth-client';
import icDid from '../../../utils/candid/ic.did';
import { HttpAgent, Actor } from '@dfinity/agent';
import {canisters, eGoldCanister, ICcanister} from '../../../canisters';
import kernelDid from "../../../utils/candid/kernel.did";
import classes from "../../Pages/Wallet/Wallet.module.css";
import loader from "../../../media/loader.gif";
import cornerRight from "./cornerDecorRight.png";
import cornerLeft from "./cornerDecorLeft.png";

const NFTsSend = async (selected, tto, callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
    });
    const args = []
    for (let tid in JSON.parse(selected)) {
        args.push(tid);
    }
    console.log(args)
    await actor.transferMany(tto, args).then((data) => {
        callback(data)
    });

}

const tokenTransfer = async (token, tto, amount, callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    if (token === "icp") {
        const actor = Actor.createActor(icDid, {
            agent: agent,
            canisterId: ICcanister,
        });
        const fee = 10000;
        const args = {
            "to": fromHexString(tto), //Should be an address
            "fee": { "e8s": fee },
            "memo": 0,
            "from_subaccount": [getSubAccountArray(0)],
            "created_at_time": [],
            "amount": { "e8s": (amount * 100000000) }
        }
        await actor.transfer(args).then((res) => {
            callback(res)
        });
    } else {
        const actor = Actor.createActor(kernelDid, {
            agent: agent,
            canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
        });
        await actor.transfer_tokens(token, tto, parseInt(amount)).then((data) => {
            callback(data)
        });
    }

}


export const SendForm = ({active, setActive, balances, setBalances, selected, selToken} ) => {
    const [inputVal, setInputVal] = React.useState('');
    const [val, setVal] = React.useState(0)
    const [clicked, setClicked] = React.useState(false);
    const [wait, setWait] = useState(false);

    return (
        <div className={active ? "modal act" : "modal"}  onClick={() => {
            if (clicked) {
                setClicked(false);
            } else {
                setActive(false)
            }
        }}>
            {wait ? <div className={classes.wait}><img src={loader} alt="Wait"/></div> : null}
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <img className={"cornerDecorLeft"} src={cornerLeft} alt="Corner Decor"/>
                <img className={"cornerDecorRight"} src={cornerRight} alt="Corner Decor"/>
                {!clicked ?
                    <div className={"border"}>
                        <TextField id="outlined-basic" onChange={(e) => setInputVal(e.target.value)} fullWidth
                                   label="Enter Principal or Address to send" variant="outlined" value={inputVal} style={{
                            padding: "0"
                        }} InputProps={{
                            style: {
                                color: "white",
                                padding: "0",
                                backgroundColor: "rgba(59,59,59,0.5)"
                            }
                        }} InputLabelProps={{
                            style: {
                                padding: "0",
                                color: "#c7c7c7"
                            }
                        }}/>
                        {selToken ?
                        <TextField id="outlined-basic" onChange={(e) => setVal(e.target.value)} fullWidth
                                   label="Enter count of tokens" variant="outlined" value={val} style={{
                            marginTop: "15px",
                            padding: "0"
                        }} InputProps={{
                            style: {
                                color: "white",
                                padding: "0",
                                backgroundColor: "rgba(59,59,59,0.5)"
                            }
                        }} InputLabelProps={{
                            style: {
                                padding: "0",
                                color: "#c7c7c7"
                            }
                        }}/>
                         : null}
                        <Button style={{}} buttonType="middleBtn" active={true} onClick={(e) => {
                            setClicked(true)
                        }} >Send</Button>
                    </div>
                    :
                    (validatePrincipal(inputVal) || validateAddress(inputVal)) ?
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <h3 style={{textAlign: "center", margin: "auto"}}>Are you sure?</h3>
                        <p>Please check the recipient's address</p>
                        <p style={{color: "red", marginTop: "0"}}>{inputVal}</p>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "20px"}}>
                        <Button style={{}} onClick={(e) => {
                            setClicked(false)
                            if (!selToken) {
                                setWait(true)
                                NFTsSend(selected, validatePrincipal(inputVal) ? principalToAccountIdentifier(inputVal, 0) : inputVal,
                                    (res) => {
                                        setWait(false)
                                        setActive(false);
                                    })
                            } else {
                                setWait(true)
                                tokenTransfer(selToken, validatePrincipal(inputVal) ? principalToAccountIdentifier(inputVal, 0) : inputVal, val,
                                    (res) => {
                                        setWait(false)
                                        let cBal = JSON.parse(balances)
                                        cBal[selToken] = cBal[selToken] - val
                                        setBalances(JSON.stringify(cBal))
                                        setActive(false);
                                    })
                            }

                        }} buttonType="middleBtn" active={true}>Confirm</Button>
                        <Button style={{}} onClick={(e) => {
                            setClicked(false)
                        } } buttonType="middleBtn" active={true}>Cancel</Button>
                        </div>
                    </div>
                    : 
                    <>
                            <div style={{fontSize: "18px"}}>"Please enter correct data"</div>
                    </>
                }
            </div>
        </div>    );
};
