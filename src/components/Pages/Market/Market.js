/* global BigInt */
import React, { useEffect, useState } from "react";
import {
  clipboardCopy,
  getAddress,
  tokenIdentifier,
} from "../../../utils/utils";
import bg from "../../../media/bg.png";
import loader from "../../../media/loader.gif";
import { WalletWarning } from "../../Blocks/WalletWarning/WalletWarning";
import { SendForm } from "../../Blocks/SendForm/SendForm";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Button } from "../../UI/Button/Button";
import copy from "../Wallet/copy.png";
import { Filter } from "../../Blocks/Filter/Filter";
import { Tokens } from "../../Blocks/Tokens/Tokens";
import { NFTs } from "../../Blocks/NFTs/NFTs";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import { NFTsOfCollect } from "../../Blocks/NFTsOfCollect/NFTsOfCollect";
import { NFT } from "../../UI/NFT/NFT";
import axeIcon from "./axeIcon.png";
import classes from "./Market.module.css";
import leftBlock from "../../UI/NFTforSale/leftBlock.png";
import { NFTforSale } from "../../UI/NFTforSale/NFTforSale";
import { canisters } from "../../../canisters";
import { compose, fontSize, height } from "@mui/system";
import async from "pbkdf2/lib/async";
import { Input, setRef } from "@mui/material";
import { ModalMarket } from "./ModalMarket/ModalMarket";
import { Switch } from "../../UI/Switch/Switch";
import { Resources } from "../../Blocks/Resources/Resources";
import { MyOffers } from "./MyOffers/MyOffers";
import decor from "./decor.png";
import { MarketModal } from "./MarketModal/MarketModal";
import { TextField } from "@mui/material";

const addSell = async (
  address,
  selectedNFT,
  selectedMoney,
  price,
  amount,
  callback
) => {
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

  const info = [
    {
      name: JSON.parse(selectedNFT).collection,
      title: "weapon for dwarf", // why do we need it?
      indexNFT: String(JSON.parse(selectedNFT).index),
      amount: Number(amount),
      price: Number(price),
      timeStart: Number(Date.now() * 1000000),
      description: [""],
    },
  ];

  const args = {
    idSell: 2, //TODO: how to generate id??
    aid: address,
    info: info,
    orders: [],
    fullPrice: Number(price),
    money: selectedMoney,
    status: true,
  };
  actor.addSell(args).then((data) => {
    callback(data);
  });
};

const addBuy = async (address, callback) => {
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

  const info = {
    name: "dwarves",
    title: "text",
    indexNFT: "168",
    amount: 1,
    price: 1000000,
    timeStart: Number(Date.now() * 1000000),
    description: ["desc"],
  };

  // callback(args)
  const args = {
    idBuy: 2,
    aid: address,
    info: info,
    orders: [{ aid: address, price: 100, amount: 1 }],
    fullPrice: 1000000,
    money: "gold",
    status: true,
  };
  console.log(args?.aid);
  actor.addBuy(args).then((data) => {
    callback(data);
  });
};

const getSell = async (callback) => {
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

  actor.getSell().then((data) => {
    callback(data);
  });
};

const getBuy = async (callback) => {
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

  actor.getBuy().then((data) => {
    callback(data);
  });
};

export const Market = ({ nfts, address, setAddress, setTask, balances }) => {
  let NFTsForSaleElements = [];
  let NFTsForBuyElements = [];

  const [nftForSale, setNftForSale] = useState([]);
  const [nftForBuy, setNftForBuy] = useState([]);
  const [modal, setModal] = useState(false);

  const [clickedMenu, setClickedMenu] = useState(false);
  const [curPos, setCurPos] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getSell((data) => setNftForSale(data));
    };
    fetchData();
  }, [nfts]);

  useEffect(() => {
    const fetchData = async () => {
      await getBuy((data) => setNftForBuy(data));
    };
    fetchData();
  }, [nfts]);

  if (nftForSale.length !== 0) {
    for (let collect in canisters) {
      for (let index in nftForSale) {
        if (nftForSale[index][1].info[0].name == collect) {
          NFTsForSaleElements.push(
            <NFTforSale
              nfts={JSON.stringify(nftForSale[index][1], (_, v) =>
                typeof v === "bigint" ? v.toString() : v
              )}
              key={index}
              collect={collect}
            />
          );
        }
      }
    }
  }

  if (nftForBuy.length !== 0) {
    for (let collect in canisters) {
      for (let index in nftForSale) {
        if (nftForBuy[index][1].info[0].name == collect) {
          NFTsForBuyElements.push(
            <NFTforSale
              nfts={JSON.stringify(nftForBuy[index][1], (_, v) =>
                typeof v === "bigint" ? v.toString() : v
              )}
              key={index}
              collect={collect}
            />
          );
        }
      }
    }
  }

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${bg})` }}>
      <MarketModal
        address={address}
        nfts={nfts}
        active={modal}
        setActive={setModal}
      ></MarketModal>
      {/* <ModalMarket
        visible={modal}
        setVisible={setModal}
        address={address}
        setAddress={setAddress}
        nfts={nfts}
      /> */}
      {/* <button onClick={() => setModal(true)}>add sell</button> TODO:Button for modal */}
      <MenuBar
        address={address}
        clicked={clickedMenu}
        setClicked={setClickedMenu}
        curLink="Market"
        setTask={setTask}
      >
        <div className={classes.switcher}>
          <Switch
            page="Market"
            curPos={curPos}
            setCurPos={setCurPos}
            val1="My Offers"
            val2="Buy"
            val3="Sell"
          />
        </div>
      </MenuBar>

      <Resources
        page="Play"
        className={classes.resources}
        balances={balances}
      />

      {curPos == 0 ? (
        <>
          <h2>SELL</h2>
          <div className={classes.titles_container}>
            <div className={classes.titles}>
              <p className={classes.title}>Deals</p>
              <p className={classes.titleQuantity}>Quantity</p>
              <p className={classes.titlePrice}>Price</p>
            </div>
          </div>
          <div className={classes.NFTforSaleBlock}>
            <MyOffers purpose="Sell"></MyOffers>
            <MyOffers purpose="Sell"></MyOffers>
            <MyOffers purpose="Sell"></MyOffers>
          </div>
          <p
            className={classes.addButton}
            onClick={() => {
              setModal(true);
            }}
          >
            + Аdd
          </p>
          <div className={classes.decor}>
            <img src={decor} alt="decor" />
          </div>
          <h2>BUY</h2>
          <div className={classes.titles_container}>
            <div className={classes.titles}>
              <p className={classes.title}>Deals</p>
              <p className={classes.titleQuantity}>Quantity</p>
              <p className={classes.titlePrice}>Price</p>
            </div>
          </div>
          <div className={classes.NFTforSaleBlock}>
            <MyOffers purpose="Sell"></MyOffers>
            <MyOffers purpose="Sell"></MyOffers>
            <MyOffers purpose="Sell"></MyOffers>
          </div>
          <p className={classes.addButton}>+ Аdd</p>
        </>
      ) : (
        <></>
      )}
      {curPos == 1 ? (
        <>
          <div className={classes.titles_container}>
            <div className={classes.titles}>
              <p className={classes.titleIcon}>Icon</p>
              <p className={classes.title}>Title + Discription</p>
              <p className={classes.titleQuantity}>Quantity</p>
              <p className={classes.titlePrice}>Price</p>
            </div>
          </div>
          <div className={classes.NFTforSaleBlock}>{NFTsForBuyElements}</div>
        </>
      ) : (
        <></>
      )}
      {curPos == 2 ? (
        <>
          <div className={classes.titles_container}>
            <div className={classes.titles}>
              <p className={classes.titleIcon}>Icon</p>
              <p className={classes.title}>Title + Discription</p>
              <p className={classes.titleQuantity}>Quantity</p>
              <p className={classes.titlePrice}>Price</p>
            </div>
          </div>
          <div className={classes.NFTforSaleBlock}>{NFTsForSaleElements}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
