/* global BigInt */
import React, {useState} from 'react';
import "./WalletWarning.css"
import {Button} from "../../UI/Button/Button"
import cornerDecorRight from "./cornerDecorRight.png"
import cornerDecorLeft from "./cornerDecorLeft.png"
import { validatePrincipal, validateAddress, principalToAccountIdentifier } from '../../../utils/utils';
import classes from "../../Pages/Wallet/Wallet.module.css";
import loader from "../../../media/loader.gif";


export const WalletWarning = ({active, setActive, setRefresh, selected, selToken} ) => {
    const [inputVal, setInputVal] = useState('');
    const [val, setVal] = useState(0)
    const [clicked, setClicked] = useState(false);

    return (
        <div className={active ? "modal act" : "modal"}  onClick={() => {  }}>
            <div className="warning_modal__content warning" onClick={e => e.stopPropagation()}>
                <img className="cornerDecorLeft" src={cornerDecorLeft} alt="Corner Decor"/>
                <img className="cornerDecorRight" src={cornerDecorRight} alt="Corner Decor"/>
                <div className="forBorder">
                    <h3> WARNING! </h3>
                    <p> Eimolad Wallet is designed for gaming assets. Check out the list of assets that are available for storage: </p>
                    <ul>
                        <li>ICP</li>
                        <li>Eimolad’s tokens</li>
                        <li>Eimolad’s NFTs</li>
                        <li>Collaboration NFTs and tokens (to be announced)</li>
                    </ul>
                    <Button active={true} style={{}} buttonType="middleBtn" onClick={(e) => { setActive(false)}}>I GOT IT</Button>
                </div>
            </div>
        </div>    );
};
