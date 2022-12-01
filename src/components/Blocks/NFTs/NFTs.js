import React from "react";
import { NFTsOfCollect } from "../NFTsOfCollect/NFTsOfCollect";
import classes from "./NFTs.module.css";
import { canisters } from "../../../canisters";

export const NFTs = ({
  setCharacterCount,
  setWeaponCount,
  weaponCount,
  characterCount,
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
  stakedNfts
}) => {
  let content = [];
  switch (page) {
    case "play":
      for (let collect in canisters) {
        if (collect === "dwarves") {
          content.push(
            <div className={classes.root} key={collect}>
              <NFTsOfCollect
                page={page}
                collect={collect}
                nfts={nfts}
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
                collect={collect}
                nfts={nfts}
                wrappedNfts={wrappedNfts}
                stakedNfts={stakedNfts}
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
      }
      break;

    case "wallet__miniNfts":
      if (JSON.parse(filt)["nfts"]) {
        content.push(
          <div className={classes.root} key={"dwarves"}>
            <NFTsOfCollect
              page={page}
              collect={"Eimolad nfts"}
              nfts={nfts}
              wrappedNfts={wrappedNfts}
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

    case "registration":
      if (JSON.parse(filt)["dwarves"]) {
        content.push(
          <div className={classes.root} key={"dwarves"}>
            <NFTsOfCollect
              page={page}
              setWeaponCount={setWeaponCount}
              setCharacterCount={setCharacterCount}
              weaponCount={weaponCount}
              characterCount={characterCount}
              collect={"dwarves"}
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
