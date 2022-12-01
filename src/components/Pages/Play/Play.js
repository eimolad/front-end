import React, { useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import classes from "./Play.module.css";
import { getAddress, clipboardCopy, getSubAccountArray, getPrincipal } from "./../../../utils/utils";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Button } from "../../UI/Button/Button";
import { Registration } from "./Registration/Registration";
import { kernelCanister, tokenCanisters } from "./../../../canisters";
import { ModalWindow } from "../../UI/ModalWindow/ModalWindow";
import copy from "./copy.png";
import loader from "../../../media/loader.gif";
import { CollectionsForStake } from "../../Blocks/CollectionsForStake/CollectionsForStake";
import { AccountInfo } from "../../Blocks/AccountInfo/AccountInfo";
import { Game } from "../Game/Game";
import { lootUsed, rewardLoot, saveAttributes, saveProgres, startGame } from "../../../utils/gameUtils";
import { getAccountBalance, getAllMiniNFTs, getAllNFTs, getAllSignedAccounts } from "../../../utils/canisterUtils";
import { Storage } from "./Storage/Storage";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";

const unityContext = new UnityContext({
  loaderUrl: "./webgl/build/eimolad.loader.js",
  dataUrl: "./webgl/build/eimolad.data",
  frameworkUrl: "./webgl/build/eimolad.framework.js",
  codeUrl: "./webgl/build/eimolad.wasm",
});

function sendPlayerDataMessage(message) {
  unityContext.send("Canvas_Game", "Text_Message", message);
}

function sendAttributesMessage(message) {
  unityContext.send("Canvas_Game", "Text_Message_Attributes", message);
}

export const mintNft = async (callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });

  await actor.mintNft("6spgj-fiaaa-aaaan-qa4sa-cai", "f335c96f18eb2c5f727ce2732795f7b42e1c21495f9200f0f535bb04f2fd4c74").then((data) => {
    callback(data);
  });
};

export const Play = ({
  address,
  setAddress,
  nfts,
  setNfts,
  setTask,
  signedAccounts,
  setSignedAccounts,
  unsignedNFTs,
  setUnsignedNFTs,
  principal,
  setPrincipal,
  balances,
  setBalances,
  updateStateNFTs,
  miniNfts,
}) => {
  if (!address || address === "1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79") {
    if (localStorage.getItem("ic-delegation") && localStorage.getItem("ic-delegation") !== "" && localStorage.getItem("ic-identity") !== "") {
      getAddress((addr) => setAddress(addr));
    } else {
      window.location.assign("/");
    }
  }
  if (!principal || principal === "2vxsx-fae") {
    getPrincipal((princ) => {
      setPrincipal(princ);
    });
  }

  const [play, setPlay] = useState(true);

  const [clickedMenu, setClickedMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const [filt, setFilt] = useState(JSON.stringify({ tokens: true, dwarves: true, weapons: true }));
  const [selectedWNFTs, setSelectedWNFTs] = useState(JSON.stringify({}));

  const [modal, setModal] = useState(false);
  const [startGameData, setStartGameData] = useState("empty data");
  const [currentMintNumber, setCurrentMintNumber] = useState(null);

  const [modalWindow, setModalWindow] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [mobileErrorModal, setMobileErrorModal] = useState(false);

  const [wait, setWait] = useState(false);
  const [progression, setProgression] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const [accountIsRegistered, setAccountIsRegistered] = useState(false);
  const [accountInfoData, setAccountInfoData] = useState("{}");

  const [characterBalance, setCharacterBalance] = useState(null);
  const [characterNfts, setCharacterNfts] = useState(null);
  const [characterMiniNfts, setCharacterMiniNfts] = useState(null);

  const [displayP, setDisplayP] = useState("none");

  const [displayStorage, setDisplayStorage] = useState(false);
  const [storageLoading, setStorageLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      let iframeName = document.getElementById("iframeName");
      let iframeContent = iframeName.contentDocument;
      iframeContent.body.innerHTML = iframeContent.body.innerHTML + "<style>.iframe-css{width:400px}</style>";
    };
  });

  const updateCharacterBalance = () => {
    setStorageLoading(true);
    // console.log(JSON.parse(selectedWNFTs));
    setCurrentMintNumber(JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index);
    // console.log(JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index);
    // console.log(currentMintNumber);
    getAccountBalance(characterBalance, 1e6 + JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index + 1, (data) => {
      if (data) {
        setCharacterBalance(JSON.stringify(data));
        // console.log(data);
      }
      setStorageLoading(false);
    });

    getAllNFTs(nfts, 0, (data) => {
      if (data) {
        setNfts(JSON.stringify(data));
        // console.log(data);
      }
    });

    getAllNFTs(characterNfts, 1e6 + JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index + 1, (data) => {
      if (data) {
        setCharacterNfts(JSON.stringify(data));
        // console.log(data);
      }
    });
    getAllMiniNFTs(characterMiniNfts, 1e6 + JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index + 1, (data) => {
      if (data) {
        setCharacterMiniNfts(JSON.stringify(data));
        // console.log(data);
      }
    });
  };

  useEffect(() => {
    if (selectedWNFTs !== JSON.stringify({})) {
      updateCharacterBalance();
    }
  }, [selectedWNFTs]);

  if (accountIsRegistered) {
    setAccountIsRegistered(false);
    getAllSignedAccounts(signedAccounts, (data) => {
      //console.log(data);
      if (data !== null && data.length !== 0) {
        setSignedAccounts(JSON.stringify(data));
        setWait(false);
      }
    });
  }
  useEffect(function () {
    unityContext.on("Info_Player", function (data) {
      console.log(data);

      if (data === "player?") {
        let dataForGame;
        if (startGameData !== "empty data") dataForGame = JSON.parse(startGameData)[0];

        console.log(JSON.stringify(dataForGame));
        sendPlayerDataMessage(JSON.stringify(dataForGame));
      }

      if (data.includes("pickedUpTeleport")) {
        let amount = Number(data.split("=")[1]);

        let successTransfer = false;

        console.log(tokenCanisters["tp"], principal, getSubAccountArray(1e6 + currentMintNumber + 1), amount);

        rewardLoot(tokenCanisters["tp"], principal, getSubAccountArray(1e6 + currentMintNumber + 1), amount, (lootData) => {
          console.log(lootData);
          if (lootData.ok) successTransfer = true;
          while (!successTransfer) {
            rewardLoot(tokenCanisters["tp"], principal, getSubAccountArray(1e6 + currentMintNumber + 1), amount, (repeatLootData) => {
              console.log(repeatLootData + " replay");
              if (repeatLootData.ok) successTransfer = true;
            });
          }
        });
      }
      if (data.includes("teleportUsed")) {
        let amount = Number(data.split("=")[1]);

        console.log(tokenCanisters["tp"], 1e6 + currentMintNumber + 1, amount);
        lootUsed(tokenCanisters["tp"], principal, getSubAccountArray(1e6 + currentMintNumber + 1), amount, (dataUse) => {
          console.log(dataUse);
        });
      }

      if (data !== "player?" && !data.includes("teleportUsed") && !data.includes("pickedUpTeleport")) {
        console.log("Saving...");

        saveProgres(data, (savedData) => {
          console.log(savedData);
        });
      }
    });

    return function () {
      //unityContext.removeEventListener("Info_Player");
    };
  });

  useEffect(function () {
    unityContext.on("Attributes_Player", function (attribute_data) {
      console.log(attribute_data);

      if (attribute_data === "attributes?") {
        let attributesForGame;
        if (startGameData !== "empty data") attributesForGame = JSON.parse(startGameData)[1];

        console.log(attributesForGame);
        sendAttributesMessage(attributesForGame);
      }

      if (attribute_data !== "attributes?") {
        console.log(attribute_data);
        if (JSON.parse(startGameData)) {
          saveAttributes(JSON.parse(startGameData)[0].charId, attribute_data, (data) => {
            console.log(data);
            if (data.ok) {
              console.log("successful save");
            }
          });
        }
      }
    });

    return function () {
      //unityContext.removeEventListener("Attributes_Player");
    };
  });

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  setTimeout(() => {
    setDisplayP("block");
    return null;
  }, 8000);

  return (
    <div className={classes.root}>
      {play ? (
        address ? (
          <>
            <ModalWindow active={modalWindow} setActive={setModalWindow}>
              <h2>Account successfully registered</h2>
            </ModalWindow>

            <ModalWindow active={errorModal} setActive={setErrorModal}>
              <h2 style={{ color: "red" }}>ERROR</h2>
              <p>Please make sure your character is wrapped</p>
            </ModalWindow>

            <ModalWindow active={mobileErrorModal} setActive={setMobileErrorModal}>
              <h2>Only available on PC</h2>
            </ModalWindow>

            <Registration
              nfts={nfts}
              setNfts={setNfts}
              unsignedNFTs={unsignedNFTs}
              setUnsignedNFTs={setUnsignedNFTs}
              setAccountIsRegistered={setAccountIsRegistered}
              active={modal}
              setActive={setModal}
              setModalWindow={setModalWindow}
              setAccountInfoData={setAccountInfoData}
              setWait={setWait}
            ></Registration>
            <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="Play" setTask={setTask}>
              <div className={classes.buttons}>

                <Button
                  active={true}
                  style={{}}
                  buttonType="middleBtn"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Create account
                </Button>
                {selectedWNFTs === "{}" ? (
                  <Button active={false} style={{}} buttonType="middleBtn">
                    Play
                  </Button>
                ) : (
                  <Button
                    active={true}
                    style={{}}
                    buttonType="middleBtn"
                    onClick={() => {
                      setWait(true);
                      startGame(selectedWNFTs, getSubAccountArray(2), (data) => {
                        console.log(data);
                        if (data.ok) {
                          let gameData = data.ok;
                          console.log(gameData);
                          setStartGameData(JSON.stringify(gameData, (_, v) => (typeof v === "bigint" ? v.toString() : v)));
                          console.log(JSON.stringify(gameData, (_, v) => (typeof v === "bigint" ? v.toString() : v)));
                          setPlay(false);
                        } else {
                          setWait(false);
                          setErrorModal(true);
                        }
                      });
                    }}
                  >
                    Play
                  </Button>
                )}

                <div
                  className={classes.address}
                  onClick={() => {
                    clipboardCopy(address);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                  }}
                >
                  {copied ? <div>Copied</div> : null}
                  <img src={copy} alt="Copy address" />
                  {address.substr(0, 6) + "..." + address.substr(58, 64)}
                </div>
              </div>
            </MenuBar>

            {displayStorage === false ? (
              <>
                <div>
                  <h2 className={classes.depth} title="Select your account">
                    Select your account
                  </h2>
                </div>
                {wait ? (
                  <div className={classes.wait}>
                    <img src={loader} alt="Wait" />
                  </div>
                ) : null}
                {signedAccounts === "{}" || signedAccounts === null ? (
                  <div className={classes.emptyAccounts}>
                    <p>You have to have wrapped NFT Hero</p>
                    <div style={{ display: displayP === "block" ? "none" : "flex" }} className={classes.miniLoading__container}>
                      <img className={classes.miniLoading} src={loader} alt="loader" />
                    </div>
                    <p style={{ display: displayP }}>
                      It seems your cache is full. Click{" "}
                      <a onClick={() => window.location.assign("/play?js=" + Math.ceil(Math.random() * 1000))}>here</a>
                    </p>
                  </div>
                ) : (
                  <div>
                    <CollectionsForStake
                      page={"play"}
                      nfts={signedAccounts}
                      task={1}
                      selectedWNFTs={selectedWNFTs}
                      setSelectedWNFTs={setSelectedWNFTs}
                      filt={filt}
                      setAccountInfoData={setAccountInfoData}
                    />
                  </div>
                )}

                {selectedWNFTs !== "{}" ? (
                  <div className={classes.accountInfoContainer}>
                    <div className={classes.accountAsset}>
                      <iframe
                        id="iframeName"
                        scrolling="no"
                        frameBorder={0}
                        className={classes.iframe}
                        title="iframe"
                        src={
                          "https://" +
                          JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]].metadata.ledgerCanister +
                          ".raw.ic0.app/?cc=0&tokenid=" +
                          Object.keys(JSON.parse(selectedWNFTs))[0]
                        }
                        alt=""
                      ></iframe>
                    </div>
                    <div className={classes.accountInfo}>
                      <AccountInfo
                        setSelectedWNFTs={setSelectedWNFTs}
                        setWait={setWait}
                        setSignedAccounts={setSignedAccounts}
                        signedAccounts={signedAccounts}
                        account={accountInfoData}
                        setAccountInfoData={setAccountInfoData}
                        accountInfoData={accountInfoData}
                        inventoryOnClick={() => {
                          if (window.screen.width >= 1100) {
                            setDisplayStorage(true);
                          } else {
                            setMobileErrorModal(true);
                          }
                        }}
                      ></AccountInfo>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Storage
                principal={principal}
                balances={balances}
                setBalances={setBalances}
                characterBalance={characterBalance}
                characterNfts={characterNfts}
                characterMiniNfts={characterMiniNfts}
                nfts={nfts}
                miniNfts={miniNfts}
                setDisplayStorage={setDisplayStorage}
                storageLoading={storageLoading}
                updateCharacterBalance={updateCharacterBalance}
                selectedNFT={selectedWNFTs !== "{}" ? selectedWNFTs : null}
                characterAddress={
                  selectedWNFTs !== "{}"
                    ? // ? principalToAccountIdentifier(principal, 1e6 + JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index + 1)
                      1e6 + JSON.parse(selectedWNFTs)[Object.keys(JSON.parse(selectedWNFTs))[0]]?.index + 1
                    : null
                }
                updateStateNFTs={updateStateNFTs}
              />
            )}
          </>
        ) : (
          <></>
        )
      ) : (
        <Game progression={progression} confirm={confirm} setConfirm={setConfirm} unityContext={unityContext} />
      )}
    </div>
  );
};
