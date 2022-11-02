import React, { useEffect, useState } from "react";
import { NFTs } from "../../Blocks/NFTs/NFTs";
import { clipboardCopy, getAddress, getPrincipal, getSubAccountArray, principalToAccountIdentifier } from "../../../utils/utils";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Button } from "../../UI/Button/Button";
import { Filter } from "../../Blocks/Filter/Filter";
import classes from "./Wallet.module.css";
import bg from "../../../media/bg.png";
import { Tokens } from "../../Blocks/Tokens/Tokens";
import { SendForm } from "../../Blocks/SendForm/SendForm";
import loader from "../../../media/loader.gif";
import copy from "./copy.png";
import { WalletWarning } from "../../Blocks/WalletWarning/WalletWarning";
import { Licenses } from "../../Blocks/Licenses/Licenses";
import { NFTsSend } from "../../../utils/canisterUtils";

const changeState = (nfts, selected, state) => {
  let n = JSON.parse(nfts);

  console.log(n);

  for (let tid in JSON.parse(selected)) {
    console.log(tid, JSON.parse(selected));
    // JSON.parse(selected)[tid].metadata.state = state;
    n[tid].metadata.state = state;
    console.log(tid, n[tid]);
  }
  return JSON.stringify(n);
};

const changeNfts = (nfts, selected) => {
  let n = JSON.parse(nfts);

  for (let tid in JSON.parse(selected)) {
    // JSON.parse(selected)[tid].metadata.state = state;
    delete n[tid];
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
  setSignedAccounts,
  signedAccounts,
  setUnsignedNFTs,
  unsignedNFTs,
  principal,
  setPrincipal,
  setWrappedNfts,
  wrappedNfts,
  wrappedAddress,

}) => {
  if (!address || address == "1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79") {
    if (localStorage.getItem("ic-delegation") && localStorage.getItem("ic-delegation") !== "" && localStorage.getItem("ic-identity") !== "") {
      getAddress((addr) => setAddress(addr));
    } else {
      window.location.assign("/");
    }
  }
  if (!principal || principal==='2vxsx-fae') {
    getPrincipal((princ) => {
      setPrincipal(princ);
    });
  }
  const [filt, setFilt] = useState(JSON.stringify({ tokens: true, licenses: true, dwarves: true, weapons: true }));
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
            nfts={nfts}
            balances={balances}
            setBalances={setBalances}
            setActive={setActiveSendForm}
            selected={selectedNFTs != "{}" ? selectedNFTs : selectedWNFTs}
            selToken={selectedToken}
            setNFTs={setNfts}
          />
          <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="wallet" setTask={setTask}>
            <div className={classes.buttons}>
              <Button
                active={activeWrapBtn}
                style={{}}
                buttonType="middleBtn"
                onClick={() => {
                  if (selectedWNFTs === "{}") {
                    setWait(true);
                    NFTsSend(selectedNFTs, principalToAccountIdentifier(principal, 2), getSubAccountArray(0), (res) => {
                      setNfts(changeNfts(nfts, selectedNFTs));
                      setWait(false);
                      setSelectedNFTs("{}");
                      console.log(res);
                    });
                  } else {
                    setWait(true);
                    NFTsSend(selectedWNFTs, address, getSubAccountArray(2), (res) => {
                      setNfts(changeNfts(nfts, selectedNFTs));
                      setWait(false);
                      setSelectedWNFTs("{}");
                      console.log(res);
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
          <div className={classes.walletContent}>
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
            {JSON.parse(filt).licenses ? (
              <Licenses
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
            <h3 style={{ display: "flex", justifyContent: "center" }}>Wrapped NFTs</h3>
            <NFTs
              page="wallet"
              address={address}
              nfts={wrappedNfts}
              filt={filt}
              selected={selectedNFTs}
              setSelected={setSelectedNFTs}
              setSelectedToken={setSelectedToken}
              selectedWNFTs={selectedWNFTs}
              setSelectedWNFTs={setSelectedWNFTs}
              wrapped={true}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
