import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import React, { useState,useEffect } from "react";
import { kernelCanister } from "../../../canisters";
import kernelDid from "../../../utils/candid/kernel.did";
import { EditButton } from "../../UI/EditButton/EditButton";
import { ModalWindow } from "../../UI/ModalWindow/ModalWindow";
import { SaveButton } from "../../UI/SaveButton/SaveButton";
import classes from "./AccountPreview.module.css";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "./webgl/build/Preview.loader.js",
  dataUrl: "./webgl/build/Preview.data",
  frameworkUrl: "./webgl/build/Preview.framework.js",
  codeUrl: "./webgl/build/Preview.wasm",
});

function Mess(message) {
  unityContext.send("Start_Hero", "Text_Message", message);
}

export const AccountPreview = ({equipment}) => {
  let json={
    head:'www',
    bodey:'www',
    ass: 'www'
  }
  useEffect(function () {
    unityContext.on("Preview", function (data) {
      if (data == "Preview?") {
        Mess(JSON.stringify(json));
      }
    });
    return function () {
      //unityContext.removeEventListener("Info_Player");
    };
  });

  return (
    <div className={classes.container}>
      <Unity
        unityContext={unityContext}
        style={{width:'400px',height:'400px'}}
      />
    </div>
  );
};
