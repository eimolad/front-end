/* global BigInt */
import React from 'react';
import eGold from "../../../utils/candid/egold.did.js"
import { AccountIdentifier, LedgerCanister } from '@dfinity/nns';
import ICTokens from "../../../utils/candid/ic.did.js"
import KernelDid from "../../../utils/candid/kernel.did.js"
import { Principal } from '@dfinity/principal';
import { eGoldCanister, ICcanister } from '../../../canisters.js';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { principalToAccountIdentifier, fromHexString } from '../../../utils/utils.js';
import { Button } from '@mui/material';
import RosettaApi from '../../../utils/RosettaApi'
import classes from './WalletInfo.module.css'
import { clipboardCopy } from '../../../utils/utils.js';


const geteGoldBallance = async (egolds) => {
    if (localStorage.getItem("ic-delegation")) {
        const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

        const agent = new HttpAgent({
            host: "https://ic0.app",
            identity: authClient.getIdentity()
        });

        const actor = Actor.createActor(eGold, {
            agent: agent,
            canisterId: eGoldCanister,
        });


        const user = { 'address': principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0)}
        const token = ''
        const BalanceRequest = { token, user }
        await actor.balance(BalanceRequest).then((data) => {
            egolds(data, principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0))
        })
    }

}

const getICBallanceNew = async (ic) => {
    if (localStorage.getItem("ic-delegation")) {
        const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

        const agent = new HttpAgent({
            host: "https://ic0.app",
            identity: authClient.getIdentity()
        });

        const actor = Actor.createActor(KernelDid, {
            agent: agent,
            canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
        });
        const user = { 'address': principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0)}
        const token = ''
        const BalanceRequest = { token, user }
        await actor.account_balance_eGold(BalanceRequest).then((b) => ic(b))
    }
}

getICBallanceNew(res => console.log(res))

const getICBallance = async (ic) => {
    if (localStorage.getItem("ic-delegation")) {
        const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

        const agent = new HttpAgent({
            host: "https://ic0.app",
            identity: authClient.getIdentity()
        });

        const actor = Actor.createActor(ICTokens, {
            agent: agent,
            canisterId: ICcanister,
        });
        await actor.account_balance({'account' : fromHexString(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0))}).then((b) => ic(b))
    }
}


export const WalletInfo = (props) => {
    const [eGoldBalance, setEGoldBalance] = React.useState()
    const [ICBalance, setICBalance] = React.useState()
    const [address, setAddress] = React.useState("")

    geteGoldBallance((balance, addr) => {
        // console.log(balance.ok.toString())
        setEGoldBalance(balance.ok.toString())
        setAddress(addr)
    })
    getICBallance((balance) => {
        setICBalance(Number(balance.e8s)/100000000)
    })

    return (
        <div className={classes.WalletInfo}>
            <span style={{ color: "white", margin: "auto 5px" }}><b>Address: </b><span onClick={() => { clipboardCopy(address); }} style={{ cursor: "pointer" }}>
                {address.substr(0, 6) + "..." + address.substr(60, address.length - 1)}</span>
            </span> 
            <div className={classes.tokens}>
                {eGoldBalance + ' eGolds'}
                <Button onClick={() => {
                    props.setValueToSend(1)
                    props.setSelCanister(eGoldCanister)
                    props.setSendFormActive(true)
                }}>Send</Button>
            </div>
            <div className={classes.tokens}>
                {ICBalance + ' ICP'}
                <Button onClick={() => {
                    props.setValueToSend(1)
                    props.setSelCanister(ICcanister)
                    props.setSendFormActive(true)
                }}>Send</Button>
            </div>
        </div>
    );
}