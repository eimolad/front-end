import React, { useState } from "react";
import { NFTcar } from "../../UI/NFTcar/NFTcar";
import classes from "./Carousel.module.css";
import decor from "../NFTs/decor.png";
import loader from "../../../media/loader.gif";
import leftArr from "./leftArrow.png";
import rightArr from "./rightArrow.png";
import { Token } from "../../UI/Token/Token";
import { Link } from "react-router-dom";

const getCollectInfo = (collect, nfts) => {
  let nftsCount = 0;
  let wrappedCount = 0;
  for (let nft in nfts) {
    if (nfts[nft]["collection"] === collect) {
      nftsCount++;
      if (nfts[nft].metadata.state === "wrapped") wrappedCount++;
    }
  }
  return { nftsCount: nftsCount, wrappedCount: wrappedCount };
};

export const Carousel = ({
  nfts,
  setNfts,
  allNfts,
  collect,
  task,
  selectedWNTFs,
  setSelectedWNFTs,
  page,
  setAccountInfoData,
  tokens,
  signedAccounts,
  setSignedAccounts,
  setWait,
}) => {
  let NFTs = [];
  const [pos, setPos] = useState(0);
  let collectInfo = getCollectInfo(collect, nfts);

  switch (page) {
    case "play":
      for (let nft in nfts) {
        if (nfts[nft].collection === "dwarves" 
        // && nfts[nft].metadata.state !== "none"
        ) {
          NFTs.push(
            <NFTcar
              setAccountInfoData={setAccountInfoData}
              page={page}
              key={nft}
              nft={nfts[nft]}
              task={task}
              selectedWNFTs={selectedWNTFs}
              setSelectedWNFTs={setSelectedWNFTs}
            />
          );
        }
      }
      return (
        <div className={classes.rootForPlay}>
          <div className={classes.carouselForPlay}>
            {NFTs.length > 0 ? (
              <>
                <div
                  className={classes.leftArrForPlay}
                  onClick={() => {
                    let sw = 200;
                    if (window.screen.width >= 768 && window.screen.width < 1110) {
                      sw = 170;
                    }
                    if (window.screen.width >= 540 && window.screen.width < 768) {
                      sw = 180;
                    }
                    if (window.screen.width < 540) {
                      sw = 170;
                    }
                    if (-pos < (NFTs.length - 2) * sw) setPos(pos - sw);
                  }}
                >
                  <img src={leftArr} alt="" />
                </div>

                <div className={classes.carouselWrapperForPlay}>
                  <div className={classes.items} style={{ marginLeft: `${pos}px` }}>
                    {NFTs.length > 0 ? NFTs : <div className={classes.loader}>{loader}</div>}
                  </div>
                </div>
                <div
                  className={classes.rightArrForPlay}
                  onClick={() => {
                    let sw = 200;
                    if (window.screen.width >= 768 && window.screen.width < 1110) {
                      sw = 170;
                    }
                    if (window.screen.width >= 540 && window.screen.width < 768) {
                      sw = 180;
                    }
                    if (window.screen.width < 540) {
                      sw = 170;
                    }
                    if (pos < 0) setPos(pos + sw);
                  }}
                >
                  <img src={rightArr} alt="" />
                </div>
              </>
            ) : (
              <div className={classes.nothing}>
                <p>You have to Wrap a character to create an account</p>
              </div>
            )}
          </div>
        </div>
      );

    case "registration": {
      for (let nft in nfts) {
        if (nfts[nft].collection === "dwarves") {
          NFTs.push(
            <NFTcar
              setAccountInfoData={setAccountInfoData}
              page={page}
              key={nft}
              nft={nfts[nft]}
              task={task}
              selectedWNFTs={selectedWNTFs}
              setSelectedWNFTs={setSelectedWNFTs}
              allNfts={allNfts}
              setNfts={setNfts}
              setWait={setWait}
            />
          );
        }
      }
      return (
        <div className={classes.rootForReg}>
          <div className={classes.carouselForReg}>
            {
              NFTs.length > 0 ? (
                <>
                  <div
                    className={classes.leftArrForReg}
                    onClick={() => {
                      let sw = 200;
                      if (window.screen.width >= 768 && window.screen.width < 1110) {
                        sw = 170;
                      }
                      if (window.screen.width >= 540 && window.screen.width < 768) {
                        sw = 180;
                      }
                      if (window.screen.width < 540) {
                        sw = 170;
                      }
                      if (-pos < (NFTs.length - 2) * sw) setPos(pos - sw);
                    }}
                  >
                    <img src={leftArr} alt="" />
                  </div>

                  <div className={classes.carouselWrapperForReg}>
                    <div className={classes.itemsForReg} style={{ marginLeft: `${pos}px` }}>
                      {NFTs.length > 0 ? NFTs : <div className={classes.loader}>{loader}</div>}
                    </div>
                  </div>
                  <div
                    className={classes.rightArrForReg}
                    onClick={() => {
                      let sw = 200;
                      if (window.screen.width >= 768 && window.screen.width < 1110) {
                        sw = 170;
                      }
                      if (window.screen.width >= 540 && window.screen.width < 768) {
                        sw = 180;
                      }
                      if (window.screen.width < 540) {
                        sw = 170;
                      }
                      if (pos < 0) setPos(pos + sw);
                    }}
                  >
                    <img src={rightArr} alt="" />
                  </div>
                </>
              ) : null
              // <div className={classes.nothingForReg}>Nothing</div>
            }
          </div>
        </div>
      );
    }
    case "wallet":
      NFTs = tokens;
      let sortedNFTs = [];
      let keys = Object.keys(JSON.parse(NFTs[0].props.balances));
      for (let key in keys) {
        if (JSON.parse(NFTs[0].props.balances)[keys[key]] !== 0) {
          if (key === "5") continue; //LGS
          sortedNFTs.push(JSON.parse(NFTs[0].props.balances)[keys[key]]);
        }
      }
      return (
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.collectName}>{collect}</div>
            <div className={classes.countForReg}>
              <span>{}</span>
            </div>
          </div>
          <div className={classes.decor}>
            <img src={decor} alt="decor" />
          </div>
          <div className={classes.carousel}>
            {sortedNFTs.length > 0 ? (
              <>
                <div
                  className={classes.leftArrForWal}
                  onClick={() => {
                    let sw = 200;
                    if (window.screen.width >= 768 && window.screen.width < 1110) {
                      sw = 170;
                    }
                    if (window.screen.width >= 540 && window.screen.width < 768) {
                      sw = 180;
                    }
                    if (window.screen.width < 540) {
                      sw = 170;
                    }
                    if (-pos < (sortedNFTs.length - 2) * sw) setPos(pos - sw);
                  }}
                >
                  <img src={leftArr} alt="" />
                </div>
                <div className={classes.carouselWrapper}>
                  <div className={classes.items} style={{ marginLeft: `${pos}px` }}>
                    {sortedNFTs.length > 0 ? NFTs : <div className={classes.loader}>{loader}</div>}
                  </div>
                </div>
                <div
                  className={classes.rightArrForWal}
                  onClick={() => {
                    let sw = 200;
                    if (window.screen.width >= 768 && window.screen.width < 1110) {
                      sw = 170;
                    }
                    if (window.screen.width >= 540 && window.screen.width < 768) {
                      sw = 180;
                    }
                    if (window.screen.width < 540) {
                      sw = 170;
                    }
                    if (pos < 0) setPos(pos + sw);
                  }}
                >
                  <img src={rightArr} alt="" />
                </div>
              </>
            ) : (
              <div className={classes.nothing}>Nothing</div>
            )}
          </div>
        </div>
      );

    default:
      for (let nft in nfts) {
        if (nfts[nft].collection === collect) {
          NFTs.push(<NFTcar key={nft} nft={nfts[nft]} task={task} selectedWNFTs={selectedWNTFs} setSelectedWNFTs={setSelectedWNFTs} />);
        }
      }
      return (
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.collectName}>{collect}</div>
            <div className={classes.count}>
              <span>{collectInfo.wrappedCount}</span>
            </div>
          </div>
          <div className={classes.decor}>
            <img src={decor} alt="decor" />
          </div>
          <div className={classes.carousel}>
            {NFTs.length > 0 ? (
              <>
                <div
                  className={classes.leftArr}
                  onClick={() => {
                    let sw = 200;
                    if (window.screen.width >= 768 && window.screen.width < 1110) {
                      sw = 170;
                    }
                    if (window.screen.width >= 540 && window.screen.width < 768) {
                      sw = 180;
                    }
                    if (window.screen.width < 540) {
                      sw = 170;
                    }
                    console.log(-pos < (NFTs.length - 3) * sw);

                    if (-pos < (NFTs.length - 2) * sw) setPos(pos - sw);
                  }}
                >
                  <img src={leftArr} alt="" />
                </div>
                <div className={classes.carouselWrapper}>
                  <div className={classes.items} style={{ marginLeft: `${pos}px` }}>
                    {NFTs.length > 0 ? NFTs : <div className={classes.loader}>{loader}</div>}
                  </div>
                </div>
                <div
                  className={classes.rightArr}
                  onClick={() => {
                    let sw = 200;
                    if (window.screen.width >= 768 && window.screen.width < 1110) {
                      sw = 170;
                    }
                    if (window.screen.width >= 540 && window.screen.width < 768) {
                      sw = 180;
                    }
                    if (window.screen.width < 540) {
                      sw = 170;
                    }
                    if (pos < 0) setPos(pos + sw);
                  }}
                >
                  <img src={rightArr} alt="" />
                </div>
              </>
            ) : (
              <div className={classes.nothing}>Nothing</div>
            )}
          </div>
        </div>
      );
  }
};
