import React from "react";
import { tokenIdentifier } from "../../../utils/utils";
import "./NFT.css";
import wrappedImg from "./wrapped.png";
import swords from "./swords.png";

export const NFT = ({
  page,
  nft,
  nftTID,
  selected,
  setSelected,
  setSelectedToken,
  selectedWNFTs,
  setSelectedWNFTs,
  setWeaponCount,
  setCharacterCount,
  weaponCount,
  characterCount,
  state,
}) => {
  if (page === "play") {
    return (
      <>
        <div className={"rootNFT"}>
          <div
            className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "borderNFT" : "borderNFT ActiveNFT"}
            onClick={() => {
              // if (
              //   nft.metadata.state == "none" ||
              //   nft.metadata.state == "listed" //TODO: убрать проверку на listed
              // ) {
              //   const sl = JSON.parse(selected);
              //   setSelectedToken(null);
              //   setSelectedWNFTs("{}");
              //   if (
              //     sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]
              //   ) {
              //     if (nft.type == "character") {
              //       setCharacterCount(characterCount - 1);
              //     }
              //     if (nft.type == "equipment") {
              //       setWeaponCount(weaponCount - 1);
              //     }
              //     delete sl[
              //       tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
              //     ];
              //   } else {
              //     if (nft.type == "character") {
              //       setCharacterCount(characterCount + 1);
              //     }
              //     if (nft.type == "equipment") {
              //       setWeaponCount(weaponCount + 1);
              //     }
              //     sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] =
              //       nft;
              //   }
              //   setSelected(JSON.stringify(sl));
              // }
            }}
          >
            {state === "wrapped" || state === "staked" ? (
              <>
                <div
                  className={!JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "lock" : "lock selectedLock"}
                  onClick={() => {
                    if (state === "wrapped" || state === "staked") {
                      setSelectedToken(null);
                      setSelected(JSON.stringify({}));
                      const slW = JSON.parse(selectedWNFTs);
                      if (slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                        if (nft.type === "character") {
                          setCharacterCount(characterCount - 1);
                        }
                        delete slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                      } else {
                        if (nft.type === "character") {
                          setCharacterCount(characterCount + 1);
                        }
                        slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                      }
                      setSelectedWNFTs(JSON.stringify(slW));
                      setSelected(JSON.stringify(slW));
                    }
                  }}
                >
                  <h4>{state === "wrapped" ? "Wrapped" : "Staked"}</h4>
                </div>
              </>
            ) : null}
            <div
              className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "indexDesc" : "activeDesc"}
              onClick={() => {}}
            >
              {nft.name}
              {nft.type === "character" ? (
                <span className={"rarityRate"}></span>
              ) : (
                <span className={"rarityRate swords"}>
                  {nft.rare === "standart" ? (
                    <img src={swords} alt="swords" />
                  ) : nft.rare === "rare" ? (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  ) : (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  )}
                </span>
              )}
            </div>
            <div className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
              <img
                src={
                  "https://" +
                  nft.metadata.ledgerCanister +
                  ".raw.ic0.app/?type=thumbnail&tokenid=" +
                  tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                }
                alt={nft.collection}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (page === "wallet") {
    return (
      <>
        <div className={"rootNFT"}>
          <div
            className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "borderNFT" : "borderNFT ActiveNFT"}
            onClick={() => {
              if (state === "none") {
                const sl = JSON.parse(selected);
                setSelectedToken(null);
                setSelectedWNFTs("{}");
                if (sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                  delete sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                } else {
                  sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                }
                setSelected(JSON.stringify(sl));
              }
            }}
          >
            {state === "staked" || state === "wrapped" ? (
              <>
                <div
                  className={!JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "lock" : "lock selectedLock"}
                  onClick={() => {
                    if (state === "wrapped") {
                      setSelectedToken(null);
                      setSelected(JSON.stringify({}));
                      const slW = JSON.parse(selectedWNFTs);
                      if (slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                        delete slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                      } else {
                        slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                      }
                      setSelectedWNFTs(JSON.stringify(slW));
                    }
                  }}
                >
                  <div>
                    <img src={wrappedImg} alt="Wrapped" />
                  </div>
                  <h4>
                    {state === "wrapped" ? "Wrapped" : null}
                    {state === "staked" ? "Staked" : null}
                  </h4>
                </div>
              </>
            ) : null}
            <div
              className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "indexDesc" : "activeDesc"}
              onClick={() => {}}
            >
              #{nft.index + 1}
              {nft.type === "character" ? (
                <span className={"rarityRate"}>{nft.metadata.rarityRate}%</span>
              ) : (
                <span className={"rarityRate swords"}>
                  {nft.rare === "standart" ? (
                    <img src={swords} alt="swords" />
                  ) : nft.rare === "rare" ? (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  ) : (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  )}
                </span>
              )}
            </div>
            <div className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
              <img
                src={
                  "https://" +
                  nft.metadata.ledgerCanister +
                  ".raw.ic0.app/?type=thumbnail&tokenid=" +
                  tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                }
                alt={nft.collection}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (page === "wallet__miniNfts") {
    return (
      <>
        <div className={"rootNFT"}>
          <div
            className={!JSON.parse(selected)[tokenIdentifier(nft.ledgerCanister, nft.index)] ? "borderNFT" : "borderNFT ActiveNFT"}
            onClick={() => {
              if (state === "none") {
                const sl = JSON.parse(selected);
                setSelectedToken(null);
                setSelectedWNFTs("{}");
                if (sl[tokenIdentifier(nft.ledgerCanister, nft.index)]) {
                  delete sl[tokenIdentifier(nft.ledgerCanister, nft.index)];
                } else {
                  sl[tokenIdentifier(nft.ledgerCanister, nft.index)] = nft;
                }
                setSelected(JSON.stringify(sl));
              }
            }}
          >
            {
              // nft.metadata.state == "wrapped" || nft.metadata.state == "stake" ||
              state === "wrapped" ? (
                <>
                  <div
                    className={!JSON.parse(selectedWNFTs)[tokenIdentifier(nft.ledgerCanister, nft.index)] ? "lock" : "lock selectedLock"}
                    onClick={() => {
                      if (state === "wrapped") {
                        setSelectedToken(null);
                        setSelected(JSON.stringify({}));
                        const slW = JSON.parse(selectedWNFTs);
                        if (slW[tokenIdentifier(nft.ledgerCanister, nft.index)]) {
                          delete slW[tokenIdentifier(nft.ledgerCanister, nft.index)];
                        } else {
                          slW[tokenIdentifier(nft.ledgerCanister, nft.index)] = nft;
                        }
                        setSelectedWNFTs(JSON.stringify(slW));
                      }
                    }}
                  >
                    <div>
                      <img src={wrappedImg} alt="Wrapped" />
                    </div>
                    <h4>
                      {/* {nft.metadata.state == "wrapped" || wrapped ? "Wrapped" : "Staked"} */}
                      {/* {wrapped ? "Wrapped" : "Staked"} */}
                      Wrapped
                    </h4>
                  </div>
                </>
              ) : null
            }
            <div className={!JSON.parse(selected)[tokenIdentifier(nft.ledgerCanister, nft.index)] ? "indexDesc" : "activeDesc"} onClick={() => {}}>
              #{nft.index + 1}
              {/* {nft.type == "character" ? (
                <span className={"rarityRate"}>{nft.metadata.rarityRate}%</span>
              ) : (
                <span className={"rarityRate swords"}>
                  {nft.rare == "standart" ? (
                    <img src={swords} alt="swords" />
                  ) : nft.rare == "rare" ? (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  ) : (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  )}
                </span>
              )} */}
            </div>
            <div className={!JSON.parse(selected)[tokenIdentifier(nft.ledgerCanister, nft.index)] ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
              <img src={"https://" + nft.ledgerCanister + ".raw.ic0.app/?asset=0"} alt={nftTID} />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (page === "registration") {
    return nft.metadata.state === "wrapped" || nft.metadata.state === "stake" ? (
      <>
        <div className={"rootNFT"}>
          <div
            className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "borderNFT" : "borderNFT ActiveNFT"}
            onClick={() => {
              if (
                nft.metadata.state === "none" ||
                nft.metadata.state === "listed" //TODO: убрать проверку на listed
              ) {
                const sl = JSON.parse(selected);
                setSelectedToken(null);
                setSelectedWNFTs("{}");
                if (sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                  delete sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                } else {
                  sl[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                }
                setSelected(JSON.stringify(sl));
              }
            }}
          >
            {nft.metadata.state === "wrapped" || nft.metadata.state === "stake" ? (
              <>
                <div
                  className={!JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "lock" : "lock selectedLock"}
                  onClick={() => {
                    if (nft.metadata.state === "wrapped" || nft.metadata.state === "stake") {
                      setSelectedToken(null);
                      setSelected(JSON.stringify({}));
                      const slW = JSON.parse(selectedWNFTs);
                      if (slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                        delete slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                      } else {
                        slW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                      }
                      setSelectedWNFTs(JSON.stringify(slW));
                      setSelected(JSON.stringify(slW));
                    }
                  }}
                >
                  <h4>{nft.metadata.state === "wrapped" ? "Wrapped" : "Staked"}</h4>
                </div>
              </>
            ) : null}
            <div
              className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "indexDesc" : "activeDesc"}
              onClick={() => {}}
            >
              #{nft.index + 1}
              {nft.type === "character" ? (
                <span className={"rarityRate"}>{nft.metadata.rarityRate}%</span>
              ) : (
                <span className={"rarityRate swords"}>
                  {nft.rare === "standart" ? (
                    <img src={swords} alt="swords" />
                  ) : nft.rare === "rare" ? (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  ) : (
                    <>
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                      <img src={swords} alt="swords" />
                    </>
                  )}
                </span>
              )}
            </div>
            <div className={!JSON.parse(selected)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
              <img
                src={
                  "https://" +
                  nft.metadata.ledgerCanister +
                  ".raw.ic0.app/?type=thumbnail&tokenid=" +
                  tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                }
                alt={nft.collection}
              />
            </div>
          </div>
        </div>
      </>
    ) : (
      <></>
    );
  }
};
