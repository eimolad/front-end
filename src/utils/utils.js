/* global BigInt */
// import { Secp256k1KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import { getCrc32 } from '@dfinity/agent/lib/esm/utils/getCrc';
import { sha224 } from '@dfinity/agent/lib/esm/utils/sha224';
import { Buffer } from "buffer";
import { AuthClient } from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";

export const AClient = async (setIdent) => {
  const authClient = await AuthClient.create();
  authClient.login({
    maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    onSuccess: async () => {
      setIdent(authClient.getIdentity());
    },
  });
}
export const getAddress = async (callback) => {
    const authClient = await AuthClient.create({ _storage: localStorage.getItem("ic-delegation") })

    const agent = new HttpAgent({
        host: "https://ic0.app",
        identity: authClient.getIdentity()
    });

    callback(principalToAccountIdentifier(authClient.getIdentity().getPrincipal().toText(), 0))
}
const toHexString = (byteArray)  =>{
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}
const to32bits = num => {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, num);
  return Array.from(new Uint8Array(b));
}
export const principalToAccountIdentifier = (p, s) => {
  const padding = Buffer("\x0Aaccount-id");
  const array = new Uint8Array([
      ...padding,
      ...Principal.fromText(p).toUint8Array(),
      ...getSubAccountArray(s)
  ]);
  const hash = sha224(array);
  const checksum = to32bits(getCrc32(hash));
  const array2 = new Uint8Array([
      ...checksum,
      ...hash
  ]);
  return toHexString(array2);
};
export const fromHexString = (hex) => {
  if (hex.substr(0,2) === "0x") hex = hex.substr(2);
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

export const getSubAccountArray = (s) => {
  if (Array.isArray(s)){
    return s.concat(Array(32-s.length).fill(0));
  } else {
    //32 bit number only
    return Array(28).fill(0).concat(to32bits(s ? s : 0))
  }
};
export const tokenIdentifier = (principal, index) => {
  const padding = Buffer("\x0Atid");
  const array = new Uint8Array([
      ...padding,
      ...Principal.fromText(principal).toUint8Array(),
      ...to32bits(index),
  ]);
  return Principal.fromUint8Array(array).toText();
  
};
const isHex = (h) => {
  var regexp = /^[0-9a-fA-F]+$/;
  return regexp.test(h);
};
export const validateAddress = (a) => {
  return (isHex(a) && a.length === 64)
}
export const validatePrincipal = (p) => {
  try {
    return (p === Principal.fromText(p).toText());
  } catch (e) {
    return false;
  }
}
function fallbackCopyTextToClipboard(text) {
  
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
export const clipboardCopy = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}