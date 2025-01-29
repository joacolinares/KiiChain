import React, { useState, useEffect } from "react";
import Whitelist from "./Whitelist";
import { FiEdit } from "react-icons/fi"; // Importamos el ícono de edición
import { IoPencil } from "react-icons/io5";

const Whitelist1 = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("OXV16R34");

  useEffect(() => {
    // Simulando un fetch de JSON
    const fetchData = async () => {
      const jsonData = {
        leyenda: "OXV16R34",
      };
      setData(jsonData);
    };
    fetchData();
  }, []);

  // Función para activar edición
  const handleEdit = () => setIsEditing(true);

  // Guardar cambios al presionar Enter o perder el foco
  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen ">
      {/* Logo en la parte superior izquierda */}
      <div className="absolute top-7 left-7">
        <img src="/logo.png" alt="Logo" className="w-28" />
      </div>

      <div className="lg:hidden ">
        {/* Contenedor principal para celulares */}
        <div className="flex flex-col items-center w-full px-4 mt-44 space-y-10">
          {/* Contenedor que engloba la imagen y el cuadro */}
          <div className="relative flex flex-col items-center">
            {/* Imagen en el centro */}
            <img
              src="/piedraMorada.png"
              alt="Piedra Morada"
              className="w-64 h-full mx-auto"
            />

            {/* Cuadro superpuesto centrado */}
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

          {/* Espacio reservado para la whitelist */}
          <div className="w-full max-w-md mt-24">
            <Whitelist />
          </div>
        </div>
      </div>

      {/* 🌟 MODO ESCRITORIO */}
      <div className="hidden lg:flex items-start justify-center w-full min-h-screen  mt-14">
        <div className="grid grid-cols-2 gap-16 w-full max-w-6xl">
          {/* Whitelist (Izquierda) */}
          <div className="flex flex-col justify-center w-full">
            <div className=" rounded-lg shadow-lg w-full">
              <Whitelist />
            </div>
          </div>

          {/* Piedra y cuadro (Derecha) */}
          <div className="relative flex flex-col items-center justify-start w-full space-y-6">
            {/* Contenedor que envuelve la piedra y el cuadro */}
            <div className="relative w-80 h-auto">
              {/* Imagen de la piedra */}
              <img
                src="/piedraMorada.png"
                alt="Piedra Morada"
                className="w-full h-auto mx-auto"
              />

             
            
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
                  <button className="w-full py-2 bg-violet-500 bg-opacity-30 backdrop-blur-lg text-white text-sm rounded-full hover:bg-opacity-50">
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist1;