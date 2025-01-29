import React, { useState } from "react";
import Modal from "react-modal";

import { FiSearch, FiPlus, FiTrash, FiX } from "react-icons/fi";


Modal.setAppElement("#root");


const Whitelist = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [newWallet, setNewWallet] = useState("");

  const [whitelistData, setWhitelistData] = useState([
    {
      id: 1,
      wallet: "0xA1B2C3D4E5F678901234567890ABCDEF12345678",
      date: "12/04/2023",
    },
    {
      id: 2,
      wallet: "0xB2C3D4E5F6A78901234567890ABCDEF23456789",
      date: "25/06/2023",
    },
    {
      id: 3,
      wallet: "0xC3D4E5F6A7B8901234567890ABCDEF34567890A",
      date: "03/07/2023",
    },
    {
      id: 4,
      wallet: "0xD4E5F6A7B8C901234567890ABCDEF45678901B",
      date: "18/09/2023",
    },
    {
      id: 5,
      wallet: "0xE5F6A7B8C9D01234567890ABCDEF56789012C",
      date: "10/10/2023",
    },
    {
      id: 6,
      wallet: "0xF6A7B8C9D0E1234567890ABCDEF67890123D4",
      date: "22/11/2023",
    },
    {
      id: 7,
      wallet: "0xA7B8C9D0E1F234567890ABCDEF78901234E5F",
      date: "05/12/2023",
    },
    {
      id: 8,
      wallet: "0xB8C9D0E1F2A34567890ABCDEF89012345F6A7",
      date: "15/01/2024",
    },
    {
      id: 9,
      wallet: "0xC9D0E1F2A3B4567890ABCDEF90123456A7B8C",
      date: "28/02/2024",
    },
    {
      id: 10,
      wallet: "0xD0E1F2A3B4C567890ABCDEF01234567B8C9D0",
      date: "12/03/2024",
    },
  ]);

  // Abrir/Cerrar modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Agregar nueva dirección a la whitelist
  const handleAddWallet = () => {
    if (newWallet.trim() === "") return;

    const newEntry = {
      id: whitelistData.length + 1,
      wallet: newWallet,
      date: new Date().toLocaleDateString(),
    };

    setWhitelistData([...whitelistData, newEntry]);
    setNewWallet("");
    setIsModalOpen(false);
  };

  const filteredData = whitelistData.filter(
    (item) =>
      item.wallet.toLowerCase().includes(search.toLowerCase()) ||
      item.date.toLowerCase().includes(search.toLowerCase())
  );

  // Función para eliminar un usuario
  const handleDelete = (id) => {
    setWhitelistData(whitelistData.filter((user) => user.id !== id));
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto mb-8 lg:bg-black/60 lg:p-8 lg:border lg:border-gray-700 lg:rounded-lg">
      <h2 className="text-2xl text-white text-start mb-4">Whitelist</h2>

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

              {/* Fecha - Ocupa 1 parte */}
              <span className="text-gray-400 text-xs text-center">
                {item.date}
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
    </div>
  );
};

export default Whitelist;
