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
  wrapped,
  wrappedNfts,
}) => {
  let content = [];

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
          wrappedNfts={wrappedNfts}
          selected={selected}
          refresh={refresh}
          setRefresh={setRefresh}
          setSelected={setSelected}
          setSelectedToken={setSelectedToken}
          selectedWNTFs={selectedWNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
          wrapped={wrapped}
        />
      </div>
    );
  }

  return <>{content.length > 0 ? content : null}</>;
};
