import React from 'react';
import classes from "./WrappedCount.module.css";

export const WrappedCount = ({wCount, count}) => {
    return (
        <>
            <div className={classes.count}><span>{wCount}/{count}</span></div>
        </>
    );
};