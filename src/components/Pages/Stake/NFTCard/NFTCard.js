import React from 'react'
import { Grid, Card, Typography, CardContent, CardActions, Button, CardMedia } from '@mui/material'
import { AuthClient } from '@dfinity/auth-client'
import kernelDid from '../../../../utils/candid/kernel.did'
import {Actor, HttpAgent} from "@dfinity/agent"

async function setWrapState (nft) {
    if (localStorage.getItem("ic-delegation")) {
        const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

        const agent = new HttpAgent({
            host: "https://ic0.app",
            identity: authClient.getIdentity()
        });

        const actor = Actor.createActor(kernelDid, {
            agent: agent,
            canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
        });

        if (nft.metadata.dwarves) {
            const tid = nft.tid
            const metadata = {
                'equipment' : nft.metadata.dwarves[0].equipment,
                'rase' : nft.metadata.dwarves[0].rase,
                'ledgerCanister' : nft.metadata.dwarves[0].ledgerCanister,
                'state' : 'wrapped',
                'position' : nft.metadata.dwarves[0].position,
                'modelCanister' : nft.metadata.dwarves[0].modelCanister,
                'weapon' : nft.metadata.dwarves[0].weapon,
            }
            await actor.updateCharacter(tid, metadata)
        } else if (nft.metadata.weapons && nft.metadata.weapons.length>0) {
            const tid = nft.tid
            const metadata = {
                'weaponType' : nft.metadata.weapons[0].weaponType,
                'ledgerCanister' : nft.metadata.weapons[0].ledgerCanister,
                'state' : 'wrapped',
                'modelCanister' : nft.metadata.weapons[0].modelCanister,
            }
            await actor.updateWeapon(tid, metadata)
        }
    }
}
async function setUnWrapState (nft) {
    if (localStorage.getItem("ic-delegation")) {
        const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

        const agent = new HttpAgent({
            host: "https://ic0.app",
            identity: authClient.getIdentity()
        });

        const actor = Actor.createActor(kernelDid, {
            agent: agent,
            canisterId: "ylwtf-viaaa-aaaan-qaddq-cai",
        });

        if (nft.metadata.dwarves) {
            const tid = nft.tid
            const metadata = {
                'equipment' : nft.metadata.dwarves[0].equipment,
                'rase' : nft.metadata.dwarves[0].rase,
                'ledgerCanister' : nft.metadata.dwarves[0].ledgerCanister,
                'state' : 'none',
                'position' : nft.metadata.dwarves[0].position,
                'modelCanister' : nft.metadata.dwarves[0].modelCanister,
                'weapon' : nft.metadata.dwarves[0].weapon,
            }
            await actor.updateCharacter(tid, metadata)
        } else if (nft.metadata.weapons && nft.metadata.weapons.length>0) {
            const tid = nft.tid
            const metadata = {
                'weaponType' : nft.metadata.weapons[0].weaponType,
                'ledgerCanister' : nft.metadata.weapons[0].ledgerCanister,
                'state' : 'none',
                'modelCanister' : nft.metadata.weapons[0].modelCanister,
            }
            await actor.updateWeapon(tid, metadata)
        }
    }
}

export const NFTCard = ({nft, state, setRefresh}) => {
  return (
      <Grid item xs={1} >
              { nft.metadata.dwarves && nft.metadata.dwarves.length > 0 && nft.metadata.dwarves[0].state === state ?
                  <Card sx={{ maxWidth: 250 }} style={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "200px",
                      border: "1px solid #333",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(5,5,5,0.3)"
                  }}>
                   <a href={"https://" + nft.metadata.dwarves[0].ledgerCanister + ".raw.ic0.app/?tokenid=" + nft.tid} target="_blank">
                                        <CardMedia
                                            component="img"
                                            height="100px"
                                            image={"https://" + nft.metadata.dwarves[0].ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + nft.tid}
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
                              {nft.index}
                          </Typography>
                      </CardContent>
                      <CardActions style={{
                          width: "90%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around"
                      }}>
                          { nft.metadata.dwarves ?
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
                                  if (nft.metadata.dwarves[0].state === "wrapped") {
                                      setUnWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  } else {
                                      setWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  }

                              }}>{nft.metadata.dwarves[0].state === "wrapped" ? "Unwrap" : "Wrap"}</Button>
                              : null }
                          { nft.metadata.weapons && nft.metadata.weapons.length > 0 ?
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
                                  if (nft.metadata.weapons[0].state === "wrapped") {
                                      setUnWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  } else {
                                      setWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  }
                                  setRefresh(true)
                              }}>{nft.metadata.weapons[0].state === "wrapped" ? "Unwrap" : "Wrap"}</Button>
                              : null }
                          {/* <Button size="small">Stake</Button> */}
                      </CardActions>
                  </Card>
                  : null

              }
              { nft.metadata.weapons && nft.metadata.weapons.length > 0 && nft.metadata.weapons[0].state === state ?
                  <Card sx={{ maxWidth: 250 }} style={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "200px",
                      border: "1px solid #333",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(5,5,5,0.3)"
                  }}>
                  <a href={"https://" + nft.metadata.weapons[0].ledgerCanister + ".raw.ic0.app/?tokenid=" + nft.tid} target="_blank">
                      <CardMedia
                          component="img"
                          height="100px"
                          image={"https://" + nft.metadata.weapons[0].ledgerCanister + ".raw.ic0.app/?type=thumbnail&tokenid=" + nft.tid}
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
                              {nft.index}
                          </Typography>
                      </CardContent>
                      <CardActions style={{
                          width: "90%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around"
                      }}>
                          { nft.metadata.dwarves ?
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
                                  if (nft.metadata.dwarves[0].state === "wrapped") {
                                      setUnWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  } else {
                                      setWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  }

                              }}>{nft.metadata.dwarves[0].state === "wrapped" ? "Unwrap" : "Wrap"}</Button>
                              : null }
                          { nft.metadata.weapons && nft.metadata.weapons.length > 0 ?
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
                                  if (nft.metadata.weapons[0].state === "wrapped") {
                                      setUnWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  } else {
                                      setWrapState(nft).then(res =>
                                      {
                                          console.log(res)
                                          setRefresh(true)
                                      })
                                  }
                                  setRefresh(true)
                              }}>{nft.metadata.weapons[0].state === "wrapped" ? "Unwrap" : "Wrap"}</Button>
                              : null }
                          {/* <Button size="small">Stake</Button> */}
                      </CardActions>
                  </Card>
                  : null
              }
      </Grid>
  )
}
