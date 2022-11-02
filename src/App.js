/* global BigInt */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { Main } from "./components/Pages/Main/Main";
import { Wallet } from "./components/Pages/Wallet/Wallet";
import { Stake } from "./components/Pages/Stake/Stake";
import { Play } from "./components/Pages/Play/Play";
import { Market } from "./components/Pages/Market/Market";
import {
  fromHexString,
  principalToAccountIdentifier,
  tokenIdentifier,
} from "./utils/utils";
import "./App.css";
import { Actor, HttpAgent } from "@dfinity/agent";
import { canisters, ICcanister, tokenCanisters } from "./canisters";
import dwarvesIDL from "./utils/candid/dwarves.did";
import kernelDid from "./utils/candid/kernel.did";
import ICTokens from "./utils/candid/ic.did";
import eGoldDid from "./utils/candid/egold.did";
import { log } from "util";
import async from "pbkdf2/lib/async";
import dwarvesDid from "./utils/candid/dwarves.did";

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
    //kernel canister
    canisterId: "dwyty-piaaa-aaaan-qagma-cai",
  });
  const args = {};
  args[collection] = tid;
  await actor.getTokenInfoRare(args).then((data) => {
    callback(data);
  });
};

const getAllNFTs = async (nfts, callback) => {
  // console.log(nfts)
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  let fb = {};
  for (let collect in canisters) {
    const actor = Actor.createActor(dwarvesIDL, {
      agent: agent,
      canisterId: canisters[collect], //canisters["dwarves"]
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
            //  console.log(collect+" "+tokenIdentifier(canisters[collect], data.ok[i][0]))
            await getTokenInfo(
              collect,
              tokenIdentifier(canisters[collect], data.ok[i][0]),
              (st) => {

                //console.log(st)
                //console.log(st.tokenInfo)
                //console.log(st.tokenInfo[Object.keys(st.tokenInfo)[0]][0]['rase'])
                let nft = {
                  type: st.tokenInfo[Object.keys(st.tokenInfo)[0]][0]["rase"]
                    ? "character"
                    : "equipment",
                  index: data.ok[i][0],
                  collection: collect,
                  rare: st.tokenRarity[0],
                  metadata: st.tokenInfo[Object.keys(st.tokenInfo)[0]][0],
                };
                //console.log(nft.equipment)
                fb[
                  tokenIdentifier(
                    st.tokenInfo[Object.keys(st.tokenInfo)[0]][0]
                      .ledgerCanister,
                    data.ok[i][0]
                  )
                ] = nft;
                // console.log(nft.metadata.rarityRate)
              }
            );
          }
        }
      });
  }
  if (JSON.stringify(fb) !== nfts) {
    callback(fb);
    // console.log(fb)
  } else {
    callback(null);
  }
};


const getStakeFromAID = async (callback) => {
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

  let data = await actor.getStakeFromAID();
  for (let i = 0; i < data.length; i++) {
    data[i].type = "egold";
    data[i].eGold_amount = data[i].eGold_amount.toString();
    data[i].lastClaimTime = data[i].lastClaimTime.toString();
    data[i].rank = data[i].rank.toString();
    data[i].rarityRate = data[i].rarityRate.toString();
    data[i].startStaketime = data[i].startStaketime.toString();
  }
  let ecoalstaked = await actor.getStakeCoalFromAID();
  for (let i = 0; i < ecoalstaked.length; i++) {
    ecoalstaked[i].type = "ecoal";
    ecoalstaked[i].eCoal_amount = ecoalstaked[i].eCoal_amount.toString();
    ecoalstaked[i].lastClaimTime = ecoalstaked[i].lastClaimTime.toString();
    ecoalstaked[i].rank = ecoalstaked[i].rank.toString();
    ecoalstaked[i].startStaketime = ecoalstaked[i].startStaketime.toString();
    data.push(ecoalstaked[i]);
  }
  callback(data);
};

const getBalances = async (cbal, callback) => {
  //console.log(cbal)
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  let actor = Actor.createActor(ICTokens, {
    agent: agent,
    canisterId: ICcanister,
  });
  let data = { icp: 0, gold: 0, coal: 0, ore: 0, adit: 0 };
  let b = await actor.account_balance({
    account: fromHexString(
      principalToAccountIdentifier(
        authClient.getIdentity().getPrincipal().toText(),
        0
      )
    ),
  });
  data.icp = Number(b.e8s) / 100000000;
  for (let t in tokenCanisters) {
    actor = Actor.createActor(eGoldDid, {
      agent: agent,
      canisterId: tokenCanisters[t],
    });
    const user = {
      address: principalToAccountIdentifier(
        authClient.getIdentity().getPrincipal().toText(),
        0
      ),
    };
    const token = "";
    const BalanceRequest = { token, user };
    b = await actor.balance(BalanceRequest);
    if (b.ok) {
      data[t] = parseInt(b.ok.toString());
    }
  }
  if (JSON.stringify(data) !== cbal) {
    callback(data);
  } else {
    callback(null);
  }
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
              if (dataSinged.length !=0) {
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

const App = () => {
  const [address, setAddress] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [nfts, setNfts] = useState(null);
  const [stakedPairs, setStakedPairs] = useState(null);
  const [task, setTask] = useState(null);
  const [balances, setBalances] = useState(null);
  const [signedAccounts,setSignedAccounts] = useState(null)
  const [unsignedNFTs, setUnsignedNFTs] = useState(null);


  if (
    address &&
    nfts === null &&
    stakedPairs === null &&
    balances === null &&
    refresh && unsignedNFTs===null && signedAccounts===null
  ) {
    getAllNFTs(nfts, (data) => {
      //console.log(data)
      if (data) {
        setNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });
    getStakeFromAID((data) => {
      // console.log(data)
      setStakedPairs(JSON.stringify(data));
    });
    getBalances(balances, (data) => {
      //console.log(data)
      setBalances(JSON.stringify(data));
    });
    getAllSignedAccounts(signedAccounts,(data)=>{
      setSignedAccounts(JSON.stringify(data))
    })
    getAllUnsignedAccounts(unsignedNFTs,(data)=>{
      setUnsignedNFTs(JSON.stringify(data))
    })    
  }
  useEffect(() => {
    setTimeout(() => {
      getAllNFTs(nfts, (data) => {
        if (data) {
          setNfts(JSON.stringify(data));
        }
        setRefresh(!refresh);
      });
      getBalances(balances, (data) => {
        if (data) {
          setBalances(JSON.stringify(data));
        }
      });
      // getAllSignedAccounts(signedAccounts,(data)=>{
      //   if(JSON.stringify(data) !== signedAccounts){
      //     setSignedAccounts(JSON.stringify(data))
      //   }
      // })

      // getAllUnsignedAccounts(unsignedAccounts,(data)=>{
      //   if(JSON.stringify(data) !== signedAccounts){
      //     setUnsignedAccounts(JSON.stringify(data))
      //   }
      // })

      console.log('refreshed')
    }, 10000);
  }, [refresh]);

  console.log(unsignedNFTs)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Main address={address} setAddress={setAddress} />}
        />
        <Route
          path="/play"
          element={
            <Play
              address={address}
              setAddress={setAddress}
              nfts={nfts}
              signedAccounts={signedAccounts}
              setSignedAccounts={setSignedAccounts}
              unsignedNFTs={unsignedNFTs}
              setUnsignedNFTs={setUnsignedNFTs}
              setNfts={setNfts}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
            />
          }
        />
        <Route
          path="/wallet"
          element={
            <Wallet
              address={address}
              setAddress={setAddress}
              nfts={nfts}
              setNfts={setNfts}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
            />
          }
        />
        <Route
          path="/stake"
          element={
            <Stake
              address={address}
              setAddress={setAddress}
              nfts={nfts}
              stakedPairs={stakedPairs}
              setRefresh={setRefresh}
              task={task}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
            />
          }
        />
        <Route
          path="/market"
          element={
            <Market
              setRefresh={setRefresh}
              address={address}
              nfts={nfts}
              setNfts={setNfts}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
