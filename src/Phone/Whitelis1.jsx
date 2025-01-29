import React, { useState, useEffect } from "react";
import Whitelist from "./Whitelist";
import { IoPencil } from "react-icons/io5";
import { PrivateInfoStorage, privateInfoStorageAddress } from "../utils/contracts.ts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { abiContract } from "../abis/abiContract.tsx";
import { ethers } from "ethers";
import { client } from '../utils/constants.ts';
import { defineChain, prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { useSearchParams } from "react-router-dom";

const Whitelist1 = () => {
  const address = useActiveAccount();
  const chain = defineChain(137);
  const [searchParams] = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("Cargando palabra clave...");
  const isOwner = searchParams.get("isOwner") === "true";

  const getPrivateInfo = async () => {
    try {
      if (!window.ethereum) throw new Error("Metamask not installed");
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); 
  
      const contract = new ethers.Contract(privateInfoStorageAddress, abiContract, signer);
  
      const userAddress = await signer.getAddress();
      console.log("Wallet conectada:", userAddress);
  
      const isWhitelisted = await contract.isWhitelisted(userAddress);
      console.log("¿Está en whitelist?", isWhitelisted);
  
      if (!isWhitelisted) {
        throw new Error("Esta wallet no está en la whitelist.");
      }
  
      const privateInfo = await contract.getPrivateInfo();
      console.log("Palabra clave obtenida:", privateInfo);
      setEditableText(privateInfo)
  
      return privateInfo;
    } catch (error) {
      console.error("Error obteniendo la palabra clave:", error);
    }
  };
  
useEffect(() => {
  getPrivateInfo();
}, [])


  const changeText = async() => {
    if (editableText.trim() === "") return;


      const editInfo = prepareContractCall({
      contract: PrivateInfoStorage,
      method: "updatePrivateInfo",
      params: [editableText],
    });


    console.log(address)

    const { transactionHash: editHash } = await sendTransaction({
      transaction: editInfo,
      account: address,
    });

    await waitForReceipt({
      client: client,
      chain: chain,
      transactionHash: editHash,
    });

    setEditableText(editableText)
  }


  const handleEdit = () => setIsEditing(true);
  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen ">
      <div className="absolute top-7 left-7">
        <img src="/logo.png" alt="Logo" className="w-28" />
      </div>

      <div className="lg:hidden ">
        <div className="flex flex-col items-center w-full px-4 mt-44 space-y-10">
          <div className="relative flex flex-col items-center">
            <img
              src="/piedraMorada.png"
              alt="Piedra Morada"
              className="w-64 h-full mx-auto"
            />

            <div className="absolute -bottom-[-32px] left-1/2 transform -translate-x-1/2 w-[110%] max-w-lg flex items-center justify-center">
              <div className="bg-violet-900 backdrop-blur-sm bg-opacity-10 border border-white border-opacity-20 text-gray-200 p-4 rounded-2xl shadow-2xl w-full h-32 flex flex-col justify-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableText}
                      onChange={(e) => setEditableText(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      className="text-lg bg-transparent text-center text-white outline-none border-b border-gray-400 focus:border-violet-500"
                      autoFocus
                    />
                  ) : (
                    <p className="text-lg text-center text-white flex items-center">
                      {editableText}
                      <IoPencil
                        className="ml-2 text-white text-lg cursor-pointer hover:text-violet-400"
                        onClick={handleEdit}
                      />
                    </p>
                  )}
                </div>
                <button className="w-full py-2 bg-violet-500 bg-opacity-30 backdrop-blur-lg text-white text-sm rounded-full hover:bg-opacity-50">
                  Actualizar
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mt-24">
            <Whitelist />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-start justify-center w-full min-h-screen  mt-14">
        <div className="grid grid-cols-2 gap-16 w-full max-w-6xl">
          <div className="flex flex-col justify-center w-full">
            <div className=" rounded-lg shadow-lg w-full">
              <Whitelist />
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-start w-full space-y-6">
            <div className="relative w-80 h-auto">
              <img
                src="/piedraMorada.png"
                alt="Piedra Morada"
                className="w-full h-auto mx-auto"
              />

             
            
             {isOwner ? 
             <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-md flex items-center justify-center z-10">
                <div className="bg-violet-900 backdrop-blur-sm bg-opacity-10 border border-white border-opacity-20 text-gray-200 p-4 rounded-2xl shadow-2xl w-full h-32 flex flex-col justify-center space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableText}
                        onChange={(e) => setEditableText(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="text-lg bg-transparent text-center text-white outline-none border-b border-gray-400 focus:border-violet-500"
                        autoFocus
                      />
                    ) : (
                      <p className="text-lg text-center text-white flex items-center">
                        {editableText}
                        <IoPencil
                          className="ml-2 text-white text-lg cursor-pointer hover:text-violet-400"
                          onClick={handleEdit}
                        />
                      </p>
                    )}
                  </div>
                  <button onClick={() =>{changeText()}} className="w-full py-2 bg-violet-500 bg-opacity-30 backdrop-blur-lg text-white text-sm rounded-full hover:bg-opacity-50">
                    Actualizar
                  </button>
                </div>
              </div>
              :
             <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-md flex items-center justify-center z-10">
                <div className="bg-violet-900 backdrop-blur-sm bg-opacity-10 border border-white border-opacity-20 text-gray-200 p-4 rounded-2xl shadow-2xl w-full h-32 flex flex-col justify-center space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                      <input
                        type="text"
                        value={editableText}
                        className="text-lg bg-transparent text-center text-white outline-none  focus:border-violet-500"
                        disabled
                      />
                  </div>
                </div>
              </div>
              
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist1;