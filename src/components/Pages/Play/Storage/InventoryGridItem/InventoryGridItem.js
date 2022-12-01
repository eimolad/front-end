import React from "react";
import classes from "./InventoryGridItem.module.css";
import { Grid } from "@mui/material";
import eGold from "./eGold.png";
import eCoal from "./eCoal.png";
import eOre from "./eWood.png";
import icp from "./icp.png";
import eAdit from "./adit.png";
import lgs from "./lgs.png";
import leather from "./eLeather.png";
import bronze from "./bronze.png";
import tp from "./tp.png";
import { tokenIdentifier } from "../../../../../utils/utils";

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

export const InventoryGridItem = ({
  name,
  balances,
  nft,
  tid,
  dragEndHandler,
  dragStartHandler,
  dragLeaveHandler,
  dragOverHandler,
  onDropHandler,
  id,
}) => {
  return (
    <Grid item>
      <div className={id.includes("EmptyField") ? classes["id"] : id === "storageRoot" ? classes["storageRoot"] : classes["accountRoot"]}>
        {name === "empty" ? (
          <div className={classes[id]}></div>
        ) : name === "nft" ? (
          <div
            // onDragOver={(e)=>{dragOverHandler(e)}}
            onDragLeave={(e) => {
              dragLeaveHandler(e);
            }}
            onDragStart={(e) => {
              dragStartHandler(e, tid, id);
            }}
            onDragEnd={(e) => {
              dragEndHandler(e);
            }}
            // onDrop={(e)=>{onDropHandler(e)}}
            draggable
            className={classes.item}
          >
            <div className={classes.item__img}>
              <img
                src={
                  "https://" +
                  nft.metadata.ledgerCanister +
                  ".raw.ic0.app/?type=thumbnail&tokenid=" +
                  tokenIdentifier(nft.metadata.ledgerCanister, nft.index)
                }
                alt={nft.collection}
              />
            </div>
          </div>
        ) : name === "miniNft" ? (
          <div
            // onDragOver={(e)=>{dragOverHandler(e)}}
            onDragLeave={(e) => {
              dragLeaveHandler(e);
            }}
            onDragStart={(e) => {
              dragStartHandler(e, tid, id);
            }}
            onDragEnd={(e) => {
              dragEndHandler(e);
            }}
            // onDrop={(e)=>{onDropHandler(e)}}
            draggable
            className={classes.item}
          >
            <div className={classes.item__img}>
              <img src={"https://" + nft.ledgerCanister + ".raw.ic0.app/?asset=0"} alt={nft.name} />
            </div>
          </div>
        ) : (
          <div
            onDragStart={(e) => {
              dragStartHandler(e, name, id);
            }}
            onDragEnd={(e) => {
              dragEndHandler(e);
            }}
            // onDrop={(e)=>{onDropHandler(e)}}

            draggable
            className={classes.item}
          >
            <div className={classes.item__img}>
              {name === "gold" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={eGold} alt={name} />
              ) : name === "coal" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={eCoal} alt={name} />
              ) : name === "icp" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={icp} alt={name} />
              ) : name === "ore" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={eOre} alt={name} />
              ) : name === "lgs" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={lgs} alt={name} />
              ) : name === "leather" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={leather} alt={name} />
              ) : name === "bronze" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={bronze} alt={name} />
              ) : name === "tp" ? (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={tp} alt={name} />
              ) : (
                <img className={id === "storageRoot" ? "tokenImg_storage" : "tokenImg_account"} src={eAdit} alt={name} />
              )}
            </div>
            <div className={id === "storageRoot" ? classes["item__count_storage"] : classes["item__count_account"]}>
              <p>{JSON.parse(balances)[name] !== undefined ? numbersFormat(JSON.parse(balances)[name]) : null}</p>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
};
