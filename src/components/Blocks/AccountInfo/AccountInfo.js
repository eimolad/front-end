import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { kernelCanister } from "../../../canisters";
import kernelDid from "../../../utils/candid/kernel.did";
import { getSubAccountArray } from "../../../utils/utils";
import { EditButton } from "../../UI/EditButton/EditButton";
import { ModalWindow } from "../../UI/ModalWindow/ModalWindow";
import { SaveButton } from "../../UI/SaveButton/SaveButton";
import classes from "./AccountInfo.module.css";
import { AccountButton } from "./AccountsInfoUI/AccountButton/AccountButton";
import { AccountGridItem } from "./AccountsInfoUI/AccountGridItem/AccountGridItem";
import { AccountSelect } from "./AccountsInfoUI/AccountSelect/AccountSelect";

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

const getAttributes = async (tid, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  await actor
    .getCharacterAttributes(tid)
    .then((data) => {
      callback(data);
    })
    .then((err) => console.log(err));
};

export const AccountInfo = ({ account, setSignedAccounts, signedAccounts, setWait, setAccountInfoData, accountInfoData, inventoryOnClick }) => {
  const [changeNameClicked, setChangeNameClicked] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [modal, setModal] = useState(false);
  const [accountAttributes, setAccountAttributes] = useState(null);

  let nft;
  let nftTid;

  for (let tid in JSON.parse(account)) {
    nft = JSON.parse(account)[tid];
    nftTid = tid;
  }

  useEffect(() => {
    setAccountAttributes(null);
    getAttributes(nftTid, (data) => {
      setAccountAttributes(data);
      console.log(JSON.parse(accountAttributes));
    });
  }, [account]);

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
                className={`${classes.inputNickname} ${classes.inputNicknameTrue}`}
                value={newNickname}
                onChange={(event) => {
                  setNewNickname(event.target.value.replace(/[\W_]/gm, ""));
                }}
              ></input>
            ) : (
              <b className={classes.inputNickname}>{nft.name.split("#")[0]}</b>
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
                    if (changeNameClicked === true) {
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
          <div className={classes.grid}>
            <Grid container width={"100%"} gap={"5px"}>
              <AccountGridItem title={"Account number"} value={"D" + (nft.index + 1)} />
              <AccountGridItem title={"Level"} value={JSON.parse(accountAttributes) ? JSON.parse(accountAttributes).level : "loading"} />
              <AccountGridItem
                title={"Strength"}
                value={JSON.parse(accountAttributes) ? JSON.parse(accountAttributes).strength : "loading"}
                metadata={
                  JSON.parse(accountAttributes)
                    ? {
                        hp: JSON.parse(accountAttributes)?.hp,
                        attack: JSON.parse(accountAttributes)?.attack,
                        ["status resist"]: JSON.parse(accountAttributes)?.st_resist,
                        ["HP recovery"]: JSON.parse(accountAttributes)?.hp_regen,
                      }
                    : null
                }
                advanced
              />
              <AccountGridItem
                title={"Dexterity"}
                value={JSON.parse(accountAttributes) ? JSON.parse(accountAttributes).dexterity : "loading"}
                metadata={
                  JSON.parse(accountAttributes)
                    ? {
                        ["attack speed"]: JSON.parse(accountAttributes)?.attack_speed,
                        evasion: JSON.parse(accountAttributes)?.evasion,
                        accuracy: JSON.parse(accountAttributes)?.accuracy,
                      }
                    : null
                }
                advanced
              />
              <AccountGridItem
                title={"Intelligence"}
                value={JSON.parse(accountAttributes) ? JSON.parse(accountAttributes).intelligence : "loading"}
                metadata={
                  JSON.parse(accountAttributes)
                    ? {
                        ["mana pool"]: JSON.parse(accountAttributes)?.mp,
                        ["mana attack"]: JSON.parse(accountAttributes)?.m_attack,
                        ["mana recovery"]: JSON.parse(accountAttributes)?.mp_regen,
                      }
                    : null
                }
                advanced
              />
              <AccountGridItem title={"Experience"} value={JSON.parse(accountAttributes) ? JSON.parse(accountAttributes)?.experience : "loading"} />
              <AccountGridItem title={"Movement"} value={JSON.parse(accountAttributes) ? JSON.parse(accountAttributes)?.move_speed : "loading"} />
              <AccountGridItem
                title={"Other"}
                value={" "}
                metadata={
                  JSON.parse(accountAttributes)
                    ? {
                        ["initial attack speed"]: JSON.parse(accountAttributes)?.initial_attack_speed,
                        ["initial evasion"]: JSON.parse(accountAttributes)?.initial_evasion,
                        ["initial accuracy"]: JSON.parse(accountAttributes)?.["initial_ accuracy"],
                      }
                    : null
                }
                advanced
              />
            </Grid>
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
