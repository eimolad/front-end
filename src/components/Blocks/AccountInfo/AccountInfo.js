import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import React, { useState } from "react";
import { kernelCanister } from "../../../canisters";
import kernelDid from "../../../utils/candid/kernel.did";
import { getSubAccountArray } from "../../../utils/utils";
import { EditButton } from "../../UI/EditButton/EditButton";
import { ModalWindow } from "../../UI/ModalWindow/ModalWindow";
import { SaveButton } from "../../UI/SaveButton/SaveButton";
import classes from "./AccountInfo.module.css";
import { AccountButton } from "./AccountsInfoUI/AccountButton";
import { AccountSelect } from "./AccountsInfoUI/AccountSelect";

const changeName = async (account, nickname, subAccArr, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });

  let tid = Object.keys(JSON.parse(account))[0];
  let endStr = "#" + JSON.parse(account)[Object.keys(JSON.parse(account))[0]].name.split("#")[1];
  let newNickname = nickname + endStr;

  await actor.changeName(tid, newNickname, subAccArr).then((data) => {
    callback(data);
  });
};

const changeState = (nfts, selected, name) => {
  let n = JSON.parse(nfts);
  for (let tid in JSON.parse(selected)) {
    // JSON.parse(selected)[tid].metadata.state = state;
    n[tid].name = name;
    console.log(tid, n[tid]);
  }
  return JSON.stringify(n);
};

export const AccountInfo = ({ account, setSignedAccounts, signedAccounts, setWait, setAccountInfoData, accountInfoData, inventoryOnClick }) => {
  const [changeNameClicked, setChangeNameClicked] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [modal, setModal] = useState(false);
  let nft;
  for (let tid in JSON.parse(account)) {
    nft = JSON.parse(account)[tid];
  }

  if (account !== "{}") {
    return (
      <div className={classes.container}>
        <ModalWindow active={modal} setActive={setModal}>
          <p>Nickname must not be empty and less than 11 characters</p>
        </ModalWindow>
        <div className={classes.nickname}>
          {nft.name.split("#")[0]} <b>#{nft.name.split("#")[1]}</b>
        </div>
        <div className={classes.form}>
          <div className={classes.changeNickname}>
            <p className={classes.nicknameForChange}>Nickname</p>
            {changeNameClicked ? (
              <input
                size={nft.name.split("_")[0].length}
                maxLength={10}
                autoFocus
                id="input"
                className={`${classes.imputNickname} ${classes.imputNicknameTrue}`}
                value={newNickname}
                onChange={(event) => {
                  setNewNickname(event.target.value.replace(/[\W_]/gm, ""));
                }}
              ></input>
            ) : (
              <b className={classes.imputNickname}>{nft.name.split("#")[0]}</b>
            )}
            <div className={classes.editButton}>
              <EditButton
                onClick={() => {
                  if (changeNameClicked) {
                    setChangeNameClicked(false);
                  } else {
                    setNewNickname(nft.name.split("#")[0]);
                    setChangeNameClicked(true);
                  }
                }}
              />
            </div>
            <div className={classes.saveButton}>
              {changeNameClicked ? (
                <SaveButton
                  active={true}
                  onClick={() => {
                    if (changeNameClicked == true) {
                      if (newNickname !== "" && newNickname.length < 11 && !newNickname.includes("_") && !newNickname.includes(" ")) {
                        setWait(true);
                        changeName(account, newNickname, getSubAccountArray(2), (data) => {
                          let endStr = "#" + JSON.parse(account)[Object.keys(JSON.parse(account))[0]].name.split("#")[1];
                          let newNick = newNickname + endStr;
                          console.log(endStr, newNick, newNickname);
                          setSignedAccounts(changeState(signedAccounts, account, newNick));
                          setChangeNameClicked(false);
                          setAccountInfoData(changeState(accountInfoData, account, newNick));
                          setWait(false);
                        });
                      } else {
                        setModal(true);
                      }
                    }
                  }}
                />
              ) : (
                <SaveButton active={false} />
              )}
            </div>
          </div>
          <div className={classes.grid1}>
            <p>Account number</p>
            <b>D{nft.index + 1}</b>
          </div>
          <div className={classes.grid2}>
            <p>Level</p>
            <b>0</b>
          </div>
          <div className={classes.grid3}>
            <p>Force</p>
            <b>0</b>
          </div>
          <div className={classes.grid4}>
            <p>Dexterity</p>
            <b>0</b>
          </div>
          <div className={classes.grid5}>
            <p>Intelligence</p>
            <b>0</b>
          </div>
          <div className={classes.grid6}>
            <p>Health</p>
            <b>0</b>
          </div>
          <div className={classes.grid7}>
            <p>Movement</p>
            <b>0</b>
          </div>
          <div className={classes.grid8}>
            <p>Other</p>
            <b>0</b>
          </div>
        </div>
        <div className={classes.buttons}>
          <AccountSelect className={classes.leftButton} />
          <AccountButton onClick={inventoryOnClick} className={classes.rightButton} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
