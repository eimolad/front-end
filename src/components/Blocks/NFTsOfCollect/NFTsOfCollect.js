import React, { useEffect, useRef, useState } from "react";
import { NFT } from "../../UI/NFT/NFT";
import classes from "./NFTsOfCollect.module.css";
import decor from "../NFTs/decor.png";
import loaderGif from "../../../media/loader.gif";

const getCollectInfo = (collect, nfts, wrappedNfts) => {
  let nftsCount = 0;
  let wrappedCount = 0;
  for (let nft in nfts) {
    if (nfts[nft]["collection"] === collect) {
      nftsCount++;
      if (nfts[nft].metadata.state === "wrapped") wrappedCount++;
    }
    if (nfts[nft]["name"] === "Grenlyn’s Shield") nftsCount++;
  }

  for (let nft in wrappedNfts) {
    if (wrappedNfts[nft]["collection"] === collect) {
      nftsCount++;
      if (wrappedNfts[nft].metadata.state === "wrapped") wrappedCount++;
    }
    if (wrappedNfts[nft]["name"] === "Grenlyn’s Shield") nftsCount++;
  }
  return { nftsCount: nftsCount, wrappedCount: wrappedCount };
};

export const NFTsOfCollect = ({
  collect,
  nfts,
  selected,
  refresh,
  setRefresh,
  setSelected,
  setSelectedToken,
  selectedWNTFs,
  setSelectedWNFTs,
  page,
  setWeaponCount,
  setCharacterCount,
  weaponCount,
  characterCount,
  wrappedNfts,
  stakedNfts,
}) => {
  let loader = true;
  let wrappedLoader = true;
  let stakedLoader = true;

  let NFTs = [];
  let wrappedNFTs = [];
  let stakedNFTs = [];

  let collectInfo = getCollectInfo(collect, nfts ? JSON.parse(nfts) : {}, wrappedNfts ? JSON.parse(wrappedNfts) : {});

  if (page === "wallet__miniNfts") {
    if (nfts && nfts != "{}" && loader) {
      let count = 0;
      for (let tid in JSON.parse(nfts)) {
        NFTs.push(
          <NFT
            page={page}
            nft={JSON.parse(nfts)[tid]}
            nftTID={Object.keys(JSON.parse(nfts))[count]}
            key={tid}
            selected={selected}
            setSelected={setSelected}
            setSelectedToken={setSelectedToken}
            selectedWNFTs={selectedWNTFs}
            setSelectedWNFTs={setSelectedWNFTs}
            state={'none'}
          />
        );

        count++;
      }
      loader = false;
    }
  } else {
    if (nfts && nfts != "{}" && loader) {
      let count = 0;
      for (let tid in JSON.parse(nfts)) {
        if (JSON.parse(nfts)[tid].collection == collect) {
          NFTs.push(
            <NFT
              page={page}
              nft={JSON.parse(nfts)[tid]}
              nftTID={Object.keys(JSON.parse(nfts))[count]}
              key={tid}
              selected={selected}
              setSelected={setSelected}
              setSelectedToken={setSelectedToken}
              selectedWNFTs={selectedWNTFs}
              setSelectedWNFTs={setSelectedWNFTs}
              state={'none'}
            />
          );
        }
        count++;
      }
      loader = false;
    }

    if (wrappedNfts && wrappedNfts != "{}" && wrappedLoader) {
      let count = 0;
      for (let tid in JSON.parse(wrappedNfts)) {
        if (JSON.parse(wrappedNfts)[tid].collection == collect) {
          wrappedNFTs.push(
            <NFT
              page={page}
              nft={JSON.parse(wrappedNfts)[tid]}
              nftTID={Object.keys(JSON.parse(wrappedNfts))[count]}
              key={tid}
              selected={selected}
              setSelected={setSelected}
              setSelectedToken={setSelectedToken}
              selectedWNFTs={selectedWNTFs}
              setSelectedWNFTs={setSelectedWNFTs}
              state={'wrapped'}
            />
          );
        }
        count++;
      }
      wrappedLoader = false;
    }

    if (stakedNfts && stakedNfts != "{}" && stakedLoader) {
      let count = 0;
      for (let tid in JSON.parse(stakedNfts)) {
        if (JSON.parse(stakedNfts)[tid].collection == collect) {
          stakedNFTs.push(
            <NFT
              page={page}
              nft={JSON.parse(stakedNfts)[tid]}
              nftTID={Object.keys(JSON.parse(stakedNfts))[count]}
              key={tid}
              selected={selected}
              setSelected={setSelected}
              setSelectedToken={setSelectedToken}
              selectedWNFTs={selectedWNTFs}
              setSelectedWNFTs={setSelectedWNFTs}
              state={'staked'}
            />
          );
        }
        count++;
      }
      stakedLoader = false;
    }
  }

  if (page == "wallet") {
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.collectName}>{collect}</div>
          <div className={classes.count}>
            <span>{collectInfo.nftsCount}</span>
          </div>
        </div>
        <div className={classes.decor}>
          <img src={decor} alt="decor" />
        </div>
        {!loader && NFTs.length > 0 ? (
          <>
            <div className={classes.grid}>{NFTs}</div>
            <div className={classes.grid}>{wrappedNFTs}</div>
            <div className={classes.grid}>{stakedNFTs}</div>

          </>
        ) : !loader && NFTs.length == 0 ? null : (
          <div className={classes.loader}>
            <img src={loaderGif} alt="loader" />
          </div>
        )}
      </div>
    );
  }

  if (page == "wallet__miniNfts") {
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.collectName}>{collect}</div>
          <div className={classes.count}>
            <span>{collectInfo.nftsCount}</span>
          </div>
        </div>
        <div className={classes.decor}>
          <img src={decor} alt="decor" />
        </div>
        {!loader && NFTs.length > 0 ? (
          <>
            <div className={classes.grid}>{NFTs}</div>
            <div className={classes.grid}>{wrappedNFTs}</div>
          </>
        ) : !loader && NFTs.length == 0 ? null : (
          <div className={classes.loader}>
            <img src={loaderGif} alt="loader" />
          </div>
        )}
      </div>
    );
  }

  if (page == "play") {
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.collectName}>{""}</div>
          <div className={classes.count}>
            <span>{collectInfo.nftsCount}</span>
          </div>
        </div>
        <div className={classes.decor}>
          <img src={decor} alt="decor" />
        </div>
        {!loader && NFTs.length > 0 ? (
          <div className={classes.grid}>{NFTs}</div>
        ) : !loader && NFTs.length == 0 ? null : (
          <div className={classes.loader}>
            <img src={loaderGif} alt="loader" />
          </div>
        )}
      </div>
    );
  }

  if (page == "registration") {
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.collectName}>{""}</div>
        </div>

        {!loader && NFTs.length > 0 ? (
          <div className={classes.grid}>{NFTs}</div>
        ) : !loader && NFTs.length == 0 ? null : (
          <div className={classes.loader}>
            <img src={loaderGif} alt="loader" />
          </div>
        )}
      </div>
    );
  }
};
