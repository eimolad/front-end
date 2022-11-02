import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "../../../UI/Button/Button";
import {BackButton} from "../../../UI/BackButton/BackButton";
import bg from "./bg.png";
import classes from "./MenuBtnBlock.module.css";
import copy from "./copy.png"
import {clipboardCopy, principalToAccountIdentifier, tokenIdentifier} from "../../../../utils/utils";
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import {canisters} from "../../../../canisters";
import dwarvesIDL from "../../../../utils/candid/dwarves.did";
import kernelDid from "../../../../utils/candid/kernel.did";

const getTokenInfo = async (collection, tid, callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
    });
    const args = {};
    args[collection] = tid;
    await actor.getTokenInfo(args).then((data) => {
        callback(data)
    });

}
const getWrapped = async (address, callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    let fb = {};
    const actor = Actor.createActor(dwarvesIDL, {
        agent: agent,
        canisterId: canisters['dwarves'],
    });
    await actor.tokens_ext(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0)).then((data) => {
        data.ok.forEach(token => {
            getTokenInfo('dwarves', tokenIdentifier(canisters['dwarves'], token[0]), (st) => {
                callback(st['dwarves'][0]['state'])
            })
        })
    })
}

export const MenuBtnBlock = ({address}) => {
    const [copied, setCopied] = useState(false)
    const [play, setPlay] = useState(false)
    // window.screen.width >= 1100 ? true : false

    if (address && !play) getWrapped(address, (data) => {
        if (data === 'wrapped') setPlay(true);
    })
    return (
        <div className={classes.root} style={{background: `url(${bg})`}}>
            <div>
                <BackButton url="/"/>
                <div className={classes.menuItems}>
                    <Link to='/play'>
                        <Button style={{}} active={play ? true : false} buttonType="middleBtn">Play</Button>
                    </Link>
                    <Link to='/wallet'>
                        <Button style={{}} active={true} buttonType="middleBtn">Wallet</Button>
                    </Link>
                    <Link to='/stake'>
                        <Button style={{}} active={true} buttonType="middleBtn">Stake</Button>
                    </Link>
                    <Link to='/market'>
                        <Button style={{}} active={true} buttonType="middleBtn">Market</Button>
                    </Link>
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
            </div>
        </div>
    );
};