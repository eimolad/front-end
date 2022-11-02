import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import classes from "./Demo.module.css";
import bg from "../../../media/bg.png";
import cornerLeft from "./cornerDecorLeft.png";
import cornerRight from "./cornerDecorRight.png";
import { Button } from "../../UI/Button/Button";
import { getAddress } from "../../../utils/utils";

const unityContext = new UnityContext({
  loaderUrl: "./webgl/build/eimolad.loader.js",
  dataUrl: "./webgl/build/eimolad.data",
  frameworkUrl: "./webgl/build/eimolad.framework.js",
  codeUrl: "./webgl/build/eimolad.wasm",
});

function Mess(message) {
  unityContext.send("Canvas_Game", "Text_Message", message);
}

export const Demo = ({ address, setAddress }) => {
  const [progression, setProgression] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [play, setPlay] = useState(true);

  const gameData = `{
        "aid": "f335c96f18eb2c5f727ce2732795f7b42e1c21495f9200f0f535bb04f2fd4c74",
        "equipment": [
            6,
            3,
            5,
            1,
            0
        ],
        "name": "DemoPlayer",
        "quest": [
            {
                "questStep": 3,
                "dialog_count": 10,
                "recipe": "true"
            },
            {
                "scroll": 5,
                "vector": [
                    {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    }
                ]
            }
        ],
        "experience": "0",
        "charId": "vgrck-dikor-uwiaa-aaaaa-dmaau-4aqca-aaabu-q"
    }`;

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  useEffect(function () {
    unityContext.on("Info_Player", function (data) {
      console.log(data);

      if (data == "player?") {
        console.log(gameData);
        Mess(gameData);
      }

      return function () {
        //unityContext.removeEventListener("Info_Player");
      };
    });
  });

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${bg})` }}>
      {play ? (
        window.screen.width >= 1100 ? (
          <>
            <div className={classes.window} style={confirm ? { display: "none" } : { display: "flex" }}>
              <div className={classes.border}>
                <h4>Warning!</h4>
                <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
                <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
                <p>
                  We have developed a small test location, the ABANDONED VILLAGE OF THE GRENLYNS. The location is fully deployed by IC-on-chain. We
                  are conducting research to optimize the loads. We invite our Eimoladians to take part in this small event!
                </p>
                <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attention! Available only for PC!</p>
                <div className={classes.progressBar}>
                  <span style={{ width: `${progression * 100}%` }}></span>
                </div>
                <p>Loading {progression * 100}%</p>
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
          <div className={classes.window} style={{ width: "90%" }}>
            <div className={classes.border}>
              <h4>Warning!</h4>
              <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
              <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
              <p>
                We have developed a small test location, the ABANDONED VILLAGE OF THE GRENLYNS. The location is fully deployed by IC-on-chain. We are
                conducting research to optimize the loads. We invite our Eimoladians to take part in this small event!
              </p>
              <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attention! Available only for PC!</p>
            </div>
          </div>
        )
      ) : (
        <div className={classes.window} style={{ width: "400px", height: "auto" }}>
          <div className={classes.border} style={{ width: "370px" }}>
            <h4 style={{ margin: "15px auto" }}>Warning!</h4>
            <img className={classes.cornerLeft} src={cornerLeft} alt="Corner Decor" />
            <img className={classes.cornerRight} src={cornerRight} alt="Corner Decor" />
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>You have no wrapped character!</p>
          </div>
        </div>
      )}
    </div>
  );
};
