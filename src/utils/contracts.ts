import { defineChain, getContract } from "thirdweb";
import { abiContract } from "../abis/abiContract.tsx";
import { client } from "./constants.ts";

const chain = defineChain(137)

export const privateInfoStorageAddress = "0x22B5991F5D3b912fd6C3b130b0A0B533B3A968BB";


export const PrivateInfoStorage = getContract({
    client: client,
    address: privateInfoStorageAddress,
    chain: chain,
    abi: abiContract
})

