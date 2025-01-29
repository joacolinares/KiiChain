import React, { useState, useEffect } from "react";

const Whitelist2 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulando un fetch de JSON
    const fetchData = async () => {
      const jsonData = {
        leyenda: "XXXXXXXXX",
      };
      setData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Logo en la parte superior izquierda */}
      <div className="absolute top-7 left-7">
        <img
          src="/logo.png" // Logo en la carpeta public
          alt="Logo"
          className="w-28" // Tamaño normal del logo
        />
      </div>

      {/* Contenedor central */}
      <div className="relative text-center">
        {/* Imagen en el centro */}
        <img
          src="/piedranegra.png" // Imagen en la carpeta public
          alt="Piedra negra"
          className="w-64 h-full mx-auto mb-6 relative"
        />

        {/* Cuadro superpuesto centrado */}
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-lg flex items-center justify-center">
          <div className="bg-gray-900 backdrop-blur-sm bg-opacity-10 border border-white border-opacity-20 text-gray-200 p-2 rounded-2xl shadow-2xl w-full h-32 flex flex-col justify-between">
            <p className="text-2xl text-center flex-grow flex items-center justify-center">
              {data ? data.leyenda : "Cargando..."}
            </p>
            <button className="w-full py-1  bg-gray-500 bg-opacity-30 backdrop-blur-lg text-white text-sm  rounded-full hover:bg-opacity-50">
              No perteneces a la Whithelist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist2;
