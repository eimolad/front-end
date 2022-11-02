import React, { useState, useEffect } from 'react';
import classes from "./NFTforSale.module.css";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import kernelDid from "../../../utils/candid/kernel.did";
import { tokenIdentifier } from "../../../utils/utils";
import { NFT } from "../NFT/NFT";


const getRefBook = async (callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "dwyty-piaaa-aaaan-qagma-cai",
    });

    actor.getRefBook().then((data) => {
        callback(data)
    });
}

export const NFTforSale = ({ nfts, collect }) => {
    const [refBook, setRefBook] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await getRefBook(data => setRefBook(data))
        }
        fetchData()
    }, [])


    let NFTs = []
    let ledgerCanister = ''

    if (nfts && (nfts != "{}")) {
        if (JSON.parse(nfts).info[0].name == collect) {
            NFTs.push(JSON.parse(nfts))
        }
    }

    if (refBook) {
        for (let i = 0; i < refBook.length; i++) {
            if (refBook[i][0] == NFTs[0].info[0].name) 
            {
                ledgerCanister = refBook[i][1].canisterId
            }
        }
    }


    return (

        <div className={classes.marketItem}>
            <div className={classes.icon}>
                {(refBook) ?
                    <img
                        src={"https://" + ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + tokenIdentifier(ledgerCanister, Number(NFTs[0].info[0].indexNFT))}
                        alt=" " />
                    :
                    <p>image</p>
                }
            </div>
            <div className={classes.titleDescription}>
                <p>
                    {NFTs[0].info[0].title}
                </p>
            </div>
            <div className={classes.quantity}>
                {(NFTs[0].info[0].name == "dwarves" || NFTs[0].info[0].name == "weapons") ? <p>1</p> : <p>2</p>}
            </div>
            <div className={classes.price}><p>{NFTs[0].info[0].price}</p></div>
            <div className={classes.buyButton}>
                <div className={classes.But}>Buy</div>
            </div>
        </div>
    );
};

