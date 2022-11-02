import React,{useState,useEffect} from 'react'
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import kernelDid from "../../../../utils/candid/kernel.did";
import { clipboardCopy, getAddress, tokenIdentifier } from "../../../../utils/utils";
import classes from './ModalMarket.module.css'

const addSell = async (address, selectedNFT, selectedMoney, price, amount, callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    const actor = Actor.createActor(kernelDid, {
        agent: agent,
        canisterId: "dwyty-piaaa-aaaan-qagma-cai",
    });

    const info = [{
        name: JSON.parse(selectedNFT).collection,
        title: 'weapon for dwarf', // why do we need it?
        indexNFT: String(JSON.parse(selectedNFT).index),
        amount: Number(amount),
        price: Number(price),
        timeStart: Number(Date.now() * 1000000),
        description: ['']
    },];

    const args = {
        "idSell": 2, //TODO: how to generate id??
        "aid": address,
        "info": info,
        "orders": [],
        "fullPrice": Number(price),
        "money": selectedMoney,
        "status": true
    }
    actor.addSell(args).then((data) => {
        callback(data)
    });
}


export const ModalMarket = ({address,setAddress,nfts,visible,setVisible}) => {
    
    const [nftSelectValue, setNftSelectValue] = useState() //TODO: хорошо было бы ставить как дефолтное состояние первое value в интупе
    const [selectedNFT, setSelectedNFT] = useState('')
    const [NFTsOwned, setNFTsOwned] = useState([])
    const [selectedMoney, setSelectedMoney] = useState('gold')
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(0)
    //const NFTsOwned = []
    let nftsOptions = []
    let nftsSelect = document.getElementById("selectID")
    let moneySelect = document.getElementById("moneySelect")

    const rootClasses=[classes.formContainer]


    if (visible){
        rootClasses.push(classes.active)
    }

    if (nfts && (nfts != "{}")) {
        if (((Object.keys(JSON.parse(nfts)).length) != (NFTsOwned.length))) {

            for (let tid in JSON.parse(nfts)) {

                // console.log(JSON.parse(nfts)[tid])
                NFTsOwned.push(JSON.parse(nfts)[tid])
            }

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (NFTsOwned != [] && NFTsOwned && nftsSelect) {

                for (let i in NFTsOwned) {
                    //console.log(i)
                    nftsOptions.push(NFTsOwned[i].index)

                }

                while (nftsSelect.options.length > 0) {
                    nftsSelect.options.remove(0);
                }

                for (let i = 0; i < nftsOptions.length; i++) {
                    let option = document.createElement('option')
                    option.value = i;
                    option.text = nftsOptions[i]
                    nftsSelect.options.add(option)
                }
            }
        }
        fetchData()


    }, [nfts,visible])

    // console.log(selectedNFT)
    // console.log(selectedMoney)
    // console.log(address)

    return (
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
                <div className={classes.form} onClick={(e)=>e.stopPropagation()}>
                    <div className={classes.content}>
                        <select className={classes.item} style={{ width: `100px`, fontSize: '16px' }} id="selectID"
                            onChange={() => {
                                if (nftsSelect) {
                                    setNftSelectValue(nftsSelect.options[nftsSelect.selectedIndex].text)
                                    for (let i in NFTsOwned) {

                                        if (String(NFTsOwned[i].index) == nftSelectValue) {

                                            setSelectedNFT(JSON.stringify(NFTsOwned[i]))
                                        }
                                    }
                                }
                            }} >
                            <option value="str0"> NFTs </option>
                        </select>
                        <select className={classes.item} style={{ width: `100px`, fontSize: '16px' }} id="moneySelect"
                            onChange={() => {

                                if (moneySelect) {

                                    setSelectedMoney(moneySelect.options[moneySelect.selectedIndex].text)
                                }
                            }}>
                            <option value='gold'>gold</option>
                            <option value='icp'>icp</option>
                        </select>
                        <input
                            className={classes.item}
                            type='text'
                            size='5'
                            placeholder="price"
                            onChange={event => setPrice(event.target.value)}>
                        </input>
                        <input
                            className={classes.item}
                            type='text'
                            size='5'
                            placeholder="amount"
                            onChange={event => setAmount(event.target.value)}>
                        </input>
                        <button className={classes.item} onClick={() => {
                            addSell(address, selectedNFT, selectedMoney, price, amount, (data) => {
                                console.log(data)
                            })
                            setVisible(false)
                        }}>sell</button>
                    </div>
                </div>
            </div>
    );
}