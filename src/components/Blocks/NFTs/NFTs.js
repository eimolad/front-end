import React, { useEffect, useState, useRef } from "react";
import { NFTsOfCollect } from "../NFTsOfCollect/NFTsOfCollect";
import classes from "./NFTs.module.css";
import { canisters } from "../../../canisters";

export const NFTs = ({
  setCharacterCount,
  setWeaponCount,
  weaponCount,
  characterCount,
  address,
  nfts,
  selected,
  refresh,
  setRefresh,
  setSelected,
  setSelectedToken,
  selectedWNFTs,
  setSelectedWNFTs,
  filt,
  page,
}) => {
  let content = [];
  switch (page) {
    case "play":
      for (let collect in canisters) {
        if (collect == "dwarves") {
          content.push(
            <div className={classes.root} key={collect}>
              <NFTsOfCollect
                setWeaponCount={setWeaponCount}
                setCharacterCount={setCharacterCount}
                weaponCount={weaponCount}
                characterCount={characterCount}
                page={page}
                collect={collect}
                nfts={nfts}
                selected={selected}
                refresh={refresh}
                setRefresh={setRefresh}
                setSelected={setSelected}
                setSelectedToken={setSelectedToken}
                selectedWNTFs={selectedWNFTs}
                setSelectedWNFTs={setSelectedWNFTs}
              />
            </div>
          );
        }
      }
      break;

    case "wallet":
      for (let collect in canisters) {
        if (JSON.parse(filt)[collect]) {
          content.push(
            <div className={classes.root} key={collect}>
              <NFTsOfCollect
                page={page}
                setWeaponCount={setWeaponCount}
                setCharacterCount={setCharacterCount}
                weaponCount={weaponCount}
                characterCount={characterCount}
                collect={collect}
                nfts={nfts}
                selected={selected}
                refresh={refresh}
                setRefresh={setRefresh}
                setSelected={setSelected}
                setSelectedToken={setSelectedToken}
                selectedWNTFs={selectedWNFTs}
                setSelectedWNFTs={setSelectedWNFTs}
              />
            </div>
          );
        }
      }
      break;

      case "registration":
        if (JSON.parse(filt)['dwarves']) {
          content.push(
            <div className={classes.root} key={'dwarves'}>
              <NFTsOfCollect
                page={page}
                setWeaponCount={setWeaponCount}
                setCharacterCount={setCharacterCount}
                weaponCount={weaponCount}
                characterCount={characterCount}
                collect={'dwarves'}
                nfts={nfts}
                selected={selected}
                refresh={refresh}
                setRefresh={setRefresh}
                setSelected={setSelected}
                setSelectedToken={setSelectedToken}
                selectedWNTFs={selectedWNFTs}
                setSelectedWNFTs={setSelectedWNFTs}
              />
            </div>
          );
        }
      
      break;

    default:
      content.push("none");
      break;
  }

  return <>{content.length > 0 ? content : null}</>;
};
