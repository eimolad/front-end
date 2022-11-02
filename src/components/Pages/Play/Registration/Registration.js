/* global BigInt */
import React, { useState, useEffect } from "react";
import "./Registation.css";
import { Button } from "../../../UI/Button/Button";
import cornerDecorRight from "./cornerDecorRight.png";
import cornerDecorLeft from "./cornerDecorLeft.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import kernelDid from "../../../../utils/candid/kernel.did";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Autocomplete";
import { Modal, TextField } from "@mui/material";
import { canisters, ICcanister, tokenCanisters } from "./../../../../canisters";
import {
  fromHexString,
  principalToAccountIdentifier,
  tokenIdentifier,
} from "./../../../../utils/utils";
import dwarvesDid from "../../../../utils/candid/dwarves.did";
import { NFTs } from "./../../../Blocks/NFTs/NFTs";
import { ModalWindow } from "../../../UI/ModalWindow/ModalWindow";

const getTokenInfo = async (collection, tid, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    //test canister
    canisterId: "dwyty-piaaa-aaaan-qagma-cai",
  });
  const args = {};
  args[collection] = tid;
  //console.log(args);
  if (args.dwarves != undefined) {
    await actor.getTokenInfoRare(args).then((data) => {
      callback(data);
    });
  }
};

const registryAcc = async (selectedCharater, nickname, callback) => {
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

  let charID;

  //console.log(selectedCharater);
  for (let tid in JSON.parse(selectedCharater)) {
    charID = tid;
  }

  actor.registryAcc(charID, nickname).then((data) => {
    callback(data);
  });
};

const getUnsigned = async (id, callback) => {
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

  actor.getUnsigned(id).then((data) => {
    callback(data);
  });
};

const getAllUnsignedAccounts = async (nfts, callback) => {
  // console.log(nfts)
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  let fb = {};

  const actor = Actor.createActor(dwarvesDid, {
    agent: agent,
    canisterId: canisters["dwarves"],
  });

  await actor
    .tokens_ext(
      principalToAccountIdentifier(
        authClient.getIdentity().getPrincipal().toText(),
        0
      )
    )
    .then(async (data) => {
      //console.log(data)
      if (data && data.ok) {
        for (let i = 0; i < data.ok.length; i++) {
          await getUnsigned(
            tokenIdentifier(canisters["dwarves"], data.ok[i][0]),
            (dataUnsing) => {
              //console.log(dataUnsing)
              if (dataUnsing != undefined) {
                getTokenInfo("dwarves", dataUnsing[0], (dataTokenInfo) => {
                  //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0]['rase']) //dwarves
                  //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0])

                  //console.log(dataTokenInfo)
                  let nft = {
                    type: "character",
                    index: data.ok[i][0],
                    collection: "dwarves",
                    rare: dataTokenInfo.tokenRarity[0],
                    metadata:
                      dataTokenInfo.tokenInfo[
                        Object.keys(dataTokenInfo.tokenInfo)[0]
                      ][0],
                  };
                  fb[
                    tokenIdentifier(
                      dataTokenInfo.tokenInfo[
                        Object.keys(dataTokenInfo.tokenInfo)[0]
                      ][0].ledgerCanister,
                      data.ok[i][0]
                    )
                  ] = nft;

                  if (JSON.stringify(fb) !== nfts) {
                    callback(fb);
                  } else {
                    callback(null);
                  }
                });
              }
            }
          );
        }
      }
    });
  //console.log(fb)
  if (JSON.stringify(fb) !== nfts) {
    callback(fb);
  } else {
    callback(null);
  }
};

export const Registration = ({ active, setActive, address, nfts,unsignedNFTs,setUnsignedNFTs }) => {
  const [weaponCount, setWeaponCount] = useState(0);
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [filt, setFilt] = useState(
    JSON.stringify({ tokens: true, dwarves: true, weapons: true })
  );
  const [selectedNFT, setSelectedNFT] = useState(JSON.stringify({}));
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({}));

  const [refresh, setRefresh] = useState(true);
  //const [unsignedNFTs, setUnsignedNFTs] = useState(null);

  const [selectedUnsignedNFT, setSelectedUnsignedNFT] = useState(
    JSON.stringify({})
  );
  const [characterCount, setCharacterCount] = useState(0);
  const [nickname, setNickname] = useState("");

  const [modalWindow,setModalWindow] =useState(false)

  // if (address && unsignedNFTs === null && refresh) {
  //   getAllUnsignedAccounts(unsignedNFTs, (data) => {
  //     if (data) {
  //       setUnsignedNFTs(JSON.stringify(data));
  //     }
  //   });
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     getAllUnsignedAccounts(unsignedNFTs, (data) => {
  //       // console.log(Object.keys(data).length)
  //       if (data!={} && data!=null && data )  {
  //           setUnsignedNFTs(JSON.stringify(data));
  //           setRefresh(false);
  //         }
  //       setRefresh(!refresh);
  //     });
  //   }, 10000);
  // }, [refresh]);


  return (
    <div
      className={active ? "modal act" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className="warning_modal__content warning"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="cornerDecorLeft"
          src={cornerDecorLeft}
          alt="Corner Decor"
        />
        <img
          className="cornerDecorRight"
          src={cornerDecorRight}
          alt="Corner Decor"
        />
        <div className="forBorderMarket">
          <ModalWindow active={modalWindow} setActive={setModalWindow}>
            <h2>Account successfully registered</h2>
          </ModalWindow>
          <NFTs
            page={"registration"}
            setWeaponCount={setWeaponCount}
            setCharacterCount={setCharacterCount}
            weaponCount={weaponCount}
            characterCount={characterCount}
            accounts={NFTsOwned}
            address={address}
            nfts={unsignedNFTs}
            filt={filt}
            selected={selectedNFT}
            setSelected={setSelectedNFT}
            setSelectedToken={setSelectedToken}
            selectedWNFTs={selectedWNFTs}
            setSelectedWNFTs={setSelectedWNFTs}
          />

          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            onChange={(event) => setNickname(event.target.value)}
            style={{
              marginBottom: "30px",
              padding: "0",
            }}
            InputProps={{
              style: {
                color: "white",
                padding: "0",
                backgroundColor: "rgba(59,59,59,0.5)",
              },
            }}
            InputLabelProps={{
              style: {
                padding: "0",
                color: "#c7c7c7",
              },
            }}
          />
          {characterCount == 1 ? (
            <Button
              active={true}
              style={{}}
              buttonType="middleBtn"
              onClick={() => {
                registryAcc(selectedNFT, nickname, (data) => {});
                setActive(false);
                setModalWindow(true);
                setNickname("");
                setSelectedUnsignedNFT(JSON.stringify({}));
                setCharacterCount(0);
                getAllUnsignedAccounts(unsignedNFTs, (data) => {
                  //console.log(data);
                  if (data) {
                    setUnsignedNFTs(JSON.stringify(data));
                    // setRefresh(false);
                  }
                });

                // console.log(selectedNFT)
              }}
            >
              Create
            </Button>
          ) : (
            <Button active={false} style={{}} buttonType="middleBtn">
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
