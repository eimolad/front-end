import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { canisters, ICcanister, kernelCanister, nftsCanisters, tokenCanisters } from "../canisters";
import dwarvesDid from "./candid/dwarves.did";
import ebronzeDid from "./candid/ebronze.did";
import kernelDid from "./candid/kernel.did";
import { fromHexString, getSubAccountArray, principalToAccountIdentifier, tokenIdentifier } from "./utils";
import ICTokens from "./candid/ic.did";
import egoldDid from "./candid/egold.did";
import dwarvesIDL from "./candid/dwarves.did";
import icDid from "./candid/ic.did";

export const getTokenInfo = async (collection, tid, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  const args = {};
  args[collection] = tid;
  await actor
    .getTokenInfoRare(args)
    .then((data) => {
      callback(data);
    })
    .catch((err) => console.log(err));
};

export const NFTsSend = async (selected, tto, subAccArr, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });

  const args = [];

  for (let tid in JSON.parse(selected)) {
    args.push(tid);
  }
  console.log(tto, args, subAccArr);

  await actor.transferMany(tto, args, subAccArr).then((data) => {
    callback(data);
  });
};

export const setWrapped = async (selectedNFTs, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  const args = [];
  for (let tid in JSON.parse(selectedNFTs)) {
    args.push(tid);
  }
  await actor.wrap(args).then((data) => {
    callback(data);
  });
};

export const setUnWrapped = async (selectedWNFTs, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });
  const args = [];
  for (let tid in JSON.parse(selectedWNFTs)) {
    args.push(tid);
  }
  await actor.unWrap(args).then((data) => {
    callback(data);
  });
};

export const getUnsigned = async (id, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });
  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });

  actor.getUnsigned(id).then((data) => {
    callback(data);
  });
};

export const getAllUnsignedAccounts = async (nfts, callback) => {
  // console.log(nfts)
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  let fb = {};

  const actor = Actor.createActor(dwarvesDid, {
    agent: agent,
    canisterId: canisters["dwarves"],
  });

  await actor.tokens_ext(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 2)).then(async (data) => {
    //   console.log(data)
    if (data && data.ok) {
      for (let i = 0; i < data.ok.length; i++) {
        await getUnsigned(tokenIdentifier(canisters["dwarves"], data.ok[i][0]), (dataUnsing) => {
          //console.log(dataUnsing)
          if (dataUnsing != undefined) {
            getTokenInfo("dwarves", dataUnsing[0], (dataTokenInfo) => {
              //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0]['rase']) //dwarves
              //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0])

              //console.log(dataTokenInfo)
              let nft = {
                type: "character",
                index: data.ok[i][0],
                collection: "dwarves",
                rare: dataTokenInfo.tokenRarity[0],
                metadata: dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0],
              };
              fb[tokenIdentifier(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0].ledgerCanister, data.ok[i][0])] = nft;

              if (JSON.stringify(fb) !== nfts) {
                callback(fb);
              } else {
                callback(null);
              }
            });
          }
        });
      }
    }
  });
  //console.log(fb)
  if (JSON.stringify(fb) !== nfts) {
    callback(fb);
  } else {
    callback(null);
  }
};

export const getSigned = async (tid, callback) => {
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });
  const actor = Actor.createActor(kernelDid, {
    agent: agent,
    canisterId: kernelCanister,
  });

  actor.getSigned(tid).then((data) => {
    callback(data);
  });
};

export const getAllSignedAccounts = async (nfts, callback) => {
  // console.log(nfts)
  const authClient = await AuthClient.create({
    _storage: localStorage.getItem("ic-delegation"),
  });

  const agent = new HttpAgent({
    host: "https://ic0.app",
    identity: authClient.getIdentity(),
  });

  let fb = {};

  const actor = Actor.createActor(dwarvesDid, {
    agent: agent,
    canisterId: canisters["dwarves"],
  });

  await actor.tokens_ext(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 2)).then(async (data) => {
    //console.log(data)
    if (data && data.ok) {
      for (let i = 0; i < data.ok.length; i++) {
        await getSigned(tokenIdentifier(canisters["dwarves"], data.ok[i][0]), (dataSinged) => {
          //console.log(dataSinged)
          if (dataSinged.length != 0) {
            getTokenInfo("dwarves", dataSinged[0].tid, (dataTokenInfo) => {
              //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0]['rase']) //dwarves
              //console.log(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0])

              //console.log()
              let nft = {
                name: dataSinged[0].name,
                type: "character",
                index: data.ok[i][0],
                collection: "dwarves",
                rare: dataTokenInfo.tokenRarity[0],
                metadata: dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0],
              };
              fb[tokenIdentifier(dataTokenInfo.tokenInfo[Object.keys(dataTokenInfo.tokenInfo)[0]][0].ledgerCanister, data.ok[i][0])] = nft;

              //console.log(nft)
              if (JSON.stringify(fb) !== nfts) {
                callback(fb);
              } else {
                callback(null);
              }
            });
          }
        });
      }
    }
  });
  //console.log(fb)
  if (JSON.stringify(fb) !== nfts) {
    callback(fb);
  } else {
    callback(null);
  }
};

export const getBalances = async (cbal, callback) => {
  if (localStorage.getItem("ic-delegation")) {
    const authClient = await AuthClient.create();

    const agent = new HttpAgent({
      host: "https://boundary.ic0.app/",
      identity: authClient.getIdentity(),
    });

    let actor = Actor.createActor(ICTokens, {
      agent: agent,
      canisterId: ICcanister,
    });

    let data = { icp: 0, gold: 0, coal: 0, ore: 0, adit: 0, lgs: 0, leather: 0, bronze: 0, tp: 0 };
    let b = await actor.account_balance({
      account: fromHexString(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0)),
    });

    data.icp = Number(b.e8s) / 100000000;

    for (let t in tokenCanisters) {
      if (t === "bronze") {
        actor = Actor.createActor(ebronzeDid, {
          agent: agent,
          canisterId: "si6du-ciaaa-aaaan-qarra-cai",
        });
        const user = { address: principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0) };
        b = await actor.eimolad_balance(user);
        if (b) {
          data[t] = parseInt(b.toString());
        }
      } else if (t === "tp") {
        actor = Actor.createActor(ebronzeDid, {
          agent: agent,
          canisterId: "vendt-zaaaa-aaaan-qaw5a-cai",
        });
        const user = { address: principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0) };
        b = await actor.eimolad_balance(user);
        if (b) {
          data[t] = parseInt(b.toString());
        }
      } else {
        actor = Actor.createActor(egoldDid, {
          agent: agent,
          canisterId: tokenCanisters[t],
        });

        const user = { address: principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0) };
        const token = "";
        const BalanceRequest = { token, user };

        b = await actor.balance(BalanceRequest);

        if (b.ok) {
          data[t] = parseInt(b.ok.toString());
        }
      }
    }
    if (JSON.stringify(data) !== cbal) {
      callback(data);
    } else {
      callback(null);
    }
  } else {
    callback(null);
  }
};

export const getAccountBalance = async (cbal, subAccountNumber, callback) => {
  if (localStorage.getItem("ic-delegation")) {
    const authClient = await AuthClient.create();

    const agent = new HttpAgent({
      host: "https://boundary.ic0.app/",
      identity: authClient.getIdentity(),
    });

    let actor = Actor.createActor(ICTokens, {
      agent: agent,
      canisterId: ICcanister,
    });

    let data = { icp: 0, gold: 0, coal: 0, ore: 0, adit: 0, lgs: 0, leather: 0, bronze: 0, tp: 0 };
    let b = await actor.account_balance({
      account: fromHexString(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), subAccountNumber)),
    });

    data.icp = Number(b.e8s) / 100000000;

    for (let t in tokenCanisters) {
      if (t === "bronze") {
        actor = Actor.createActor(ebronzeDid, {
          agent: agent,
          canisterId: "si6du-ciaaa-aaaan-qarra-cai",
        });
        const user = { address: principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), subAccountNumber) };
        b = await actor.eimolad_balance(user);
        if (b) {
          data[t] = parseInt(b.toString());
        }
      } else if (t === "tp") {
        actor = Actor.createActor(ebronzeDid, {
          agent: agent,
          canisterId: "vendt-zaaaa-aaaan-qaw5a-cai",
        });
        const user = { address: principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), subAccountNumber) };
        b = await actor.eimolad_balance(user);
        if (b) {
          data[t] = parseInt(b.toString());
        }
      } else {
        actor = Actor.createActor(egoldDid, {
          agent: agent,
          canisterId: tokenCanisters[t],
        });

        const user = { address: principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), subAccountNumber) };
        const token = "";
        const BalanceRequest = { token, user };

        b = await actor.balance(BalanceRequest);

        if (b.ok) {
          data[t] = parseInt(b.ok.toString());
        }
      }
    }
    if (JSON.stringify(data) !== cbal) {
      callback(data);
    } else {
      callback(null);
    }
  } else {
    callback(null);
  }
};

export const getAllNFTs = async (nfts, subAccNumber, callback) => {
  if (localStorage.getItem("ic-delegation")) {
    const authClient = await AuthClient.create();

    const agent = new HttpAgent({
      host: "https://boundary.ic0.app",
      identity: authClient.getIdentity(),
    });

    let fb = {};
    for (let collect in canisters) {
      const actor = Actor.createActor(dwarvesIDL, {
        agent: agent,
        canisterId: canisters[collect],
      });
      await actor.tokens_ext(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), subAccNumber)).then(async (data) => {
        // console.log(data);
        if (data && data.ok) {
          for (let i = 0; i < data.ok.length; i++) {
            await getTokenInfo(collect, tokenIdentifier(canisters[collect], data.ok[i][0]), (st) => {
              let nft = {
                type: st.tokenInfo[Object.keys(st.tokenInfo)[0]][0]["rase"] ? "character" : "equipment",
                index: data.ok[i][0],
                collection: collect,
                rare: st.tokenRarity[0],
                metadata: st.tokenInfo[Object.keys(st.tokenInfo)[0]][0],
              };
              // console.log(nft)
              fb[tokenIdentifier(st.tokenInfo[Object.keys(st.tokenInfo)[0]][0].ledgerCanister, data.ok[i][0])] = nft;
            });
          }
        }
      });
    }
    if (JSON.stringify(fb) !== nfts) {
      callback(fb);
    } else {
      callback(null);
    }
  } else {
    callback(null);
  }
};

export const tokenTransfer = async (token, from_subaccounttoken, tto, amount, callback) => {
  const authClient = await AuthClient.create();

  const agent = new HttpAgent({
    host: "https://boundary.ic0.app",
    identity: authClient.getIdentity(),
  });

  if (token === "icp") {
    const actor = Actor.createActor(icDid, {
      agent: agent,
      canisterId: ICcanister,
    });
    const fee = 10000;
    const args = {
      to: fromHexString(tto), //Should be an address
      fee: { e8s: fee },
      memo: 0,
      from_subaccount: [getSubAccountArray(0)],
      created_at_time: [],
      amount: { e8s: amount * 100000000 },
    };
    await actor.transfer(args).then((res) => {
      callback(res);
    });
  } else {
    const actor = Actor.createActor(kernelDid, {
      agent: agent,
      canisterId: kernelCanister,
    });

    let canisterId = tokenCanisters[token];
    let from_owner = authClient.getIdentity().getPrincipal().toText();

    console.log(canisterId, from_owner, from_subaccounttoken, tto, parseInt(amount));
    await actor.transferToken(canisterId, from_owner, from_subaccounttoken, tto, parseInt(amount)).then((data) => {
      callback(data);
    });
  }
};

export const getAllMiniNFTs = async (nfts, subAccNumber, callback) => {
  if (localStorage.getItem("ic-delegation")) {
    const authClient = await AuthClient.create();

    const agent = new HttpAgent({
      host: "https://boundary.ic0.app",
      identity: authClient.getIdentity(),
    });

    let fb = {};
    for (let collect in nftsCanisters) {
      const actor = Actor.createActor(dwarvesIDL, {
        agent: agent,
        canisterId: nftsCanisters[collect],
      });
      await actor.tokens_ext(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), subAccNumber)).then(async (data) => {
        // console.log(data);
        if (data && data.ok) {
          for (let i = 0; i < data.ok.length; i++) {
            let nft = {
              name: collect,
              index: data.ok[i][0],
              ledgerCanister: nftsCanisters[collect],
            };
            // console.log(nft)
            fb[tokenIdentifier(nftsCanisters[collect], data.ok[i][0])] = nft;
          }
        }
      });
    }
    if (JSON.stringify(fb) !== nfts) {
      callback(fb);
    } else {
      callback(null);
    }
  } else {
    callback(null);
  }
};
