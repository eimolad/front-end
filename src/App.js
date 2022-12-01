/* global BigInt */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { Main } from "./components/Pages/Main/Main";
import { Wallet } from "./components/Pages/Wallet/Wallet";
import { Stake } from "./components/Pages/Stake/Stake";
import { Play } from "./components/Pages/Play/Play";
import { Demo } from "./components/Pages/Demo/Demo";
import { Market } from "./components/Pages/Market/Market";
import "./App.css";
import { Actor, HttpAgent } from "@dfinity/agent";
import { kernelCanister } from "./canisters";
import kernelDid from "./utils/candid/kernel.did";
import { getAllMiniNFTs, getAllNFTs, getAllSignedAccounts, getAllUnsignedAccounts, getBalances } from "./utils/canisterUtils";

const getStakeFromAID = async (callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
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
  let eorestaked = await actor.getStakeOreFromAID();
  for (let i = 0; i < eorestaked.length; i++) {
    eorestaked[i].type = "eore";
    eorestaked[i].eOre_amount = eorestaked[i].eOre_amount.toString();
    eorestaked[i].lastClaimTime = eorestaked[i].lastClaimTime.toString();
    eorestaked[i].rank = eorestaked[i].rank.toString();
    eorestaked[i].startStaketime = eorestaked[i].startStaketime.toString();
    data.push(eorestaked[i]);
  }
  let eaditstaked = await actor.getStakeAditFromAID();
  for (let i = 0; i < eaditstaked.length; i++) {
    eaditstaked[i].type = "eadit";
    eaditstaked[i].eAdit_amount = eaditstaked[i].eAdit_amount.toString();
    eaditstaked[i].lastClaimTime = eaditstaked[i].lastClaimTime.toString();
    eaditstaked[i].startStaketime = eaditstaked[i].startStaketime.toString();
    data.push(eaditstaked[i]);
  }
  callback(data);
};

const App = () => {
  const [address, setAddress] = useState(null);
  const [wrappedAddress, setWrappedAddress] = useState(null);
  const [principal, setPrincipal] = useState(null);

  const [refresh, setRefresh] = useState(true);
  const [nfts, setNfts] = useState(null);
  const [stakedPairs, setStakedPairs] = useState(null);
  const [task, setTask] = useState(null);
  const [balances, setBalances] = useState(null);
  const [signedAccounts, setSignedAccounts] = useState(null);
  const [unsignedNFTs, setUnsignedNFTs] = useState(null);

  //test
  const [wrappedNfts, setWrappedNfts] = useState(null);
  const [miniNfts, setMiniNfts] = useState(null);
  const [miniWrappedNfts, setMiniWrappedNfts] = useState(null);
  const [stakedNfts, setStakedNfts] = useState(null);

  const updateStateNFTs = () => {
    getAllNFTs(nfts, 0, (data) => {
      if (data) {
        setNfts(JSON.stringify(data));
      }
      setRefresh(!refresh);
    });

    getAllNFTs(wrappedNfts, 2, (data) => {
      if (data) {
        setWrappedNfts(JSON.stringify(data));
      }
    });

    getAllSignedAccounts(signedAccounts, (data) => {
      if (data) {
        setSignedAccounts(JSON.stringify(data));
        setRefresh(false);
      }
    });

    getAllUnsignedAccounts(unsignedNFTs, (data) => {
      setUnsignedNFTs(JSON.stringify(data));
    });

    getAllMiniNFTs(miniNfts, 0, (data) => {
      if (data) {
        setMiniNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });
    getAllMiniNFTs(miniWrappedNfts, 2, (data) => {
      if (data) {
        setMiniWrappedNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });

    getAllNFTs(nfts, 3, (data) => {
      if (data) {
        setStakedNfts(JSON.stringify(data));
      }
      setRefresh(!refresh);
    });
  };

  if (
    localStorage.getItem("ic-identity") !== "" &&
    address &&
    nfts === null &&
    stakedPairs === null &&
    balances === null &&
    refresh &&
    unsignedNFTs === null &&
    signedAccounts === null &&
    wrappedNfts === null &&
    miniNfts === null &&
    stakedNfts === null
  ) {
    getAllNFTs(nfts, 0, (data) => {
      // console.log(data)
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
      // console.log(data)
      setBalances(JSON.stringify(data));
    });

    getAllUnsignedAccounts(unsignedNFTs, (data) => {
      setUnsignedNFTs(JSON.stringify(data));
    });
    getAllNFTs(wrappedNfts, 2, (data) => {
      if (data) {
        setWrappedNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });
    getAllSignedAccounts(signedAccounts, (data) => {
      if (data) {
        setSignedAccounts(JSON.stringify(data));
        setRefresh(false);
      }
    });

    getAllMiniNFTs(miniNfts, 0, (data) => {
      if (data) {
        setMiniNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });

    getAllMiniNFTs(miniWrappedNfts, 2, (data) => {
      if (data) {
        setMiniWrappedNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });

    getAllNFTs(nfts, 3, (data) => {
      // console.log(data)
      if (data) {
        setStakedNfts(JSON.stringify(data));
        setRefresh(false);
      }
    });
  }

  useEffect(() => {
    setTimeout(() => {
      getAllNFTs(nfts, 0, (data) => {
        if (data) {
          setNfts(JSON.stringify(data));
        }
        setRefresh(!refresh);
      });

      getAllNFTs(wrappedNfts, 2, (data) => {
        if (data) {
          setWrappedNfts(JSON.stringify(data));
        }
        setRefresh(!refresh);
      });

      getBalances(balances, (data) => {
        if (data) {
          setBalances(JSON.stringify(data));
        }
      });

      // getAllMiniNFTs(wrappedNfts, 0, (data) => {
      //   if (data) {
      //     setMiniNfts(JSON.stringify(data));
      //   }
      //   setRefresh(!refresh);
      // });
    }, 12000);
  }, [refresh]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              address={address}
              setAddress={setAddress}
              wrappedAddress={wrappedAddress}
              setWrappedAddress={setWrappedAddress}
              principal={principal}
              setPrincipal={setPrincipal}
            />
          }
        />
        <Route
          path="/demo"
          element={
            <Demo
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
          path="/play"
          element={
            <Play
              address={address}
              principal={principal}
              setPrincipal={setPrincipal}
              setAddress={setAddress}
              nfts={nfts}
              miniNfts={miniNfts}
              signedAccounts={signedAccounts}
              setSignedAccounts={setSignedAccounts}
              unsignedNFTs={unsignedNFTs}
              setUnsignedNFTs={setUnsignedNFTs}
              setNfts={setNfts}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
              wrappedNfts={wrappedNfts}
              updateStateNFTs={updateStateNFTs}
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
              miniNfts={miniNfts}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
              setSignedAccounts={setSignedAccounts}
              signedAccounts={signedAccounts}
              unsignedNFTs={unsignedNFTs}
              setUnsignedNFTs={setUnsignedNFTs}
              principal={principal}
              setPrincipal={setPrincipal}
              wrappedNfts={wrappedNfts}
              stakedNfts={stakedNfts}
              setWrappedNfts={setWrappedNfts}
              miniWrappedNfts={miniWrappedNfts}
              wrappedAddress={wrappedAddress}
              setRefresh={setRefresh}
              updateStateNFTs={updateStateNFTs}
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
              wrappedNfts={wrappedNfts}
              stakedNfts={stakedNfts}
              setWrappedNfts={setWrappedNfts}
              setNfts={setNfts}
              stakedPairs={stakedPairs}
              setStakedPairs={setStakedPairs}
              setRefresh={setRefresh}
              task={task}
              setTask={setTask}
              balances={balances}
              setBalances={setBalances}
            />
          }
        />
        {/* <Route
          path="/market"
          element={<Market address={address} setAddress={setAddress} nfts={nfts} setNfts={setNfts} setTask={setTask} balances={balances} setBalances={setBalances} />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
