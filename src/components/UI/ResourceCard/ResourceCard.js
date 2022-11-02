import React from 'react';
import first from './first.png';
import last from './last.png';
import between from './cur.png';
import classes from './ResourceCard.module.css';

export const ResourceCard = ({imgSrc, resource, position, children}) => {
    return (
        <div className={classes.root} style={position === 'first' ? {backgroundImage: `url(${first})`} : position === 'last' ? {backgroundImage: `url(${last})`} : {backgroundImage: `url(${between})`}}>
            <div className={classes.imgBlock}><img src={imgSrc} alt={resource}/></div>
            <div className={classes.resourceCount}>{children}</div>
        </div>
    );
};