import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import classes from "./Pair.module.css";
import gnome from "./gnome.png";
import header from "./header.png";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import { ConfirmingModal } from "./ConfirmingModal/ConfirmingModal";
import { kernelCanister } from "../../../canisters";

const unStake = async (tid, type, callback) => {
  const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") });
  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });
  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  let data;
  if (type == "egold") {
    data = await actor.unStake(tid);
  } else if (type == "ecoal") {
    data = await actor.unStakeCoal(tid);
  } else if (type == "eore") {
    data = await actor.unStakeOre(tid);
  } else {
    data = await actor.unStakeAdit(tid);
  }
  callback(data);
};
const getDeltaTime = (start) => {
  const deltaT = new Date(Date.now() - Math.trunc(start / 1000000));
  const days = Math.trunc(deltaT / (24 * 60 * 60 * 1000));
  const hours = Math.trunc((deltaT - Math.trunc(deltaT / (24 * 60 * 60 * 1000)) * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  return { days: days, hours: hours };
};
const changeStakedPairs = (pairs, pair) => {
  const n = JSON.parse(pairs);
  for (let i = 0; i < n.length; i++) {
    if (n[i].type == "ecoal") {
      if (n[i].weapon_1.tid == pair.weapon_1.tid) {
        n.splice(i, 1);
      }
    } else {
      if (n[i].character.tid == pair.character.tid) {
        n.splice(i, 1);
      }
    }
  }
  return JSON.stringify(n);
};
const changeState = (nfts, pair) => {
  let n = JSON.parse(nfts);
  if (pair.character) {
    n[pair.character.tid].metadata.state = "wrapped";
    n[pair.weapon.tid].metadata.state = "wrapped";
  } else {
    n[pair.weapon_1.tid].metadata.state = "wrapped";
    n[pair.weapon_2.tid].metadata.state = "wrapped";
  }
  return JSON.stringify(n);
};
export const Pair = ({ pair, nfts, setNfts, setWait, stakedPairs, setStakedPairs }) => {
  const rang = { 10: "Ordinary", 11: "Lieutenant", 12: "Captain", 13: "Major", 14: "L.Colonel", 15: "Colonel", 17: "General", 20: "Marshal" };
  const [stakedTime, setStakedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (!stakedTime) {
    setStakedTime(JSON.stringify(getDeltaTime(parseInt(pair.startStaketime))));
  }
  useEffect(() => {
    setTimeout(() => {
      JSON.stringify(setStakedTime(getDeltaTime(parseInt(pair.startStaketime))));
    }, 24 * 60 * 60 * 1000);
  }, [stakedTime]);

  if (confirming) {
    if (pair.type == "egold") {
      setConfirming(false);
      setWait(true);
      unStake(pair["character"]["tid"], pair.type, (d) => {
        setStakedPairs(changeStakedPairs(stakedPairs, pair));
        setNfts(changeState(nfts, pair));
        setWait(false);
      });
    }

    else if (pair.type == "ecoal") {
      setConfirming(false);
      setWait(true);
      unStake(pair["weapon_1"]["tid"], pair.type, (d) => {
        setStakedPairs(changeStakedPairs(stakedPairs, pair));
        setNfts(changeState(nfts, pair));
        setWait(false);
      });
    }

    else if (pair.type == "eore") {
      setConfirming(false);
      setWait(true);
      unStake(pair["character"]["tid"], pair.type, (d) => {
        setStakedPairs(changeStakedPairs(stakedPairs, pair));
        setNfts(changeState(nfts, pair));
        setWait(false);
      });
    } else {
      setConfirming(false);
      setWait(true);
      unStake(pair["character"]["tid"], pair.type, (d) => {
        setStakedPairs(changeStakedPairs(stakedPairs, pair));
        setNfts(changeState(nfts, pair));
        setWait(false);
      });
    }
  }

  return (
    <div className={classes.root}>
      <ConfirmingModal active={showModal} setActive={setShowModal} setConfirming={setConfirming}></ConfirmingModal>
      {pair.type == "egold" ? (
        <>
          <div className={classes.wrapBtn}>
            <Button
              buttonType={"middleBtn"}
              style={{}}
              active={true}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Unstake
            </Button>
          </div>
          <div className={classes.header} style={{ background: `url(${header})` }}>
            <span>GOLD</span>
            <span>
              {stakedTime ? JSON.parse(stakedTime).days : "00"}d :{" "}
              {stakedTime
                ? Math.trunc(JSON.parse(stakedTime).hours / 10) == 0
                  ? "0" + JSON.parse(stakedTime).hours
                  : JSON.parse(stakedTime).hours
                : "00"}
              h
            </span>
          </div>
          <div className={classes.picture}>
            <img src={gnome} alt="Picture" />
          </div>
          <div className={classes.stakeParams}>
            <div>NRIc = {parseFloat(pair.rarityRate) % 10 == 0 ? parseFloat(pair.rarityRate) / 10 + ".0" : parseFloat(pair.rarityRate) / 10}x</div>
            <div>
              {rang[pair.rank]} = {parseFloat(pair.rank) % 10 == 0 ? parseFloat(pair.rank) / 10 + ".0" : parseFloat(pair.rank) / 10}x
            </div>
            <div>EARN = {pair.eGold_amount}/day</div>
            <div>
              D#{pair.character.index + 1} + W#{pair.weapon.index + 1}
            </div>
          </div>
        </>
      ) : pair.type == "ecoal" ? (
        <>
          <div className={classes.wrapBtn}>
            <Button
              buttonType={"middleBtn"}
              style={{}}
              active={true}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Unstake
            </Button>
          </div>
          <div className={classes.header} style={{ background: `url(${header})` }}>
            <span className={classes.coal}>COAL</span>
            <span>
              {stakedTime ? JSON.parse(stakedTime).days : "00"}d :{" "}
              {stakedTime
                ? Math.trunc(JSON.parse(stakedTime).hours / 10) == 0
                  ? "0" + JSON.parse(stakedTime).hours
                  : JSON.parse(stakedTime).hours
                : "00"}
              h
            </span>
          </div>
          <div className={classes.pictureCoal}>
            <img src={gnome} alt="Picture" />
          </div>
          <div className={classes.stakeParams}>
            {/*<div>NRIc = {parseFloat(pair.rarityRate) % 10 == 0 ? parseFloat(pair.rarityRate)/10 + ".0" : parseFloat(pair.rarityRate)/10}x</div>*/}
            <div>
              {rang[pair.rank]} = {parseFloat(pair.rank) % 10 == 0 ? parseFloat(pair.rank) / 10 + ".0" : parseFloat(pair.rank) / 10}x
            </div>
            <div>EARN = {pair.eCoal_amount}/week</div>
            <div>
              W#{pair.weapon_1.index + 1} + W#{pair.weapon_2.index + 1}
            </div>
          </div>
        </>
      ) : pair.type == "eore" ? (
        <>
          <div className={classes.wrapBtn}>
            <Button
              buttonType={"middleBtn"}
              style={{}}
              active={true}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Unstake
            </Button>
          </div>
          <div className={classes.header} style={{ background: `url(${header})` }}>
            <span className={classes.ore}>ORE</span>
            <span>
              {stakedTime ? JSON.parse(stakedTime).days : "00"}d :{" "}
              {stakedTime
                ? Math.trunc(JSON.parse(stakedTime).hours / 10) == 0
                  ? "0" + JSON.parse(stakedTime).hours
                  : JSON.parse(stakedTime).hours
                : "00"}
              h
            </span>
          </div>
          <div className={classes.pictureOre}>
            <img src={gnome} alt="Picture" />
          </div>
          <div className={classes.stakeParams}>
            <div>
              {rang[pair.rank]} = {parseFloat(pair.rank) % 10 == 0 ? parseFloat(pair.rank) / 10 + ".0" : parseFloat(pair.rank) / 10}x
            </div>
            <div>EARN = {pair.eOre_amount}/month</div>
            <div>
              D#{pair.character.index + 1} + W#{pair.weapon.index + 1}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.wrapBtn}>
            <Button
              buttonType={"middleBtn"}
              style={{}}
              active={true}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Unstake
            </Button>
          </div>
          <div className={classes.header} style={{ background: `url(${header})` }}>
            <span className={classes.adit}>Adit</span>
            <span>
              {stakedTime ? JSON.parse(stakedTime).days : "00"}d :{" "}
              {stakedTime
                ? Math.trunc(JSON.parse(stakedTime).hours / 10) == 0
                  ? "0" + JSON.parse(stakedTime).hours
                  : JSON.parse(stakedTime).hours
                : "00"}
              h
            </span>
          </div>
          <div className={classes.pictureAdit}>
            <img src={gnome} alt="Picture" />
          </div>
          <div className={classes.stakeParams}>
            <div>EARN = {pair.eAdit_amount}/month</div>
            <div>
              D#{pair.character.index + 1} + W#{pair.weapon.index + 1}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
