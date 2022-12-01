/* global BigInt */
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "../../UI/Button/Button";
import "./SendForm.css";
import { validatePrincipal, validateAddress, principalToAccountIdentifier } from "../../../utils/utils";
import { tokenIdentifier, getSubAccountArray, fromHexString } from "../../../utils/utils";
import { AuthClient } from "@dfinity/auth-client";
import icDid from "../../../utils/candid/ic.did";
import { HttpAgent, Actor } from "@dfinity/agent";
import { canisters, eGoldCanister, ICcanister, kernelCanister } from "../../../canisters";
import kernelDid from "../../../utils/candid/kernel.did";
import classes from "../../Pages/Wallet/Wallet.module.css";
import loader from "../../../media/loader.gif";
import cornerRight from "./cornerDecorRight.png";
import cornerLeft from "./cornerDecorLeft.png";
import { tokenTransfer } from "../../../utils/canisterUtils";
import { NFTsOfCollect } from "../../Blocks/NFTsOfCollect/NFTsOfCollect";

const NFTsSend = async (selected, tto, subAccArr, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  const args = [];
  for (let tid in JSON.parse(selected)) {
    args.push(tid);
  }
  console.log(args);
  await actor.transferMany(tto, args, subAccArr).then((data) => {
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

// export const tokenTransferTest = async (token, canisterId, from_owner, from_subaccounttoken, tto, amount, callback) => {
//   const authClient = await AuthClient.create();

//   const agent = new HttpAgent({
//     host: "https://boundary.ic0.app",
//     identity: authClient.getIdentity(),
//   });

//   if (token === "icp") {
//     const actor = Actor.createActor(icDid, {
//       agent: agent,
//       canisterId: ICcanister,
//     });
//     const fee = 10000;
//     const args = {
//       to: fromHexString(tto), //Should be an address
//       fee: { e8s: fee },
//       memo: 0,
//       from_subaccount: [getSubAccountArray(0)],
//       created_at_time: [],
//       amount: { e8s: amount * 100000000 },
//     };
//     await actor.transfer(args).then((res) => {
//       callback(res);
//     });
//   } else {
//     const actor = Actor.createActor(kernelDid, {
//       agent: agent,
//       canisterId: kernelCanister,
//     });

//     console.log(canisterId, from_owner, from_subaccounttoken, tto, parseInt(amount));
//     await actor.transfer_tokens(canisterId, from_owner, from_subaccounttoken, tto, parseInt(amount)).then((data) => {
//       callback(data);
//     });
//   }
// };

export const SendForm = ({ active, nfts, setActive, balances, setBalances, setNFTs, selected, selToken }) => {
  const [inputVal, setInputVal] = useState("");
  const [val, setVal] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [wait, setWait] = useState(false);

  return (
    <div
      className={active ? "modal act" : "modal"}
      onClick={() => {
        if (clicked) {
          setClicked(false);
        } else {
          setActive(false);
        }
      }}
    >
      {wait ? (
        <div className={classes.wait}>
          <img src={loader} alt="Wait" />
        </div>
      ) : null}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <img className={"cornerDecorLeft"} src={cornerLeft} alt="Corner Decor" />
        <img className={"cornerDecorRight"} src={cornerRight} alt="Corner Decor" />
        {!clicked ? (
          <div className={"border"}>
            <TextField
              id="outlined-basic"
              onChange={(e) => setInputVal(e.target.value)}
              fullWidth
              label="Enter Principal or Address to send"
              variant="outlined"
              value={inputVal}
              style={{
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
            {selToken ? (
              <>
                <TextField
                  id="outlined-basic"
                  onChange={(e) => setVal(e.target.value)}
                  fullWidth
                  label="Enter count of tokens"
                  variant="outlined"
                  value={val}
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
                <p>
                  Available: {JSON.parse(balances)[selToken]} {selToken}
                </p>
              </>
            ) : null}
            <Button
              style={{}}
              buttonType="middleBtn"
              active={true}
              onClick={(e) => {
                setClicked(true);
              }}
            >
              Send
            </Button>
          </div>
        ) : validatePrincipal(inputVal) || validateAddress(inputVal) ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ textAlign: "center", margin: "auto" }}>Are you sure?</h3>
            <p>Please check the recipient's address</p>
            <p style={{ color: "red", marginTop: "0" }}>{inputVal}</p>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "20px" }}>
              <Button
                style={{}}
                onClick={(e) => {
                  setClicked(false);
                  if (!selToken) {
                    setWait(true);
                    NFTsSend(
                      selected,
                      validatePrincipal(inputVal) ? principalToAccountIdentifier(inputVal, 0) : inputVal,
                      getSubAccountArray(0),
                      (res) => {
                        setWait(false);
                        setActive(false);
                        setNFTs(changeNfts(nfts, selected));
                        setInputVal("");
                        console.log(res);
                      }
                    );
                  } else {
                    setWait(true);
                    // tokenTransfer(selToken, validatePrincipal(inputVal) ? principalToAccountIdentifier(inputVal, 0) : inputVal, val, (res) => {
                    //   console.log(res);
                    //   setWait(false);
                    //   let cBal = JSON.parse(balances);
                    //   cBal[selToken] = cBal[selToken] - val;
                    //   setBalances(JSON.stringify(cBal));
                    //   setInputVal("");
                    //   setVal(0);
                    //   setActive(false);
                    // });
                    tokenTransfer(
                      selToken,
                      getSubAccountArray(0),
                      validatePrincipal(inputVal) ? principalToAccountIdentifier(inputVal, 0) : inputVal,
                      val,
                      (res) => {
                        console.log(res);
                        setWait(false);
                        let cBal = JSON.parse(balances);
                        cBal[selToken] = cBal[selToken] - val;
                        setBalances(JSON.stringify(cBal));
                        setInputVal("");
                        setVal(0);
                        setActive(false);
                      }
                    );
                  }
                }}
                buttonType="middleBtn"
                active={true}
              >
                Confirm
              </Button>
              <Button
                style={{}}
                onClick={(e) => {
                  setClicked(false);
                }}
                buttonType="middleBtn"
                active={true}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: "18px" }}>"Please enter correct data"</div>
          </>
        )}
      </div>
    </div>
  );
};
