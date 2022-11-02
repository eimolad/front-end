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
import { canisters, ICcanister, kernelCanister, tokenCanisters } from "./../../../../canisters";
import { fromHexString, getSubAccountArray, principalToAccountIdentifier, tokenIdentifier } from "./../../../../utils/utils";
import dwarvesDid from "../../../../utils/candid/dwarves.did";
import { NFTs } from "./../../../Blocks/NFTs/NFTs";
import { ModalWindow } from "../../../UI/ModalWindow/ModalWindow";
import { CollectionsForStake } from "../../../Blocks/CollectionsForStake/CollectionsForStake";

import loader from "./../../../../media/loader.gif";
import { getAllUnsignedAccounts } from "../../../../utils/canisterUtils";

const registryAcc = async (selectedCharacter, nickname,subAccArr, callback) => {
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

  let charID;
  let nickEnd;

  for (let tid in JSON.parse(selectedCharacter)) {
    charID = tid;
    if (JSON.parse(selectedCharacter)[tid].metadata.rase == "dwarves") {
      nickEnd = "#D" + (Number(JSON.parse(selectedCharacter)[tid].index) + 1);
    }
  }
  nickname = nickname + nickEnd;

  actor.registryAcc(charID, nickname,subAccArr).then((data) => {
    callback(data);
  });
};

const changeNfts = (nfts, selected) => {
  let n = JSON.parse(nfts);

  for (let tid in JSON.parse(selected)) {
    // JSON.parse(selected)[tid].metadata.state = state;
    delete n[tid];
  }
  return JSON.stringify(n);
};

export const Registration = ({
  active,
  setActive,
  unsignedNFTs,
  setUnsignedNFTs,
  setModalWindow,
  setAccountIsRegistered,
  setAccountInfoData,
  setWait,
  nfts,
  setNfts,
}) => {
  const [filt, setFilt] = useState(JSON.stringify({ tokens: true, dwarves: true, weapons: true }));
  const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({}));
  const [refresh, setRefresh] = useState(true);

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("none");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllUnsignedAccounts(unsignedNFTs, (data) => {
      setUnsignedNFTs(JSON.stringify(data));
      setLoading(false);
    });
  }, [nfts]);

  return (
    <div
      className={active ? "modal act" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div className="warning_modal__content warning" onClick={(e) => e.stopPropagation()}>
        <img className="cornerDecorLeft" src={cornerDecorLeft} alt="Corner Decor" />
        <img className="cornerDecorRight" src={cornerDecorRight} alt="Corner Decor" />
        <div className="forBorderMarket">
          <div className="close__container" onClick={()=>{setActive(false)}}>
            <span className="close"></span>
          </div>

          <h2>You must have a Wrapped or Staked NFT character to create an account</h2>
          <p>
            You can buy a dwarf on{" "}
            <a target="_blank" href="https://entrepot.app/marketplace/dwarves">
              Entrepot
            </a>
          </p>
          {loading ? (
            <div className="registation__loader">
              <img src={loader} alt="Wait" />
            </div>
          ) : null}

          <CollectionsForStake
            page={"registration"}
            nfts={unsignedNFTs}
            setNfts={setNfts}
            allNfts={nfts}
            task={1}
            selectedWNFTs={selectedWNFTs}
            setSelectedWNFTs={setSelectedWNFTs}
            filt={filt}
            setWait={setWait}

            // selected={selectedNFTs}
            // setSelected={setSelectedNFTs}
          />
          <p style={{ display: error, fontSize: "14px", color: "gray" }}>Nickname must not be empty and less than 11 characters</p>
          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={(event) => setNickname(event.target.value.replace(/[\W_]/gm, ""))}
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
          {selectedWNFTs !== "{}" ? (
            <Button
              active={true}
              style={{}}
              buttonType="middleBtn"
              onClick={() => {
                if (nickname !== "" && nickname.length < 11 && !nickname.includes("_")) {
                  setWait(true);
                  registryAcc(selectedWNFTs, nickname,getSubAccountArray(2), (data) => {
                    console.log(data);
                    setAccountIsRegistered(true);
                  });
                  setActive(false);
                  setNickname("");
                  setAccountInfoData(JSON.stringify({}));
                  setModalWindow(true);

                  setUnsignedNFTs(changeNfts(unsignedNFTs, selectedWNFTs));
                  setSelectedWNFTs(JSON.stringify({}));
                } else {
                  setError("block");
                }
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
