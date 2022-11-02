/* global BigInt */
import React from 'react';
import "./License.css"
import lgs from "./lgs.png"

export const License = ({name, balances, selected, setSelected, setSelectedNFTs, setSelectedWNFTs}) => {

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
                        {name === 'lgs' ? <img className={"tokenImg"} src={lgs} alt={name}/> :(null)
                        }
                    </div>
                </div> : null
            }
        </div>
    );
};