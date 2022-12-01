import React from "react";
import { ConnectBtnBlock } from "./ConnectBtnBlock/ConnectBtnBlock";
import { MenuBtnBlock } from "./MenuBtnBlock/MenuBtnBlock";
import decor from "./main_decor.png";
import bg from "./main.png";
import classes from "./Main.module.css";
import { AClient, getAddress, getPrincipal, principalToAccountIdentifier } from "../../../utils/utils";
import cornerLeft from "./../../Pages/Demo/cornerDecorLeft.png";
import cornerRight from "./../../Pages/Demo/cornerDecorRight.png";

export const Main = ({ address, setAddress, wrappedAddress, setWrappedAddress, principal, setPrincipal }) => {
  const init = async () => {
    await AClient((id) => {
      setAddress(principalToAccountIdentifier(id.getPrincipal().toText()));
      // getAddress((addr) => {
      //   setAddress(addr);
      // }, 0);
      // getAddress((gameAddr) => {
      //   setGameAddress(gameAddr);
      // }, 1);
      // getPrincipal((princ)=>{
      //   setPrincipal(princ)
      // })
      // console.log("id ", id);
      // console.log(principalToAccountIdentifier(id.getPrincipal().toText()));
    });
  };

  if (
    localStorage.getItem("ic-delegation") &&
    !address &&
    localStorage.getItem("ic-delegation") !== "" &&
    localStorage.getItem("ic-identity") !== "" &&
    !wrappedAddress
  ) {
    getAddress((addr) => {
      setAddress(addr);
    }, 0);
    getAddress((gameAddr) => {
      setWrappedAddress(gameAddr);
    }, 2);
  }

  if (!principal || principal==='2vxsx-fae') {
    getPrincipal((princ) => {
      setPrincipal(princ);
    });
  }
  return (
    <div className={classes.root} style={{ background: `url(${bg})` }}>
      {!address || address == "1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79" ? (
        <div className={classes.main}>
          <div className={classes.manual}>
            <img className={classes.cornerDecorLeft} src={cornerLeft} alt="Corner Decor" />
            <img className={classes.cornerDecorRight} src={cornerRight} alt="Corner Decor" />
            <div className={classes.manual__content}>
              <div className={classes.manual__title}>
                <h3>Welcome to the Internet Computer Protocol ecosystem</h3>
              </div>
              <h4>If you are a beginner, you should follow these steps:</h4>
              <p>1. Register Internet Identity and add trusted devices</p>
              <a target="_blank" href="https://wiki.internetcomputer.org/wiki/How_to_create_an_Internet_Identity">
                MANUAL
              </a>
              <p>2. If your device does not have biometric identification function, you should set up Windows Hello PIN</p>
              <a target="_blank" href="https://internetcomputer.org/docs/current/tokenomics/identity-auth/hello-guide/">
                MANUAL
              </a>
            </div>
          </div>
          <h2>Connect your Wallet</h2>
          <div className={classes.decor}>
            <img src={decor} alt="" />
          </div>
          <ConnectBtnBlock setAddress={setAddress} init={init} />
        </div>
      ) : (
        <div className={classes.mainLog}>
          <MenuBtnBlock principal={principal} address={address} />
        </div>
      )}
      {/*<Footer/>*/}
    </div>
  );
};
