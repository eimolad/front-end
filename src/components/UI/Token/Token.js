/* global BigInt */
import React from 'react';
import "./Token.css"
import eGold from "./eGold.png";
import eCoal from "./eCoal.png";
import eOre from "./eWood.png";
import icp from "./icp.png";
import eAdit from "./eBrilliant.png";

export const Token = ({name, balances, selected, setSelected, setSelectedNFTs, setSelectedWNFTs}) => {

    return (
        <div className={"rootNFT"} style={JSON.parse(balances) && JSON.parse(balances)[name] > 0 ? {display: "flex"} : {display: "none"}}>
            {JSON.parse(balances) ?
                <div className={selected != name ? "borderNFT" : "borderNFT ActiveNFT"} onClick={() => {
                    if (selected) {
                        if (selected != name) {
                            setSelected(name)
                        } else {
                            setSelected(null)
                        }
                    } else {
                        setSelectedNFTs("{}")
                        setSelectedWNFTs("{}")
                        setSelected(name)
                    }
                }}>
                    <div className={"tokenInfo"}>
                        <div className={"tokenName"}>{name}</div>
                        <div className={"tokenBalance"}>{JSON.parse(balances)[name]}</div>
                    </div>
                    <div className={selected != name ? "bgCircleNFT" : "bgCircleNFT SelNFT"}>
                        {name === 'gold' ? <img src={eGold} alt={name}/> :
                            name === 'coal' ? <img src={eCoal} alt={name}/> :
                                name === 'icp' ? <img src={icp} alt={name}/> :
                                    name === 'ore' ? <img src={eOre} alt={name}/> : <img src={eAdit} alt={name}/>
                        }
                    </div>
                </div> : null
            }
        </div>
    );
};