import React, {useEffect} from 'react';
import {FilterButton} from "../../UI/FilterButton/FilterButton";
import classes from "./Filter.module.css";

export const Filter = ({filt, setFilt}) => {
    let t = 0;
    let fc = 0;
    let btns = [];
    for (let key in JSON.parse(filt)) {
        if (JSON.parse(filt)[key]) {
            t++;
        }
        fc++;
    }

    btns = [<FilterButton key={'all'} active={t == fc ? true : false} onClick={() => {
        let cfilt = JSON.parse(filt);
        if (t == fc) {
            for (let key in cfilt) {
                cfilt[key] = false
            }
        } else {
            for (let key in cfilt) {
                cfilt[key] = true
            }
        }
        setFilt(JSON.stringify(cfilt))
    }
    }>All</FilterButton>]

    for (let k in JSON.parse(filt)) {
        btns.push(<FilterButton key={k} active={JSON.parse(filt)[k]} onClick={() => {
            let cfilt = JSON.parse(filt);
            if (cfilt[k]) {
                cfilt[k] = false
            } else {
                cfilt[k] = true
            }
            setFilt(JSON.stringify(cfilt))
        }}>{k}</FilterButton>)
        // if (JSON.parse(filt)[k] && (t < fc)) {
        //     btns.push(<FilterButton active={JSON.parse(filt)[k]} onClick={() => {
        //         let cfilt = JSON.parse(filt);
        //         if (cfilt[k]) {
        //            cfilt[k] = false
        //         } else {
        //             cfilt[k] = true
        //         }
        //         setFilt(JSON.stringify(cfilt))
        //     }}>{k}</FilterButton>)
        // } else if (t < fc) {
        //     btns.push(<FilterButton active={false} onClick={() => {
        //         let cfilt = JSON.parse(filt);
        //         if (cfilt[k]) {
        //             cfilt[k] = false
        //         } else {
        //             cfilt[k] = true
        //         }
        //         setFilt(JSON.stringify(cfilt))
        //     }}>{k}</FilterButton>)
        // } else {
        //     btns.push(<FilterButton active={false} onClick={() => {
        //         let cfilt = JSON.parse(filt);
        //         for (let t in cfilt) {
        //            cfilt[t] = false
        //         }
        //         cfilt[k] = true
        //         setFilt(JSON.stringify(cfilt))
        //     }}>{k}</FilterButton>)
        // }
    }
    return (
        <div className={classes.root}>
            <div>
                {btns}
            </div>
        </div>
    );
};