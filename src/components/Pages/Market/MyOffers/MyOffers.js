import React, { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import kernelDid from "../../../../utils/candid/kernel.did";
import {
  clipboardCopy,
  getAddress,
  tokenIdentifier,
} from "../../../../utils/utils";
import classes from "./MyOffers.module.css";

export const MyOffers = ({ purpose }) => {
  if (purpose == "Sell") {
    return (
      <div className={classes.root}>
        <div className={classes.closeButton}>
          <div className={classes.close}>x</div>
        </div>
        <div className={classes.titleDescription}>
          <p>Dwarf 1</p>
        </div>
        <div className={classes.quantity}>
          <p>1</p>
        </div>
        <div className={classes.price}>
          <p>1220</p>
        </div>
      </div>
    );
  }

  if (purpose == "Buy") {
    return <div className={classes.root}></div>;
  }
};
