import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import classes from "./SearchInput.module.css";
import searchIcon from "./searchIcon.svg";
import leftArr from "./leftArr.svg";
import rightArr from "./rightArr.svg";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
];

export const SearchInput = ({}) => {
  //adaptive
  let sw = "475px";
  const matches1110 = useMediaQuery("(max-width: 1110px)");
  const matches768 = useMediaQuery("(max-width: 768px)");
  const matches540 = useMediaQuery("(max-width: 540px)");

  if (matches1110) {
    sw = "375px";
  }
  if (matches768) {
    sw = "275px";
  }
  if (matches540) {
    sw = "275px ";
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftArr}>
        <img src={leftArr} alt="leftArr" />
      </div>

      <Autocomplete
        freeSolo
        id="search"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            className={classes.searchInput}
            style={{ width: sw, color: "rgba(111, 111, 111, 1)" }}
            {...params}
            label="Еnter a request"
            InputProps={{
              ...params.InputProps,
              type: "search",
              style: {
                height: "55px",
                color: "white",
                padding: "0",
                backgroundColor: "#181819",
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
      <div className={classes.searchIcon}>
        <img src={searchIcon} alt="search" />
      </div>
      <div className={classes.rightArr}>
        <img src={rightArr} alt="leftArr" />
      </div>
    </div>
  );
};
