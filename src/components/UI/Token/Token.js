/* global BigInt */
import React from "react";
import "./Token.css";
import eGold from "./eGold.png";
import eCoal from "./eCoal.png";
import eOre from "./eWood.png";
import icp from "./icp.png";
import eAdit from "./adit.png";
import lgs from "./lgs.png";
import leather from "./eLeather.png";
import bronze from "./bronze.png";
import tp from "./tp.png";
import tpSVG from "./tp.svg";


import { Tooltip } from "@mui/material";

const numbersFormat = (number) => {
  if (number >= 1e3) {
    if (number >= 1e4) {
      if (number >= 1e5) {
        if (number >= 1e6) {
          if (number >= 1e7) {
            if (number >= 1e8) {
              if (number >= 1e9) {
                if (number >= 1e10) {
                  if (number >= 1e11) {
                    const stringNum = number.toString();
                    return stringNum[0] + stringNum[1] + stringNum[2] + "b";
                  }
                  const stringNum = number.toString();
                  return stringNum[0] + stringNum[1] + "b";
                }
                const stringNum = number.toString();
                return stringNum[0] + "b";
              }
              const stringNum = number.toString();
              return stringNum[0] + stringNum[1] + stringNum[2] + "m";
            }
            const stringNum = number.toString();
            return stringNum[0] + stringNum[1] + "m";
          }
          const stringNum = number.toString();
          return stringNum[0] + "m";
        }
        const stringNum = number.toString();
        return stringNum[0] + stringNum[1] + stringNum[2] + "k";
      }
      const stringNum = number.toString();
      return stringNum[0] + stringNum[1] + "k";
    }
    const stringNum = number.toString();
    return stringNum[0] + "k";
  }
  return number.toString();
};

export const Token = ({ name, balances, selected, setSelected, setSelectedNFTs, setSelectedWNFTs }) => {
  return (
    <Tooltip title={JSON.parse(balances) ? JSON.parse(balances)[name] + " " + name : "loading"}>
      <div className={"rootNFT"} style={JSON.parse(balances) && JSON.parse(balances)[name] > 0 ? { display: "flex" } : { display: "none" }}>
        {JSON.parse(balances) ? (
          <div
            className={selected != name ? "borderNFT" : "borderNFT ActiveNFT"}
            onClick={() => {
              if (selected) {
                if (selected != name) {
                  setSelected(name);
                } else {
                  setSelected(null);
                }
              } else {
                setSelectedNFTs("{}");
                setSelectedWNFTs("{}");
                setSelected(name);
              }
            }}
          >
            <div className={"tokenInfo"}>
              <div className={"tokenName"}>{name}</div>
              <div className={"tokenBalance"}>{numbersFormat(JSON.parse(balances)[name])}</div>
            </div>
            <div className={selected != name ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
              {name === "gold" ? (
                <img className={"tokenImg"} src={eGold} alt={name} />
              ) : name === "coal" ? (
                <img className={"tokenImg"} src={eCoal} alt={name} />
              ) : name === "icp" ? (
                <img className={"tokenImg"} src={icp} alt={name} />
              ) : name === "ore" ? (
                <img className={"tokenImg"} src={eOre} alt={name} />
              ) : name === "lgs" ? (
                <img className={"tokenImg"} src={lgs} alt={name} />
              ) : name === "leather" ? (
                <img className={"tokenImg"} src={leather} alt={name} />
              ) : name === "bronze" ? (
                <img className={"tokenImg"} src={bronze} alt={name} />
              ) : name === "tp" ? (
                <img className={"tokenImg"} src={tpSVG} alt={name} />
              ) : (
                <img className={"tokenImg"} src={eAdit} alt={name} />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Tooltip>
  );
};
