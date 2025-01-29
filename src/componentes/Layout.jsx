import React, { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [background, setBackground] = useState("/image 27.png");

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setBackground("/Fondo2.jpeg"); // En pantallas grandes
      } else {
        setBackground("/image 27.png"); // En celulares
      }
    };

    // Ejecutar al inicio y en cada cambio de tamaño
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat overflow-y-auto"
      style={{
        backgroundImage: `url('${background}')`,
      }}
    >
      <div className="w-full max-w-4xl mx-auto flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
