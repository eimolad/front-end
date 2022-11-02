import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import classes from "./Play.module.css";
import bg from "../../../media/bgAccount.png";
import { getAddress } from "../../../utils/utils";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Button } from "../../UI/Button/Button";
import { NFT } from "../../UI/NFT/NFT";
import { NFTs } from "../..//Blocks/NFTs/NFTs";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import kernelDid from "../../../utils/candid/kernel.did";
import { Registration } from "./Registration/Registration";
import { TextField } from "@mui/material";
import dwarvesDid from "../../../utils/candid/dwarves.did";
import { canisters, ICcanister, tokenCanisters } from "./../../../canisters";
import {
  fromHexString,
  principalToAccountIdentifier,
  tokenIdentifier,
} from "./../../../utils/utils";
import { Null } from "@dfinity/agent/lib/cjs/idl";

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
  await actor.getTokenInfoRare(args).then((data) => {
    callback(data);
  });
};

const getSigned = async (tid, callback) => {
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

  actor.getSigned(tid).then((data) => {
    callback(data);
  });
};

const getAllSignedAccounts = async (nfts, callback) => {
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
          await getSigned(
            tokenIdentifier(canisters["dwarves"], data.ok[i][0]),
            (dataSinged) => {
              //console.log(dataSinged)
              if (dataSinged.length != 0) {
                getTokenInfo("dwarves", dataSinged[0].tid, (dataTokenInfo) => {
                  //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0]['rase']) //dwarves
                  //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0])

                  //console.log()
                  let nft = {
                    name: dataSinged[0].name,
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

                  //console.log(nft)
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

const unityContext = new UnityContext({
  loaderUrl: "./webgl/build/test_2.loader.js",
  dataUrl: "./webgl/build/test_2.data",
  frameworkUrl: "./webgl/build/test_2.framework.js",
  codeUrl: "./webgl/build/test_2.wasm",
});

function Mess(message) {
  unityContext.send("Canvas_Game", "Text_Message", message);
}

const startGame = async (selectedNFTs, callback) => {
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

  let tidCharacter;
  let tidWeapon;

  for (let tid in JSON.parse(selectedNFTs)) {
    if (JSON.parse(selectedNFTs)[tid].type == "character") tidCharacter = tid;
  }

  actor.startGame(tidCharacter).then((data) => {
    callback(data);
  });
};

export const Play = ({
  address,
  setAddress,
  nfts,
  setTask,
  signedAccounts,
  setSignedAccounts,
  unsignedNFTs,
  setUnsignedNFTs,
}) => {
  if (!address) {
    if (localStorage.getItem("ic-delegation")) {
      getAddress((addr) => setAddress(addr));
    } else {
      window.location.assign("/");
    }
  }

  const [play, setPlay] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState("nft not found");
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [nftSelectValue, setNftSelectValue] = useState();

  const [clickedMenu, setClickedMenu] = useState(false);
  const [filt, setFilt] = useState(
    JSON.stringify({ tokens: true, dwarves: true, weapons: true })
  );
  const [selectedNFTs, setSelectedNFTs] = useState(JSON.stringify({}));
  const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({}));
  const [selectedToken, setSelectedToken] = useState(null);

  const [modal, setModal] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [weaponCount, setWeaponCount] = useState(0);
  const [startGameData, setStartGameData] = useState("empty data");
  // const [signedAccounts,setSignedAccounts] = useState(null)

  //let NFTs = [];

  // if (address && signedAccounts === null && refresh) {
  //   getAllSignedAccounts(signedAccounts, (data) => {
  //     //console.log(data);
  //     if (data.length !=0) {
  //       setSignedAccounts(JSON.stringify(data));
  //       // setRefresh(false);
  //     }
  //   });
  // }

  // useEffect(()=>{
  //   getAllSignedAccounts(signedAccounts, (data) => {
  //     //console.log(data);
  //     if (data !==null && data.length !=0) {
  //       setSignedAccounts(JSON.stringify(data));
  //       // setRefresh(false);
  //     }
  //   });
  // },[modal])

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

  useEffect(function () {
    unityContext.on("Info_Player", function (data) {
      //событие нажатия кнопки
      console.log(data);
      Mess(startGameData);
    });
    return function () {
      //unityContext.removeEventListener("Info_Player");
    };
  });

  if (nfts && nfts != "{}") {
    //загружает нфт с аккаунта в массив
    if (Object.keys(JSON.parse(nfts)).length != NFTsOwned.length) {
      for (let tid in JSON.parse(nfts)) {
        if (JSON.parse(nfts)[tid].type == "character") {
          //console.log(JSON.parse(nfts)[tid])
          NFTsOwned.push(JSON.parse(nfts)[tid]);
        }
      }
    }
  }

  if (nfts && nfts != "{}") {
    for (let i in NFTsOwned) {
      // NFTs.push(<NFT nft={JSON.parse(nfts)[i]} key={tid} selected={selected} setSelected={setSelected} refresh={refresh} setRefresh={setRefresh}
      //                  setSelectedToken={setSelectedToken} selectedWNFTs={selectedWNTFs}
      //                  setSelectedWNFTs={setSelectedWNFTs}/>)
    }
  }
  // console.log(JSON.parse(nfts));
  //console.log(nickname)
  // for (let tid in JSON.parse(selectedNFTs)){
  //   console.log(tid)
  // }
  //console.log((selectedNFTs))
  return (
    <div className={classes.root} style={{ backgroundImage: `url(${bg})` }}>
      {play ? (
        <>
          <Registration
            address={address}
            nfts={nfts}
            unsignedNFTs={unsignedNFTs}
            setUnsignedNFTs={setUnsignedNFTs}
            active={modal}
            setActive={setModal}
          ></Registration>
          <MenuBar
            address={address}
            clicked={clickedMenu}
            setClicked={setClickedMenu}
            curLink="Play"
            setTask={setTask}
          >
            <div className={classes.buttons}>
              <Button
                active={true}
                style={{}}
                buttonType="middleBtn"
                onClick={() => {
                  setModal(true);
                  // registryAcc(selectedNFTs,nickname,(data)=>{
                  //   console.log(data)
                  // })
                }}
              >
                Create account
              </Button>
              {characterCount == 1 ? (
                <Button
                  active={true}
                  style={{}}
                  buttonType="middleBtn"
                  onClick={() => {
                    startGame(selectedNFTs, (data) => {
                      console.log(data.ok);
                      let gameData = data.ok;
                      setStartGameData(
                        JSON.stringify(gameData, (_, v) =>
                          typeof v === "bigint" ? v.toString() : v
                        )
                      );
                    });
                    setPlay(false);
                  }}
                >
                  Play
                </Button>
              ) : (
                <Button active={false} style={{}} buttonType="middleBtn">
                  Play
                </Button>
              )}
            </div>
          </MenuBar>
          <h1 className={classes.depth} title="Select your account">
            Select your account
          </h1>
          {/* <div className={classes.accounts_container}>
        <div className={classes.accounts_items}>
         
        </div>
      </div> */}
          <NFTs
            page={"play"}
            setWeaponCount={setWeaponCount}
            setCharacterCount={setCharacterCount}
            weaponCount={weaponCount}
            characterCount={characterCount}
            accounts={NFTsOwned}
            address={address}
            nfts={signedAccounts}
            filt={filt}
            selected={selectedNFTs}
            setSelected={setSelectedNFTs}
            setSelectedToken={setSelectedToken}
            selectedWNFTs={selectedWNFTs}
            setSelectedWNFTs={setSelectedWNFTs}
          />
        </>
      ) : (
        <>
          <Unity
            unityContext={unityContext}
            style={{
              height: 1180,
              width: "100%",
              border: "2px solid black",
              background: "grey",
            }}
          />
        </>
      )}
    </div>
  );
};
