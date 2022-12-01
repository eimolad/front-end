import React, { useEffect, useState } from "react";
import Unity from "react-unity-webgl";
import { Button } from "../../UI/Button/Button";
import classes from "./../Play/Play.module.css";
import cornerLeft from "./cornerDecorLeft.png";
import cornerRight from "./cornerDecorRight.png";

export const Game = ({progression,confirm,unityContext,setConfirm}) => {
  return (
    <>
      {window.screen.width >= 1100 ? (
        <>
          <div className={classes.window} style={confirm ? { display: "none" } : { display: "flex" }}>
            <div className={classes.border}>
              <h4>Warning!</h4>
              <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
              <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
              <p>
                The World of Eimolad is still being developed and expanded. There may be some inconveniences and obstacles. We hope for your
                understanding.
              </p>
              <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attention! Available only for PC!</p>
              <div className={classes.progressBar}>
                <span style={{ width: `${progression * 100}%` }}></span>
              </div>
              <p>Loading {progression.toFixed(2) * 100}%</p>
              {/* <p>Loading {progression *100} %</p> */}
              {/* {progression!=1 ? (
                    <div>
                      <img style={{width:100}} src={loader} alt="Wait" />
                      <p>Loading...</p>
                    </div>
                    
                  ) : null} */}

              <Button active={progression == 1 ? true : false} style={{}} buttonType="middleBtn" onClick={() => setConfirm(true)}>
                Next
              </Button>
            </div>
          </div>

          <Unity
            unityContext={unityContext}
            style={
              confirm
                ? {
                    height: "100vh",
                    width: "100vw",
                  }
                : { display: "none" }
            }
          />
        </>
      ) : (
        <>
          <div className={classes.window} style={{ width: "90%" }}>
            <div className={classes.border}>
              <h4>Warning!</h4>
              <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
              <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
              <p>
                The World of Eimolad is still being developed and expanded. There may be some inconveniences and obstacles. We hope for your
                understanding.
              </p>
              <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attention! Available only for PC!</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
