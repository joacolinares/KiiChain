import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { FiSearch, FiPlus, FiTrash, FiX } from "react-icons/fi";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { PrivateInfoStorage, privateInfoStorageAddress } from "../utils/contracts.ts";
import { client } from '../utils/constants.ts';
import { defineChain, prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { abiContract } from "../abis/abiContract.tsx";
import { ethers } from "ethers";
import { useSearchParams } from "react-router-dom";


Modal.setAppElement("#root");

const Whitelist = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWallet, setNewWallet] = useState("");
  const [whitelistData, setWhitelistData] = useState([]);
  const [searchParams] = useSearchParams();
  const chain = defineChain(137);

  const isOwner = searchParams.get("isOwner") === "true";

  const address = useActiveAccount();
  const userWallet = address?.address 

    // const { data: getWhitelistAddresses } = useReadContract({ //Aca lo deje en balanceOf y no getUserNFTs() ya que es mas rapido, cuando hay mas tipos de perfumes debe ser getUserNFTs()
    //   contract: PrivateInfoStorage,
    //   method: "getWhitelistAddresses",
    //   params: [],
    // });

   

    const getWhitelistwWallets = async () => {
      try {
        if (!window.ethereum) throw new Error("Metamask not installed");
    
        // 📌 Obtener el provider y signer con ethers v6
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // La cuenta conectada en Metamask
    
        // 📌 Instancia del contrato con signer
        const contract = new ethers.Contract(privateInfoStorageAddress, abiContract, signer);
    
        // 📌 Obtener la dirección del usuario conectado
        const userAddress = await signer.getAddress();
        console.log("Wallet conectada:", userAddress);
    
        // 📌 Verificar si la wallet está en la whitelist
        const isOwner = await contract.owner();
        console.log("¿Está en whitelist?", isOwner);
    
        if (!isOwner) {
          throw new Error("Esta wallet no es Owner.");
        }
    
        // 📌 Llamar a getPrivateInfo()
        const getWhitelistAddresses = await contract.getWhitelistAddresses();
        console.log("Whitelist:", getWhitelistAddresses);
       
        if (getWhitelistAddresses !== undefined) {
          const formattedData = getWhitelistAddresses.map((wallet, index) => ({
            id: index,
            wallet: wallet,
          }));
          setWhitelistData(formattedData);
        }


      } catch (error) {
        console.error("Error obteniendo la palabra clave:", error);
      }
    };



    useEffect(() => {
      console.log("Iniciando")
      getWhitelistwWallets()
    }, []);

  // Abrir/Cerrar modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Buscar en la whitelist
  const filteredData = whitelistData.filter((item) =>
    item.wallet.toLowerCase().includes(search.toLowerCase())
  );

  // Función para eliminar un usuario de la lista localmente
  const handleDelete = async(index) => {
    console.log("handleDelete")
      console.log(index)

      const deleteWallet = prepareContractCall({
      contract: PrivateInfoStorage,
      method: "removeFromWhitelist",
      params: [index],
    });
    console.log(deleteWallet)

    console.log(address)

    const { transactionHash: deleteHash } = await sendTransaction({
      transaction: deleteWallet,
      account: address,
    });

    await waitForReceipt({
      client: client,
      chain: chain,
      transactionHash: deleteHash,
    });

    setWhitelistData(whitelistData.filter((user) => user.id !== index));
  };

  const handleAddWallet = async() => {
    if (newWallet.trim() === "") return;


      const addWallet = prepareContractCall({
      contract: PrivateInfoStorage,
      method: "addToWhitelist",
      params: [newWallet],
    });


    console.log(address)

    const { transactionHash: addHash } = await sendTransaction({
      transaction: addWallet,
      account: address,
    });

    await waitForReceipt({
      client: client,
      chain: chain,
      transactionHash: addHash,
    });


    const newEntry = {
      id: whitelistData.length + 1,
      wallet: newWallet,
    };

    setWhitelistData([...whitelistData, newEntry]);
    setNewWallet("");
    setIsModalOpen(false);
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto mb-8 lg:bg-black/60 lg:p-8 lg:border lg:border-gray-700 lg:rounded-lg">
      {isOwner ? <h2 className="text-2xl text-white text-start mb-4">Bienvenido de nuevo administrador</h2>:<h2 className="text-2xl text-white text-start mb-4">Bienvenido de nuevo usuario</h2>}


    {isOwner ? 
      <>
        <div className="flex items-center justify-between mb-4 ">
          {/* Barra de búsqueda mejorada */}
          <div className="flex items-center  border border-white/20 rounded-2xl p-2 w-full backdrop-blur-lg lg:">
            {/* Ícono de búsqueda */}
            <FiSearch className="text-white text-xl ml-3" />

            {/* Input de búsqueda */}
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 outline-none px-3 py-0 "
            />
          </div>

          <button
            onClick={toggleModal}
            className="ml-2 p-2 border border-white/20 rounded-xl hover:bg-white/20 transition items-center justify-center"
          >
            <FiPlus className="text-white text-xl" />
          </button>
        </div>

        <div className="p-4 rounded-lg shadow-lg">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_auto] items-center py-2 px-4 border-b border-gray-700 last:border-0"
              >
                {/* Wallet - Ocupa 2 partes */}
                <span className="text-gray-300 text-xs truncate">
                  {item.wallet}
                </span>

        

                {/* Botón de eliminar - Tamaño fijo */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg transition flex items-center justify-center w-8 h-8"
                >
                  <FiTrash className="text-gray-200 text-sm" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No se encontraron resultados
            </p>
          )}
        </div>

        {/* Modal con `react-modal` */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          className="bg-black/80 p-4 rounded-2xl shadow-lg w-[90%] max-w-sm mx-auto relative text-sm"
          overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg">Add person</h3>
            <button
              onClick={toggleModal}
              className="text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Input para agregar wallet */}
          <input
            type="text"
            placeholder="Write the address"
            value={newWallet}
            onChange={(e) => setNewWallet(e.target.value)}
            className="w-full p-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none"
          />

          {/* Botón de guardar */}
          <button
            onClick={handleAddWallet}
            className="w-full mt-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
          >
            Guardar
          </button>
        </Modal>
      </>
      :
      <></>
      }


      
    </div>
  );
};

export default Whitelist;
