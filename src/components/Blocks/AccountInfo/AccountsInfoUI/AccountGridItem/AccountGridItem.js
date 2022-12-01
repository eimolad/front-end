import { Fade, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./AccountGridItem.module.css";
import vector from "./../AccountSelect/vector.png";
import vectorUP from "./VectorUP.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export const AccountGridItem = ({ title, value, metadata, advanced }) => {
  const [clicked, setClicked] = useState(false);
  let metadataElements = [];
  // useEffect(() => {
  //   if (metadata) {
  //     for (let key in metadata) {
  //       // console.log(key);
  //       metadataElements.push(
  //         // <div style={{width:315,height:100}}>
  //         //   <p>key</p>
  //         //   <b>metadata[key]</b>
  //         // </div>
  //         2
  //       );
  //     }
  //   }
  // }, [metadata]);

  if (metadata && advanced) {
    for (let key in metadata) {
      // console.log(key);
      metadataElements.push(
        <div className={classes.metadata__item} key={key}>
          <p>{key}</p>
          <b>{metadata[key]}</b>
        </div>
      );
    }
  }

  // console.log(metadataElements)
  return (
    <Grid item>
      <div
        onClick={() => {
          if (advanced) {
            clicked ? setClicked(false) : setClicked(true);
          }
        }}
        style={{ outline: clicked ? "1px solid #ec832e" : "none", cursor: advanced ? "pointer" : "auto" }}
        className={classes.root}
      >
        <div className={classes.content}>
          <p>{title}</p>
          <b style={{ paddingRight: advanced ? 0 : 25 }}>{value}</b>
        </div>

        {advanced ? (
          clicked ? (
            <div className={classes.downImg}>
              <ArrowDropUpIcon />
            </div>
          ) : (
            <div className={classes.downImg}>
              <ArrowDropDownIcon />
            </div>
          )
        ) : null}
      </div>
      {metadata ? (
        <Fade timeout={800} in={clicked}>
          <div style={{ visibility: clicked ? "visible" : "hidden" }} className={classes.metadata}>
            {metadataElements}
          </div>
        </Fade>
      ) : null}
    </Grid>
  );
};
