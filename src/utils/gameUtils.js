import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { kernelCanister } from "../canisters";
import kernelDid from "./candid/kernel.did";

export const startGame = async (selectedNFTs, subAccArr, callback) => {
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

  let tidCharacter;

  for (let tid in JSON.parse(selectedNFTs)) {
    if (JSON.parse(selectedNFTs)[tid].type == "character") tidCharacter = tid;
  }

  actor.startGame(tidCharacter, subAccArr).then((data) => {
    callback(data);
  });
};

export const saveProgres = async (accountInGame, callback) => {
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

  console.log(JSON.parse(accountInGame));

  let questData = [];

  for (let i = 0; i < JSON.parse(accountInGame).quest.length; i++) {
    questData.push(JSON.stringify(JSON.parse(accountInGame).quest[i]));
  }

  if (accountInGame) {
    const args = {
      aid: JSON.parse(accountInGame).aid,
      charId: JSON.parse(accountInGame).charId,
      equipment: JSON.parse(accountInGame).equipment,
      name: JSON.parse(accountInGame).name,
      experience: Number(JSON.parse(accountInGame).experience),
      quest: questData,
    };
    console.log(args);

    actor.saveProgress(args).then((data) => {
      callback(data);
    });
  }
};

export const saveAttributes = async (tid, attributesData, callback) => {
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

    actor.saveProgress(tid, attributesData).then((data) => {
      callback(data);
    });
  
};

export const rewardLoot = async (canisterId, principal, subAccountArray, amount, callback) => {
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

  await actor.rewardLoot(canisterId, principal, subAccountArray, amount).then((data) => {
    callback(data);
  });
};

export const lootUsed = async (canisterId, principal, subAccountArray, amount, callback) => {
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

  await actor.useLoot(canisterId, principal, subAccountArray, amount).then((data) => {
    callback(data);
  });
};
