import React, {useState} from 'react';
import {Link} from "react-router-dom";
import toggle_menu_icon from "./heroicons-outline_menu-alt-1.png"
import classes from "./ToggleMenu.module.css"
import makeBlockie from 'ethereum-blockies-base64';
import {clipboardCopy} from "../../../utils/utils";
import {Button} from "../Button/Button";
import menuBg from "./menuBg.png";

export const ToggleMenu = ({address, clicked, setClicked, curLink, setTask}) => {
    const sel = {
        filter: "drop-shadow(0px 0px 8px rgba(240, 240, 240))"
    }
    return (
        <div className={classes.root} onClick={() => {clicked ? setClicked(false) : setClicked(true)}}>
            {address ?
                <>
                <span className={classes.icon} style={{backgroundImage: `url(${toggle_menu_icon})`}}></span>
                <h3>Menu</h3>
                <div className={classes.menu} style={clicked ? {opacity: "1", backgroundImage: `url(${menuBg})`, pointerEvents: "all"} : {opacity: "0"}} onClick={(e) => e.stopPropagation()}>
                    <div>
                        <div className={classes.address}>
                            <div className={classes.blockWrapper}>
                                <img alt={address} src={makeBlockie(address)}/>
                            </div>
                            <div className={classes.aid} onClick={() => { clipboardCopy(address);}}>
                                {address.substr(0,6)+"..." + address.substr(58,64)}
                            </div>
                        </div>
                        <div className={classes.menuButtonsBlock}>
                            {/* target="_blank" */}
                            <Link to='/play'><Button active={true} style={curLink == 'play' ? sel : {}} buttonType="middleBtn">Play</Button></Link>
                            <Link to='/wallet'><Button active={true} style={curLink == 'wallet' ? sel : {}} buttonType="middleBtn">Wallet</Button></Link>
                            <Link to='/stake'><Button active={true} style={curLink == 'stake' ? sel : {}} buttonType="middleBtn" onClick={() => {setTask(null); setClicked(false)}}>Stake</Button></Link>
                            <Link to='/#'><Button active={false} style={{}} buttonType="middleBtn">Market</Button></Link>
                            <Link to='/'><Button active={true} style={{}} buttonType="middleBtn">LogOut</Button></Link>
                        </div>
                    </div>
                </div>
                </>
                : null }
        </div>
    );
};