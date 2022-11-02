import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export const Pair = ({stakeCharacter, stakeWeapon}) => {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <div style={{
                        width: "150px",
                        height: "200px",
                        backgroundColor: "white",
                        margin: "15px"
                    }}>
                        {stakeCharacter ?
                            <>
                                <Card sx={{ maxWidth: 250 }} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: "200px",
                                    border: "1px solid #333",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(5,5,5,0.3)"
                                }}>
                                    {/*{console.log(stake)}*/}
                                    <a href={"https://" + stakeCharacter.metadata.dwarves[0].ledgerCanister + ".raw.ic0.app/?tokenid=" + stakeCharacter.tid} target="_blank">
                                        <CardMedia
                                            component="img"
                                            height="100px"
                                            image={"https://" + stakeCharacter.metadata.dwarves[0].ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + stakeCharacter.tid}
                                        />
                                    </a>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" style={{
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            color: "white",
                                            border: "1px solid #333",
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            padding: "5px 30px"
                                        }}>
                                            {stakeCharacter.index}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{
                                        width: "90%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around"
                                    }}>
                                        <Button size="small" style={{
                                            padding: "5px 5px",
                                            width: "30%",
                                            color: "black",
                                            fontSize: "10px",
                                            fontFamily: "Overlock, curcive",
                                            fontWeight: "bold",
                                            backgroundColor: "rgb(236, 131, 46)",
                                            boxShadow: "0 0 10px 3px #111"
                                        }} onClick={() => {
                                        }}>UnStake</Button>
                                    </CardActions>
                                </Card>
                            </>
                            : null }
                    </div>
                <div style={{ width: "150px", height: "200px", backgroundColor: "white", margin: "15px" }}>
                    {stakeWeapon ?
                        <>
                            <Card sx={{ maxWidth: 250 }} style={{
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "200px",
                                border: "1px solid #333",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(5,5,5,0.3)"
                            }}>
                                <a href={"https://" + stakeWeapon.metadata.weapons[0].ledgerCanister + ".raw.ic0.app/?tokenid=" + stakeWeapon.tid} target="_blank">
                                    <CardMedia
                                        component="img"
                                        height="100px"
                                        image={"https://" + stakeWeapon.metadata.weapons[0].ledgerCanister + ".raw.ic0.app/?tokenid=" + stakeWeapon.tid}
                                    />
                                </a>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" style={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        color: "white",
                                        border: "1px solid #333",
                                        fontSize: "12px",
                                        borderRadius: "5px",
                                        padding: "5px 30px"
                                    }}>
                                        {stakeWeapon.index}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{
                                    width: "90%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around"
                                }}>
                                    <Button size="small" style={{
                                        padding: "5px 5px",
                                        width: "30%",
                                        color: "black",
                                        fontSize: "10px",
                                        fontFamily: "Overlock, curcive",
                                        fontWeight: "bold",
                                        backgroundColor: "rgb(236, 131, 46)",
                                        boxShadow: "0 0 10px 3px #111"
                                    }} onClick={() => {
                                    }}>UnStake</Button>
                                </CardActions>
                            </Card>
                        </>
                        : null}
                </div>
                </div>
                {stakeCharacter && stakeWeapon ?
                    <Button size="small" style={{
                        padding: "5px 5px",
                        width: "30%",
                        color: "black",
                        fontSize: "10px",
                        fontFamily: "Overlock, curcive",
                        fontWeight: "bold",
                        backgroundColor: "rgb(236, 131, 46)",
                        boxShadow: "0 0 10px 3px #111"
                    }} onClick={() => {
                    }}>Staking pair</Button>
                    : null }
            </div>
        </>
    );
}

export default Pair;