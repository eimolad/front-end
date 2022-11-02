import React from "react";
import { tokenIdentifier } from "../../../utils/utils";
import "./NFTcar.css";
import wrapped from "./wrapped.png";
import swords from "../NFT/swords.png";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { kernelCanister } from "../../../canisters";
import kernelDid from "../../../utils/candid/kernel.did";

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
    canisterId: kernelCanister,
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
    canisterId: kernelCanister,
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

export const NFTcar = ({
  nft,
  task,
  selectedWNFTs,
  setSelectedWNFTs,
  page,
  setAccountInfoData,
  nfts,
  setNfts,
  allNfts,
  signedAccounts,
  setSignedAccounts,
  setWait,
}) => {
  switch (page) {
    case "play":
      let nickname = nft.name;
      let lastNum = nft.name.slice(-1);
      // nickname = nickname.substr(0, nickname.length - 1) + (Number(lastNum) + 1);
      return (
        <>
          {nft.metadata.state !== "wrapped" || nft.metadata.state !== "stake" ? ( //added !before ==
            task !== 2 ? (
              (nft.collection == "weapons" && nft.rare == "rare" && task == 3) ||
              (nft.collection == "weapons" && nft.rare == "superrare" && task == 4) ||
              nft.collection == "dwarves" ||
              task == 1 ? (
                <div className={"rootNFT"}>
                  <div
                    className={
                      JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "borderNFT ActiveAccount" : "borderNFT"
                    }
                    onClick={() => {
                      let selW = JSON.parse(selectedWNFTs);
                      if (JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                        delete selW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                      } else {
                        selW = JSON.parse("{}");
                        selW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                      }
                      setSelectedWNFTs(JSON.stringify(selW));
                      setAccountInfoData(JSON.stringify(selW));
                    }}
                  >
                    <div className={"lock stake"}>
                      {/* <h4>{nft.metadata.state == "wrapped" ? "Wrapped" : "Staked"}</h4> */}
                      <h4>{"Wrapped"}</h4>

                    </div>
                    <div
                      className={
                        JSON.parse(selectedWNFTs)[nft.type] &&
                        JSON.parse(selectedWNFTs)[nft.type]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                          ? "activeDesc"
                          : "indexDesc"
                      }
                      onClick={() => {}}
                    >
                      {" "}
                      {nickname}
                      {nft.type == "character" ? (
                        <span className={"rarityRate"}></span>
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
                      )}
                    </div>
                    <div
                      className={
                        JSON.parse(selectedWNFTs)[nft.type] &&
                        JSON.parse(selectedWNFTs)[nft.type]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                          ? "bgCircleNFT selNFT"
                          : "bgCircleNFT"
                      }
                    >
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
              ) : (
                <div style={{ display: "none" }}></div>
              )
            ) : null
          ) : null}
        </>
      );

    case "registration":
      return (
        <>
          {nft.metadata.state === "wrapped" || nft.metadata.state === "stake" || nft.metadata.state === "none" ? (
            task !== 2 ? (
              (nft.collection == "weapons" && nft.rare == "rare" && task == 3) ||
              (nft.collection == "weapons" && nft.rare == "superrare" && task == 4) ||
              nft.collection == "dwarves" ||
              task == 1 ? (
                <div className={"rootNFT"}>
                  <div
                    className={
                      JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] ? "borderNFT ActiveAccount" : "borderNFT"
                    }
                    onClick={() => {
                      // if (nft.metadata.state === "none") {
                      //   let nftTID = tokenIdentifier(nft.metadata.ledgerCanister, nft.index);
                      //   let selectedNFTs = { [nftTID]: nft };

                      //   setWait(true);
                      //   setWrapped(JSON.stringify(selectedNFTs), (res) => {
                      //     setNfts(changeState(allNfts, JSON.stringify(selectedNFTs), "wrapped"));
                      //     // setUnSignedAccounts(changeState(signedAccounts, JSON.stringify(selectedNFTs), "wrapped"));
                      //     setWait(false);
                      //   });
                      // }
                      // if (nft.metadata.state === "wrapped" || nft.metadata.state === "stake") {
                      //   let selW = JSON.parse(selectedWNFTs);
                      //   if (JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                      //     delete selW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                      //   } else {
                      //     selW = JSON.parse("{}");
                      //     selW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                      //   }
                      //   setSelectedWNFTs(JSON.stringify(selW));
                      //   // setAccountInfoData(JSON.stringify(selW))
                      // }
                      let selW = JSON.parse(selectedWNFTs);
                        if (JSON.parse(selectedWNFTs)[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)]) {
                          delete selW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)];
                        } else {
                          selW = JSON.parse("{}");
                          selW[tokenIdentifier(nft.metadata.ledgerCanister, nft.index)] = nft;
                        }
                        setSelectedWNFTs(JSON.stringify(selW));
                        // setAccountInfoData(JSON.stringify(selW))
                    }}
                  >
                    <div className={"lock stake"}>
                      {/* {nft.metadata.state === "none" ? (
                        <div className="state">
                          <h4>Wrap</h4>
                        </div>
                      ) : nft.metadata.state === "wrapped" ? (
                        <h4>Wrapped</h4>
                      ) : (
                        <h4>Staked</h4>
                      )} */}

                      {/* <h4>{nft.metadata.state == "wrapped" ? "Wrapped" : "Staked"}</h4> */}
                      <h4>{"Wrapped"}</h4>

                    </div>
                    <div
                      className={
                        JSON.parse(selectedWNFTs)[nft.type] &&
                        JSON.parse(selectedWNFTs)[nft.type]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                          ? "activeDesc"
                          : "indexDesc"
                      }
                      onClick={() => {}}
                    >
                      {" "}
                      #{nft.index + 1}
                      {nft.type == "character" ? (
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
                      )}
                    </div>
                    <div
                      className={
                        JSON.parse(selectedWNFTs)[nft.type] &&
                        JSON.parse(selectedWNFTs)[nft.type]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                          ? "bgCircleNFT selNFT"
                          : "bgCircleNFT"
                      }
                    >
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
              ) : (
                <div style={{ display: "none" }}></div>
              )
            ) : null
          ) : null}
        </>
      );
    default:
      return (
        <>
          {nft.metadata.state === "wrapped" ? (
            task !== 2 ? (
              (nft.collection == "weapons" && nft.rare == "rare" && task == 3) ||
              (nft.collection == "weapons" && nft.rare == "superrare" && task == 4) ||
              nft.collection == "dwarves" ||
              task == 1 ? (
                <div className={"rootNFT"}>
                  <div
                    className={
                      JSON.parse(selectedWNFTs)[nft.collection == "weapons" ? "equipment" : "character"] &&
                      JSON.parse(selectedWNFTs)[nft.collection == "weapons" ? "equipment" : "character"]["tid"] ===
                        tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                        ? "borderNFT ActiveNFT"
                        : "borderNFT"
                    }
                    onClick={() => {
                      const selW = JSON.parse(selectedWNFTs);
                      if (
                        JSON.parse(selectedWNFTs)[nft.collection == "weapons" ? "equipment" : "character"] &&
                        JSON.parse(selectedWNFTs)[nft.collection == "weapons" ? "equipment" : "character"]["tid"] ===
                          tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                      ) {
                        selW[nft.type] = null;
                      } else {
                        selW[nft.type] = {
                          tid: tokenIdentifier(nft.metadata.ledgerCanister, nft.index),
                          canister: nft.metadata.ledgerCanister,
                          index: nft.index,
                        };
                      }
                      setSelectedWNFTs(JSON.stringify(selW));
                    }}
                  >
                    <div className={"lock stake"}>
                      <h4>{nft.metadata.state == "wrapped" ? "Wrapped" : "Staked"}</h4>
                    </div>
                    <div
                      className={
                        JSON.parse(selectedWNFTs)[nft.type] &&
                        JSON.parse(selectedWNFTs)[nft.type]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                          ? "activeDesc"
                          : "indexDesc"
                      }
                      onClick={() => {}}
                    >
                      {" "}
                      #{nft.index + 1}
                      {nft.type == "character" ? (
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
                      )}
                    </div>
                    <div
                      className={
                        JSON.parse(selectedWNFTs)[nft.type] &&
                        JSON.parse(selectedWNFTs)[nft.type]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                          ? "bgCircleNFT selNFT"
                          : "bgCircleNFT"
                      }
                    >
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
              ) : (
                <div style={{ display: "none" }}></div>
              )
            ) : (
              <div className={"rootNFT"}>
                <div
                  className={
                    (JSON.parse(selectedWNFTs)["equipment_1"] &&
                      JSON.parse(selectedWNFTs)["equipment_1"]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ||
                    (JSON.parse(selectedWNFTs)["equipment_2"] &&
                      JSON.parse(selectedWNFTs)["equipment_2"]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index))
                      ? "borderNFT ActiveNFT"
                      : "borderNFT"
                  }
                  onClick={() => {
                    const selW = JSON.parse(selectedWNFTs);
                    if (selW["equipment_1"] && selW["equipment_2"]) {
                      for (let eq in selW) {
                        if (selW[eq]["tid"] == tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                          selW[eq] = null;
                        }
                      }
                    } else {
                      if (selW["equipment_1"]) {
                        if (selW["equipment_1"]["tid"] == tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                          selW["equipment_1"] = null;
                        } else {
                          selW["equipment_2"] = {
                            tid: tokenIdentifier(nft.metadata.ledgerCanister, nft.index),
                            canister: nft.metadata.ledgerCanister,
                            index: nft.index,
                          };
                        }
                      } else {
                        if (selW["equipment_2"] && selW["equipment_2"]["tid"] == tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) {
                          selW["equipment_2"] = null;
                        } else {
                          selW["equipment_1"] = {
                            tid: tokenIdentifier(nft.metadata.ledgerCanister, nft.index),
                            canister: nft.metadata.ledgerCanister,
                            index: nft.index,
                          };
                        }
                      }
                    }
                    setSelectedWNFTs(JSON.stringify(selW));
                  }}
                >
                  <div className={"lock stake"}>
                    <h4>{nft.metadata.state == "wrapped" ? "Wrapped" : "Staked"}</h4>
                  </div>
                  <div
                    className={
                      (JSON.parse(selectedWNFTs)["equipment_1"] &&
                        JSON.parse(selectedWNFTs)["equipment_1"]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ||
                      (JSON.parse(selectedWNFTs)["equipment_2"] &&
                        JSON.parse(selectedWNFTs)["equipment_2"]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index))
                        ? "activeDesc"
                        : "indexDesc"
                    }
                    onClick={() => {}}
                  >
                    #{nft.index + 1}
                    {nft.type == "character" ? (
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
                    )}
                  </div>
                  <div
                    className={
                      (JSON.parse(selectedWNFTs)["equipment_1"] &&
                        JSON.parse(selectedWNFTs)["equipment_1"]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index)) ||
                      (JSON.parse(selectedWNFTs)["equipment_2"] &&
                        JSON.parse(selectedWNFTs)["equipment_2"]["tid"] === tokenIdentifier(nft.metadata.ledgerCanister, nft.index))
                        ? "bgCircleNFT selNFT"
                        : "bgCircleNFT"
                    }
                  >
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
            )
          ) : null}
        </>
      );
  }
};
