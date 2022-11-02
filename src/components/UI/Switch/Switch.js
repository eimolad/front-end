import React, {useState} from 'react';
import "./Switch.css";

export const Switch = ({curPos, setCurPos, val1, val2,val3, count,page}) => {
    if(page=='Stake'){
        return (
            <div className={"rootSwitch"}>
                <div className={curPos === 0 ? "active" : ""} onClick={() => {setCurPos(0)}}><span>{val1}</span><i></i></div>
                <div className={curPos === 1 ? "active" : ""} onClick={() => {setCurPos(1)}}><span>{val2}</span><span>{count}</span></div>
            </div>);
    }
    if(page=="Market"){
        return (
            <div className={"rootSwitch"}>
                <div className={curPos === 0 ? "active" : ""} onClick={() => {setCurPos(0)}}><span>{val1}</span><i></i></div>
                <div className={curPos === 1 ? "active" : ""} onClick={() => {setCurPos(1)}}><span>{val2}</span><i></i></div>
                <div className={curPos === 2 ? "active" : ""} onClick={() => {setCurPos(2)}}><span>{val3}</span><i></i></div>
            </div>);
    }
    return <></>
    
};