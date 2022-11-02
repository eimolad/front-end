import React from 'react';
import { ConnectBtnBlock} from "./ConnectBtnBlock/ConnectBtnBlock";
import {MenuBtnBlock} from "./MenuBtnBlock/MenuBtnBlock";
import decor from "./main_decor.png";
import bg from "./main.png";
import classes from "./Main.module.css";
import {AClient, principalToAccountIdentifier} from "../../../utils/utils";
import {AuthClient} from "@dfinity/auth-client";

export const Main = ({address, setAddress}) => {

    const init = async () => {
        await AClient((id) => {
            setAddress(principalToAccountIdentifier(id.getPrincipal().toText()))
        })
    }

    if (localStorage.getItem("ic-delegation") && !address) {
        AuthClient.create({_storage: localStorage.getItem("ic-delegation")}).then((authClient) => {
            setAddress(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText()))
        })
    }
    return (
        <div className={classes.root} style={{background: `url(${bg})`}}>
            {!address ?
                <div className={classes.main}>
                    <h2>Connect your Wallet</h2>
                    <div className={classes.decor}><img src={decor} alt=""/></div>
                    <ConnectBtnBlock init={init}/>
                </div>
                :
                <div className={classes.main}>
                    <MenuBtnBlock address={address}/>
                </div>
            }
            {/*<Footer/>*/}
        </div>
    );
}