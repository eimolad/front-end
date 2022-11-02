import {  Slide } from "@mui/material";
import React, { useState } from "react";
import { FilterButton } from "../../UI/FilterButton/FilterButton";
import classes from "./Filter.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const Filter = ({ filt, setFilt, page }) => {
  const [filterOn, setFilterOn] = useState(false);
  let t = 0;
  let fc = 0;
  let btns = [];
  for (let key in JSON.parse(filt)) {
    if (JSON.parse(filt)[key]) {
      t++;
    }
    fc++;
  }

  btns = [
    <FilterButton
      key={"all"}
      active={t == fc ? true : false}
      onClick={() => {
        let cfilt = JSON.parse(filt);
        if (t == fc) {
          for (let key in cfilt) {
            cfilt[key] = false;
          }
        } else {
          for (let key in cfilt) {
            cfilt[key] = true;
          }
        }
        setFilt(JSON.stringify(cfilt));
      }}
    >
      All
    </FilterButton>,
  ];

  for (let k in JSON.parse(filt)) {
    btns.push(
      <FilterButton
        key={k}
        active={JSON.parse(filt)[k]}
        onClick={() => {
          let cfilt = JSON.parse(filt);
          if (cfilt[k]) {
            cfilt[k] = false;
          } else {
            cfilt[k] = true;
          }
          setFilt(JSON.stringify(cfilt));
        }}
      >
        {k}
      </FilterButton>
    );
  }

  if (page === "market") {
    return (
      <div className={classes.rootNoneFixed}>
        <div>{btns}</div>
      </div>
    );
  } else {
    return (
      <>
        <div className={classes.filterTitle}>
          <h3>Filters</h3>
          {filterOn ? (
            <ExpandLessIcon
              onClick={() => {
                if (filterOn) {
                  setFilterOn(false);
                } else {
                  setFilterOn(true);
                }
              }}
            />
          ) : (
            <ExpandMoreIcon
              onClick={() => {
                if (filterOn) {
                  setFilterOn(false);
                } else {
                  setFilterOn(true);
                }
              }}
            />
          )}
        </div>
        {filterOn ? (
          <Slide direction="down" in={filterOn} timeout={600} mountOnEnter>
            <div className={classes.rootNoneFixed}>
              <div>{btns}</div>
            </div>
          </Slide>
        ) : null}
      </>
    );
  }
};
