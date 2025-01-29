import React from "react";
import { useNavigate } from "react-router-dom";

const Showcase = () => {
  const navigate = useNavigate();

  const views = [
    { name: "Login", path: "/login" },
    { name: "Wallet", path: "/wallet" },
    { name: "Whitelist 1", path: "/whitelist1" },
    { name: "Whitelist 2", path: "/whitelist2" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-6">
      <h1 className="text-3xl text-white font-bold">Showcase de Vistas</h1>
      <div className="grid grid-cols-2 gap-4">
        {views.map((view, index) => (
          <button
            key={index}
            onClick={() => navigate(view.path)}
            className="bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition"
          >
            {view.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
