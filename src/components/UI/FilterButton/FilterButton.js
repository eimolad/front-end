import React from 'react';
import classes from './FilterButton.module.css';

export const FilterButton = ({active, children, onClick}) => {
    return (
        <button className={!active ? classes.root : classes.active} onClick={() => onClick()}>
            {children}
        </button>
    );
};