import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../UI/Button/Button";
import { BackButton } from "../../../UI/BackButton/BackButton";
import bg from "./bg.png";
import classes from "./MenuBtnBlock.module.css";
import copy from "./copy.png";
import copyP from "./copyP.png";

import { clipboardCopy, principalToAccountIdentifier, tokenIdentifier } from "../../../../utils/utils";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const MenuBtnBlock = ({ address, principal }) => {
  const [copied, setCopied] = useState(false);
  const [play, setPlay] = useState(false);
  // window.screen.width >= 1100 ? true : false

  return (
    <div className={classes.root} style={{ background: `url(${bg})` }}>
      <div>
        <BackButton url="/" />
        <div className={classes.menuItems}>
          {/* target="_blank" */}
          <Link to="/play">
            <Button style={{}} active={true} buttonType="middleBtn">
              Play
            </Button>
          </Link>
          <Link to="/wallet">
            <Button style={{}} active={true} buttonType="middleBtn">
              Wallet
            </Button>
          </Link>
          <Link to="/stake">
            <Button style={{}} active={true} buttonType="middleBtn">
              Stake
            </Button>
          </Link>
          <Link to="/">
            <Button style={{}} active={false} buttonType="middleBtn">
              Market
            </Button>
          </Link>
          <div
            className={classes.address}
            onClick={() => {
              clipboardCopy(address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            <img src={copy} alt="Copy address" />
            {address.substr(0, 6) + "..." + address.substr(58, 64)}
          </div>
          <div
            className={classes.address}
            onClick={() => {
              clipboardCopy(principal);
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            <img src={copyP} alt="Copy principal" />
            {principal?.substr(0, 10) + "..." + principal?.substr(58, 64)}
          </div>
        </div>
      </div>
      <div className={classes.alert}>
        <Collapse in={copied}>
          <Alert
            color="primary"
            action={
              <IconButton
                aria-label="close"
                color="primary"
                size="small"
                onClick={() => {
                  setCopied(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, backgroundColor: "rgba(59,59,59,1)" }}
          >
            Copied!
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};
