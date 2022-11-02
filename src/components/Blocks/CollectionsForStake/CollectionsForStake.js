import React, { useEffect, useState, useRef } from "react";
import classes from "./CollectionsForStake.module.css";
import loader from "../../../media/loader.gif";
import { Carousel } from "../Carousel/Carousel";

export const CollectionsForStake = ({
  nfts,
  task,
  selectedWNFTs,
  setSelectedWNFTs,
  filt,
  page,
  setAccountInfoData,
  setNfts,
  allNfts,
  signedAccounts,
  setSignedAccounts,
  setWait,
}) => {
  let content = [];
  switch (page) {
    case "play":
      if (nfts && nfts != "{}") {
        for (let collect in JSON.parse(filt)) {
          if (collect == "dwarves") {
            content.push(
              <div className={classes.carousel} key={collect}>
                <Carousel
                  setAccountInfoData={setAccountInfoData}
                  page={page}
                  collect={collect}
                  nfts={JSON.parse(nfts)}
                  task={task}
                  selectedWNTFs={selectedWNFTs}
                  setSelectedWNFTs={setSelectedWNFTs}
                />
              </div>
            );
          }
        }
      }
      break;

    case "registration":
      if (nfts && nfts != "{}") {
        for (let collect in JSON.parse(filt)) {
          if (collect == "dwarves") {
            content.push(
              <div className={classes.carousel} key={collect}>
                <Carousel
                  setAccountInfoData={setAccountInfoData}
                  page={page}
                  collect={collect}
                  nfts={JSON.parse(nfts)}
                  allNfts={allNfts}
                  setNfts={setNfts}
                  task={task}
                  selectedWNTFs={selectedWNFTs}
                  setSelectedWNFTs={setSelectedWNFTs}
                  setWait={setWait}
                />
              </div>
            );
          }
        }
      }
      break;

    default:
      if (nfts && nfts != "{}") {
        for (let collect in JSON.parse(filt)) {
          if (JSON.parse(filt)[collect]) {
            content.push(
              <div className={classes.carousel} key={collect}>
                <Carousel collect={collect} nfts={JSON.parse(nfts)} task={task} selectedWNTFs={selectedWNFTs} setSelectedWNFTs={setSelectedWNFTs} />
              </div>
            );
          }
        }
      }
      break;
  }

  return <div className={classes.root}>{content.length > 0 ? content : null}</div>;
};
