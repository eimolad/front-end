import React from "react";
import classes from "./Tokens.module.css";
import decor from "./decor.png";
import { Token } from "../../UI/Token/Token";
import { Carousel } from "../Carousel/Carousel";

export const Tokens = ({ balances, selected, setSelected, setSelectedNFTs, setSelectedWNFTs,decoration }) => {
  // let tokensElements = [];
  // for (let name in JSON.parse(balances)) {
  //   if (name === "lgs") continue;
  //   tokensElements.push(
  //     <Token
  //       key={name}
  //       name={name}
  //       balances={balances}
  //       selected={selected}
  //       setSelected={setSelected}
  //       setSelectedNFTs={setSelectedNFTs}
  //       setSelectedWNFTs={setSelectedWNFTs}
  //     />
  //   );
  // }
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.collectName}>Tokens</div>
      </div>
      {decoration !== false ? (
        <div className={classes.decor}>
          <img src={decor} alt="decor" />
        </div>
      ) : null}

      <div className={classes.tokens}>
        {/* {tokensElements.length !== 0 ? <Carousel page="wallet" tokens={tokensElements} /> : null} */}
        <Token
          name="icp"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="gold"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="coal"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="ore"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="adit"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="leather"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="bronze"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
        <Token
          name="tp"
          balances={balances}
          selected={selected}
          setSelected={setSelected}
          setSelectedNFTs={setSelectedNFTs}
          setSelectedWNFTs={setSelectedWNFTs}
        />
      </div>
    </div>
  );
};
