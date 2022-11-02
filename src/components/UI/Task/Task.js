import React, {useState} from 'react';
import classes from "./Task.module.css";
import taskBg from "./taskBG.png";
import {TaskDescription} from "./TaskDescription/TaskDescription";

export const Task = ({index, title, setTask, children}) => {
    const [active, setActive] = useState(false);
    return (
        <div className={classes.root} style={{backgroundImage: `url(${taskBg})`}} onClick={() => setTask(index)}>
            <TaskDescription active={active} setActive={setActive} index={index} title={title} header={children}/>
            <div className={classes.taskname}>{title}</div>
            <div className={classes.taskdescription}>{children}</div>
            <div className={classes.readmore}><span onClick={(e) => {
                e.stopPropagation()
                setActive(true)
            }}>Read more</span></div>
        </div>
    );
};