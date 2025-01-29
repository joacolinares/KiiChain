import React, { useState, useEffect } from "react";

const Whitelist2 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
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
      <div className="absolute top-7 left-7">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-28"
        />
      </div>

      <div className="relative text-center">
        <img
          src="/piedranegra.png"
          alt="Piedra negra"
          className="w-64 h-full mx-auto mb-6 relative"
        />

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
