import React, { useEffect, useState } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import classes from "./Play.module.css"
import bg from "../../../media/bg.png";
import { getAddress } from "../../../utils/utils";




const unityContext = new UnityContext({
    loaderUrl: "./webgl/build/webgl.loader.js",
    dataUrl: "./webgl/build/webgl.data",
    frameworkUrl: "./webgl/build/webgl.framework.js",
    codeUrl: "./webgl/build/webgl.wasm"
});

function Mess(message) {
    unityContext.send("Main Camera", "Text_Message", message);
}

function RenameEquipment(selectedNFT) {

    if (selectedNFT != 'nft not found' && selectedNFT) {
        if (JSON.parse(selectedNFT).type == "character") {
            let newSelectedNFT = JSON.parse(selectedNFT)
            for (let i in newSelectedNFT.metadata.equipment) {
                newSelectedNFT.metadata.equipment[i] = 'https://yzqe4-zyaaa-aaaan-qadaq-cai.raw.ic0.app/?asset=' + i
            }
            return newSelectedNFT
        }
    }
}

export const Play = ({ address, setAddress, nfts }) => {



    if (!address) {
        if (localStorage.getItem("ic-delegation")) {
            getAddress(addr => setAddress(addr))
        } else { window.location.assign("/") }
    }

    const [progression, setProgression] = useState(0);
    const [confirm, setConfirm] = useState(false)
    const [play, setPlay] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [selectedNFT, setSelectedNFT] = useState('nft not found')
    const [NFTsOwned, setNFTsOwned] = useState([])
    const [nftSelectValue, setNftSelectValue] = useState()
    let nftsOptions = []
    let nftsSelect = document.getElementById("selectID")


    useEffect(() => {                                          // тут загружаются нфт с аккаунта в select
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


    }, [nfts,refresh])

    useEffect(() => {                               //просто таймер который рендерит приложение каждые 5 сек, в последствии надо от такого отказаться конечно
        setTimeout(() => { setRefresh(true) }, 5000)
        setRefresh(false)
    },
        [refresh])


    if (nfts && (nfts != "{}")) {                                            //загружает нфт с аккаунта в массив
        if (((Object.keys(JSON.parse(nfts)).length) != (NFTsOwned.length))) {

            for (let tid in JSON.parse(nfts)) {

                // console.log(JSON.parse(nfts)[tid])
                NFTsOwned.push(JSON.parse(nfts)[tid])
            }

        }
    }

    useEffect(function () {
        unityContext.on("Info_Player", function (data) { //событие нажатия кнопки
            console.log(data);
            // Mess(selectedNFT)
            if (selectedNFT) {
                if (JSON.parse(selectedNFT).type == 'character') {
                    let data = RenameEquipment(selectedNFT)
                    Mess(JSON.stringify(data))
                }
                else {
                    Mess(selectedNFT)
                }
            }
        });
        return function () {
            // unityContext.removeEventListener("Info_Player");
        };
    }, [refresh]);

    //console.log(selectedNFT)


    return (
        <div className={classes.root} style={{ backgroundImage: `url(${bg})` }}>
            {play ?
                <div>
                    <select style={{ width: `100px`, fontSize: '16px' }} id="selectID"
                        onChange={() => {                                                       //тут он должен выбирать нужную нфт, но есть проблемы, в будущем мы откажемся от слекта
                            setNftSelectValue(nftsSelect.options[nftsSelect.selectedIndex].text) 
                            for (let i in NFTsOwned) {

                                if (String(NFTsOwned[i].index) === nftSelectValue) {

                                    setSelectedNFT(JSON.stringify(NFTsOwned[i]))     
                                }
                            }
                        }}>

                        <option value="str0"> 168 </option>
                    </select>
                    <button onClick={() => { setPlay(false) }}>Play</button>
                </div>
                :
                <div>
                    <Unity unityContext={unityContext} style={{
                        height: 1180,
                        width: "100%",
                        border: "2px solid black",
                        background: "grey",
                    }} />
                    <button onClick={() => {
                        let text = 'hello'
                        Mess(text)
                        console.log('click')
                    }}>asdasd</button>
                </div>}
        </div>
    );
};
