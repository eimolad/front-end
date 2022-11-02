import React from 'react';
import {Task} from '../../UI/Task/Task'
import classes from './Tasks.module.css';

export const Tasks = ({setTask}) => {
    return (
        <div className={classes.root}>
            <Task index={1} title="Gold" setTask={setTask}>In the service of the king!</Task>
            <Task index={2} title="Coal" setTask={setTask}>All for use</Task>
            {/*<Task index={3} descript={desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, rerum!</Task>*/}
            {/*<Task index={4} descript={desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, iusto?</Task>*/}
        </div>
    );
};