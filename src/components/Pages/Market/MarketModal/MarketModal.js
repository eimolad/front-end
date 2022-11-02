/* global BigInt */
import React, { useState, useEffect } from "react";
import "./MarketModal.css";
import { Button } from "../../../UI/Button/Button";
import cornerDecorRight from "./cornerDecorRight.png";
import cornerDecorLeft from "./cornerDecorLeft.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import kernelDid from "../../../../utils/candid/kernel.did";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Autocomplete";
import { Box, Popper, TextField } from "@mui/material";
import classes from "./MarketModal.css";
import goldImg from './../../../Blocks/Resources/eGold.png';
import icpImg from './../../../UI/Token/icp.png';

const addSell = async (address, selectedNFT, selectedMoney, price, amount, callback) => {
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

  const info = [
    {
      name: JSON.parse(selectedNFT).collection,
      title: "weapon for dwarf", // why do we need it?
      indexNFT: String(JSON.parse(selectedNFT).index),
      amount: Number(amount),
      price: Number(price),
      timeStart: Number(Date.now() * 1000000),
      description: [""],
    },
  ];

  const args = {
    idSell: 2, //TODO: how to generate id??
    aid: address,
    info: info,
    orders: [],
    fullPrice: Number(price),
    money: selectedMoney,
    status: true,
  };
  actor.addSell(args).then((data) => {
    callback(data);
  });
};

export const MarketModal = ({ active, setActive, address, nfts }) => {
  const [nftSelectValue, setNftSelectValue] = useState(); //TODO: хорошо было бы ставить как дефолтное состояние первое value в интупе
  const [selectedNFT, setSelectedNFT] = useState("");
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [selectedMoney, setSelectedMoney] = useState("gold");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  //const NFTsOwned = []
  let nftsOptions = [];
  let nftsSelect = document.getElementById("selectID");
  let moneySelect = document.getElementById("moneySelect");

  if (nfts && nfts != "{}") {
    if (Object.keys(JSON.parse(nfts)).length != NFTsOwned.length) {
      for (let tid in JSON.parse(nfts)) {
        // console.log(JSON.parse(nfts)[tid])
        NFTsOwned.push(JSON.parse(nfts)[tid]);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (NFTsOwned != [] && NFTsOwned && nftsSelect) {
        for (let i in NFTsOwned) {
          //console.log(i)
          nftsOptions.push(NFTsOwned[i].index);
        }

        while (nftsSelect.options.length > 0) {
          nftsSelect.options.remove(0);
        }

        for (let i = 0; i < nftsOptions.length; i++) {
          let option = document.createElement("option");
          option.value = i;
          option.text = nftsOptions[i];
          nftsSelect.options.add(option);
        }
      }
    };
    fetchData();
  }, [nfts, active]);

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
          <select
            className="itemMarket"
            style={{ width: `100px`, fontSize: "16px" }}
            id="selectID"
            onChange={() => {
              if (nftsSelect) {
                setNftSelectValue(nftsSelect.options[nftsSelect.selectedIndex].text);
                for (let i in NFTsOwned) {
                  if (String(NFTsOwned[i].index) == nftSelectValue) {
                    setSelectedNFT(JSON.stringify(NFTsOwned[i]));
                  }
                }
              }
            }}
          >
            <option value="str0"> NFTs </option>
          </select>
          <Autocomplete
            id="country-select-demo"
            sx={{ color: "#c7c7c7", backgroundColor: "rgba(59,59,59,0.5)",width:223,zIndex:9999 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                <img loading="lazy" width="20" src={option.code} srcSet={option.code} alt="" />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Сurrency"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                  style: {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    padding: "0",
                    color: "#c7c7c7",
                  },
                }}
              />
            )}
          />

          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
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
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            style={{
              marginTop: "15px",
              padding: "0",
              marginBottom: "15px",
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
          <Button
            active={true}
            style={{}}
            buttonType="middleBtn"
            onClick={(e) => {
              addSell(address, selectedNFT, selectedMoney, price, amount, (data) => {
                console.log(data);
              });
              setActive(false);
            }}
          >
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
};

const countries = [
  { code: icpImg, label: "ICP", phone: "" },
  {
    code: goldImg,
    label: "Gold",
    phone: "",
  }
  
];