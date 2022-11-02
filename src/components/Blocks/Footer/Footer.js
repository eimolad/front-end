import React from 'react';
import {SocialButton} from "../../UI/SocialButton/SocialButton";
import footerDecor from "./footerDecor.png";
import classes from "./Footer.module.css";
import telegram from "./telegram.png"
import discord from "./discord.png"
import twitter from "./twitter.png"
import email from "./email.png"
import medium from "./medium.png"
import dscvr from "./dscvr.png"
import distrikt from "./distrikt.png"

export const Footer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.decor}><img src={footerDecor} alt="Footer decor"/></div>
            <div className={classes.buttons}>
                <SocialButton imgSrc={telegram} lnk="https://eimolad.com"/>
                <SocialButton imgSrc={discord} lnk="https://eimolad.com"/>
                <SocialButton imgSrc={twitter} lnk="https://eimolad.com"/>
                <SocialButton imgSrc={email} lnk="https://eimolad.com"/>
                <SocialButton imgSrc={medium} lnk="https://eimolad.com"/>
                <SocialButton imgSrc={dscvr} lnk="https://eimolad.com"/>
                <SocialButton imgSrc={distrikt} lnk="https://eimolad.com"/>
            </div>
        </div>
    );
};