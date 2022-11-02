import React, { useState } from "react";
import { MenuBar } from "../../Blocks/MenuBar/MenuBar";
import { Button } from "../../UI/Button/Button";
import classes from "./Market.module.css";
import { getAddress, clipboardCopy } from "./../../../utils/utils";
import copy from "./../Play/copy.png";
import { Switch } from "../../UI/Switch/Switch";
import { Resources } from "../../Blocks/Resources/Resources";
import { MyOffers } from "./MyOffers/MyOffers";
import decor from "./../../Blocks/Tokens/decor.png";
import { SearchInput } from "../../UI/SearchInput/SearchInput";
import { Filter } from "../../Blocks/Filter/Filter";
import { MarketItem } from "./MarketItem/MarketItem";
import { ModalMarket } from "./ModalMarket/ModalMarket";
import { MarketModal } from "./MarketModal/MarketModal";
import { Autocomplete, Box, TextField } from "@mui/material";

export const Market = ({ address, setAddress, balances }) => {
  if (!address) {
    if (localStorage.getItem("ic-delegation") && localStorage.getItem("ic-delegation") !== "" && localStorage.getItem("ic-identity") !== "") {
      getAddress((addr) => setAddress(addr));
    } else {
      window.location.assign("/");
    }
  }
  const [clickedMenu, setClickedMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [curPos, setCurPos] = useState(0);
  const [filt, setFilt] = useState(JSON.stringify({ tokens: true, licenses: true, dwarves: true, weapons: true }));

  const [modal, setModal] = useState(false);

  return (
    <div className={classes.root}>
      <MarketModal active={modal} setActive={setModal}/>
      {address ? (
        <>
          <MenuBar address={address} clicked={clickedMenu} setClicked={setClickedMenu} curLink="Play">
            <div className={classes.buttons}>
              <Switch page={"market"} curPos={curPos} setCurPos={setCurPos} val1="my offers" val2="buy" val3="sell" />
              <div
                className={classes.address}
                onClick={() => {
                  clipboardCopy(address);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                }}
              >
                {copied ? <div>Copied</div> : null}
                <img src={copy} alt="Copy address" />
                {address.substr(0, 6) + "..." + address.substr(58, 64)}
              </div>
            </div>
          </MenuBar>
        </>
      ) : null}
      <Resources balances={balances} />
      {curPos == 0 ? (
        <div className={classes.myOffersContainer}>
          <div className={classes.myOffersContainer__sell}>
            <h2>SELL</h2>
            <div className={classes.offersItems}>
              <div className={classes.titles_container}>
                <div className={classes.titles}>
                  <div className={classes.deals}>
                    <p>Deals</p>
                  </div>
                  <div className={classes.quantity}>
                    <p>Quantity</p>
                  </div>
                  <div className={classes.price}>
                    <p>Price</p>
                  </div>
                </div>
              </div>
              <MyOffers></MyOffers>
              <MyOffers></MyOffers>
              <MyOffers></MyOffers>
            </div>
            <div
              onClick={() => {
                setModal(true);
              }}
              className={classes.addButton}
            >
              <p>+Add</p>
            </div>
          </div>
          <div className={classes.decor}>
            <img src={decor} alt="decor"></img>
          </div>

          <div className={classes.myOffersContainer__buy}>
            <h2>BUY</h2>
            <div className={classes.offersItems}>
              <div className={classes.titles_container}>
                <div className={classes.titles}>
                  <div className={classes.deals}>
                    <p>Deals</p>
                  </div>
                  <div className={classes.quantity}>
                    <p>Quantity</p>
                  </div>
                  <div className={classes.price}>
                    <p>Price</p>
                  </div>
                </div>
              </div>
              <MyOffers></MyOffers>
              <MyOffers></MyOffers>
              <MyOffers></MyOffers>
            </div>
            <div className={classes.addButton}>
              <p>+Add</p>
            </div>
          </div>
        </div>
      ) : curPos === 1 ? (
        <div style={{ marginTop: "15px" }}>
          <div className={classes.search}>
            <SearchInput />
          </div>
          <div className={classes.filter}>
            <Filter page={"market"} filt={filt} setFilt={setFilt} />
          </div>
          <div className={classes.marketItemsContainer}>
            <div className={classes.titlesMarket_container}>
              <div className={classes.market_titles}>
                <div className={classes.market_icon}>
                  <p>Icon</p>
                </div>
                <div className={classes.market_title}>
                  <p>Title + Description</p>
                </div>
                <div className={classes.market_quantity}>
                  <p>Quantity</p>
                </div>
                <div className={classes.market_price}>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <MarketItem />
            <MarketItem />
            <MarketItem />
            <MarketItem />
            <MarketItem />
            <MarketItem />
            <MarketItem />
            <MarketItem />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "15px" }}>
          <div className={classes.search}>
            <SearchInput />
          </div>
          <div className={classes.filter}>
            <Filter page={"market"} filt={filt} setFilt={setFilt} />
          </div>
          <div className={classes.marketItemsContainer}>
            <div className={classes.titlesMarket_container}>
              <div className={classes.market_titles}>
                <div className={classes.market_icon}>
                  <p>Icon</p>
                </div>
                <div className={classes.market_title}>
                  <p>Title + Description</p>
                </div>
                <div className={classes.market_quantity}>
                  <p>Quantity</p>
                </div>
                <div className={classes.market_price}>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <MarketItem />
            <MarketItem />
          </div>
        </div>
      )}
    </div>
  );
};

