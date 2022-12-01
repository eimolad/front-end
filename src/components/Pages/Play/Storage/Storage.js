import React, { useState, useEffect } from "react";
import classes from "./Storage.module.css";
import playerImg from "./player.png";
import { Grid, TextField } from "@mui/material";
import { InventoryGridItem } from "./InventoryGridItem/InventoryGridItem";
import loader from "./../../../../media/loader.gif";
import { ModalWindow } from "../../../UI/ModalWindow/ModalWindow";
import { getSubAccountArray, principalToAccountIdentifier, validatePrincipal } from "../../../../utils/utils";
import { Button } from "../../../UI/Button/Button";
import { NFTsSend, tokenTransfer } from "../../../../utils/canisterUtils";
import kernelDid from "../../../../utils/candid/kernel.did";
import { kernelCanister, tokenCanisters } from "../../../../canisters";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

export const tokenTransferICRC = async (tokenCanister, principal, fromSubAcc, toSubAcc, amount, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  console.log(tokenCanister, principal, fromSubAcc, toSubAcc, amount);

  await actor.transfer_icrc_1_token(tokenCanister, principal, fromSubAcc, toSubAcc, parseInt(amount)).then((data) => {
    callback(data);
  });
};

export const Storage = ({
  principal,
  setDisplayStorage,
  balances,
  setBalances,
  characterBalance,
  storageLoading,
  updateCharacterBalance,
  nfts,
  characterAddress,
  updateStateNFTs,
  characterNfts,
  miniNfts,
  characterMiniNfts
}) => {
  const [filt, setFilt] = useState(JSON.stringify({ tokens: true, dwarves: true, weapons: true }));
  const [drag, setDrag] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [value, setValue] = useState(1);
  const [transferToAccountModal, setTransferToAccountModal] = useState(false);
  const [dragStorage, setDragStorage] = useState(false);
  const [currentItemStorage, setCurrentItemStorage] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [transferToStorageModal, setTransferToStorageModal] = useState(false);

  const dragOverHandler = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // console.log("drop zone!!");
  };

  const dragLeaveHandler = (e) => {
    // e.target.style.boxShadow = "none";
  };

  const dragStartHandler = (e, item, place) => {
    // console.log(item);
    // e.preventDefault();
    e.stopPropagation();
    setDrag(true);
    setCurrentItem(item);
    setCurrentPlace(place);
  };

  const dragEndHandler = (e) => {
    // e.target.style.boxShadow = "none";
    setDrag(false);
  };

  const onDropCharacterHandler = (e) => {
    // console.log("dropped");
    console.log(e.target.className + " account");
    console.log(currentPlace + " account");

    if (
      (e.target.className.includes("InventoryGridItem_accountEmptyRoot") ||
        e.target.className.includes("tokenImg_account") ||
        e.target.className.includes("InventoryGridItem_accountRoot") ||
        e.target.className.includes("InventoryGridItem_item__count_account")) &&
      currentPlace === "storageRoot"
    ) {
      // console.log("transfer " + currentItem);
      setTransferToAccountModal(true);
    }
  };

  const dragOverHandlerAccount = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // console.log("drop zone!!");
  };

  const dragLeaveHandlerAccount = (e) => {
    // e.target.style.boxShadow = "none";
  };

  const dragStartHandlerAccount = (e, item, place) => {
    // console.log(item);
    // e.preventDefault();
    e.stopPropagation();
    setDragStorage(true);
    setCurrentItemStorage(item);
    setCurrentPlace(place);
  };

  const dragEndHandlerAccount = (e) => {
    // e.target.style.boxShadow = "none";
    setDragStorage(false);
  };

  const onDropHandlerStorage = (e) => {
    e.preventDefault();
    console.log(e.target.className + " storage");
    console.log(currentPlace + " storage");
    if (
      (e.target.className.includes("InventoryGridItem_storageEmptyRoot") ||
        e.target.className.includes("tokenImg_storage") ||
        e.target.className.includes("InventoryGridItem_storageRoot") ||
        e.target.className.includes("InventoryGridItem_item__count_storage")) &&
      currentPlace === "accountRoot"
    ) {
      setTransferToStorageModal(true);
      // console.log("transfer " + currentItemStorage);
      // console.log(e.target.className);
    }
  };

  let accountTokens = [];
  let accountTokensCount = 0;

  for (let name in JSON.parse(balances)) {
    if (JSON.parse(balances)[name] === 0) continue;
    accountTokens.push(
      <InventoryGridItem
        dragEndHandler={dragEndHandler}
        dragStartHandler={dragStartHandler}
        dragLeaveHandler={dragLeaveHandler}
        // dragOverHandler={dragOverHandler}
        key={name}
        name={name}
        balances={balances}
        id={"storageRoot"}
      />
    );
    accountTokensCount++;
  }
  if (JSON.parse(nfts)) {
    for (let nft in JSON.parse(nfts)) {
      if (JSON.parse(nfts)[nft].type === "equipment") {
        accountTokens.push(
          <InventoryGridItem
            dragEndHandler={dragEndHandler}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
            // dragOverHandler={dragOverHandler}
            key={nft}
            name={"nft"}
            balances={balances}
            nft={JSON.parse(nfts)[nft]}
            tid={nft}
            id={"storageRoot"}
          />
        );
        accountTokensCount++;
      }
    }
  }

  if (JSON.parse(miniNfts)) {
    for (let nft in JSON.parse(miniNfts)) {
      accountTokens.push(
        <InventoryGridItem
          dragEndHandler={dragEndHandler}
          dragStartHandler={dragStartHandler}
          dragLeaveHandler={dragLeaveHandler}
          // dragOverHandler={dragOverHandler}
          key={nft}
          name={"miniNft"}
          balances={balances}
          nft={JSON.parse(miniNfts)[nft]}
          tid={nft}
          id={"storageRoot"}
        />
      );
      accountTokensCount++;
    }
  }

  if (accountTokensCount < 12) {
    for (let i = 0; i < 12 - accountTokensCount; i++) {
      // console.log(i);
      accountTokens.push(<InventoryGridItem key={i} name={"empty"} balances={balances} id={"storageEmptyRoot"} />);
    }
  }

  let characterTokens = [];
  let characterTokensCount = 0;

  for (let name in JSON.parse(characterBalance)) {
    if (JSON.parse(characterBalance)[name] === 0) continue;
    else {
      characterTokens.push(
        <InventoryGridItem
          dragEndHandler={dragEndHandlerAccount}
          dragStartHandler={dragStartHandlerAccount}
          dragLeaveHandler={dragLeaveHandlerAccount}
          // onDropHandler={onDropHandlerStorage}
          key={name}
          name={name}
          balances={characterBalance}
          id={"accountRoot"}
        />
      );
      characterTokensCount++;
    }
  }

  if (JSON.parse(characterNfts)) {
    for (let nft in JSON.parse(characterNfts)) {
      if (JSON.parse(characterNfts)[nft].type === "equipment") {
        characterTokens.push(
          <InventoryGridItem
            dragEndHandler={dragEndHandlerAccount}
            dragStartHandler={dragStartHandlerAccount}
            dragLeaveHandler={dragLeaveHandlerAccount}
            key={nft}
            name={"nft"}
            balances={characterBalance}
            nft={JSON.parse(characterNfts)[nft]}
            tid={nft}
            id={"accountRoot"}
          />
        );
        characterTokensCount++;
      }
    }
  }

  if (JSON.parse(characterMiniNfts)) {
    for (let nft in JSON.parse(characterMiniNfts)) {
      characterTokens.push(
        <InventoryGridItem
          dragEndHandler={dragEndHandlerAccount}
          dragStartHandler={dragStartHandlerAccount}
          dragLeaveHandler={dragLeaveHandlerAccount}
          key={nft}
          name={"miniNfts"}
          balances={characterBalance}
          nft={JSON.parse(characterMiniNfts)[nft]}
          tid={nft}
          id={"accountRoot"}
        />
      );
      characterTokensCount++;
    }
  }

  if (accountTokensCount < 12) {
    for (let i = 0; i < 12 - characterTokensCount; i++) {
      // console.log(i);
      characterTokens.push(
        <InventoryGridItem
          dragEndHandler={dragEndHandlerAccount}
          dragStartHandler={dragStartHandlerAccount}
          dragLeaveHandler={dragLeaveHandlerAccount}
          key={i}
          name={"empty"}
          balances={balances}
          id={"accountEmptyRoot"}
        />
      );
    }
  }

  return (
    <div className={classes.root}>
      <ModalWindow active={transferToAccountModal} setActive={setTransferToAccountModal}>
        <h2>Send to character account {validatePrincipal(currentItem) ? "nft" : currentItem}</h2>
        {validatePrincipal(currentItem) ? null : (
          <>
            <TextField
              id="outlined-basic"
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              label="Enter count of tokens"
              variant="outlined"
              value={value}
              style={{
                marginTop: "15px",
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
            {balances ? (
              <p>
                Available: {JSON.parse(balances)[currentItem]} {currentItem}
              </p>
            ) : null}
          </>
        )}
        <Button
          style={{}}
          buttonType="middleBtn"
          active={true}
          onClick={(e) => {
            if (validatePrincipal(currentItem)) {
              setTransferToAccountModal(false);
              let currentNft = {};
              for (let tid in JSON.parse(nfts)) {
                if (tid === currentItem) {
                  currentNft[tid] = JSON.parse(nfts)[tid];
                  console.log(currentNft);
                }
              }
              console.log(JSON.stringify(currentNft), principalToAccountIdentifier(principal, characterAddress), getSubAccountArray(0));

              NFTsSend(JSON.stringify(currentNft), principalToAccountIdentifier(principal, characterAddress), getSubAccountArray(0), (res) => {
                updateCharacterBalance();
                updateStateNFTs();
                console.log(res);
              });
            } else {
              updateCharacterBalance();
              setTransferToAccountModal(false);
              tokenTransferICRC(
                tokenCanisters[currentItem],
                principal,
                getSubAccountArray(0),
                getSubAccountArray(characterAddress),
                value,
                (data) => {
                  console.log(data);
                  let cBal = JSON.parse(balances);
                  cBal[currentItem] = cBal[currentItem] - value;
                  setBalances(JSON.stringify(cBal));
                  setValue(1);
                }
              );
            }
          }}
        >
          Transfer
        </Button>
      </ModalWindow>
      <ModalWindow active={transferToStorageModal} setActive={setTransferToStorageModal}>
        <h2>Send to wallet {validatePrincipal(currentItemStorage) ? "nft" : currentItemStorage}</h2>
        {validatePrincipal(currentItemStorage) ? null : (
          <>
            <TextField
              id="outlined-basic"
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              label="Enter count of tokens"
              variant="outlined"
              value={value}
              style={{
                marginTop: "15px",
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
            {characterBalance ? (
              <p>
                Available: {JSON.parse(characterBalance)[currentItemStorage]} {currentItemStorage}
              </p>
            ) : null}
          </>
        )}
        <Button
          style={{}}
          buttonType="middleBtn"
          active={true}
          onClick={(e) => {
            if (validatePrincipal(currentItemStorage)) {
              updateCharacterBalance();
              setTransferToStorageModal(false);

              let currentNft = {};
              for (let tid in JSON.parse(characterNfts)) {
                console.log(tid);
                console.log(currentItemStorage);
                if (tid === currentItemStorage) {
                  currentNft[tid] = JSON.parse(characterNfts)[tid];
                  console.log(currentNft);
                }
              }
              console.log(JSON.stringify(currentNft), principalToAccountIdentifier(principal, 0), getSubAccountArray(characterAddress));

              NFTsSend(JSON.stringify(currentNft), principalToAccountIdentifier(principal, 0), getSubAccountArray(characterAddress), (res) => {
                //TODO:
                updateStateNFTs();
                updateCharacterBalance();
                console.log(res);
              });
            } else {
              updateCharacterBalance();
              setTransferToStorageModal(false);
              tokenTransferICRC(
                tokenCanisters[currentItemStorage],
                principal,
                getSubAccountArray(characterAddress),
                getSubAccountArray(0),
                value,
                (data) => {
                  console.log(data);
                  let cBal = JSON.parse(balances);
                  cBal[currentItemStorage] = cBal[currentItemStorage] - value;
                  setBalances(JSON.stringify(cBal));
                  setValue(1);
                }
              );
            }
          }}
        >
          Transfer
        </Button>
      </ModalWindow>
      {/* <p style={{ color: "red" }}>{currentItem}</p>
      {drag ? <button>{currentItem}</button> : null} */}
      <div className={classes.title}>
        <h2 className={classes.depth}>Storage</h2>
        <p
          onClick={() => {
            setDisplayStorage(false);
          }}
        >
          Back
        </p>
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.armament}>
          <div className={classes.armament__item + " " + classes.armament__helmet}>
            <p>add helmet</p>
          </div>
          <div className={classes.armament__item + " " + classes.armament__gloves}>
            <p>add gloves</p>
          </div>
          <div className={classes.armament__item + " " + classes.armament__armor}>
            <p>add armor</p>
          </div>
          <div className={classes.armament__item + " " + classes.armament__weapon}>
            <p>add weapon</p>
          </div>
          <div className={classes.armament__item + " " + classes.armament__pants}>
            <p>add pants</p>
          </div>
          <div className={classes.armament__item + " " + classes.armament__shield}>
            <p>add shield</p>
          </div>
          <div className={classes.armament__item + " " + classes.armament__boots}>
            <p>add boots</p>
          </div>
        </div>
        <div className={classes.accountChest}>
          <div className={classes.accountChest__title}>{drag ? <h2>Drag here for transfer</h2> : <h2>dwarf chest</h2>}</div>
          <div
            style={drag ? { backgroundColor: "orangered" } : null}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => onDropCharacterHandler(e)}
            className={classes.accountChest__inventory}
          >
            <div className={classes.accountChest__itemsGrid}>
              <Grid container>
                {storageLoading ? (
                  <div className={classes.loader}>
                    <img src={loader} alt="Loading" />
                  </div>
                ) : (
                  characterTokens
                )}
              </Grid>
            </div>
          </div>
        </div>
        <div className={classes.accountStorage}>
          <div className={classes.accountStorage__title}>{dragStorage ? <h2>Drag here for transfer</h2> : <h2>account storage</h2>}</div>
          <div
            style={dragStorage ? { backgroundColor: "orangered" } : null}
            onDragOver={(e) => dragOverHandlerAccount(e)}
            onDrop={(e) => onDropHandlerStorage(e)}
            className={classes.accountStorage__inventory}
          >
            <Grid container>{accountTokens}</Grid>
          </div>
        </div>
      </div>
    </div>
  );
};
