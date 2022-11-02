import React from 'react';
import taskDescriptionBG from "./taskDescriptionBG.png";
import "./TaskDescription.css"
import closeBtn from "./closeBtn.png";
import taskDescriptionTitle from "./taskDescriptionTitle.png";
import c1 from "./task_1/c1.png"
import c2 from "./task_1/c2.png"

export const TaskDescription = ({active, setActive, title, header, index, description} ) => {
    return (
        <div className={active ? "modal act" : "modal"}  onClick={(e) => {
           e.stopPropagation()
                setActive(false)
        }}>
            <div style={{backgroundImage: `url(${taskDescriptionBG}`}} className="modal__content_task" onClick={e => e.stopPropagation()}>
                {index == 1 ?
                    <>
                        <div className={"title"} style={{backgroundImage: `url(${taskDescriptionTitle})`}}>
                            <div className={"taskName"}>Task {index}</div>
                            <div className={"taskHeader"}>{header}</div>
                            <div className={"closeBtn"}><span onClick={() => setActive(false)}><img src={closeBtn} alt=""/></span></div>
                        </div>
                        <div className={"taskdescription"}>
                            <p>The most loyal and brave dwarves take their best weapons and join the ranks of the royal Guard. A decent job for real warriors. Besides, the king pays in hard cash.</p>
                            <p><b>Daily EARN:</b> Dwarf + Weapon = 100 teGOLD * NRI(boost) * Rank(boost)</p>
                            <p><b>NRI (boost):</b> The higher the rarity of your dwarf, the higher the earnings:</p>
                            <img src={c1}/>
                            <p><b>Rank (boost):</b> Every 30 days, the King grants a new rank to those who have not left the service:</p>
                            <img src={c2}/>
                        </div>
                    </> :
                    index == 2 ?
                        <>
                            <div className={"title"} style={{backgroundImage: `url(${taskDescriptionTitle})`}}>
                                <div className={"taskName"}>{title}</div>
                                <div className={"taskHeader"}>{header}</div>
                                <div className={"closeBtn"}><span onClick={() => setActive(false)}><img src={closeBtn} alt=""/></span></div>
                            </div>
                            <div className={"taskdescription"}>
                                <p>In peacetime, dwarves are busy with craft. In order for their furnaces to work, a lot of coal is required. Dwarves use their axes to work in the mines.</p>
                                <p><b>Weekly EARN:</b> Weapon + Weapon = 10 teCOAL * Rank(boost)</p>
                                <p><b>Rank (boost):</b> Every 30 days, the King grants a new rank to those who have not left the service:</p>
                                <img src={c2}/>
                            </div>
                        </> :
                        index == 3 ?
                            <>
                            </> :
                            <>
                            </>
                }
            </div>
        </div>    );
};
