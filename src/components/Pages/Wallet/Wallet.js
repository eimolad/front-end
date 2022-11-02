import React, { useEffect, useState } from "react";
import { NFTs } from "../../Blocks/NFTs/NFTs";
import { clipboardCopy, getAddress } from "../../../utils/utils";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Footer } from "../../Blocks/Footer/Footer";
import { Button } from "../../UI/Button/Button";
import { Filter } from "../../Blocks/Filter/Filter";
import classes from "./Wallet.module.css";
import bg from "../../../media/bg.png";
import { Tokens } from "../../Blocks/Tokens/Tokens";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import { SendForm } from "../../Blocks/SendForm/SendForm";
import loader from "../../../media/loader.gif";
import copy from "./copy.png";
import { WalletWarning } from "../../Blocks/WalletWarning/WalletWarning";
// import {Resources} from "../../Blocks/Resources/Resources";

const setWrapped = async (selectedNFTs, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: "dwyty-piaaa-aaaan-qagma-cai",
  });
  const args = [];
  for (let tid in JSON.parse(selectedNFTs)) {
    args.push(tid);
  }
  await actor.wrap(args).then((data) => {
    callback(data);
  });
};

const setUnWrapped = async (selectedWNFTs, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: "dwyty-piaaa-aaaan-qagma-cai",
  });
  const args = [];
  for (let tid in JSON.parse(selectedWNFTs)) {
    args.push(tid);
  }
  await actor.unWrap(args).then((data) => {
    callback(data);
  });
};

const changeState = (nfts, selected, state) => {
  let n = JSON.parse(nfts);
  for (let tid in JSON.parse(selected)) {
    // JSON.parse(selected)[tid].metadata.state = state;
    n[tid].metadata.state = state;
    console.log(tid, n[tid]);
  }
  return JSON.stringify(n);
};

export const Wallet = ({
  address,
  setAddress,
  nfts,
  setNfts,
  setTask,
  balances,
  setBalances,
}) => {
  if (!address) {
    if (localStorage.getItem("ic-delegation")) {
      getAddress((addr) => setAddress(addr));
    } else {
      window.location.assign("/");
    }
  }

  const [filt, setFilt] = useState(
    JSON.stringify({ tokens: true, dwarves: true, weapons: true })
  );
  const [clickedMenu, setClickedMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSendForm, setActiveSendForm] = useState(false);
  const [activeWarning, setActiveWarning] = useState(true);
  const [activeWrapBtn, setActiveWrapBtn] = useState(false);
  const [activeSendBtn, setActiveSendBtn] = useState(false);
  const [selectedNFTs, setSelectedNFTs] = useState(JSON.stringify({}));
  const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({}));
  const [selectedToken, setSelectedToken] = useState(null);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (selectedNFTs === "{}") {
      setActiveWrapBtn(false);
      setActiveSendBtn(false);
    } else {
      setActiveWrapBtn(true);
      setActiveSendBtn(true);
    }
  }, [selectedNFTs]);

  useEffect(() => {
    if (selectedWNFTs === "{}" && selectedNFTs == "{}") {
      setActiveWrapBtn(false);
      setActiveSendBtn(false);
    } else if (selectedNFTs == "{}") {
      setActiveWrapBtn(true);
      setActiveSendBtn(false);
    }
  }, [selectedWNFTs]);

  useEffect(() => {
    if (selectedToken === null) {
      if (selectedNFTs != "{}") {
        setActiveSendBtn(true);
      } else {
        setActiveSendBtn(false);
      }
    } else {
      setActiveSendBtn(true);
    }
  }, [selectedToken]);
  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${bg})` }}
      onClick={() => {
        if (clickedMenu) {
          setClickedMenu(false);
        }
      }}
    >
      {wait ? (
        <div className={classes.wait}>
          <img src={loader} alt="Wait" />
        </div>
      ) : null}
      {address ? (
        <>
          <WalletWarning active={activeWarning} setActive={setActiveWarning} />
          <SendForm
            active={activeSendForm}
            balances={balances}
            setBalances={setBalances}
            setActive={setActiveSendForm}
            selected={selectedNFTs != "{}" ? selectedNFTs : selectedWNFTs}
            selToken={selectedToken}
          />
          <MenuBar
            address={address}
            clicked={clickedMenu}
            setClicked={setClickedMenu}
            curLink="wallet"
            setTask={setTask}
          >
            <div className={classes.buttons}>
              <Button
                active={activeWrapBtn}
                style={{}}
                buttonType="middleBtn"
                onClick={() => {
                  if (selectedWNFTs === "{}") {
                    setWait(true);
                    setWrapped(selectedNFTs, (res) => {
                      setNfts(changeState(nfts, selectedNFTs, "wrapped"));
                      setSelectedNFTs("{}");
                      // setRefresh(true)
                      setWait(false);
                    });
                  } else {
                    setWait(true);
                    setUnWrapped(selectedWNFTs, (res) => {
                      setNfts(changeState(nfts, selectedWNFTs, "none"));
                      setSelectedWNFTs("{}");
                      // setRefresh(true)
                      setWait(false);
                    });
                  }
                }}
              >
                {selectedWNFTs === "{}" ? "Wrap" : "Unwrap"}
              </Button>
              <Button
                active={activeSendBtn}
                style={{}}
                buttonType="middleBtn"
                selected={setSelectedNFTs}
                onClick={() => {
                  setActiveSendForm(true);
                }}
              >
                Send
              </Button>
              <div
                className={classes.address}
                onClick={() => {
                  clipboardCopy(address);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                }}
              >
                {copied ? <div>Copied</div> : null}
                <img src={copy} alt="Copy address" />
                {address.substr(0, 6) + "..." + address.substr(58, 64)}
              </div>
            </div>
          </MenuBar>{" "}
          {/*<Resources address={address}/>*/}
          <Filter filt={filt} setFilt={setFilt} />
          {JSON.parse(filt).tokens ? (
            <Tokens
              address={address}
              selected={selectedToken}
              setSelected={setSelectedToken}
              selectedNFTs={selectedNFTs}
              setSelectedNFTs={setSelectedNFTs}
              balances={balances}
              setBalances={setBalances}
              selectedWNFTs={selectedWNFTs}
              setSelectedWNFTs={setSelectedWNFTs}
            />
          ) : null}
          <NFTs
            page="wallet"
            address={address}
            nfts={nfts}
            filt={filt}
            selected={selectedNFTs}
            setSelected={setSelectedNFTs}
            setSelectedToken={setSelectedToken}
            selectedWNFTs={selectedWNFTs}
            setSelectedWNFTs={setSelectedWNFTs}
          />
        </>
      ) : null}
    </div>
  );
};
